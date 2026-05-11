import type { Core } from "@strapi/strapi";

const PUBLIC_READ_TYPES = [
  "api::mon-hoc.mon-hoc",
  "api::bo-sach.bo-sach",
  "api::tag.tag",
  "api::chuong.chuong",
  "api::bai-giai.bai-giai",
  "api::de-thi.de-thi",
  "api::trac-nghiem.trac-nghiem",
] as const;

async function grantPublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) {
    strapi.log.warn("[bootstrap] Public role not found; skipping permission setup");
    return;
  }

  for (const uid of PUBLIC_READ_TYPES) {
    for (const action of ["find", "findOne"]) {
      const actionId = `${uid}.${action}`;
      const exists = await strapi.query("plugin::users-permissions.permission").findOne({
        where: { action: actionId, role: publicRole.id },
      });
      if (!exists) {
        await strapi.query("plugin::users-permissions.permission").create({
          data: { action: actionId, role: publicRole.id },
        });
        strapi.log.info(`[bootstrap] Granted ${actionId} to public role`);
      }
    }
  }
}

async function seedLookups(strapi: Core.Strapi) {
  const monHocs = [
    { ten: "Toán", slug: "toan", ma: "toan", thu_tu: 1 },
    { ten: "Ngữ Văn", slug: "ngu-van", ma: "van", thu_tu: 2 },
    { ten: "Tiếng Anh", slug: "tieng-anh", ma: "anh", thu_tu: 3 },
    { ten: "Vật Lý", slug: "vat-ly", ma: "ly", thu_tu: 4 },
    { ten: "Hóa Học", slug: "hoa-hoc", ma: "hoa", thu_tu: 5 },
    { ten: "Sinh Học", slug: "sinh-hoc", ma: "sinh", thu_tu: 6 },
    { ten: "Lịch Sử", slug: "lich-su", ma: "su", thu_tu: 7 },
    { ten: "Địa Lý", slug: "dia-ly", ma: "dia", thu_tu: 8 },
    { ten: "GDCD", slug: "gdcd", ma: "gdcd", thu_tu: 9 },
    { ten: "Tin Học", slug: "tin-hoc", ma: "tin", thu_tu: 10 },
  ] as const;
  for (const item of monHocs) {
    const exists = await strapi.documents("api::mon-hoc.mon-hoc").findFirst({
      filters: { ma: item.ma },
    });
    if (!exists) {
      await strapi.documents("api::mon-hoc.mon-hoc").create({ data: item });
      strapi.log.info(`[seed] mon-hoc: ${item.ten}`);
    }
  }

  const boSachs = [
    { ten: "Kết nối tri thức với cuộc sống", slug: "ket-noi-tri-thuc", ma: "ket-noi-tri-thuc", nha_xuat_ban: "NXB Giáo dục Việt Nam", thu_tu: 1 },
    { ten: "Chân trời sáng tạo", slug: "chan-troi-sang-tao", ma: "chan-troi-sang-tao", nha_xuat_ban: "NXB Giáo dục Việt Nam", thu_tu: 2 },
    { ten: "Cánh diều", slug: "canh-dieu", ma: "canh-dieu", nha_xuat_ban: "NXB Đại học Sư phạm", thu_tu: 3 },
    { ten: "Cơ bản", slug: "co-ban", ma: "co-ban", nha_xuat_ban: "Chung", thu_tu: 4 },
  ] as const;
  for (const item of boSachs) {
    const exists = await strapi.documents("api::bo-sach.bo-sach").findFirst({
      filters: { ma: item.ma },
    });
    if (!exists) {
      await strapi.documents("api::bo-sach.bo-sach").create({ data: item });
      strapi.log.info(`[seed] bo-sach: ${item.ten}`);
    }
  }
}

async function seedSampleContent(strapi: Core.Strapi) {
  const toan = await strapi
    .documents("api::mon-hoc.mon-hoc")
    .findFirst({ filters: { ma: "toan" } });
  const kntt = await strapi
    .documents("api::bo-sach.bo-sach")
    .findFirst({ filters: { ma: "ket-noi-tri-thuc" } });
  if (!toan || !kntt) return;

  const chuongSlug = "chuong-1-ung-dung-dao-ham-khao-sat-ham-so";
  let chuong = await strapi
    .documents("api::chuong.chuong")
    .findFirst({ filters: { slug: chuongSlug }, status: "published" });
  if (!chuong) {
    chuong = await strapi.documents("api::chuong.chuong").create({
      data: {
        ten: "Chương 1: Ứng dụng đạo hàm để khảo sát hàm số",
        slug: chuongSlug,
        thu_tu: 1,
        lop: 12,
        mo_ta: "Tính đơn điệu, cực trị, tiệm cận và khảo sát hàm số",
        mon_hoc: toan.documentId,
        bo_sach: kntt.documentId,
      },
    });
    await strapi.documents("api::chuong.chuong").publish({ documentId: chuong.documentId });
    strapi.log.info(`[seed] chuong: ${chuong.ten}`);
  }

  const baiSlug = "bai-1-tinh-don-dieu-cua-ham-so";
  const baiExists = await strapi
    .documents("api::bai-giai.bai-giai")
    .findFirst({ filters: { slug: baiSlug }, status: "published" });
  if (!baiExists) {
    const bai = await strapi.documents("api::bai-giai.bai-giai").create({
      data: {
        tieu_de: "Bài 1: Tính đơn điệu của hàm số",
        slug: baiSlug,
        lop: 12,
        loai: "giai-sgk" as const,
        bai_so: "Bài 1",
        tom_tat:
          "Hướng dẫn xét tính đơn điệu của hàm số dựa vào dấu của đạo hàm. Bao gồm khái niệm hàm số đồng biến, nghịch biến và quy tắc xét tính đơn điệu.",
        noi_dung: `## Lý thuyết

**Định nghĩa:** Hàm số $y = f(x)$ xác định trên khoảng $K$ được gọi là:

- **Đồng biến** trên $K$ nếu $\\forall x_1, x_2 \\in K$: $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$
- **Nghịch biến** trên $K$ nếu $\\forall x_1, x_2 \\in K$: $x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$

## Định lí

Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$:
- Nếu $f'(x) > 0, \\forall x \\in K$ thì $f(x)$ đồng biến trên $K$
- Nếu $f'(x) < 0, \\forall x \\in K$ thì $f(x)$ nghịch biến trên $K$

## Ví dụ minh họa

Xét tính đơn điệu của hàm số $f(x) = x^3 - 3x^2 + 2$.

**Bước 1:** Tính đạo hàm: $f'(x) = 3x^2 - 6x = 3x(x-2)$

**Bước 2:** Giải $f'(x) = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$

**Bước 3:** Lập bảng biến thiên và kết luận hàm số đồng biến trên $(-\\infty, 0)$ và $(2, +\\infty)$, nghịch biến trên $(0, 2)$.`,
        meta_title: "Bài 1: Tính đơn điệu của hàm số - Toán 12 KNTT",
        meta_description:
          "Lời giải chi tiết Bài 1 Tính đơn điệu của hàm số - Toán 12 Kết nối tri thức. Lý thuyết, ví dụ minh họa, bài tập có đáp án.",
        view_count: 0,
        mon_hoc: toan.documentId,
        bo_sach: kntt.documentId,
        chuong: chuong.documentId,
      },
    });
    await strapi.documents("api::bai-giai.bai-giai").publish({ documentId: bai.documentId });
    strapi.log.info(`[seed] bai-giai: ${bai.tieu_de}`);
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await grantPublicReadPermissions(strapi);
      await seedLookups(strapi);
      await seedSampleContent(strapi);
      strapi.log.info("[bootstrap] Bootstrap complete");
    } catch (err) {
      strapi.log.error("[bootstrap] Failed:", err);
    }
  },
};
