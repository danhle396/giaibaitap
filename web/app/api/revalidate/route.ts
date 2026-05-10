import { revalidateTag, revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

interface RevalidatePayload {
  event?: string;
  model?: string;
  entry?: { slug?: string; lop?: number };
  tag?: string;
  path?: string;
}

const MODEL_TAG_MAP: Record<string, (slug: string) => string[]> = {
  "bai-giai": (slug) => [`bai-giai-${slug}`, "bai-giai-slugs"],
  "de-thi": (slug) => [`de-thi-${slug}`, "de-thi-list"],
  "trac-nghiem": (slug) => [`trac-nghiem-${slug}`],
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidatePayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const revalidated: { tags: string[]; paths: string[] } = { tags: [], paths: [] };

  if (body.tag) {
    revalidateTag(body.tag, "max");
    revalidated.tags.push(body.tag);
  }

  if (body.path) {
    revalidatePath(body.path);
    revalidated.paths.push(body.path);
  }

  if (body.model && body.entry?.slug) {
    const tagBuilder = MODEL_TAG_MAP[body.model];
    if (tagBuilder) {
      for (const tag of tagBuilder(body.entry.slug)) {
        revalidateTag(tag, "max");
        revalidated.tags.push(tag);
      }
    }
  }

  return Response.json({ revalidated, now: Date.now() });
}

export async function GET() {
  return Response.json({
    info: "POST with x-revalidate-secret header. Body: { model, entry: { slug } } or { tag } or { path }",
  });
}
