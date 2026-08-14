# KẾ HOẠCH PHÁT TRIỂN GIAIBAITAP247.COM (BẢN CHI TIẾT)

> **Mục tiêu tổng thể:** Website giải bài tập SGK hàng đầu VN, doanh thu **100 triệu/tháng** trong 12 tháng.
> **Kịch bản:** A — Không đầu tư tiền (công cụ miễn phí). Mục tiêu 3 tháng: **5–20 triệu/tháng**.
> **Cập nhật:** 2026-08-05 — **PIPELINE V4: Claude chép đề → Gemini giải → Claude duyệt chất lượng** (mục 1.2).
> **Hạ tầng:** đã **bỏ Strapi/Railway** (01/08) — nội dung là markdown trong repo, web tĩnh hoàn toàn, **chi phí 0đ/tháng**.
> **Review định kỳ:** Chủ nhật hàng tuần — điền bảng KPI ở Phụ lục C.

---

# MỤC LỤC

- [Phần 0 — Hiện trạng](#phần-0--hiện-trạng-mốc-0)
- [Phần I — Kế hoạch nội dung](#phần-i--kế-hoạch-hoàn-thành-nội-dung)
  - Lịch chạy pipeline theo NGÀY (lệnh copy-paste sẵn)
  - Tiêu chí chất lượng + Quy trình kiểm tra
- [Phần II — Kế hoạch doanh thu 3 tháng](#phần-ii--kế-hoạch-doanh-thu-3-tháng)
  - Tháng 1: Foundation · Tháng 2: Monetization · Tháng 3: Scale
  - Hướng dẫn từng bước: AdSense, Affiliate, Facebook Group
- [Phần III — Quản trị rủi ro](#phần-iii--quản-trị-rủi-ro)
- [Phụ lục A — Lệnh pipeline đầy đủ](#phụ-lục-a--lệnh-pipeline-cho-từng-pdf)
- [Phụ lục B — Checklist SEO kỹ thuật](#phụ-lục-b--checklist-seo-kỹ-thuật)
- [Phụ lục C — Bảng KPI theo dõi hàng tuần](#phụ-lục-c--bảng-kpi-theo-dõi-hàng-tuần)

---

# PHẦN 0 — HIỆN TRẠNG (Mốc 0)

## 0.1. Hạ tầng

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Domain | ✅ giaibaitap247.com | Cloudflare, ~$10/năm, DNSSEC + WHOIS privacy free |
| Frontend | ✅ Next.js 16 / Vercel | Free Hobby tier, auto-deploy từ GitHub `main` |
| **Nội dung** | ✅ **Markdown trong repo** | `web/content/bai-giai/*.md`, đọc lúc build → trang 100% tĩnh |
| ~~Backend Strapi~~ | ❌ **ĐÃ BỎ (01/08/2026)** | Railway hết hạn dùng thử → API 404 → web mất sạch nội dung. Đã chuyển sang markdown. |
| GSC | ✅ Verified (cả www + non-www) | Sitemap **996 URL** |
| GA4 | ✅ G-9TMLY2JHYG | 5 custom events: scroll_100, search, outbound_click, bookmark, share |
| Schema.org | ✅ Article + LearningResource | JSON-LD trên mọi bài giải |
| Redirect www | ✅ 308 → non-www | Canonical thống nhất |
| Phông chữ | ✅ Be Vietnam Pro | next/font, tự-host; favicon chữ G |
| Pipeline AI | ✅ **V4: Claude + Gemini** | Xem 1.2 |
| **Chi phí vận hành** | **0đ/tháng** | Chỉ còn khấu hao domain ~$10/năm |

> **Bài học 01/08/2026:** phụ thuộc backend trả phí là điểm chết đơn lẻ — Railway ngừng là website mất toàn bộ nội dung dù Vercel vẫn chạy. Nội dung vốn đã là file markdown nên việc bỏ Strapi vừa xoá rủi ro vừa cắt chi phí về 0. **Nguyên tắc từ nay: không đưa thành phần trả phí vào đường đi của nội dung.**

## 0.2. Nội dung đã có (**892 bài** trong `web/content/bai-giai/` — cập nhật 05/08)

| Nội dung | Trạng thái | Số bài |
|---|---|---|
| Toán 10 — KNTT, CTST, CD × 2 tập | ✅ nhưng ⚠️ **16 bài còn lỗi công thức** (di chứng V1) | ~170 |
| Văn 12 — đủ 3 bộ × 2 tập (từ PDF) | ✅ Hoàn tất | ~215 |
| Văn 9 — đủ 3 bộ × 2 tập (từ PDF) | ✅ Hoàn tất (mùa thi vào 10) | ~180 |
| **Toán 9 KNTT T1 + T2** | ✅ **Hoàn tất trọn bộ** | ~60 |
| **Toán 9 CTST T1** | ✅ **Hoàn tất trọn bộ** (5 chương) | ~38 |
| Toán 9 CTST T2 | 🔶 Đến Bài 3 Viète (trang 6–19) | ~7 |
| Văn 11+12 (sinh từ list, KHÔNG từ PDF) | ⚠️ Chất lượng thấp — sẽ làm lại bằng V4 | ~100 |
| Soạn văn cũ | ✅ | ~30 |
| Đề thi, trắc nghiệm | ❌ **Chưa có nội dung markdown** — trang hiện để trống | 0 |

**Chất lượng đã xử lý:** sạch chữ Hán (CJK = 0), sạch meta-text AI, sửa lỗi lặp từ, sửa ~150 bài lỗi khối `$$` không render, giải lại 6 bài Toán 10/9 bằng V3 (0 lỗi).

⚠️ **Nợ chất lượng còn lại:**
1. **16 bài Toán 10** còn lỗi công thức + nghi sai đáp án (danh sách trong memory `verify-site-audit`) → dùng làm phép thử cho V4.
2. **~100 bài Văn 11/12** sinh từ list (không từ PDF) — nguy cơ bịa dẫn chứng, sẽ làm lại.
3. **Mất 2 bài** khi bỏ Strapi (chỉ tồn tại trên DB, không có bản .md) — không đáng kể.
4. **Đề thi & trắc nghiệm** chưa có dữ liệu → cần quyết định: làm nội dung hay ẩn 2 mục này khỏi menu.

## 0.3. Kho PDF nguồn (484 file)

| Lớp | Văn | Toán | Ghi chú thiếu |
|---|---|---|---|
| 12 | 6/6 ✅ | 6/6 ✅ | Đủ (Toán 12 CTST T1 = `SGK TOÁN 12-TẬP 1-CTST.pdf`) |
| 11 | 6/6 ✅ | 6/6 ✅ | |
| 10 | 6/6 ✅ | 4/6 | Toán 10 đã xong từ PDF cũ, không cần |
| 9 | 6/6 ✅ | 6/6 ✅ | |
| 8 | 6/6 ✅ | 6/6 ✅ | |
| 7 | 6/6 ✅ | 6/6 ✅ | |
| 6 | 6/6 ✅ | 6/6 ✅ | |
| 1–5 | — | có | Ưu tiên thấp (P5) |

> **Kho PDF đã đủ** cho lớp 6–12 (Văn + Toán, cả 3 bộ sách). Không còn PDF nào cần tải bổ sung. Điểm nghẽn duy nhất là quota Groq.

---

# PHẦN I — KẾ HOẠCH HOÀN THÀNH NỘI DUNG

## 1.1. Mục tiêu định lượng

| Mốc | Bài trên production | Deadline |
|---|---|---|
| ~~M1~~ | ~~800 bài (xong Văn 12 + Văn/Toán 9)~~ | ✅ **ĐẠT 14/07** (807 bài — Văn 12 + Văn 9 xong, Toán 9 đang chạy) |
| M2 | 1.200 bài (xong Toán 9 + Toán 12 + Văn 11, chất lượng V2) | Cuối tuần 4 — **đủ điều kiện AdSense** |
| M3 | 1.800 bài (xong Toán 11 + Văn 10 + lớp 8) | Cuối tuần 8 |
| M4 | 2.500+ bài (xong lớp 6–7 + đề thi) | Cuối tuần 12 |

## 1.2. PIPELINE V4 — Claude chép đề, Gemini giải, Claude duyệt

### Lịch sử kiến trúc (vì sao đến V4)

| Bản | Kiến trúc | Vì sao bỏ |
|---|---|---|
| V1 | Groq Vision vừa đọc vừa giải | **Giải toán đố sai rất nhiều** (5/6 bài sai ở file khảo sát: lập PT thiếu dữ kiện, sai số học, bịa đáp án). Di chứng: ~16 bài Toán 10 vẫn còn lỗi. |
| V2 | Groq chép đề → Claude giải | Groq **gỡ toàn bộ model vision** (16/07) → `404 model_not_found`. Chết ở phía nhà cung cấp. |
| V3 | Claude đọc PDF trực tiếp (render PNG → Read) | Chất lượng cao nhất, nhưng **Claude phải làm cả chép đề lẫn giải** → chậm, mỗi phiên chỉ ~2–3 bài. |
| **V4** | **Claude chép đề → Gemini giải → Claude duyệt** | Tách việc: Claude làm phần cần *đọc hiểu ảnh* và *thẩm định*; Gemini làm phần *viết lời giải* (khối lượng lớn). |

### Kiến trúc V4

```
PDF SGK ──[Claude: render PNG + Read]──► CHÉP ĐỀ nguyên văn (không giải)
                                            │ content-templates/de-*/
                                            ▼
                            [Gemini API — gemini-3-flash-preview]
                                    GIẢI đề → lời giải .md
                                            │
                                            ▼
                    ┌───────[Claude DUYỆT CHẤT LƯỢNG]───────┐
                    │ 1. Kiểm chứng ĐÁP ÁN bằng script      │
                    │    (thế số, brute-force, back-substitute)│
                    │ 2. Kiểm tra HIỂN THỊ bằng chính bộ     │
                    │    render của web (marked+KaTeX)       │
                    │ 3. Đối chiếu đề gốc: đủ ý? bỏ sót bài? │
                    └───────────────┬───────────────────────┘
                        ĐẠT ─────────┤────────── KHÔNG ĐẠT
                          │                        │
                          ▼                        ▼
                web/content/bai-giai/    Claude tự giải lại (V3)
                          │                        │
                          └────────┬───────────────┘
                                   ▼
                          git commit + push → Vercel deploy
```

**Phân vai:**

| Việc | Ai làm | Vì sao |
|---|---|---|
| Đọc ảnh trang sách → chép đề + LaTeX | **Claude** (Read ảnh PNG) | Đọc ảnh chính xác nhất, kể cả phân số/căn/mũ; không bịa |
| Viết lời giải chi tiết | **Gemini 3 Flash** | Miễn phí, nhanh, toán đúng, tiếng Việt tự nhiên |
| **Duyệt chất lượng** (đáp án + hiển thị + độ đủ) | **Claude** | Bắt lỗi Gemini; đây là chốt chặn cuối |
| Đăng bài | Claude (script) | consolidate → build → push |

### Bằng chứng khả thi (đã kiểm chứng thật 05/08/2026)

- ✅ `GEMINI_API_KEY` trong `.env.local` **còn hiệu lực** (HTTP 200).
- ⚠️ **Free tier CHỈ mở cho 2 model:** `gemini-3-flash-preview` (~20s/bài) và `gemini-3.1-flash-lite` (~6s/bài). Các model khác (`gemini-2.5-pro`, `gemini-2.0-flash`, `gemini-3.1-pro-preview`) đều trả **429 `limit: 0`** — không dùng được.
- ✅ **Toán đúng:** cho giải lại bài "tam giác ABC — lập PT đường thẳng" (bài tôi đã tự giải & kiểm chứng), Gemini ra **khớp 100%**: $BC: x+3y+4=0$, $CA: 3x+2y-9=0$, trung trực $x+2y-2=0$, $AH: 3x-y=0$, $AM: 5x+y-8=0$.
- ✅ **Định dạng đạt:** chạy output qua đúng bộ render của web → **128 công thức hiển thị, 0 lỗi KaTeX, 0 dấu `$` lẻ**.

### Prompt định dạng bắt buộc (đã kiểm chứng)

Phải nhắc Gemini các quy tắc sau, nếu không sẽ dính đúng lỗi đã gặp ở kho Toán 10 cũ:

```
- Markdown thuần. Công thức ngắn trong $...$ và PHẢI nằm gọn trên MỘT dòng.
- Công thức khối: $$ trên DÒNG RIÊNG, có DÒNG TRỐNG trước và sau.
- TUYỆT ĐỐI KHÔNG đặt \begin{cases}/\begin{aligned}/\begin{array} trong $...$ inline.
- Số thập phân kiểu Việt: $5{,}25$ (không viết 5.25).
- KHÔNG viết chữ Việt CÓ DẤU ở math mode trần (chỉ số dưới, tử/mẫu…).
- Không lời chào, không nói về bản thân.
```

> **Luật cuối bổ sung sau khi chạy thật:** KaTeX tách chữ có dấu ở math mode thành chữ cái + dấu rời — `$S_{đáy}$` hiện ra **"Sđaˊy"**. Trong `\text{...}` thì vẫn đúng (chỉ cảnh báo console), nên bộ dò chỉ bắt trường hợp math mode trần.
> Prompt đầy đủ nằm trong `scripts/gemini-solve.mjs` (hằng `FORMAT_RULES`) — sửa ở đó, không sửa ở đây.

### Tiêu chí DUYỆT của Claude (bước 3 — quan trọng nhất)

Một bài chỉ được đăng khi qua **cả 3** cửa:

1. **Đáp án đúng** — Claude tự kiểm chứng bằng `node -e`: thế nghiệm vào phương trình, brute-force bài tối ưu, đối chiếu định lý. *Không tin lời giải chỉ vì trông hợp lý.*
2. **Hiển thị sạch** — `node scripts/verify-site-content.mjs` báo 0 lỗi KaTeX, 0 `$` lẻ, 0 CJK.
3. **Đủ và trung thực** — đủ số bài so với đề gốc; bài cần hình mà đề không mô tả đủ thì **ghi rõ là bỏ**, không đoán bừa.

Không đạt → Claude tự giải lại bài đó theo V3 (đã chứng minh hiệu quả: 6 bài regenerate đều sạch 0 lỗi).

### Năng lực dự kiến

| Chỉ số | V3 (Claude làm hết) | **V4 (Claude + Gemini)** |
|---|---|---|
| Bài/phiên làm việc | ~2–3 | **~6–10** (Claude không phải viết lời giải) |
| Nút thắt | Sức giải của Claude | Quota Gemini free + sức **duyệt** của Claude |
| Rủi ro | Thấp | Trung bình — **phụ thuộc bước duyệt làm nghiêm** |

> ⚠️ **Rủi ro cần nói thẳng:** với bài khó (hình học cần hình, bài toán thực tế nhiều bước), việc *thẩm định* một lời giải sai đôi khi tốn công ngang *tự giải*. Nếu tỉ lệ Gemini sai vượt ~30%, V4 sẽ **chậm hơn** V3 → khi đó quay lại V3 cho phần đó. Sẽ đo tỉ lệ đạt trong 20 bài đầu rồi quyết.

### Việc triển khai V4

1. ✅ Kiểm chứng khoá + model + chất lượng toán + định dạng (05/08)
2. ✅ Viết `scripts/gemini-solve.mjs` — đọc file đề trong `content-templates/de-*/`, gọi Gemini với `FORMAT_RULES`, ghi ra `content-templates/gemini-out/`; retry khi 429, xoay 2 model; **tự bỏ qua bài đã có trên web** (trừ `--redo`).
3. ✅ Bổ sung cửa kiểm tự động: `fix-math-blocks.mjs --dir=` và `verify-site-content.mjs --dir=` (thêm phép dò chữ Việt trong công thức).
4. ☐ Chạy thử tiếp cho đủ **20 bài** rồi chốt tỉ lệ đạt (đã có 2/2 — xem dưới).
5. ☐ Xử lý 19 bài Toán 10 còn lỗi (5 lỗi KaTeX, 13 `$` lẻ, 5 chữ Việt trong công thức).

### Kết quả chạy thử thật (05/08/2026 — 2 bài Toán 9 KNTT tập 2)

| Cửa | Kết quả |
|---|---|
| **1. Đáp án đúng** | **2/2 đúng 100%.** Kiểm tay toàn bộ: $S_{xq}$/$V$ hình trụ–nón–cầu, $r=\sqrt5$ từ $V=50\pi$, $h=15$ từ $\sqrt{17^2-8^2}$, $V=\frac{5324}{3}\pi\approx5\,575{,}28$, $a=3$ từ $6a^2=54$, $V'=4V$ khi cạnh đáy gấp đôi. **Không phát hiện lỗi toán nào.** |
| **2. Hiển thị sạch** | 1/2 bài đầu ra dính 88 `$` lẻ (đúng lỗi `$$` thiếu dòng trống). Sau `fix-math-blocks.mjs`: **2/2 sạch** (643 + 233 công thức, 0 lỗi). → **Lỗi này tự sửa được bằng script, không cần Claude can thiệp.** |
| **3. Đủ & trung thực** | Số hiệu bài **khớp 100%** với đề. 3 bài cần hình được **ghi rõ là bỏ, không đoán số liệu** — đúng yêu cầu. |

**Phát hiện quan trọng:** bài 10.6 Gemini giải được *vì đề tôi chép có kèm dòng mô tả hình* (`[Hình: hình chữ nhật ABCD có AB=3, BC=4, quay quanh AD]`); bài 6.5 phải bỏ vì bản chép **thiếu** mô tả hình.
→ **Chất lượng V4 bị chặn bởi bước CHÉP ĐỀ của Claude, không phải bởi Gemini.** Từ nay khi chép đề **bắt buộc mô tả dữ kiện trong hình** (toạ độ, độ dài, góc) thành một dòng `[Hình: ...]`. Đây là việc tăng giá trị cao nhất trong toàn pipeline.

**Tạm kết:** tỉ lệ đạt 2/2, lỗi định dạng duy nhất đã tự động hoá được → V4 đang thắng V3 rõ rệt. Vẫn giữ mốc quyết định ở 20 bài.

## 1.3. Thứ tự ưu tiên nội dung (theo giá trị SEO)

Căn cứ: mùa thi (thi vào 10 tháng 6, thi THPT tháng 6–7, kiểm tra giữa kỳ tháng 10–11 & 3–4), volume tìm kiếm, và độ cạnh tranh.

| Priority | Nội dung | Lý do | Search volume ước tính |
|---|---|---|---|
| **P0a** | Văn 12 (hoàn tất CTST + CD) | Thi THPT, volume cao nhất | 100k–300k/tháng |
| **P0b** | Văn 9 + Toán 9 | Thi vào 10 — cạnh tranh thấp hơn lớp 12 | 80k–250k/tháng |
| **P0c** | Toán 12 | Thi THPT | 80k–200k/tháng |
| **P1a** | Văn 11 + Toán 11 | Nối tiếp lớp 12, học sinh chuẩn bị | 50k–120k/tháng |
| **P1b** | Văn 10 | Toán 10 đã có, hoàn thiện bộ lớp 10 | 30k–80k/tháng |
| **P2** | Văn + Toán 8 | Volume ổn, cạnh tranh thấp | 40k–90k/tháng |
| **P3** | Văn + Toán 7, 6 | Phủ toàn THCS | 30k–80k/tháng |
| **P4** | Đề thi + đề kiểm tra | Mùa vụ nhưng volume bùng nổ | 100k+/tháng mùa thi |
| **P5** | Lớp 1–5, môn phụ | Làm sau khi có doanh thu | <20k/tháng |

## 1.4. LỊCH CHẠY PIPELINE THEO NGÀY (14 ngày đầu, giả định 10 keys từ Ngày 3)

> Quy ước: mỗi ngày chạy lần lượt các PDF, để máy chạy nền. Lệnh đầy đủ ở **Phụ lục A**. Sau mỗi batch, Claude tự import lên production.

| Ngày | PDF chạy | Số trang ước tính | Ghi chú |
|---|---|---|---|
| **N1** | Văn 12 CTST T1 (trang 71–177) + Văn 12 CTST T2 | ~280 | Chạy với 3 keys hiện có |
| **N2** | Văn 12 CD T1 + CD T2 | ~350 | Tạo 7 account Groq trong lúc chờ |
| **N3** | Văn 9 KNTT T1+T2 + Văn 9 CTST T1 | ~450 | Từ nay 10 keys — tăng tốc |
| **N4** | Văn 9 CTST T2 + Văn 9 CD T1+T2 | ~450 | **Văn 9 XONG** |
| **N5** | Toán 9 KNTT T1+T2 + CTST T1+T2 | ~450 | |
| **N6** | Toán 9 CD T1+T2 + Toán 12 KNTT T1 | ~350 | **Toán 9 XONG** |
| **N7** | Toán 12 KNTT T2 + CD T1+T2 | ~350 | Nghỉ CN — review KPI tuần 1 |
| **N8** | Toán 12 CTST T2 (T1 chưa có PDF) + Văn 11 KNTT T1+T2 | ~400 | **Toán 12 gần xong** |
| **N9** | Văn 11 CTST T1+T2 + CD T1 | ~450 | |
| **N10** | Văn 11 CD T2 + Toán 11 KNTT T1+T2 | ~400 | **Văn 11 XONG** |
| **N11** | Toán 11 CTST T1+T2 + CD T1 | ~400 | |
| **N12** | Toán 11 CD T2 + Văn 10 KNTT T1+T2 | ~400 | **Toán 11 XONG** |
| **N13** | Văn 10 CTST T1+T2 + CD T1+T2 | ~500 | **Văn 10 XONG — phủ kín 9–12** |
| **N14** | Buffer: chạy bù các trang lỗi 429, kiểm tra chất lượng | — | Review KPI tuần 2 |

**Sau N14:** tiếp tục lớp 8 → 7 → 6 theo cùng pattern (mỗi lớp ~4 ngày với 10 keys).

## 1.5. Quy trình vận hành hằng ngày (Pipeline V4)

```
Trong phiên Claude — chỉ cần nói 1 trong 3 câu:

1. "chép đề tiếp"  → npx tsx scripts/pdf-render-pages.ts --pdf=... --out=... --pages=A-B
                      node scripts/page-grid.mjs --img=<page.png>     (phủ lưới toạ độ)
                      → Claude đọc bản CÓ LƯỚI: vừa chép đề vừa lấy toạ độ hình
                      node scripts/crop-figure.mjs --img=... --box=x1,y1,x2,y2 --out=hinh/...
                      → ghi đề + dòng ![...](/hinh/...) + dữ kiện đọc từ hình
                        vào content-templates/de-*/  (không giải)

2. "giải đề"       → node scripts/gemini-solve.mjs --dir=content-templates/de-<bộ>
                      → node scripts/fix-math-blocks.mjs --dir=content-templates/gemini-out
                      → node scripts/verify-site-content.mjs --dir=content-templates/gemini-out --list
                      → Claude DUYỆT: kiểm chứng đáp án (tính tay/`node -e`),
                        đối chiếu số hiệu bài với đề
                      → Đạt: chuyển sang web/content/bai-giai/ | Không đạt: Claude giải lại (V3)

3. "đăng bài đi"   → consolidate → fix-math-blocks → verify → build → push
                      → Vercel tự deploy (không còn import Strapi)

Tối (15 phút — việc chỉ người làm được):
4. Spot-check 2–3 bài mới trên web thật: mở URL, xem công thức hiển thị đúng
5. GSC: request indexing 10 URL mới (ưu tiên lớp 12, lớp 9)
6. Share 1–2 bài hay lên Facebook Group/Zalo (từ tuần 3)
```

## 1.6. Tiêu chí chất lượng nội dung (Definition of Done)

Một bài được coi là ĐẠT khi:

- [ ] Sinh từ PDF SGK thật (vision) — KHÔNG sinh từ trí nhớ model
- [ ] Slug đúng format: `giai-toan-{lop}-tap-{n}-trang-{x}-{bo}` hoặc `soan-van-{lop}-tap-{n}-trang-{x}-{bo}`
- [ ] Frontmatter đủ: tieu_de, slug, lop, loai, mon, bo_sach, meta_title ≤60 ký tự, meta_description ≤155 ký tự
- [ ] Toán: công thức LaTeX render đúng (spot-check trên web)
- [ ] Văn: câu hỏi chép từ SGK, không có chuỗi "Câu hỏi không rõ" chiếm >50% bài
- [ ] Không lộ artifacts của model ("SKIP", "Tôi không thể", tiếng Anh lạc lõng)

**Xử lý nợ chất lượng (~100 bài Văn 11/12 cũ sinh từ list):**

| Phương án | Khi nào |
|---|---|
| Giữ nguyên (đang chọn) — các bài này vẫn có traffic value, cấu trúc tốt | Hiện tại |
| Khi bài từ PDF phủ cùng tác phẩm → bài PDF là chính, bài cũ giữ làm bài "văn mẫu" bổ trợ | Tuần 2–4 |
| Tháng 3+: rewrite top 20 bài traffic cao nhất bằng Claude API (~$5) | Khi có doanh thu |

**Quy trình spot-check hàng ngày:** mở ngẫu nhiên 3 bài mới trên web → nếu ≥2 bài lỗi format/nội dung rác → dừng pipeline, báo Claude điều chỉnh prompt trước khi chạy tiếp.

## 1.7. Nội dung bổ trợ ngoài SGK (tuần 9+, P4)

Đây là nhóm content volume bùng nổ theo mùa — chuẩn bị TRƯỚC mùa thi:

| Content | Nguồn | Cách làm | Deadline |
|---|---|---|---|
| Đề thi tuyển sinh 10 các tỉnh 2020–2025 + đáp án | Sưu tầm công khai | Gõ lại/scan + giải bằng pipeline | Trước tháng 3 |
| Đề thi THPT các năm + đáp án chi tiết | Bộ GD công bố | Như trên | Trước tháng 4 |
| Đề kiểm tra giữa kỳ/cuối kỳ mẫu | Tự soạn bằng AI từ ma trận đề | Prompt Groq theo cấu trúc chuẩn | Tháng 10 & 3 |
| Tóm tắt công thức Toán theo chương | Tự tổng hợp từ bài đã có | Claude/Groq tổng hợp | Tuần 10 |
| Sơ đồ tư duy tác phẩm Văn | Tự tạo (text-based) | Đã có trong prompt tom-tat | Có sẵn |

---

# PHẦN II — KẾ HOẠCH DOANH THU 3 THÁNG

## 2.0. Nguyên tắc & con số thẳng thắn

**Công thức doanh thu:**
```
Doanh thu = Traffic × RPM (AdSense) + Clicks × CR × Commission (Affiliate) + Direct sales
```

**Tham số thực tế thị trường VN:**
- AdSense RPM giáo dục VN: $0.5–2/1.000 pageviews (thấp vì audience học sinh, không phải người mua sắm)
- Affiliate khóa học: commission 100k–500k/đơn, CR ~0.5–2% trên clicks
- 1 user học sinh trung bình xem 2–3 trang/session

**Suy ra để đạt 10 triệu/tháng cần:**
- ~300k–500k pageviews (nếu chỉ AdSense) — khó trong 3 tháng
- HOẶC ~100k pageviews + 20–30 đơn affiliate — khả thi hơn
- → **Chiến lược: đa kênh ngay từ đầu, không chỉ trông vào AdSense**

## 2.1. THÁNG 1 — FOUNDATION (Doanh thu: 0đ, đây là bình thường)

### Tuần 1 (N1–N7): Content sprint #1
- [ ] Tạo 7 Groq accounts (Ngày 1–2) → 10 keys
- [ ] Chạy lịch N1–N7: Văn 12 xong, Văn 9 xong, Toán 9 xong
- [ ] Tải bổ sung PDF Toán 12 CTST Tập 1
- [ ] **KPI: production đạt ~800 bài**

### Tuần 2 (N8–N14): Content sprint #2
- [ ] Chạy lịch N8–N14: Toán 12, Văn 11, Toán 11, Văn 10 xong
- [ ] GSC: mỗi ngày request indexing 10 URL (70 URL/tuần)
- [ ] **KPI: production đạt ~1.300 bài — VƯỢT chuẩn AdSense**

### Tuần 3: SEO kỹ thuật (làm theo Phụ lục B)
- [ ] Internal linking: Claude sửa component bài giải để hiện 5 bài liên quan cùng chương + 3 bài cùng dạng
- [ ] Sửa trang chủ: HOT_LINKS trỏ vào bài thực tế (hiện có link 404 `tuyen-kieu`)
- [ ] Breadcrumb + pagination cho trang danh sách
- [ ] Lighthouse audit: Performance ≥90, SEO =100 (chạy trong Chrome DevTools)
- [ ] Tạo trang `/gioi-thieu` chỉn chu + `/lien-he` có form email (điều kiện AdSense)
- [ ] Kiểm tra các trang legal: chính sách bảo mật, cookie, điều khoản, DMCA (đã có — review lại nội dung)

### Tuần 4: Khởi động marketing (0đ)
- [ ] Tạo Fanpage Facebook "Giải Bài Tập 247" + cover/avatar từ Canva free
- [ ] Tạo Facebook Group "Hỏi đáp bài tập Toán - Văn 6-12" (group HÚT member hơn page)
- [ ] Đăng 1 post/ngày: 1 bài giải hay + ảnh chụp đề + link
- [ ] Tham gia 10 group học sinh/phụ huynh lớn (Học sinh 2K9, 2K10, Ôn thi vào 10...) — trả lời câu hỏi thật + kèm link khi phù hợp (KHÔNG spam, 2–3 link/tuần/group)
- [ ] Tạo tài khoản TikTok — để dành tên, chưa cần content
- [ ] **KPI: 30–50 backlinks/social mentions, 500–1.000 visits**

**✅ Điều kiện chuyển tháng 2:** ≥1.200 bài, ≥100 trang indexed, có traffic tự nhiên đầu tiên từ Google (xem GSC Performance).

## 2.2. THÁNG 2 — MONETIZATION (Doanh thu kỳ vọng: 500k–3 triệu)

### Tuần 5: Apply Google AdSense — hướng dẫn từng bước

**Điều kiện cần đạt trước khi apply (checklist):**
- [ ] ≥1.000 bài nội dung unique (✅ sẽ có ~1.300)
- [ ] Domain hoạt động >30 ngày (✅ mua 29/6 → apply sau 30/7)
- [ ] Các trang bắt buộc: Giới thiệu, Liên hệ, Chính sách bảo mật (✅ có sẵn)
- [ ] Không có nội dung vi phạm bản quyền lộ liễu
  - ⚠️ **Rủi ro:** bài giải SGK có chép đề bài từ sách. Mitigate: đề bài là "trích dẫn cho mục đích giáo dục", lời giải là nội dung tự tạo. Thêm footer disclaimer về fair-use giáo dục.
- [ ] Traffic tự nhiên (không mua) — dù ít cũng được

**Các bước apply:**
1. Vào https://adsense.google.com → Get started, dùng Gmail chính
2. Site: `giaibaitap247.com` · Country: Vietnam · Payment: cá nhân
3. AdSense cấp đoạn code `<script>` → gửi Claude nhét vào layout Next.js (env `NEXT_PUBLIC_ADSENSE_ID` đã có sẵn slot)
4. Bấm "Request review" → chờ 2–4 tuần
5. Nếu bị từ chối: đọc lý do → fix → resubmit sau 2 tuần (thường bị "low value content" → cần thêm bài unique + traffic)

### Tuần 5–6 (song song): Đăng ký Affiliate

**Ưu tiên 1 — ACCESSTRADE (mạng affiliate lớn nhất VN):**
1. Đăng ký publisher: https://pub.accesstrade.vn (cần CCCD + tài khoản ngân hàng)
2. Duyệt 3–7 ngày
3. Campaigns nên apply: **Shopee** (5–10% sách/dụng cụ học tập), **Tiki** (5–8%), **Fahasa**, các khóa học online có trên sàn
4. Lấy deeplink → chèn vào bài

**Ưu tiên 2 — Liên hệ trực tiếp nền tảng khóa học:**
| Nền tảng | Cách liên hệ | Commission ước tính |
|---|---|---|
| VuiHoc.vn | email partner/hotline, nói có site X visits/tháng | 20–40%/đơn (200k–500k) |
| HocMai.vn | Tương tự | 15–30% |
| Marathon Education | Tương tự | Thỏa thuận |

> Mẹo: đợi có 10k+ visits/tháng hãy liên hệ trực tiếp — tỷ lệ được duyệt cao hơn. Trước đó dùng ACCESSTRADE.

**Vị trí đặt affiliate (Claude sẽ code):**
- Cuối mỗi bài giải: box "📚 Sách tham khảo [môn] lớp [X]" → link Shopee/Tiki
- Sidebar: banner khóa học đúng lớp của bài đang đọc
- Bài Văn 9/12 (ôn thi): text-link "Khóa luyện thi cấp tốc" ở giữa bài

### Tuần 7–8: Đo & tối ưu
- [ ] GA4: xem event `outbound_click` → trang nào click affiliate nhiều → nhân rộng format
- [ ] GSC Performance: query nào có impressions cao nhưng CTR thấp → sửa meta_title hấp dẫn hơn
- [ ] Bài nào rank trang 2 Google (vị trí 11–20) → bổ sung nội dung (thêm FAQ, dàn ý) để đẩy lên trang 1
- [ ] Tiếp tục pipeline lớp 8 (N15+)

**✅ KPI cuối tháng 2:** 1.800 bài · 500–800 indexed · 5k–15k visits/tháng · AdSense đã submit (có thể đã duyệt) · ≥2 affiliate campaigns live · Doanh thu đầu tiên: 500k–3tr

## 2.3. THÁNG 3 — SCALE (Doanh thu kỳ vọng: 3–20 triệu)

### Tuần 9: Content mùa thi (P4 — cực quan trọng)
- [ ] 20 đề thi vào 10 các tỉnh (Toán + Văn) + giải chi tiết
- [ ] 10 đề thi thử THPT Toán + đáp án
- [ ] Trang tổng hợp: `/de-thi-vao-10-2026`, `/de-thi-thpt-2026` — đây là các trang "money page" mùa thi
- [ ] Request indexing ngay khi đăng

### Tuần 10: Kênh phân phối mới
- [ ] TikTok: 3 video/tuần dạng "Giải nhanh bài khó trong 60s" (quay màn hình + voice, dùng CapCut free)
- [ ] YouTube Shorts: repost từ TikTok
- [ ] Mỗi video mô tả có link bài giải đầy đủ trên web
- [ ] Zalo OA (Official Account) free tier: đăng bài giải mới hàng ngày

### Tuần 11: Sản phẩm bán trực tiếp (test)
- [ ] Đóng gói: "Bộ 50 đề thi vào 10 có đáp án chi tiết" (PDF từ content đã có) — giá 49k–99k
- [ ] Thanh toán: Momo/ZaloPay cá nhân + form Google Sheets (thủ công giai đoạn test)
- [ ] Landing: `/tai-lieu/bo-de-thi-vao-10` với preview 3 đề free
- [ ] Đăng bán trong Facebook Group của mình + các group phụ huynh

### Tuần 12: Review & kế hoạch quý 2
- [ ] Tổng kết KPI 3 tháng (Phụ lục C)
- [ ] Nếu doanh thu ≥5tr/tháng → cân nhắc Kịch bản B: đầu tư lại 30–50% doanh thu vào Facebook Ads cho trang đề thi + Claude API rewrite bài top traffic
- [ ] Lên kế hoạch quý 2: app mobile (PWA), premium membership, mở rộng môn Anh/Lý/Hóa

**✅ KPI cuối tháng 3:** 2.500+ bài · 1.500+ indexed · 30k–80k visits/tháng
**💰 Doanh thu mục tiêu: 3–20 triệu/tháng**, cơ cấu:
| Nguồn | Dự kiến |
|---|---|
| AdSense (nếu đã duyệt) | 1–5 triệu |
| Affiliate (ACCESSTRADE + khóa học) | 2–10 triệu |
| Bán PDF đề thi | 0.5–3 triệu |
| Zalo/TikTok referral | gián tiếp qua traffic |

## 2.4. Dự báo 12 tháng (Kịch bản A thuần)

| Mốc | Bài | Indexed | Traffic/tháng | Doanh thu/tháng |
|---|---|---|---|---|
| Tháng 3 | 2.500 | 1.500 | 30k–80k | 3–20tr |
| Tháng 6 (mùa thi!) | 4.000 | 3.000 | 150k–400k | 15–40tr |
| Tháng 9 (khai giảng) | 5.000 | 4.000 | 300k–600k | 25–50tr |
| Tháng 12 | 6.000+ | 5.000+ | 500k–1M | 40–70tr |

> **100 triệu/tháng:** cần thêm 1 trong các đòn bẩy: (1) Facebook/Google Ads có lãi khi RPM ổn định, (2) sản phẩm premium (khóa học riêng, membership), (3) đội ngũ CTV content mở rộng gấp 3 tốc độ. Quyết định ở review tháng 6.

---

# PHẦN III — QUẢN TRỊ RỦI RO

| # | Rủi ro | Xác suất | Tác động | Phòng ngừa / Xử lý |
|---|---|---|---|---|
| 1 | Groq đổi chính sách free tier / ban multi-account | Trung bình | Cao — pipeline dừng | Backup: Gemini free tier (retry), OpenRouter free models, hoặc nạp $10 Groq Dev Tier khi có doanh thu |
| 2 | AdSense từ chối vì "scraped content" | Trung bình | Trung bình | Lời giải là nội dung gốc; thêm phần phân tích/FAQ unique mỗi bài; nếu fail 2 lần → dùng Ezoic/Media.net thay thế |
| 3 | Google core update đánh tụt AI content | Trung bình | Cao | Chất lượng > số lượng từ tháng 3; thêm E-E-A-T: trang giới thiệu tác giả, nguồn tham khảo; giữ tỷ lệ bài được người xem >2 phút |
| 4 | Khiếu nại bản quyền NXB (đề bài chép từ SGK) | Thấp | Cao | Có trang DMCA + quy trình gỡ trong 48h; đề bài là trích dẫn giáo dục, lời giải là sáng tạo; nếu bị yêu cầu → chỉ giữ lời giải, tóm tắt đề |
| 5 | ~~Railway tăng giá / hết trial~~ | — | — | ✅ **ĐÃ XOÁ RỦI RO** (01/08): bỏ Strapi, nội dung nằm trong repo, không còn backend trả phí. Rủi ro này đã xảy ra thật và là lý do chuyển kiến trúc. |
| 6 | ~~Token Strapi lộ~~ | — | — | ✅ Không còn token Strapi. Khoá cần giữ kín hiện chỉ còn `GEMINI_API_KEY` trong `.env.local` (đã gitignore) — KHÔNG chụp màn hình có khoá. |
| 6b | **Gemini free tier siết quota / bỏ model** | Cao | Trung bình | Đã xảy ra với Groq (gỡ sạch model vision). Giảm nhẹ: V4 luôn có đường lui về **V3 (Claude tự giải)** — không phụ thuộc sống còn vào Gemini. |
| 7 | Đối thủ (VietJack...) quá mạnh, không lên nổi trang 1 | Cao | Cao | Không đánh keyword chính diện; tập trung long-tail "trang X tập Y bộ Z"; lợi thế: cấu trúc URL theo trang sách — đúng cách học sinh tra cứu |
| 8 | Máy local tắt giữa pipeline | Cao | Thấp | Script idempotent — chạy lại là tiếp tục; không mất dữ liệu |

---

# PHỤ LỤC A — LỆNH PIPELINE CHO TỪNG PDF

> Chạy trong PowerShell tại `e:\giaibaitap`. Sau khi xong batch, nói Claude "import đi" — Claude tự đẩy lên production.

## A.1. Văn 12 (P0a — chạy ngay)

```powershell
# N1a: Văn 12 CTST T1 phần còn lại
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Chân trời sáng tạo/SGK Văn 12 tập 1.pdf" --lop=12 --mon=van --bo_sach=chan-troi-sang-tao --tap=1 --pages=71-177 --out=content-templates/inbox

# N1b: Văn 12 CTST T2
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Chân trời sáng tạo/SGK Văn 12 tập 2.pdf" --lop=12 --mon=van --bo_sach=chan-troi-sang-tao --tap=2 --out=content-templates/inbox

# N2a: Văn 12 CD T1
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Cánh diều/SGK Văn 12 tập 1.pdf" --lop=12 --mon=van --bo_sach=canh-dieu --tap=1 --out=content-templates/inbox

# N2b: Văn 12 CD T2
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Cánh diều/SGK Văn 12 tập 2.pdf" --lop=12 --mon=van --bo_sach=canh-dieu --tap=2 --out=content-templates/inbox
```

## A.2. Văn 9 (P0b)

```powershell
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Kết nối tri thức/SGK Văn 9 tập 1.pdf" --lop=9 --mon=van --bo_sach=ket-noi-tri-thuc --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Kết nối tri thức/SGK Văn 9 tập 2.pdf" --lop=9 --mon=van --bo_sach=ket-noi-tri-thuc --tap=2 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Chân trời sáng tạo/SGK Văn 9 tập 1.pdf" --lop=9 --mon=van --bo_sach=chan-troi-sang-tao --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Chân trời sáng tạo/SGK Văn 9 tập 2.pdf" --lop=9 --mon=van --bo_sach=chan-troi-sang-tao --tap=2 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Cánh diều/SGK Văn 9 tập 1.pdf" --lop=9 --mon=van --bo_sach=canh-dieu --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Cánh diều/SGK Văn 9 tập 2.pdf" --lop=9 --mon=van --bo_sach=canh-dieu --tap=2 --out=content-templates/inbox
```

## A.3. Toán 9 (P0b)

```powershell
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Kết nối tri thức/SGK Toán 9 tập 1.pdf" --lop=9 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Kết nối tri thức/SGK Toán 9 tập 2.pdf" --lop=9 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=2 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Chân trời sáng tạo/SGK Toán 9 tập 1.pdf" --lop=9 --mon=toan --bo_sach=chan-troi-sang-tao --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Chân trời sáng tạo/SGK Toán 9 tập 2.pdf" --lop=9 --mon=toan --bo_sach=chan-troi-sang-tao --tap=2 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Cánh diều/SGK Toán 9 tập 1.pdf" --lop=9 --mon=toan --bo_sach=canh-dieu --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-9/Bộ sách Cánh diều/SGK Toán 9 tập 2.pdf" --lop=9 --mon=toan --bo_sach=canh-dieu --tap=2 --out=content-templates/inbox
```

## A.4. Toán 12 (P0c)

```powershell
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Kết nối tri thức/SGK Toán 12 tập 1.pdf" --lop=12 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Kết nối tri thức/SGK Toán 12 tập 2.pdf" --lop=12 --mon=toan --bo_sach=ket-noi-tri-thuc --tap=2 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Chân trời sáng tạo/SGK Toán 12 tập 2.pdf" --lop=12 --mon=toan --bo_sach=chan-troi-sang-tao --tap=2 --out=content-templates/inbox
# ⚠️ CTST Tập 1 chưa có PDF — tải bổ sung rồi chạy
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Cánh diều/SGK Toán 12 tập 1.pdf" --lop=12 --mon=toan --bo_sach=canh-dieu --tap=1 --out=content-templates/inbox
npx tsx scripts/pdf-vision-solver-groq.ts "--pdf=pdfs/lop-12/Bộ sách Cánh diều/SGK Toán 12 tập 2.pdf" --lop=12 --mon=toan --bo_sach=canh-dieu --tap=2 --out=content-templates/inbox
```

## A.5. Văn 11, Toán 11, Văn 10, lớp 8/7/6 (P1–P3)

Pattern giống hệt — thay `lop-XX`, `--lop=XX`, tên bộ sách, `--tap=N`. Claude sẽ tự sinh lệnh khi đến ngày chạy — chỉ cần nói **"chạy tiếp theo kế hoạch"**.

## A.6. Đăng bài lên website (KHÔNG còn Strapi)

Nội dung là file markdown trong repo; đăng bài = gom file + build + push, Vercel tự deploy.

```bash
# 1) Gom bài mới về nguồn dữ liệu của web (mặc định KHÔNG ghi đè bài đã có)
node scripts/consolidate-content.mjs

# 2) Chuẩn hoá khối công thức (thêm dòng trống quanh $$)
node scripts/fix-math-blocks.mjs

# 3) Soát lỗi hiển thị: phải ra 0 lỗi KaTeX, 0 "$" lẻ, 0 CJK
node scripts/verify-site-content.mjs --list

# 4) Kiểm chứng build rồi đăng
cd web && pnpm build && cd ..
git add web/content && git commit -m "content: <mô tả>" && git push
```

Hoặc đơn giản: nói Claude **"đăng bài đi"**.

> ⚠️ `consolidate-content.mjs` mặc định **bỏ qua bài đã tồn tại** trong `web/content/bai-giai/` để không xoá mất các bản đã sửa tay. Chỉ dùng `--force` khi thật sự muốn ghi đè từ `content-templates/`.

---

# PHỤ LỤC B — CHECKLIST SEO KỸ THUẬT

## B.1. Đã hoàn thành ✅
- [x] Sitemap.xml động (tự thêm bài mới, revalidate 1h)
- [x] Robots.txt
- [x] Schema.org: Article + LearningResource JSON-LD
- [x] Breadcrumb schema
- [x] Meta title/description mọi bài
- [x] Canonical URL + redirect www→non-www (308)
- [x] GSC verified + sitemap submitted
- [x] GA4 + 5 custom events

## B.2. Cần làm tuần 3 (giao cho Claude)
- [ ] **Internal linking:** bài giải hiện 5 bài cùng chương + 3 bài cùng lớp khác môn (tăng pageviews/session từ ~1.5 lên 2.5+)
- [ ] **Fix trang chủ:** HOT_LINKS trỏ bài thật (hiện `tuyen-kieu` 404); thêm section "Mới cập nhật" động từ API
- [ ] **Trang danh mục lớp/môn:** thêm đoạn mô tả 150–300 chữ unique mỗi trang (Google cần text, không chỉ list link)
- [ ] **Ảnh OG:** tạo og-default.png + template ảnh OG động theo tên bài (Vercel OG image API — free)
- [ ] **Favicon bộ đầy đủ:** 16/32/180/192/512px (hiện chỉ có favicon.ico)
- [ ] **Lighthouse:** chạy audit, fix những gì <90 (thường: font loading, image size)
- [ ] **FAQ schema:** thêm FAQPage JSON-LD cho bài có mục "Câu hỏi thường gặp"

## B.3. Theo dõi hàng tuần trong GSC
| Chỉ số | Ở đâu | Hành động nếu xấu |
|---|---|---|
| Trang indexed | Indexing → Pages | <50%/tháng → request indexing thủ công nhiều hơn |
| Impressions | Performance | Đi ngang 2 tuần → content mới chưa được crawl, check sitemap |
| CTR theo query | Performance → Queries | CTR <1% ở query có impression cao → sửa title hấp dẫn hơn |
| Core Web Vitals | Experience | "Poor" → báo Claude fix performance |

---

# PHỤ LỤC C — BẢNG KPI THEO DÕI HÀNG TUẦN

> Điền mỗi Chủ nhật. Nguồn số liệu: **số bài** = `ls web/content/bai-giai/*.md | wc -l` (hoặc hỏi Claude), GSC (indexed/impressions/clicks), GA4 (users), ví tiền (doanh thu).

| Tuần | Ngày | Tổng bài | Indexed | Impressions | Clicks | Users GA4 | Doanh thu | Ghi chú |
|---|---|---|---|---|---|---|---|---|
| 0 | 05/07 | 432 | 2 | ~0 | ~0 | — | 0 | Mốc khởi đầu |
| 1 | 12/07 | | | | | | | |
| 2 | 19/07 | | | | | | | |
| 3 | 26/07 | | | | | | | |
| 4 | 02/08 | | | | | | | Apply AdSense |
| 5 | 09/08 | | | | | | | |
| 6 | 16/08 | | | | | | | Affiliate live |
| 7 | 23/08 | | | | | | | |
| 8 | 30/08 | | | | | | | |
| 9 | 06/09 | | | | | | | Content mùa thi |
| 10 | 13/09 | | | | | | | TikTok start |
| 11 | 20/09 | | | | | | | Bán PDF test |
| 12 | 27/09 | | | | | | | **Review 3 tháng** |

**Ngưỡng cảnh báo (nếu chạm → dừng lại phân tích trước khi làm tiếp):**
- Tuần 4: indexed <50 trang → vấn đề crawl, ưu tiên fix SEO thay vì thêm content
- Tuần 8: traffic <3k/tháng → content chưa match search intent, cần keyword research lại
- Tuần 12: doanh thu = 0 → review toàn bộ phễu ở mục 2.0

---

## 📌 TÓM TẮT — 3 VIỆC QUAN TRỌNG NHẤT TUẦN NÀY

1. **Tạo 7 Groq accounts** → 10 keys → tốc độ content ×3 (30 phút, 0đ)
2. **Chạy lịch N1–N7** (Phụ lục A.1–A.3) — Văn 12 hoàn tất + Văn/Toán 9 (mỗi sáng 5 phút bấm lệnh)
3. **GSC request indexing 10 URL/ngày** — tích lũy dần, đây là oxy của SEO

*Kế hoạch sống: cập nhật KPI Chủ nhật hàng tuần, điều chỉnh theo số liệu thật, không theo cảm tính.*
