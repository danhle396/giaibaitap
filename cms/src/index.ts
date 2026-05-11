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

async function addIndexes(strapi: Core.Strapi) {
  const indexes: Array<{ table: string; column: string }> = [
    { table: "bai_giais", column: "slug" },
    { table: "bai_giais", column: "lop" },
    { table: "bai_giais", column: "loai" },
    { table: "bai_giais", column: "view_count" },
    { table: "de_this", column: "slug" },
    { table: "de_this", column: "nam" },
    { table: "de_this", column: "loai_de" },
    { table: "trac_nghiems", column: "slug" },
    { table: "trac_nghiems", column: "lop" },
    { table: "chuongs", column: "slug" },
    { table: "chuongs", column: "lop" },
    { table: "mon_hocs", column: "ma" },
    { table: "bo_sachs", column: "ma" },
  ];

  const knex = strapi.db.connection;
  for (const { table, column } of indexes) {
    const indexName = `idx_${table}_${column}`;
    try {
      await knex.raw(`CREATE INDEX IF NOT EXISTS ${indexName} ON ${table}(${column})`);
    } catch (err) {
      // Table may not exist yet on very first boot; safe to ignore
      strapi.log.debug(`[indexes] skip ${indexName}: ${(err as Error).message}`);
    }
  }
  strapi.log.info(`[indexes] ${indexes.length} indexes ensured`);
}

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

async function seedSoanVan(strapi: Core.Strapi) {
  const van = await strapi
    .documents("api::mon-hoc.mon-hoc")
    .findFirst({ filters: { ma: "van" } });
  const kntt = await strapi
    .documents("api::bo-sach.bo-sach")
    .findFirst({ filters: { ma: "ket-noi-tri-thuc" } });
  if (!van || !kntt) return;

  const slug = "soan-bai-chi-pheo";
  const exists = await strapi
    .documents("api::bai-giai.bai-giai")
    .findFirst({ filters: { slug }, status: "published" });
  if (exists) return;

  const bai = await strapi.documents("api::bai-giai.bai-giai").create({
    data: {
      tieu_de: "Soạn bài Chí Phèo - Nam Cao",
      slug,
      lop: 11,
      loai: "soan-van" as const,
      tom_tat:
        "Soạn bài Chí Phèo của Nam Cao - Ngữ Văn 11. Tóm tắt cốt truyện, phân tích nhân vật, ý nghĩa nhan đề và giá trị nội dung - nghệ thuật.",
      noi_dung: `## Tác giả - Tác phẩm

### Tác giả Nam Cao
- Sinh năm 1917 tại Hà Nam, là một trong những nhà văn hiện thực xuất sắc nhất của văn học Việt Nam thế kỷ XX.
- Phong cách: lối viết lạnh lùng, sắc sảo, đào sâu vào tâm lý nhân vật.

### Tác phẩm Chí Phèo
- **Hoàn cảnh sáng tác:** 1941, in trong tập "Luống cày"
- **Thể loại:** Truyện ngắn hiện thực phê phán
- **Tóm tắt:** Chí Phèo - một thanh niên nông dân lương thiện bị xã hội thực dân nửa phong kiến đẩy vào con đường tha hoá, trở thành con quỷ dữ của làng Vũ Đại.

## Soạn bài chi tiết

### Câu 1: Phân tích hình tượng nhân vật Chí Phèo

Chí Phèo là nạn nhân điển hình của xã hội thực dân nửa phong kiến. Từ một thanh niên nông dân lương thiện, Chí bị Bá Kiến đẩy vào tù, ra tù trở thành con quỷ dữ. Hành trình tha hoá của Chí cho thấy bản chất tàn bạo của xã hội cũ.

### Câu 2: Ý nghĩa cuộc gặp gỡ với Thị Nở

Cuộc gặp gỡ với Thị Nở đánh thức bản chất người trong Chí Phèo. Bát cháo hành là biểu tượng tình thương đầu tiên Chí nhận được sau bao năm. Tuy ngắn ngủi nhưng nó cho thấy khát vọng làm người lương thiện vẫn còn sống trong Chí.

## Phân tích nhân vật chính

Chí Phèo là hình tượng điển hình của người nông dân bị bần cùng hoá, lưu manh hoá trong xã hội cũ. Cái chết của Chí không chỉ là bi kịch cá nhân mà còn là tiếng kêu cứu của cả một tầng lớp.

## Ý nghĩa nhan đề

Tên "Chí Phèo" gợi lên hình ảnh con người bị xã hội biến chất. Đây không phải tên khai sinh mà là biệt danh, thể hiện quá trình đánh mất bản thân của nhân vật.`,
      meta_title: "Soạn bài Chí Phèo - Ngữ Văn 11 đầy đủ | Giải Bài Tập",
      meta_description:
        "Soạn bài Chí Phèo - Nam Cao - Ngữ Văn 11. Tóm tắt, phân tích nhân vật, ý nghĩa nhan đề, giá trị nội dung và nghệ thuật.",
      view_count: 0,
      mon_hoc: van.documentId,
      bo_sach: kntt.documentId,
    },
  });
  await strapi.documents("api::bai-giai.bai-giai").publish({ documentId: bai.documentId });
  strapi.log.info(`[seed] soan-van: ${bai.tieu_de}`);
}

async function seedDeThi(strapi: Core.Strapi) {
  const toan = await strapi
    .documents("api::mon-hoc.mon-hoc")
    .findFirst({ filters: { ma: "toan" } });
  if (!toan) return;

  const slug = "de-thi-tot-nghiep-thpt-2025-mon-toan-de-101";
  const exists = await strapi
    .documents("api::de-thi.de-thi")
    .findFirst({ filters: { slug }, status: "published" });
  if (exists) return;

  const de = await strapi.documents("api::de-thi.de-thi").create({
    data: {
      tieu_de: "Đề thi tốt nghiệp THPT 2025 môn Toán - Mã đề 101",
      slug,
      loai_de: "tot-nghiep-thpt" as const,
      nam: 2025,
      lop: 12,
      tinh_thanh: null,
      thoi_gian_lam_bai: 90,
      noi_dung_de: `## Đề thi tốt nghiệp THPT 2025 - Môn Toán - Mã đề 101

**Thời gian làm bài:** 90 phút (không kể thời gian phát đề)

### Phần I. Câu hỏi trắc nghiệm

**Câu 1.** Tập xác định của hàm số $y = \\sqrt{x-2}$ là:

A. $(2; +\\infty)$
B. $[2; +\\infty)$
C. $(-\\infty; 2]$
D. $\\mathbb{R} \\setminus \\{2\\}$

**Câu 2.** Cho hàm số $y = x^3 - 3x$. Số điểm cực trị của hàm số là:

A. 0
B. 1
C. 2
D. 3`,
      noi_dung_dap_an: `## Đáp án chi tiết

### Bảng đáp án

| Câu | 1 | 2 |
|---|---|---|
| Đáp án | B | C |

### Lời giải chi tiết

**Câu 1.** Đáp án **B**

Hàm số xác định khi $x - 2 \\geq 0 \\Leftrightarrow x \\geq 2$. Vậy tập xác định là $[2; +\\infty)$.

**Câu 2.** Đáp án **C**

$y' = 3x^2 - 3 = 3(x-1)(x+1) = 0 \\Leftrightarrow x = \\pm 1$. Hàm số có 2 điểm cực trị.`,
      meta_title: "Đề thi TN THPT 2025 môn Toán Mã 101 (có đáp án) | Giải Bài Tập",
      meta_description:
        "Đề thi tốt nghiệp THPT năm 2025 môn Toán mã đề 101 kèm đáp án chi tiết. Tải PDF, xem online, chuẩn bị thi tốt.",
      view_count: 0,
      mon_hoc: toan.documentId,
    },
  });
  await strapi.documents("api::de-thi.de-thi").publish({ documentId: de.documentId });
  strapi.log.info(`[seed] de-thi: ${de.tieu_de}`);
}

async function seedTracNghiem(strapi: Core.Strapi) {
  const toan = await strapi
    .documents("api::mon-hoc.mon-hoc")
    .findFirst({ filters: { ma: "toan" } });
  const chuong = await strapi
    .documents("api::chuong.chuong")
    .findFirst({ filters: { slug: "chuong-1-ung-dung-dao-ham-khao-sat-ham-so" } });
  if (!toan) return;

  const slug = "trac-nghiem-toan-12-tinh-don-dieu-cua-ham-so";
  const exists = await strapi
    .documents("api::trac-nghiem.trac-nghiem")
    .findFirst({ filters: { slug }, status: "published" });
  if (exists) return;

  const cauHoi = [
    {
      cau_hoi: "Cho hàm số $y = x^3 - 3x^2 + 2$. Hàm số đồng biến trên khoảng nào sau đây?",
      dap_an: ["$(-\\infty; 0)$", "$(0; 2)$", "$(2; +\\infty)$", "$(-1; 1)$"],
      dap_an_dung: 2,
      giai_thich:
        "$y' = 3x^2 - 6x = 3x(x-2)$. $y' > 0$ khi $x < 0$ hoặc $x > 2$. Vậy hàm số đồng biến trên $(2; +\\infty)$.",
    },
    {
      cau_hoi: "Hàm số nào sau đây nghịch biến trên $\\mathbb{R}$?",
      dap_an: ["$y = x^3$", "$y = -x^3 + x$", "$y = -x^3 - 3x$", "$y = x^2 + 1$"],
      dap_an_dung: 2,
      giai_thich:
        "Xét $y = -x^3 - 3x \\Rightarrow y' = -3x^2 - 3 < 0 \\forall x \\Rightarrow$ nghịch biến trên $\\mathbb{R}$.",
    },
    {
      cau_hoi: "Hàm số $y = \\dfrac{x+1}{x-1}$ đồng biến trên các khoảng:",
      dap_an: [
        "$(-\\infty; 1)$ và $(1; +\\infty)$",
        "Không có khoảng đồng biến",
        "$(-\\infty; 1) \\cup (1; +\\infty)$",
        "$(-\\infty; -1)$ và $(-1; +\\infty)$",
      ],
      dap_an_dung: 1,
      giai_thich:
        "$y' = \\dfrac{-2}{(x-1)^2} < 0 \\forall x \\neq 1$. Hàm số nghịch biến trên từng khoảng xác định, không có khoảng đồng biến.",
    },
  ];

  const tn = await strapi.documents("api::trac-nghiem.trac-nghiem").create({
    data: {
      tieu_de: "Trắc nghiệm Toán 12 - Tính đơn điệu của hàm số (3 câu)",
      slug,
      lop: 12,
      do_kho: "thong-hieu" as const,
      thoi_gian: 600,
      so_cau: cauHoi.length,
      cau_hoi: cauHoi,
      meta_title: "Trắc nghiệm Tính đơn điệu hàm số - Toán 12 | Giải Bài Tập",
      meta_description:
        "Bộ câu trắc nghiệm Tính đơn điệu của hàm số - Toán 12 có đáp án và lời giải chi tiết. Làm online, chấm điểm tức thì.",
      view_count: 0,
      mon_hoc: toan.documentId,
      ...(chuong ? { chuong: chuong.documentId } : {}),
    },
  });
  await strapi.documents("api::trac-nghiem.trac-nghiem").publish({ documentId: tn.documentId });
  strapi.log.info(`[seed] trac-nghiem: ${tn.tieu_de}`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await grantPublicReadPermissions(strapi);
      await seedLookups(strapi);
      await seedSampleContent(strapi);
      await seedSoanVan(strapi);
      await seedDeThi(strapi);
      await seedTracNghiem(strapi);
      await addIndexes(strapi);
      strapi.log.info("[bootstrap] Bootstrap complete");
    } catch (err) {
      strapi.log.error("[bootstrap] Failed:", err);
    }
  },
};
