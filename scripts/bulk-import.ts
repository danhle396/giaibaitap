/**
 * Bulk import Markdown files into Strapi as bai-giai entries.
 *
 * Usage:
 *   STRAPI_URL=http://localhost:1337 \
 *   STRAPI_API_TOKEN=xxx \
 *   tsx scripts/bulk-import.ts <folder>
 *
 * Each .md file must have frontmatter:
 *   ---
 *   tieu_de: Bài 1: Tính đơn điệu
 *   slug: bai-1-tinh-don-dieu
 *   lop: 12
 *   loai: giai-sgk             # giai-sgk | giai-sbt | giai-vbt | soan-van | ly-thuyet
 *   mon: toan                  # mon-hoc.ma
 *   bo_sach: ket-noi-tri-thuc  # bo-sach.ma
 *   bai_so: "Bài 1"            # optional
 *   tom_tat: "..."             # optional, max 500
 *   meta_title: "..."          # optional, ≤ 70
 *   meta_description: "..."    # optional, ≤ 160
 *   chuong_slug: chuong-1-..   # optional, references chuong by slug
 *   ---
 *   (markdown body becomes noi_dung)
 *
 * Behavior: idempotent — skip if slug already published, log all actions.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

type Loai = "giai-sgk" | "giai-sbt" | "giai-vbt" | "soan-van" | "ly-thuyet";
type MonMa = "toan" | "van" | "anh" | "ly" | "hoa" | "sinh" | "su" | "dia" | "gdcd" | "tin";
type BoSachMa = "ket-noi-tri-thuc" | "chan-troi-sang-tao" | "canh-dieu" | "co-ban";

interface Frontmatter {
  tieu_de: string;
  slug: string;
  lop: number;
  loai: Loai;
  mon: MonMa;
  bo_sach: BoSachMa;
  bai_so?: string;
  tom_tat?: string;
  meta_title?: string;
  meta_description?: string;
  chuong_slug?: string;
}

interface ParseResult {
  data: Frontmatter;
  body: string;
}

function parseFrontmatter(raw: string): ParseResult | null {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) return null;
  const [, fm, body] = match;
  const data: Record<string, string | number> = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = /^([a-z_]+):\s*(.*)$/i.exec(line.trim());
    if (!m) continue;
    const key = m[1];
    let value: string = m[2].trim();
    // Strip surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key === "lop") {
      data[key] = parseInt(value, 10);
    } else {
      data[key] = value;
    }
  }
  return { data: data as unknown as Frontmatter, body: body.trim() };
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Strapi ${res.status} ${res.statusText} on ${path}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

async function findOneBy<T>(uid: string, key: string, value: string): Promise<T | null> {
  const q = `?filters[${encodeURIComponent(key)}][%24eq]=${encodeURIComponent(value)}&pagination[pageSize]=1`;
  const json = await api<{ data: T[] }>(`/${uid}${q}`);
  return json.data[0] ?? null;
}

async function importOne(filename: string, parsed: ParseResult): Promise<"created" | "skipped" | "error"> {
  const fm = parsed.data;
  const required: (keyof Frontmatter)[] = ["tieu_de", "slug", "lop", "loai", "mon", "bo_sach"];
  for (const k of required) {
    if (!fm[k]) {
      console.error(`✗ ${filename}: missing required frontmatter "${k}"`);
      return "error";
    }
  }

  const existing = await findOneBy<{ documentId: string }>(
    "bai-giais",
    "slug",
    fm.slug,
  );
  if (existing) {
    console.log(`⏭  ${filename}: slug "${fm.slug}" already exists, skip`);
    return "skipped";
  }

  const monHoc = await findOneBy<{ documentId: string }>("mon-hocs", "ma", fm.mon);
  if (!monHoc) {
    console.error(`✗ ${filename}: mon-hoc with ma="${fm.mon}" not found`);
    return "error";
  }

  const boSach = await findOneBy<{ documentId: string }>("bo-sachs", "ma", fm.bo_sach);
  if (!boSach) {
    console.error(`✗ ${filename}: bo-sach with ma="${fm.bo_sach}" not found`);
    return "error";
  }

  let chuongDocId: string | null = null;
  if (fm.chuong_slug) {
    const c = await findOneBy<{ documentId: string }>("chuongs", "slug", fm.chuong_slug);
    chuongDocId = c?.documentId ?? null;
    if (!chuongDocId) console.warn(`!  ${filename}: chuong "${fm.chuong_slug}" not found, omitting`);
  }

  const data = {
    tieu_de: fm.tieu_de,
    slug: fm.slug,
    lop: fm.lop,
    loai: fm.loai,
    bai_so: fm.bai_so ?? null,
    tom_tat: fm.tom_tat ?? null,
    meta_title: fm.meta_title ?? null,
    meta_description: fm.meta_description ?? null,
    noi_dung: parsed.body,
    view_count: 0,
    mon_hoc: monHoc.documentId,
    bo_sach: boSach.documentId,
    ...(chuongDocId ? { chuong: chuongDocId } : {}),
  };

  const created = await api<{ data: { documentId: string } }>("/bai-giais", {
    method: "POST",
    body: JSON.stringify({ data }),
  });

  // Strapi v5 creates as draft. Publish by issuing PUT ?status=published with an
  // empty data payload — Strapi v5 promotes the draft to a published version.
  await api(`/bai-giais/${created.data.documentId}?status=published`, {
    method: "PUT",
    body: JSON.stringify({ data: {} }),
  });

  console.log(`✓ ${filename}: created + published "${fm.slug}"`);
  return "created";
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error("Usage: tsx scripts/bulk-import.ts <folder>");
    process.exit(1);
  }
  if (!STRAPI_TOKEN) {
    console.warn("⚠ STRAPI_API_TOKEN not set — using anonymous (public role only)");
  }

  const files = (await readdir(folder)).filter((f) => extname(f) === ".md");
  console.log(`Found ${files.length} .md files in ${folder}\n`);

  let created = 0;
  let skipped = 0;
  let errored = 0;

  for (const file of files) {
    const path = join(folder, file);
    const raw = await readFile(path, "utf8");
    const parsed = parseFrontmatter(raw);
    if (!parsed) {
      console.error(`✗ ${file}: missing or malformed frontmatter`);
      errored++;
      continue;
    }
    try {
      const result = await importOne(file, parsed);
      if (result === "created") created++;
      else if (result === "skipped") skipped++;
      else errored++;
    } catch (err) {
      console.error(`✗ ${file}: ${(err as Error).message}`);
      errored++;
    }
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped, ${errored} errored`);
  if (errored > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
