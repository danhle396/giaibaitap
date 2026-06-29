# Hướng Dẫn Sử Dụng Task File — Dự án Web Giải Bài Tập

> File này giải thích cách dùng `task_giaibaitap.md` — biến thể của task template gốc đã được tùy biến cho dự án web giáo dục **giaibaitap.com.vn**.
> Đọc file này trước khi mở task file để hiểu các convention, sau đó mới bắt đầu tick task.

---

## 1. Tại sao cần file task này?

Dự án web Giải Bài Tập là **marathon 24 tháng**, có:
- 4 nguồn doanh thu song song (AdSense + Affiliate + Khóa học + App)
- 50,000+ bài giải cần viết
- Hàng trăm task kỹ thuật + nội dung + SEO + pháp lý
- Solo founder, ngân sách < 100tr, kỹ thuật newbie

Không có file task chi tiết = sau 2 tháng quên mình đang làm gì, mở web ra không biết tick gì, nhảy task lung tung, burn out.

File task này:
- Là **single source of truth** — mọi quyết định, deadline, số liệu đều ở đây
- Cập nhật **hàng tuần** (cuối tuần dành 30 phút review + tick + ghi note)
- Là tài liệu **bàn giao** nếu sau này thuê CTV / partner / bán site

---

## 2. Mapping Phase cho dự án Web (khác với template gốc)

Template gốc dùng cho RTL/ML project (Phase 1 Software → Phase 2 Hardware). Cho dự án web, mapping như sau:

| Phase gốc | Phase trong dự án này | Nội dung |
|-----------|----------------------|----------|
| **Phase 1 — Software/Research/Design** | **Phase 1 — Foundation & Content Engine** | Tháng 1-3: Setup hạ tầng, build website, viết nội dung pilot, apply AdSense |
| **Phase 2 — Hardware/Implementation** | **Phase 2 — Growth & Monetization** | Tháng 4-24: Scale content, SEO offpage, launch khoá học, app, đa dạng hoá doanh thu |

**Lý do split tại tháng 3:**
- Cuối tháng 3 = milestone apply AdSense → là **bridge** rõ ràng giữa 2 phase
- Phase 1 không có doanh thu → tập trung build (tương đương "software golden")
- Phase 2 mới deploy ra production thật + tối ưu (tương đương "hardware tape-out + sign-off")

---

## 3. Cấu trúc file task (đọc kỹ trước khi tick)

### Header — luôn xem đầu tiên mỗi sáng

```
> TRẠNG THÁI (YYYY-MM-DD): Phase 1.X ✅ | Phase 1.Y ⚠️ | Phase 2.Z ❌
> Bước tiếp theo NGAY: `command cụ thể` (~thời gian)
```

→ Cập nhật `YYYY-MM-DD` mỗi lần đổi trạng thái. Header này phải đọc xong là biết hôm nay làm gì.

### Phase 1 — 11 sub-section (1.1 → 1.11)

| Sub | Nội dung | Output chính |
|-----|----------|--------------|
| 1.1 | Environment Setup | Tài khoản, domain, repo Git |
| 1.2 | Chuẩn bị Tài nguyên Nội dung | Danh sách bài cần viết, nguồn SGK, template content |
| 1.3 | Preprocessing Pipeline | CMS schema, content workflow CTV → editor → publish |
| 1.4 | Architecture Design | Codebase Next.js + Strapi cấu trúc folder |
| 1.5 | Development Chính | Build các trang chính, deploy được |
| 1.6 | SEO Onpage & Schema | Schema markup, meta tags, internal link |
| 1.7 | Content Production Pilot | 200-500 bài đầu tiên |
| 1.8 | UX/UI & Conversion | Search, ToC, dark mode, comments |
| 1.9 | Performance Optimization | Core Web Vitals < target |
| 1.10 | AdSense Application Bridge | Privacy, ads.txt, content quality check |
| 1.11 | Pre-launch Verification | Sitemap, robots, GSC, GA4 verify |

### Phase 2 — 8 sub-section (2.1 → 2.8)

| Sub | Nội dung | Output chính |
|-----|----------|--------------|
| 2.1 | Architecture Scale-up | DB optimization, CDN tuning, search engine |
| 2.2 | Implementation modules | Subdomain khoahoc, hỏi đáp, trắc nghiệm, tuyển sinh |
| 2.3 | Functional Verification | E2E test, mobile test, SEO audit |
| 2.4 | SEO Offpage & Backlink | Guest post, social, YouTube |
| 2.5 | Monetization Activation | Affiliate, khóa học, In-app purchase |
| 2.6 | Sign-off Quarterly | KPI review, Search Console clean |
| 2.7 | Ecosystem Integration | App mobile, TikTok, Email marketing |
| 2.8 | Final Submission | Top 5 VN giáo dục, $30k+/tháng |

---

## 4. Convention quan trọng (PHẢI tuân thủ)

### Ký hiệu trạng thái

| Ký hiệu | Ý nghĩa | Khi nào dùng |
|---------|---------|--------------|
| `- [x]` | Đã hoàn thành | Task đã verify ăn |
| `- [ ]` | Chưa làm | Default |
| `⭐⭐⭐` | Must-have ngay | Không có không launch được |
| `⭐⭐` | Nice-to-have | Nên có để cạnh tranh |
| `⭐` | Backup / nếu rảnh | Tháng 6+ mới quan tâm |
| `✅` | Done, đã verify | Có bằng chứng (URL, screenshot, log) |
| `⚠️` | Có vấn đề | Đang stuck, cần debug |
| `❌` | Chưa bắt đầu | Phase sau mới làm |
| `🔥` | URGENT | Đang block công việc khác |

### Số liệu phải đo được

❌ Sai: "Viết nhiều bài lớp 12"
✅ Đúng: "Viết 50 bài giải Toán 12 SGK Kết nối tri thức Chương 1+2 (deadline 15/02)"

❌ Sai: "SEO tốt"
✅ Đúng: "10 bài lớp 12 lên top 10 Google cho từ khóa chính (đo bằng Ahrefs free)"

### Mỗi task phải atomic

❌ Sai: "Setup Strapi"
✅ Đúng:
```
- [ ] Tạo Railway project, deploy Strapi v5
- [ ] Tạo content type "BaiGiai" với 12 fields (lop, mon, bo_sach, ...)
- [ ] Test API: curl GET /api/bai-giais → return JSON
- [ ] Connect Next.js: tạo lib/strapi.ts với fetch wrapper
```

### Pass criterion cho mọi target

Mỗi target có pass criterion = số đo được, không phải cảm tính.

```markdown
- [ ] Apply AdSense (deadline 31/03)
  - **Pass criterion:**
    - Có ≥ 50 bài chất lượng, mỗi bài > 800 chữ
    - Đã có Privacy Policy + Terms + About + Contact
    - Site có ads.txt, sitemap.xml, robots.txt
    - GSC verified, không có manual action
    - Domain age > 60 ngày
```

### Risk callout — không được giấu

Mỗi task có rủi ro phải callout NGAY tại task đó:

```markdown
- [ ] Migrate content từ Strapi sang format mới
  > ⚠️ **Rủi ro mất dữ liệu (cao):** backup DB trước khi chạy migration.
  > Thời gian debug nếu fail: ~1-2 ngày. Mitigation: clone production DB sang staging chạy thử trước.
```

### Trạng thái + Ngày

Mọi callout quan trọng cần kèm `(YYYY-MM-DD)` để biết còn tươi hay cũ:

```markdown
> ✅ AdSense Approved (2026-04-15) — RPM hiện tại $0.6, 12 đơn vị ad đang chạy
> ⚠️ Search traffic giảm 30% (2026-05-08) — đang debug, có thể do core update tháng 5
```

### Command/path cụ thể

Khi nhắc tool/file phải có command có thể copy-paste chạy ngay:

❌ Sai: "Deploy lại Strapi"
✅ Đúng: `cd /home/giaibaitap-cms && railway up --service strapi`

---

## 5. Quy trình review hàng tuần (BẮT BUỘC)

**Mỗi Chủ Nhật, dành 30 phút làm theo thứ tự:**

1. **Mở task file**, scroll xem các task `- [ ]` mà tuần này đã làm
2. **Tick `[x]`** + thêm `✅ (YYYY-MM-DD)` cuối task
3. **Cập nhật header** "TRẠNG THÁI" + "Bước tiếp theo NGAY"
4. **Cập nhật bảng số liệu**: traffic, bài đã viết, doanh thu, RPM
5. **Add task mới** nếu có việc phát sinh tuần này
6. **Move task** đã không còn relevant xuống cuối với tag `~~strikethrough~~`
7. **Commit** vào Git: `git commit -m "Weekly review YYYY-MM-DD"`

**Mỗi cuối tháng:** thêm bảng review tháng cuối phần Metrics:

```markdown
### Review Tháng [N] (YYYY-MM-DD)

| Metric | Target tháng | Actual | Status |
|--------|--------------|--------|--------|
| Bài viết mới | 100 | 87 | ⚠️ |
| Pageview/tháng | 5,000 | 6,200 | ✅ |
| AdSense earning | $50 | $0 (chưa duyệt) | ❌ |

**Bài học tháng này:** ...
**Điều chỉnh tháng sau:** ...
```

---

## 6. Khi nào REWRITE task file?

File task **không phải set-and-forget**. Rewrite khi:

| Sự kiện | Hành động |
|---------|-----------|
| Phase 1 hoàn thành | Tạo `task_giaibaitap_phase2.md` mới chi tiết hơn |
| Đổi stack (vd: Next.js → WordPress) | Rewrite section 1.4, 1.5, 1.9 |
| Mục tiêu thay đổi (vd: thuê được 3 CTV) | Rewrite Timeline + Metrics |
| Sau 6 tháng | Tổng review toàn bộ, archive file cũ |

**Không tick lung tung. Không xóa task. Strikethrough thay vì xóa** (để giữ lịch sử).

---

## 7. Files liên quan (sẽ tạo dần)

```
giaibaitap-project/
├── task_giaibaitap.md              ← FILE CHÍNH, mở mỗi ngày
├── huong_dan_giaibaitap.md         ← File này (đọc 1 lần)
├── content-templates/
│   ├── template-bai-giai-sgk.md    ← Template cho CTV viết bài
│   ├── template-soan-van.md
│   └── template-de-thi.md
├── seo/
│   ├── keyword-research.xlsx       ← 200 từ khóa cốt lõi
│   ├── url-structure.md            ← Quy ước URL
│   └── schema-templates.json
├── design/
│   └── wireframes.fig
└── docs/
    ├── ads-placement-map.md
    ├── adsense-checklist.md
    └── legal/
        ├── privacy-policy.md
        ├── terms.md
        └── dmca.md
```

---

## 8. 3 nguyên tắc vàng khi dùng file task này

### Nguyên tắc 1: "Done" có định nghĩa rõ ràng
Tick `[x]` chỉ khi **có bằng chứng đo được**: URL hoạt động, screenshot, số liệu trên dashboard, file đã commit. Không tick vì "tôi nghĩ xong rồi".

### Nguyên tắc 2: Risk callout không được xóa
Khi rủi ro đã được giải quyết, đổi thành `> ✅ Resolved (YYYY-MM-DD): [cách giải quyết]`. Không xóa. Lịch sử rủi ro = bài học.

### Nguyên tắc 3: 1 task = 1 buổi (max 4 giờ)
Nếu thấy task quá to (cần > 4 giờ làm) → break thành sub-task. Lý do: solo founder không có động lực dài, hoàn thành 1 task nhỏ mỗi buổi tốt hơn 1 task to dở dang 1 tuần.

---

## 9. Checklist trước khi bắt đầu dùng file task

- [ ] Đã đọc xong file hướng dẫn này (file bạn đang đọc)
- [ ] Đã hiểu mapping Phase 1 ↔ Foundation, Phase 2 ↔ Growth
- [ ] Đã hiểu các ký hiệu ⭐ ✅ ⚠️ ❌ 🔥
- [ ] Đã setup Git repo riêng để track task file: `git init && git add task_giaibaitap.md`
- [ ] Đã đặt **lịch định kỳ Chủ Nhật 9-9h30 sáng** review task file
- [ ] Đã in/ghim task header (4 dòng đầu) ở chỗ dễ thấy

Sau khi hoàn thành 6 mục trên → mở `task_giaibaitap.md` và bắt đầu Phase 1.1.

---

## 10. Lưu ý cuối — gửi tới founder

File task này **không phải kế hoạch để khoe**. Nó là công cụ để bạn:
- Không quên việc khi đầu óc rối
- Không bị "lừa" bởi cảm giác "đang làm nhiều việc"
- Có data cụ thể khi đánh giá tiến độ
- Có cơ sở để **dừng lại đúng lúc** nếu dự án không khả thi

Nếu sau 3 tháng tick `[x]` được < 30% Phase 1 → **dừng đánh giá** chứ không phải cố gắng tiếp. Cố gắng mù quáng là kẻ thù của founder solo.

> **"What gets measured gets managed."** — Peter Drucker

Chúc bạn marathon thành công. 🏃
