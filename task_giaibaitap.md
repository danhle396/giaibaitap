# Giải Bài Tập (giaibaitap247.com) – Task List
## Web giáo dục K-12 mô hình VietJack — Next.js 14 + Strapi v5 + Vercel
### Target: Top 5 web giáo dục VN trong 24 tháng, doanh thu $30k+/tháng từ AdSense + Affiliate + Khoá học + App

**Platform:** Next.js 14 App Router + Strapi v5 (Headless CMS) + Cloudflare CDN | **Tool:** Vercel + Railway + PostgreSQL + Redis
**Goal:** Đạt 1M pageview/tháng và $1k+/tháng AdSense trong 12 tháng đầu, scale lên 10M PV/tháng và $30k+/tháng trong 24 tháng

> **TRẠNG THÁI (2026-05-10): Phase 1A ⚠️ Code xong, chờ domain/Vercel | Phase 1B ❌ | Toàn bộ Phase 2 ❌**
> - Domain: chưa đăng ký (đã chọn `giaibaitap247.com` — đổi từ `.com.vn` do `.com` đã có chủ) | Hosting: chưa setup | Code: ✅ repo init tại `d:/giaibaitap/web/`
> - Next.js 16.2.6 + Tailwind v4 init xong, build thành công (48 static pages)
> - Content: 0/5,000 bài (placeholder) | AdSense: chưa apply | Traffic: 0
> - ✅ (2026-05-09) Claude Code đã build toàn bộ Phase 1A code shell: tất cả routes, components, SEO schema, trang pháp lý, sitemap, robots, manifest
> - ✅ (2026-05-10) Đổi domain reference toàn bộ codebase + task file sang `giaibaitap247.com`
> - **Bước tiếp theo NGAY:** Đăng ký `giaibaitap247.com` tại Namecheap/Cloudflare/Porkbun (~5-10 phút, ~$10/năm)

**Đối tượng nội dung phủ sóng:**
- **Type 1** (Bài giải SGK/SBT/VBT): Toán, Văn, Anh, Lý, Hoá, Sinh, Sử, Địa, GDCD, Tin (Lớp 1-12)
- **Type 2** (Soạn văn 3 phiên bản): Hay nhất / Ngắn nhất / Siêu ngắn (Lớp 6-12)
- **Type 3** (Đề thi + Trắc nghiệm): Giữa kỳ, Cuối kỳ, Tốt nghiệp, ĐGNL
- **Type 4** (Lý thuyết + Công thức): Tóm tắt chương + công thức Toán-Lý-Hoá
- **Type 5** (Mở rộng): Lập trình, IELTS, TOEIC, Tuyển sinh ĐH, Bằng lái xe (Năm 2+)

**Pipeline 2 giai đoạn (FE trước, BE sau):**
```
PHASE 1A (FE-only):
[Next.js + Lorem ipsum/placeholder] → [Vercel Edge] → [Cloudflare CDN] → [User]
                                              ↓
                                      [Lighthouse audit]

PHASE 1B (BE wire-in):
[Strapi Admin] → [PostgreSQL] → [Strapi REST API] ─┐
                                                     │→ [Next.js ISR] → [Vercel Edge] → [Cloudflare CDN] → [User]
[Webhook on publish] → [Vercel revalidate] ─────────┘
                                                          ↓
                                          [GA4 + GSC + Microsoft Clarity]
                                                          ↓
                                              [AdSense + Affiliate Tracking]
```

---

## PHASE 1A – FRONT-END FIRST (UI/UX hoàn chỉnh, placeholder data) (Tuần 1-6)

> **Mục tiêu Phase 1A:** Có một website Next.js deploy lên `giaibaitap247.com`, mọi route render được với Lorem ipsum / placeholder, mọi tính năng UI hoạt động (search box, ToC, dark mode, breadcrumb…), Lighthouse mobile ≥ 80, KHÔNG cần Strapi/DB/content thật. Đây là "giao diện user nhìn thấy và thao tác".
>
> **Lý do FE-first:** Newbie + solo → học Next.js trước, BE sau. Khi FE shell đã chắc chắn, wire BE chỉ là thay placeholder bằng `fetch()` API.

### 1A.1 Environment Setup (chỉ phục vụ FE) ❌ Chưa bắt đầu

> **Mục tiêu:** Có domain trỏ DNS qua Cloudflare, repo GitHub, Vercel project — tất cả communicate được — trong 7 ngày. **Chưa cần** Railway, PostgreSQL, Cloudinary, Resend ở giai đoạn này.

#### 1A.1.1 Tài khoản & Dịch vụ (FE) ⭐⭐⭐
- [ ] Đăng ký domain `giaibaitap247.com` qua Namecheap/Cloudflare/Porkbun — **~$10-12/năm**
  - Recommended: Cloudflare Registrar (giá at-cost ~$9.77, free WHOIS privacy, free DNS)
  - Backup: Namecheap nếu Cloudflare yêu cầu domain transfer trước
  - **Pass criterion:** WHOIS lookup ra tên bạn, có thể login control panel
- [ ] (Optional ⭐⭐) Bảo vệ thương hiệu — đăng ký thêm `giaibaitap247.vn` hoặc `giaibaitap247.net` nếu ngân sách cho phép
- [ ] Tạo tài khoản GitHub (free) — username gợi ý: `giaibaitap-team`
- [ ] Tạo tài khoản Vercel (free) — login bằng GitHub
- [ ] Tạo tài khoản Cloudflare (free) — verify email
- [ ] (Defer 1B) ~~Railway, Cloudinary, Resend, Google Workspace~~ — chưa cần ở Phase 1A
- [ ] Mở tài khoản ngân hàng riêng (track chi phí dự án) — gợi ý Techcombank/MB Online

#### 1A.1.2 DNS & SSL ⭐⭐⭐
- [ ] Trỏ nameserver Mắt Bão về Cloudflare (4-24h propagate)
  - Lấy 2 nameserver từ Cloudflare dashboard sau khi add site
  - Update tại Mắt Bão control panel
- [ ] Verify DNS đã chuyển — `dig giaibaitap247.com NS` (chờ ra Cloudflare NS)
- [ ] Bật Cloudflare SSL → Full (strict)
- [ ] Bật Always Use HTTPS + Auto HTTPS Rewrites
- [ ] Bật Brotli compression + HTTP/3
- [ ] **Pass criterion:** `https://giaibaitap247.com` mở được (404 từ Cloudflare cũng OK ở giai đoạn này)

#### 1A.1.3 Local Dev Environment ⭐⭐⭐
- [x] Cài Node.js 20 LTS — verify `node -v` ra v20.x ✅ (2026-05-09) v24.14.1
- [x] Cài pnpm (nhanh hơn npm) — `npm i -g pnpm` ✅ (2026-05-09) v9.12.3
- [ ] Cài VS Code + extensions: ESLint, Prettier, Tailwind CSS IntelliSense, GitLens
- [x] Cài Git, config user — `git config --global user.name "..."` + `user.email` ✅ (2026-05-09) git 2.52.0
- [ ] Verify Git push được — tạo repo test, push thử

```bash
# Setup nhanh môi trường (chạy sau khi cài Node.js):
npm install -g pnpm
git config --global init.defaultBranch main
mkdir ~/giaibaitap-project && cd ~/giaibaitap-project
git init
echo "node_modules/\n.env*\n.next/\ndist/" > .gitignore
```

---

### 1A.2 Học kỹ thuật FE (song song, ưu tiên cao) ⭐⭐⭐

> **Lý do:** Newbie không học = không build được. Đầu tư 20-25 giờ học tập trung tuần 1-2 chỉ riêng FE. Strapi học sau ở Phase 1B.

- [ ] Học Next.js 14 App Router cơ bản (~6h)
  - Khoá free: "Next.js 14 Tutorial" trên YouTube (Code with Antonio / Lee Robinson official)
  - **Pass criterion:** tự tạo được Next.js project có 3 page với dynamic route
- [ ] Học Tailwind CSS cơ bản (~3h)
  - Tailwind docs official: Getting Started + Utility-First
  - **Pass criterion:** style được 1 card component không Google
- [ ] Học Git cơ bản (~2h) — clone, commit, push, branch, merge
- [ ] (Optional ⭐⭐) Học TypeScript cơ bản (~3h) — interface, type, generic
- [ ] (Defer 1B) ~~Học Strapi v5~~ — sang Phase 1B mới học

---

### 1A.3 Keyword Research & URL Structure (làm trước khi build route) ⭐⭐⭐

> **Lý do làm sớm:** URL pattern và silo structure quyết định cấu trúc thư mục `app/` của Next.js. Sai từ đầu → refactor đau đớn. Phải có 200 keyword + URL pattern xong **trước** khi viết route.

#### 1A.3.1 Keyword Research — 200 từ khoá cốt lõi

- [ ] Setup tài khoản công cụ SEO (free tier)
  - [ ] Google Search Console — verify domain (chờ DNS xong)
  - [ ] Google Keyword Planner (qua Google Ads, không cần chạy ad)
  - [ ] Ahrefs Webmaster Tools (free, dùng cho site của mình)
  - [ ] Ubersuggest free tier (3 search/ngày)
- [ ] Liệt kê **200 từ khoá cốt lõi** vào `seo/keyword-research.xlsx`:
  - 50 từ khoá lớp 12 (highest traffic)
  - 40 lớp 9 (luyện thi vào 10)
  - 30 lớp 11
  - 30 lớp 10
  - 20 lớp 6-8
  - 20 tiểu học
  - 10 mở rộng (tuyển sinh, IELTS)
- [ ] Cột bắt buộc: `Keyword | Volume | KD | Intent | Lop | Mon | URL Pattern | Priority`

**Ví dụ keyword theo cluster (TOP 50 cốt lõi):**

| Cluster | Sample keyword | Volume ước tính | KD | Priority |
|---------|----------------|-----------------|----|----|
| Lớp 12 Toán | giải sgk toán 12 kết nối tri thức | 8k-15k/tháng | 25 | ⭐⭐⭐ |
| Lớp 12 Toán | giải toán 12 chương 1 | 5k-10k | 20 | ⭐⭐⭐ |
| Lớp 12 Văn | soạn bài chiếc thuyền ngoài xa | 20k-30k | 30 | ⭐⭐⭐ |
| Lớp 12 Văn | soạn văn 12 ngắn nhất | 10k-20k | 25 | ⭐⭐⭐ |
| Lớp 9 Toán | giải toán 9 sgk | 30k+ | 35 | ⭐⭐⭐ |
| Lớp 9 Văn | soạn bài truyện kiều | 15k-25k | 28 | ⭐⭐⭐ |
| Lớp 11 Văn | soạn bài chí phèo | 25k+ | 32 | ⭐⭐⭐ |
| Đề thi | đề thi tốt nghiệp THPT 2025 | 50k+ (mùa) | 40 | ⭐⭐⭐ |
| Đề thi | đề thi vào lớp 10 hà nội | 30k+ (mùa) | 35 | ⭐⭐⭐ |
| Lý thuyết | công thức lượng giác lớp 11 | 8k-12k | 22 | ⭐⭐ |
| Tiểu học | giải bài tập toán lớp 5 | 20k+ | 25 | ⭐⭐ |
| Mở rộng | từ vựng tiếng anh lớp 12 | 5k-8k | 20 | ⭐⭐ |
| Tuyển sinh | điểm chuẩn đại học 2025 | 100k+ (mùa) | 45 | ⭐ (năm 2) |

> ⚠️ Volume con số trên là ước tính từ kinh nghiệm. **Phải verify lại** bằng Keyword Planner / Ahrefs trước khi commit content plan.

#### 1A.3.2 URL Structure (Silo) ⭐⭐⭐

> **Quy tắc:** URL ngắn, chứa keyword, có dấu gạch ngang, không dấu tiếng Việt, không số ID, không đuôi `.html`.

```
Pattern chuẩn:
/lop-{1-12}/{mon}/{loai}-{mon}-{lop}-{bo-sach}/{slug-bai}

Ví dụ:
✅ /lop-12/toan/giai-sgk-toan-12-ket-noi-tri-thuc/chuong-1-bai-1-tinh-don-dieu-cua-ham-so
✅ /lop-9/van/soan-van-9/truyen-kieu
✅ /de-thi/tot-nghiep-thpt-2025-mon-toan-de-101
✅ /trac-nghiem/lop-12-toan-chuong-1
✅ /ly-thuyet/lop-11/cong-thuc-luong-giac

❌ Tránh: /post/12345 (không có keyword)
❌ Tránh: /Lop_12/Toan/... (chữ hoa + underscore)
❌ Tránh: /lop-12/toan/ket-noi-tri-thuc/chuong-1/bai-1/giai-bai-tap (quá sâu, > 5 levels)
```

- [ ] Viết `lib/url.ts` với function builder URL (DRY, không hardcode):
  ```typescript
  export function buildBaiGiaiUrl(b: BaiGiai): string {
    return `/lop-${b.lop}/${b.mon}/${b.loai}-${b.mon}-${b.lop}-${b.bo_sach}/${b.slug}`;
  }
  ```

> **Trạng thái 1A.3:** ❌ Chưa làm. Deadline: hết tuần 1.

---

### 1A.4 Architecture & Codebase Init (chỉ web/) ⭐⭐⭐

> **Nguyên tắc thiết kế:** Single codebase, single domain (`giaibaitap247.com`) cho năm 1 — KHÔNG tách 6 subdomain. Phase 1A chỉ init `web/`, thư mục `cms/` để Phase 1B.

- [ ] **Khởi tạo monorepo structure (FE-only)** ⭐⭐⭐
  ```bash
  giaibaitap-project/
  ├── web/              # Next.js 14 frontend (Vercel) — Phase 1A
  ├── cms/              # (Phase 1B) Strapi v5 backend
  ├── content-templates/
  ├── seo/
  ├── docs/
  └── task_giaibaitap.md
  ```

- [ ] **Next.js 14 App Router structure** ⭐⭐⭐ → `web/`
  ```
  web/
  ├── app/
  │   ├── layout.tsx                      # Root: Header + Footer + AdSense scripts
  │   ├── page.tsx                        # Trang chủ
  │   ├── lop-[grade]/
  │   │   ├── page.tsx                    # /lop-12 → landing môn
  │   │   └── [subject]/
  │   │       ├── page.tsx                # /lop-12/toan
  │   │       └── [type]/
  │   │           ├── page.tsx            # /lop-12/toan/giai-sgk-toan-12-ket-noi-tri-thuc
  │   │           └── [slug]/
  │   │               └── page.tsx        # bài chi tiết (ISR revalidate=3600 — wire ở 1B)
  │   ├── soan-van/
  │   │   └── [slug]/page.tsx
  │   ├── de-thi/
  │   │   ├── page.tsx                    # listing có filter
  │   │   └── [slug]/page.tsx
  │   ├── trac-nghiem/
  │   │   ├── page.tsx
  │   │   └── [slug]/page.tsx             # widget trắc nghiệm interactive
  │   ├── tuyen-sinh/page.tsx             # subfolder năm 1
  │   ├── hoi-dap/page.tsx                # subfolder năm 1
  │   ├── tim-kiem/page.tsx               # search results
  │   ├── (legal)/
  │   │   ├── gioi-thieu/page.tsx
  │   │   ├── lien-he/page.tsx
  │   │   ├── chinh-sach-bao-mat/page.tsx
  │   │   ├── dieu-khoan/page.tsx
  │   │   ├── chinh-sach-cookie/page.tsx
  │   │   └── dmca/page.tsx
  │   ├── api/
  │   │   ├── revalidate/route.ts         # (1B) Strapi webhook target
  │   │   ├── search/route.ts             # (1B) Search proxy
  │   │   └── newsletter/route.ts
  │   ├── sitemap.ts                      # Sitemap index (1A: hardcode list, 1B: từ Strapi)
  │   ├── sitemap-lop-[grade]/route.ts    # Sitemap động per lớp (1B)
  │   ├── robots.ts
  │   └── manifest.ts                     # PWA
  ├── components/
  │   ├── ui/                             # shadcn/ui base
  │   ├── layout/
  │   │   ├── Header.tsx
  │   │   ├── Footer.tsx
  │   │   ├── Sidebar.tsx
  │   │   └── MobileNav.tsx
  │   ├── article/
  │   │   ├── ArticleBody.tsx
  │   │   ├── MathRenderer.tsx            # KaTeX wrapper
  │   │   ├── CodeBlock.tsx               # Shiki highlight
  │   │   ├── TableOfContents.tsx
  │   │   ├── PrevNextNav.tsx
  │   │   └── RelatedPosts.tsx
  │   ├── ads/
  │   │   ├── AdSenseUnit.tsx             # Lazy-loaded ad slot
  │   │   ├── InArticleAd.tsx
  │   │   └── StickyAd.tsx
  │   ├── seo/
  │   │   ├── ArticleSchema.tsx
  │   │   ├── BreadcrumbSchema.tsx
  │   │   ├── FAQSchema.tsx
  │   │   └── OrganizationSchema.tsx
  │   ├── search/
  │   │   ├── SearchBox.tsx               # Autocomplete (1A: UI shell, 1B: wire Meilisearch)
  │   │   └── SearchResults.tsx
  │   └── interaction/
  │       ├── BookmarkButton.tsx
  │       ├── ShareButtons.tsx
  │       ├── DarkModeToggle.tsx
  │       └── CommentsWidget.tsx          # Disqus or Facebook
  ├── lib/
  │   ├── strapi.ts                       # (1B) API client wrapper
  │   ├── seo.ts                          # buildMetadata helper
  │   ├── url.ts                          # URL builders
  │   └── analytics.ts                    # GA4 + Clarity hooks
  ├── public/
  │   ├── robots.txt                      # generated
  │   ├── ads.txt                         # AdSense
  │   ├── favicon/
  │   └── og-default.png
  ├── tailwind.config.ts
  ├── next.config.js
  └── package.json
  ```

> **Trạng thái 1A.4:** ✅ (2026-05-09) Monorepo init xong tại `d:/giaibaitap/`. Cấu trúc `web/`, `cms/`, `seo/`, `content-templates/`, `docs/`.

---

### 1A.5 Init Next.js + Deploy Vercel + Connect Domain ⭐⭐⭐

> **Mục tiêu 1A.5:** Cuối tuần 2 có "Hello World" của Next.js chạy tại `https://giaibaitap247.com`.

- [ ] **Init Next.js project**
  ```bash
  cd web
  pnpm create next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"
  pnpm add @strapi/blocks-react-renderer katex react-katex shiki
  pnpm add -D @types/katex
  pnpm dlx shadcn@latest init
  ```

- [ ] **Deploy Next.js lên Vercel**
  - Connect GitHub repo `web/` vào Vercel
  - Set env (placeholder cho 1B): `NEXT_PUBLIC_STRAPI_URL=`, `STRAPI_API_TOKEN=`, `REVALIDATE_SECRET=` để trống/dummy
  - Deploy → verify `https://[project].vercel.app` mở được Hello World
  - **Pass criterion:** thấy "Hello World" trên Vercel URL

- [ ] **Connect domain `giaibaitap247.com` → Vercel**
  - Vercel Settings → Domains → Add `giaibaitap247.com`
  - Add CNAME record tại Cloudflare: `@` → `cname.vercel-dns.com` (proxy OFF)
  - Hoặc A record về Vercel IP (theo guide Vercel)
  - **Pass criterion:** `https://giaibaitap247.com` ra trang Next.js

> **Trạng thái 1A.5:** ✅ (2026-05-09) Next.js 16.2.6 init xong trong `web/`, pnpm build thành công (36 static pages). Chờ đăng ký domain + Vercel để deploy.

---

### 1A.6 Build UI Shell (Layout, Header, Footer, Navigation) ⭐⭐⭐

> **Mục tiêu 1A.6:** Mọi page trên site dùng chung 1 layout consistent: Header với menu lớp, Footer với link pháp lý, Sidebar (desktop), Mobile nav (hamburger).

- [ ] `components/layout/Header.tsx` — logo + menu chính (12 cấp lớp dropdown) + search box + dark mode toggle
- [ ] `components/layout/Footer.tsx` — 4 cột: About, Pháp lý, Liên hệ, Social
- [ ] `components/layout/Sidebar.tsx` — danh sách bài cùng chương (placeholder), banner ads slot, related posts
- [ ] `components/layout/MobileNav.tsx` — drawer slide-in, accordion theo lớp
- [ ] `app/layout.tsx` — wire Header + Footer + AdSense scripts (script tag placeholder, chưa active)
- [ ] **Pass criterion:** mở bất kỳ route nào (kể cả 404) đều có header + footer hiển thị nhất quán

---

### 1A.7 Build Page Templates (mọi route render được với placeholder) ⭐⭐⭐

> **Quy tắc placeholder:** Dùng Lorem ipsum tiếng Việt + ảnh placeholder từ `picsum.photos` + công thức KaTeX mẫu cố định. Tất cả data hardcode trong component (KHÔNG fetch API). Mục đích: kiểm tra UI render đẹp ở mọi viewport.

- [ ] `app/page.tsx` — Trang chủ với hero + 12 cấp lớp + 8 bài mới (placeholder)
- [ ] `app/lop-[grade]/page.tsx` — Landing lớp với danh sách 10 môn + thumbnail
- [ ] `app/lop-[grade]/[subject]/page.tsx` — Danh sách bài theo môn (3 bộ sách tab) — `generateStaticParams` trả mảng cố định
- [ ] `app/lop-[grade]/[subject]/[type]/page.tsx` — Listing có filter
- [ ] `app/lop-[grade]/[subject]/[type]/[slug]/page.tsx` — Bài chi tiết với:
  - Title + breadcrumb + ToC (sticky)
  - Body Lorem ipsum + 3 công thức KaTeX mẫu + 2 code block + 1 ảnh
  - PrevNext nav + Related posts
  - FAQ accordion + Comments placeholder
- [ ] `app/soan-van/[slug]/page.tsx` — Tab 3 phiên bản (Hay nhất / Ngắn nhất / Siêu ngắn)
- [ ] `app/de-thi/page.tsx` + `[slug]/page.tsx` — Listing có filter + bài chi tiết có nút "Tải PDF" (placeholder)
- [ ] `app/trac-nghiem/page.tsx` + `[slug]/page.tsx` — Widget interactive 5 câu hỏi mẫu
- [ ] `app/tim-kiem/page.tsx` — Trang search với 10 kết quả mẫu
- [ ] `app/sitemap.ts` — sitemap.xml hardcode (1B sẽ generate động từ Strapi)
- [ ] `app/robots.ts` — robots.txt
- [ ] **Pass criterion:** click qua mọi route, không 404, UI render đẹp mobile + desktop

---

### 1A.8 SEO Onpage Templates & Schema Markup ⭐⭐⭐

#### 1A.8.1 Meta Tags Template → `lib/seo.ts`

```typescript
// Cho mỗi loại trang một template title/description
export const SEO_TEMPLATES = {
  baiGiai: {
    title: (b) => `${b.tieu_de} - Giải ${b.mon} ${b.lop} ${b.bo_sach_label}`,
    description: (b) => `Lời giải chi tiết bài ${b.bai_so}: ${b.tieu_de}. ${b.mon} lớp ${b.lop} - sách ${b.bo_sach_label}. Hướng dẫn từng bước, dễ hiểu, miễn phí.`
  },
  soanVan: {
    title: (b) => `Soạn bài ${b.tieu_de} (${b.phien_ban}) - Văn ${b.lop}`,
    description: (b) => `Soạn bài ${b.tieu_de} ${b.phien_ban}. Tóm tắt, phân tích nhân vật, ý nghĩa - Ngữ văn lớp ${b.lop}.`
  },
  deThi: {
    title: (b) => `${b.tieu_de} có đáp án ${b.nam}`,
    description: (b) => `${b.tieu_de} năm ${b.nam} kèm đáp án chi tiết. Tải về PDF, ôn luyện hiệu quả.`
  },
};
```

- [ ] Generate metadata trong từng `page.tsx` dùng template (input là placeholder data ở 1A, real data ở 1B):
  ```typescript
  export async function generateMetadata({ params }) {
    const bai = MOCK_BAI_GIAI; // 1A: hardcode | 1B: await getBaiGiai(params.slug)
    return {
      title: SEO_TEMPLATES.baiGiai.title(bai),
      description: SEO_TEMPLATES.baiGiai.description(bai),
      openGraph: {...},
      twitter: {...},
      alternates: { canonical: buildBaiGiaiUrl(bai) }
    };
  }
  ```

#### 1A.8.2 Schema Markup JSON-LD → `components/seo/`

- [ ] **Article + LearningResource Schema** cho bài giải (props từ placeholder)
- [ ] **BreadcrumbList Schema** cho mọi trang
- [ ] **FAQ Schema** cho phần Q&A cuối bài
- [ ] **Quiz Schema** cho trang trắc nghiệm
- [ ] **EducationalOrganization Schema** ở Footer (toàn site)
- [ ] Verify với Google Rich Results Test: https://search.google.com/test/rich-results

#### 1A.8.3 Internal Link Strategy (UI hiện diện, link target real ở 1B)

- [ ] **Bài → Bài cùng chương**: hiển thị 5-10 bài cùng chương ở sidebar/cuối bài
- [ ] **Bài → Lý thuyết liên quan**: nếu bài giải có nhắc công thức → link sang lý thuyết
- [ ] **Bài → Đề thi liên quan**
- [ ] **Anchor text đa dạng**: KHÔNG dùng "click here", dùng keyword-rich anchor
- [ ] **Pillar page**: mỗi lớp x môn có 1 pillar page (vd `/lop-12/toan`) link đến mọi cluster

> **Trạng thái 1A.8:** ✅ (2026-05-09) lib/seo.ts (SEO_TEMPLATES), lib/url.ts, ArticleSchema, BreadcrumbSchema, FAQSchema, OrganizationSchema đã hoàn thành. generateMetadata trong mọi page.tsx.

---

### 1A.9 UX/UI Features (giao diện user thao tác) ⭐⭐⭐

> **Nguyên tắc:** Tính năng phải hỗ trợ học → giữ user lâu → tăng pageview/session → tăng AdSense earning. Phase 1A xây dựng **UI** + **logic client-side** đầy đủ. Phần cần API (search engine, comments, bookmark) chỉ làm UI shell, integration ở 1B.

- [ ] **Search box với autocomplete** ⭐⭐⭐
  - Phase 1A: UI dropdown autocomplete với 10 suggestion mock cố định
  - Phase 1B: Wire Meilisearch self-host trên Railway
  - UX: gõ 2 ký tự → hiện 5 suggestions (dropdown)
  - Pass criterion (1A): UI dropdown mượt, keyboard navigation OK

- [ ] **Bộ lọc đa cấp** ⭐⭐⭐ → trên trang `/lop-X/[mon]`
  - Lớp → Môn → Bộ sách → Chương → Bài
  - URL phản ánh filter (deep linking) để SEO + share được
  - Phase 1A: filter logic trên array mock, tick/untick OK

- [ ] **Breadcrumb với schema** ⭐⭐⭐
  - Trên mọi trang trừ trang chủ
  - Render visible + JSON-LD đồng thời

- [ ] **Table of Contents (ToC)** ⭐⭐⭐
  - Auto extract H2/H3 từ content
  - Sticky sidebar trên desktop, collapse trên mobile
  - Anchor link smooth scroll
  - Pass criterion: bài dài > 1500 chữ có ToC

- [ ] **Prev/Next navigation** ⭐⭐⭐
  - Cuối mỗi bài: nút "Bài trước" + "Bài tiếp theo" + "Quay lại danh sách"
  - 1A: hardcode link mock | 1B: từ Strapi relation `bai_truoc`, `bai_sau`

- [ ] **Related posts** ⭐⭐⭐
  - 6 bài cùng chương / cùng tag
  - Sidebar trên desktop, dưới ToC trên mobile

- [ ] **Copy code / công thức button** ⭐⭐
  - Hover lên code/công thức → hiện nút Copy
  - Click → toast "Đã copy!"

- [ ] **Dark mode** ⭐⭐
  - Toggle ở header, lưu preference vào localStorage
  - Tailwind `dark:` variant

- [ ] **Bookmark / Lưu bài (UI shell)** ⭐⭐
  - 1A: nút bookmark + lưu vào localStorage (không cần auth)
  - 1B: migrate sang user account khi có auth + DB

- [ ] **Share buttons** ⭐⭐⭐
  - Facebook, Zalo, Copy link, Email
  - KHÔNG dùng AddThis (chậm + tracker)
  - Self-implement với window.open

- [ ] **Comments (UI placeholder)** ⭐⭐
  - 1A: render khung Facebook Comments plugin (data-href="placeholder")
  - 1B: replace placeholder bằng URL thật khi publish bài

- [ ] **Print to PDF / Tải về** ⭐
  - CSS `@media print` để format đẹp khi in
  - Optional: button "Tải PDF" dùng html2pdf.js (~50KB JS)

- [ ] **PWA setup** ⭐⭐
  - `app/manifest.ts` + service worker (next-pwa plugin)
  - Cài như app mobile được
  - Pass criterion: Lighthouse PWA score ≥ 90

> **Trạng thái 1A.9:** ✅ (2026-05-09) UI shell xong: SearchBox autocomplete, DarkModeToggle, ShareButtons, BookmarkButton (localStorage), ToC, PrevNextNav, RelatedPosts, AdSenseUnit (lazy + placeholder). Breadcrumb trên mọi trang.

---

### 1A.10 Performance Optimization (Core Web Vitals)

> **Quan trọng:** AdSense + content site sống chết bằng tốc độ. Slow site = bounce rate cao = AdSense reject + Google rank thấp.

> **Targets (đo bằng PageSpeed Insights mobile):**
> - LCP < 1.8s (target stretch < 1.5s)
> - INP < 100ms
> - CLS < 0.05
> - Total Blocking Time < 200ms

- [ ] **Image optimization** ⭐⭐⭐
  - Dùng Next/Image component (auto WebP/AVIF)
  - 1A: dùng `picsum.photos` placeholder | 1B: Cloudinary
  - Set width/height attribute → tránh CLS
  - Lazy load tất cả ảnh below fold (`loading="lazy"`)

- [ ] **Font optimization** ⭐⭐⭐
  - Dùng `next/font` (self-host Google Fonts, không có FOIT)
  - Subset Vietnamese only
  - Font display: swap

- [ ] **Bundle size budget** ⭐⭐⭐
  - First Load JS < 100KB (gzipped)
  - Theo dõi qua `next build` output
  - Code split nặng nhất: KaTeX (lazy load), Comments widget (lazy load on scroll)

- [ ] **AdSense lazy load** ⭐⭐⭐ (critical cho CWV)
  - Reserve space (height fixed) → tránh CLS khi ad load
  - Load ads.js sau page interactive (defer)
  - In-article ad: load khi user scroll đến gần (Intersection Observer)
  - Pass criterion: PageSpeed Insights score ≥ 80 mobile (sau khi có ads)

- [ ] **ISR + Edge cache** ⭐⭐⭐
  - Mọi page bài giải: `export const revalidate = 3600` (1h) — config sẵn ở 1A, kích hoạt thật ở 1B
  - List page: `revalidate = 600` (10 phút)
  - Trang chủ: `revalidate = 300` (5 phút)
  - Cloudflare cache rules: cache HTML 1h, ignore query string

- [ ] **Lighthouse audit định kỳ** ⭐⭐⭐
  - Mỗi tuần chạy 1 lần trên 5 page tiêu biểu (chủ, lớp, môn, bài)
  - Track score qua thời gian trong file `docs/lighthouse-history.md`

> **Trạng thái 1A.10:** ❌. Deadline FE-only: cuối tuần 5 đạt LCP < 2s, Lighthouse mobile ≥ 80.

---

### 1A.11 Trang pháp lý + ads.txt + manifest

> **Lý do làm sớm:** 5 trang pháp lý là static, viết 1 lần xong → giúp AdSense duyệt nhanh ở 1B. ads.txt + manifest cũng nên có sẵn.

#### 1A.11.1 5 trang pháp lý ⭐⭐⭐ → `app/(legal)/`

- [x] **Giới thiệu (About)** ✅ (2026-05-09) `app/(legal)/gioi-thieu/page.tsx`
- [x] **Liên hệ (Contact)** ✅ (2026-05-09) `app/(legal)/lien-he/page.tsx` — mailto link tạm, Phase 1B thay Resend API
- [x] **Privacy Policy** ✅ (2026-05-09) `app/(legal)/chinh-sach-bao-mat/page.tsx` — chuẩn Nghị định 13/2023 + AdSense
- [x] **Terms of Service** ✅ (2026-05-09) `app/(legal)/dieu-khoan/page.tsx`
- [x] **Cookie Policy** ✅ (2026-05-09) `app/(legal)/chinh-sach-cookie/page.tsx` — bảng cookie types. Cookie consent banner (cookieyes.com) cài Phase 1B
- [x] **DMCA Disclaimer** ✅ (2026-05-09) `app/(legal)/dmca/page.tsx`
- [ ] **Affiliate Disclosure** (cần khi join Accesstrade/Shopee Affiliate)

#### 1A.11.2 ads.txt ⭐⭐⭐

- [x] Tạo `public/ads.txt` ✅ (2026-05-09) — placeholder, điền pub-ID sau khi AdSense duyệt
- [ ] Verify accessible: `https://giaibaitap247.com/ads.txt` — cần deploy trước

#### 1A.11.3 PWA manifest

- [x] `app/manifest.ts` ✅ (2026-05-09) đầy đủ name, short_name, theme_color, icons, categories
- [ ] Verify Lighthouse PWA score ≥ 90 — cần deploy trước

---

### 1A.12 FE Milestone Verification (chuyển giao Phase 1A → Phase 1B)

> **Mục tiêu:** Trước khi đụng đến Strapi/DB/content, FE phải hoàn toàn ổn định. Đây là "red line" của Phase 1A.

- [ ] **Mọi route render OK với placeholder** — click qua tất cả 8 nhóm route, không 404, không layout shift
- [ ] **Mobile responsive 100%** — test bằng Chrome DevTools (iPhone SE, iPad) + 1 real device
- [ ] **Lighthouse mobile ≥ 80** trên 5 page (chủ, lớp, môn, bài chi tiết, đề thi)
- [ ] **Dark mode toggle hoạt động** — preference persist qua refresh
- [ ] **Search box autocomplete UI mượt** (dù data mock)
- [ ] **HTTPS đầy đủ** — không có mixed content warning
- [ ] **5 trang pháp lý + ads.txt + sitemap.xml truy cập được**
- [ ] **`https://giaibaitap247.com` resolve về Vercel deployment** (không phải Vercel preview)
- [ ] **Code đã push lên GitHub `main` branch** + có README

> **🎯 RED LINE PHASE 1A (cuối tuần 6):**
> Nếu chưa pass hết checklist trên → DỪNG. Lựa chọn:
> - Dành thêm 1-2 tuần fix FE (chấp nhận lùi BE)
> - Hoặc đổi sang WordPress + Newspaper theme (FE có sẵn, tập trung content)

> **Trạng thái 1A:** ⚠️ (2026-05-09) Code shell đã xong (Next.js + tất cả components/pages/sitemap/pháp lý). Còn lại: đăng ký domain, Vercel deploy, Lighthouse audit, GitHub push. Deadline tổng Phase 1A: 6 tuần (Tuần 1-6).

---

## PHASE 1B – BACK-END (CMS + Data + Content + AdSense) (Tuần 7-14)

> **Mục tiêu Phase 1B:** Wire FE shell với Strapi CMS thật, sản xuất 200 bài chất lượng, apply AdSense, đầy đủ analytics.
>
> **Tiền đề:** Phase 1A đã pass milestone verification. Mọi component FE đã sẵn sàng nhận data thật qua props/fetch.

### 1B.1 Environment Setup (BE) ⭐⭐⭐

- [ ] Tạo tài khoản Railway (free trial $5) — login bằng GitHub
- [ ] Tạo tài khoản Cloudinary (free 25GB) — login bằng Google
- [ ] Tạo Google Workspace HOẶC dùng Cloudflare Email Routing (free) cho `lienhe@giaibaitap247.com`
- [ ] Tạo tài khoản Resend (free 3k email/tháng) cho contact form
- [ ] Verify thanh toán Railway/Cloudinary trong tầm ngân sách

---

### 1B.2 Học Strapi v5 ⭐⭐⭐

- [ ] Học Strapi v5 (~4h)
  - Strapi Quick Start tutorial official
  - **Pass criterion:** tạo được content type + populate API local

---

### 1B.3 Chuẩn bị Tài nguyên Nội dung

> **Chiến lược:** Phủ 12 lớp x 3 bộ sách (Kết nối tri thức / Chân trời sáng tạo / Cánh diều) — nhưng trong năm 1 chỉ làm **mỏng** với ưu tiên thứ tự lớp luyện thi cao.
> Năm 1 mục tiêu: 5,000 bài chất lượng (KHÔNG phải 50,000 như brief gốc — giảm 90% để khả thi với solo).

#### Nhóm A – Tài nguyên SGK + Bộ sách (BẮT BUỘC, public)

##### Sách giáo khoa 3 bộ (3 bộ × 12 lớp × ~10 môn = ~360 cuốn)

- [ ] **Bộ Kết nối tri thức với cuộc sống** ⭐⭐⭐ (NXB Giáo dục VN)
  - Nguồn: https://hanhtrangso.nxbgd.vn (PDF có watermark)
  - Tải về làm reference, **KHÔNG re-host** — chỉ trích đề bài
  - Lớp ưu tiên năm 1: 12, 9, 11, 10 (theo thứ tự traffic)
  - **Pass criterion:** có file PDF tham khảo cho mọi bài cần viết

- [ ] **Bộ Chân trời sáng tạo** ⭐⭐⭐ (NXB Giáo dục VN)
  - Nguồn: hanhtrangso.nxbgd.vn (search "Chân trời")
  - Cùng lớp ưu tiên với bộ KNTT

- [ ] **Bộ Cánh diều** ⭐⭐⭐ (NXB Đại học Sư phạm + ĐHSP TPHCM)
  - Nguồn: https://www.canhdieu.vn (có thể bán bản số)
  - Lưu ý: bộ này nhiều môn ít phổ biến hơn 2 bộ trên

##### Sách tham khảo / Đề thi (~50-100 cuốn cốt lõi)
- [ ] **Bộ đề thi tốt nghiệp THPT 2020-2025** ⭐⭐⭐
  - Nguồn: Bộ GD&ĐT website công bố (moet.gov.vn)
- [ ] **Đề ĐGNL ĐHQG HN + ĐHQG TPHCM 2022-2025** ⭐⭐⭐
- [ ] **Đề thi vào lớp 10 các tỉnh** ⭐⭐ (Hà Nội, TPHCM, Đà Nẵng ưu tiên)

> ⚠️ **Rủi ro bản quyền (cao - phải xử lý ngay):**
> - **Trích đề bài** (fair use cho mục đích giáo dục) — KHÔNG copy nguyên SGK
> - **Lời giải tự viết 100%** — KHÔNG dùng lời giải sẵn
> - Footer mọi bài: "Đề bài thuộc bản quyền NXB Giáo dục Việt Nam. Lời giải do giaibaitap247.com biên soạn."
> - **KHÔNG re-upload PDF SGK** — đây là đường đỏ
> - Sẵn sàng takedown trong 24h nếu nhận DMCA

#### Nhóm B – Template Content cho CTV (chưa cần, năm 1 self-write)

- [ ] Template Word/Markdown cho 5 loại bài:
  - `template-bai-giai-sgk.md` (cho bài giải Toán/Lý/Hoá)
  - `template-soan-van.md` (3 phiên bản: hay nhất / ngắn nhất / siêu ngắn)
  - `template-de-thi.md`
  - `template-trac-nghiem.md`
  - `template-ly-thuyet.md`
- [ ] Style guide: cách dùng KaTeX, cách đặt heading, cách insert ảnh
- [ ] Anti-plagiarism workflow: copyscape free tier + Quillbot paraphrase

> ✅ **Bộ sách Confirmed (sẽ phủ năm 1):**
> - Lớp 9, 12: cả 3 bộ (Kết nối tri thức, Chân trời, Cánh diều) — full
> - Lớp 10, 11: 2 bộ (Kết nối + Chân trời) — bộ Cánh diều phase 2
> - Lớp 6-8: 1 bộ (Kết nối tri thức) — phase 2 bổ sung
> - Lớp 1-5: skip năm 1, làm năm 2

#### ⚠️ Rủi ro Nội dung Trùng lặp với VietJack/Loigiaihay

| Đối thủ | Trạng thái | Chiến lược tránh trùng |
|---------|-----------|------------------------|
| **VietJack.com** | Authority cao, 10 năm | Lời giải tự viết, thêm video YouTube embed, thêm ảnh sơ đồ |
| **Loigiaihay.com** | Tập đoàn Educa | Format khác (tab chuyển giữa 3 bộ sách trong 1 page) |
| **Tailieumoi.vn** | Mạnh đề thi | Tập trung bài giải + lý thuyết, ít cạnh tranh đề thi đầu |
| **Hoc24.vn** | Cộng đồng Q&A | Năm 1 không build subdomain hoidap, tránh dàn trải |

#### Tổng Hợp Tài nguyên Theo Priority

| Priority | Tên | Loại | Lớp | Quy mô năm 1 |
|----------|-----|------|-----|--------------|
| ⭐⭐⭐ | SGK 3 bộ Lớp 12 | PDF reference | 12 | ~30 cuốn |
| ⭐⭐⭐ | SGK 3 bộ Lớp 9 | PDF reference | 9 | ~30 cuốn |
| ⭐⭐⭐ | Đề thi TN THPT 5 năm | PDF | 12 | ~50 đề |
| ⭐⭐⭐ | Đề thi vào 10 HN+TPHCM | PDF | 9 | ~30 đề |
| ⭐⭐ | SGK 2 bộ Lớp 10, 11 | PDF reference | 10-11 | ~40 cuốn |
| ⭐⭐ | Đề ĐGNL ĐHQG | PDF | 12 | ~10 đề |
| ⭐ | SGK 1 bộ Lớp 6-8 | PDF reference | 6-8 | ~30 cuốn |
| ⭐ | SGK Lớp 1-5 | PDF reference | 1-5 | Năm 2 |

**✅ Content Production Target Năm 1:**

| Loại bài | Số lượng | Lớp ưu tiên | Tháng deadline |
|----------|----------|-------------|----------------|
| Bài giải SGK | 2,000 | 12, 9 | T3-T9 |
| Soạn văn 3 phiên bản | 800 | 9, 12 | T4-T8 |
| Đề thi + đáp án | 500 | 12, 9 | T2-T6 |
| Lý thuyết + Công thức | 300 | 12, 9, 11 | T2-T9 |
| Trắc nghiệm online | 1,500 (= 100 bài × 15 câu) | 12, 9 | T6-T12 |

**Tổng năm 1: ~5,100 bài** (giảm 90% so với brief gốc 50,000 — khả thi với solo)

---

### 1B.4 Strapi Schema Design ⭐⭐⭐

> **Quan trọng:** Mọi bài đi qua workflow CMS, không edit trực tiếp database. Lý do: tracking change, rollback, role-based access cho CTV sau này.

- [ ] **Strapi Content Type Schema** ⭐⭐⭐ → `cms/src/api/bai-giai/`
  ```
  BaiGiai (Bài Giải):
  ├── tieu_de (string, required, unique)
  ├── slug (uid, auto-generate from tieu_de)
  ├── lop (enum: 1-12)
  ├── mon (enum: toan, van, anh, ly, hoa, sinh, su, dia, gdcd, tin)
  ├── bo_sach (enum: ket-noi, chan-troi, canh-dieu, chung)
  ├── loai (enum: sgk, sbt, vbt, soan-van, de-thi, ly-thuyet, trac-nghiem)
  ├── chuong (relation → Chuong)
  ├── bai_so (integer)
  ├── noi_dung (richtext - markdown)
  ├── meta_title (string, max 70)
  ├── meta_description (text, max 160)
  ├── tags (relation → Tag, many-to-many)
  ├── bai_truoc (relation → BaiGiai, one-to-one)
  ├── bai_sau (relation → BaiGiai, one-to-one)
  ├── thumbnail (media)
  ├── view_count (integer, default 0)
  └── trang_thai (enum: draft, review, published)
  ```

- [ ] **Strapi v5 structure** ⭐⭐⭐ → `cms/`
  ```
  cms/
  ├── config/
  │   ├── database.ts                     # PostgreSQL on Railway
  │   ├── server.ts
  │   └── plugins.ts                      # Email, Cloudinary
  ├── src/
  │   ├── api/
  │   │   ├── bai-giai/                   # Bài giải
  │   │   ├── chuong/                     # Chương
  │   │   ├── mon-hoc/                    # Môn học
  │   │   ├── bo-sach/                    # Bộ sách
  │   │   ├── tag/                        # Tag
  │   │   ├── de-thi/                     # Đề thi
  │   │   └── trac-nghiem/                # Trắc nghiệm
  │   └── components/                     # Reusable Strapi components
  └── package.json
  ```

---

### 1B.5 Init Strapi + Deploy Railway ⭐⭐⭐

- [ ] **Init Strapi project**
  ```bash
  cd cms
  npx create-strapi@latest . --quickstart --no-run --typescript
  # Sửa config/database.ts → PostgreSQL Railway
  pnpm install
  pnpm develop
  ```

- [ ] **Deploy Strapi lên Railway**
  - Tạo project mới Railway → Deploy from GitHub repo `cms/`
  - Add PostgreSQL service
  - Add environment variables: `DATABASE_URL`, `APP_KEYS`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`
  - Verify Strapi admin panel accessible: `https://[strapi-url].railway.app/admin`
  - **Pass criterion:** tạo được admin user, login được

- [ ] Tạo các Content Types theo schema 1B.4 trong Strapi admin
- [ ] Tạo API token (read-only public + write internal)

---

### 1B.6 Wire FE → BE (thay placeholder bằng data thật) ⭐⭐⭐

> **Mục tiêu 1B.6:** Phase 1A đã có FE shell với mock data. Phase 1B.6 thay tất cả mock thành `fetch()` Strapi API.

- [ ] **Strapi API client** ⭐⭐⭐ → `lib/strapi.ts`
  ```typescript
  // Wrapper để tránh lặp code, có TypeScript types
  export async function getBaiGiai(slug: string) {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/bai-giais?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 3600, tags: [`bai-giai-${slug}`] } }
    );
    return res.json();
  }
  ```

- [ ] **Replace placeholder data** trong từng `page.tsx`:
  - `app/page.tsx`: hero + bài mới → `getBaiMoi()`
  - `app/lop-[grade]/[subject]/[type]/[slug]/page.tsx`: `getBaiGiai(slug)`
  - `app/soan-van/[slug]/page.tsx`, `app/de-thi/[slug]/page.tsx`, `app/trac-nghiem/[slug]/page.tsx`
  - `generateStaticParams()` cho mỗi route động: lấy danh sách slug từ Strapi
  - `generateMetadata()`: lấy meta_title/meta_description từ Strapi

- [ ] **Webhook revalidate endpoint** ⭐⭐⭐ → `app/api/revalidate/route.ts`
  ```typescript
  // Strapi gọi endpoint này khi publish/update bài
  export async function POST(req: Request) {
    const secret = req.headers.get('x-revalidate-secret');
    if (secret !== process.env.REVALIDATE_SECRET) return new Response('401', { status: 401 });
    const { slug, model } = await req.json();
    revalidateTag(`${model}-${slug}`);
    return Response.json({ revalidated: true });
  }
  ```

- [ ] **Configure Strapi webhook** → trỏ về `https://giaibaitap247.com/api/revalidate`
  - Khi bài chuyển sang `published` → Strapi gọi Vercel revalidate API
  - Kết quả: bài mới xuất hiện trên web trong < 30 giây (không cần redeploy)

- [ ] **Sitemap động** → `app/sitemap.ts`: fetch danh sách slug từ Strapi
- [ ] **Search box wire Meilisearch** (self-host trên Railway, free)
  - Index: title + tags + first 200 chars body
  - Pass criterion: search "toan 12" ra kết quả < 200ms

- [ ] **Bookmark migration**: localStorage → user account (cần auth ở phase 2, để tạm localStorage)

- [ ] **End-to-end test toàn flow** ⭐⭐⭐
  - Tạo 1 bài "Bài 1: Giải Toán 12 Chương 1" trong Strapi admin
  - Status → Published
  - Verify tự động xuất hiện tại `https://giaibaitap247.com/lop-12/toan/...`
  - **Pass criterion:** thời gian từ publish đến hiển thị < 60s

---

### 1B.7 Content Production Pipeline (CMS Workflow)

- [ ] **Workflow trạng thái** ⭐⭐⭐
  ```
  CTV viết (draft) → Editor review (review) → Publish (published)
                                            ↘ Reject → Quay về draft
  ```
  - Output: bài chỉ public ra Next.js khi `trang_thai = published`
  - Pass criterion: tạo 1 bài mẫu chạy hết workflow trong < 10 phút

- [ ] **Bulk import script** ⭐⭐ (cho khi có CTV)
  - `scripts/bulk-import.ts`: đọc folder Markdown → import vào Strapi qua API
  - Tự động set lop, mon, bo_sach từ filename pattern
  - Skip nếu slug đã tồn tại

- [ ] **Anti-plagiarism check trước publish** ⭐⭐ (phase 2 tự động hoá)
  - Manual: copy 3 đoạn ngẫu nhiên → Copyscape free check
  - Pass criterion: < 10% trùng lặp web khác

- [ ] **Database query optimization** ⭐⭐ (Strapi side)
  - Add indexes: `slug`, `lop`, `mon`, `loai`, `bo_sach`
  - Disable unused Strapi plugins (i18n nếu không dùng đa ngôn ngữ)

---

### 1B.8 Content Production Pilot (200 bài đầu tiên)

> **Mục tiêu 1B.8:** Có ≥ 200 bài chất lượng publish, đủ điều kiện apply AdSense.

#### Quy trình viết 1 bài (target ~2-3 giờ/bài cho founder)

1. Mở SGK PDF, xác định bài cần viết
2. Trích đề bài (paste vào template)
3. Tự giải, viết lời giải (NHỮNG bước này phải tự viết, không paste từ Loigiaihay/VietJack)
4. Format theo template, thêm KaTeX cho công thức
5. Viết meta title + description (60-70 / 150-160 ký tự)
6. Insert vào Strapi → Status: Review
7. Tự review lại sau 30 phút (fresh eyes) → Publish
8. Verify URL hiển thị trên web

#### Phân bổ 200 bài pilot:

- [ ] **80 bài Toán lớp 12** (Kết nối tri thức) — Chương 1-2 ⭐⭐⭐
- [ ] **40 bài Văn lớp 12** (Kết nối tri thức) — soạn 3 phiên bản ⭐⭐⭐
- [ ] **30 bài Toán lớp 9** (Kết nối tri thức) ⭐⭐⭐
- [ ] **20 bài Văn lớp 9** ⭐⭐⭐
- [ ] **20 bài Lý thuyết Toán 12** (công thức + ví dụ) ⭐⭐
- [ ] **10 đề thi minh hoạ TN THPT 2024-2025** ⭐⭐

> ⚠️ **Rủi ro burnout (rất cao):** Solo + 200 bài × 2.5h = 500 giờ. Chia: 4 bài/ngày × 50 ngày = 200 bài (nghỉ Chủ Nhật).
> **Mitigation:**
> - Dùng AI hỗ trợ (Claude/GPT viết draft, mình edit) — tiết kiệm 40-50% thời gian
> - Nếu stress → giảm xuống 100 bài, lùi AdSense

#### AI-assisted writing workflow ⭐⭐⭐

- [ ] **Prompt template** cho Claude/GPT:
  ```
  Tôi là giáo viên Toán lớp 12. Hãy viết lời giải chi tiết cho bài tập sau theo
  cấu trúc:
  1. Phân tích đề (1-2 câu)
  2. Phương pháp giải (gọn)
  3. Lời giải từng bước (chi tiết, dùng KaTeX inline $...$ và block $$...$$)
  4. Đáp số
  5. Lưu ý / mẹo nhớ (nếu có)

  Đề bài: [paste đề]
  Sách: SGK Toán 12 Kết nối tri thức, Chương X, Bài Y
  Yêu cầu: lời giải tự nhiên, không copy từ web khác.
  ```

- [ ] **Quy trình AI-assisted:**
  1. AI viết draft (5 phút)
  2. Founder verify lời giải đúng (15 phút)
  3. Edit phong cách + thêm tip cá nhân (10 phút)
  4. Format + insert vào Strapi (5 phút)
  5. **Tổng: ~35-40 phút/bài** (nhanh gấp 4 lần tự viết tay)

- [ ] **Anti-detection AI:** đoạn mở/kết phải sửa cá nhân, không để mở bài kiểu "Đây là lời giải..." điển hình của AI

> **Trạng thái 1B.8:** ❌ 0/200. Deadline: 50-60 ngày từ khi 1B.6 wire-in xong.

---

### 1B.9 AdSense Application Bridge

> **Mục tiêu 1B.9:** Apply Google AdSense thành công, có code ads chạy sau khi duyệt.

#### 1B.9.1 Pre-application Checklist (PHẢI có trước khi apply) ⭐⭐⭐

- [ ] **Domain age ≥ 30 ngày** (lý tưởng 60 ngày)
- [ ] **≥ 30 bài chất lượng cao** (mỗi bài > 800 chữ, có ảnh/công thức, không lỗi chính tả)
  - Note: thực tế nên có ≥ 50-100 bài để chắc ăn
- [ ] **5 trang pháp lý đầy đủ** (đã có ở 1A.11)
- [ ] **Navigation rõ ràng**: Header có menu các lớp, Footer có About + Contact + Privacy + Terms
- [ ] **Không có lỗi 404**: chạy crawler kiểm tra (Screaming Frog free version cho ≤ 500 URL)
- [ ] **Mobile responsive 100%**: test bằng Chrome DevTools + real device
- [ ] **HTTPS đầy đủ**: không có mixed content warning
- [ ] **Sitemap.xml** đã submit Google Search Console
- [ ] **Robots.txt** không block accidentally
- [ ] **Không có nội dung copy nguyên từ web khác** (Copyscape check 5 bài random)
- [ ] **Loại nội dung phù hợp**: 100% giáo dục — KHÔNG có gambling, adult, weapon, copyright violation
- [ ] **Email business**: `lienhe@giaibaitap247.com` hoạt động + Contact page có form

#### 1B.9.2 Apply AdSense ⭐⭐⭐

- [ ] Tạo Google account riêng (KHÔNG dùng email cá nhân từng vi phạm AdSense)
- [ ] Apply tại https://www.google.com/adsense/start/
- [ ] Add code ads vào `<head>` của `app/layout.tsx`
- [ ] Verify (thường tự động qua DNS Cloudflare)
- [ ] **Chờ duyệt: 1-4 tuần** (giáo dục VN thường duyệt nhanh nếu site sạch)

#### 1B.9.3 Sau khi DUYỆT → Setup placement ⭐⭐⭐

- [ ] **Auto Ads** OFF (kiểm soát kém, dễ vi phạm CLS)
- [ ] **Manual placement** 5-7 vị trí:
  - Header banner (728x90 desktop, 320x50 mobile)
  - In-article ad #1: sau heading H2 đầu tiên
  - In-article ad #2: giữa bài (sau ~50% nội dung)
  - In-article ad #3: cuối bài (trước Related posts)
  - Sidebar sticky (300x600 hoặc responsive)
  - Footer (728x90, optional)
- [ ] Lazy load tất cả ads (Intersection Observer)
- [ ] Track RPM/CTR theo placement → A/B test sau 30 ngày

> **Pass criterion mục tiêu:** AdSense approved trước 30/04. Earning > $50/tháng tháng 5.

---

### 1B.10 Pre-launch Verification (Chuyển giao Phase 1 → Phase 2)

> **Mục tiêu:** Mọi thứ hoạt động ổn định, đo lường được, sẵn sàng scale.

#### 1B.10.1 Analytics & Tracking Setup ⭐⭐⭐

- [ ] **Google Analytics 4** — Property + stream cho `giaibaitap247.com`
  - Cài qua `next-third-parties` package (load tối ưu)
  - Verify thấy real-time data
- [ ] **Google Search Console** — Property + verify
  - Submit sitemap.xml
  - Verify Domain property (qua DNS Cloudflare)
- [ ] **Bing Webmaster Tools** — Submit + verify (~10% traffic VN)
- [ ] **Cốc Cốc Webmaster** — Submit + verify (~5-10% traffic VN, có thể quan trọng)
- [ ] **Microsoft Clarity** — heatmap + session recording (free vĩnh viễn)
- [ ] **Facebook Pixel** — chuẩn bị cho retargeting phase 2
- [ ] **UptimeRobot** — monitor 5 endpoint chính, alert email khi down

#### 1B.10.2 Sitemap + Robots Verify ⭐⭐⭐

- [ ] Sitemap index: `https://giaibaitap247.com/sitemap.xml`
- [ ] Sitemap con per lớp: `/sitemap-lop-12.xml`, `/sitemap-soan-van.xml`, ...
- [ ] Mỗi sitemap < 50,000 URL (chuẩn Google)
- [ ] `priority` + `changefreq` set hợp lý
- [ ] Submit GSC → check coverage report (sau 7 ngày)
- [ ] Robots.txt:
  ```
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /tai-khoan/
  Sitemap: https://giaibaitap247.com/sitemap.xml
  ```

#### 1B.10.3 Social Setup ⭐⭐

- [ ] Facebook Page "Giải Bài Tập"
- [ ] YouTube channel (sau này quay video bài giảng)
- [ ] TikTok account (kéo Gen Z phase 2)
- [ ] Zalo OA (Official Account, miễn phí cho dưới 100 follower)

#### 1B.10.4 Backup & Disaster Recovery ⭐⭐⭐

- [ ] **DB backup** Railway: tự động daily, giữ 7 ngày
- [ ] **Manual backup** weekly: `pg_dump` → Google Drive
- [ ] **Code backup**: GitHub (auto khi push)
- [ ] **Cloudinary backup**: monthly download tar
- [ ] **Document recovery procedure**: tài liệu `docs/disaster-recovery.md`
  - Tình huống 1: Vercel down → fallback sao
  - Tình huống 2: Railway down → migrate DB
  - Tình huống 3: Domain bị mất → recovery
  - Tình huống 4: AdSense banned → diversify revenue

> **Trạng thái 1B.10:** ❌. Deadline: cuối Phase 1B (cùng AdSense apply).

---

> ✅ **PHASE 1 COMPLETE CRITERIA (cuối Phase 1B):**
> - [ ] Phase 1A pass milestone (FE shell stable, Lighthouse ≥ 80)
> - [ ] Strapi + Railway hoạt động, mọi page fetch real data OK
> - [ ] Web hoạt động ổn định, uptime > 99%
> - [ ] ≥ 200 bài chất lượng publish
> - [ ] AdSense apply (đang chờ duyệt)
> - [ ] Traffic organic ≥ 1,000 PV/tháng
> - [ ] 5 trang pháp lý đầy đủ + ads.txt + sitemap submitted
> - [ ] GA4 + GSC + Clarity tracking đầy đủ

---


## PHASE 2 – GROWTH & MONETIZATION (Tháng 4-24)

### 2.1 Architecture Scale-up

> **Mục tiêu 2.1:** Khi traffic > 100k PV/tháng, hạ tầng không bottleneck. Khi vượt 1M PV/tháng, có roadmap scale rõ ràng.

- [ ] **Smoke test prerequisite (BẮT BUỘC trước khi scale):** Phase 1 đã đạt 6 criteria → mới sang phase 2
- [ ] Vẽ scale-up diagram chi tiết → `docs/scale-architecture.md`
- [ ] Xác định bottleneck dataflow:
  ```
  User → Cloudflare → Vercel Edge → Strapi API → PostgreSQL
                                         ↘ Redis cache (HOT)
                                         ↘ Meilisearch (search)
  ```
- [ ] **Scale tiers theo traffic:**
  - Tier 1 (0-100k PV/tháng): Vercel free + Railway $5
  - Tier 2 (100k-1M): Vercel Pro $20 + Railway $20 + Cloudflare cache rules
  - Tier 3 (1M-10M): tách Strapi cluster + read replica DB + Redis Cluster
- [ ] **Thiết kế DB partition** khi > 10,000 bài:
  - Index trên `(lop, mon, loai, bo_sach)`
  - Partition theo lớp nếu > 100,000 records
- [ ] **CDN cache rules (Cloudflare):**
  - HTML: 1 hour
  - Static assets: 1 year, immutable
  - API responses: 5 minutes (Cache-Control header)
- [ ] Add **Redis layer** trên Railway khi > 1k req/min

---

### 2.2 Implementation - Mở rộng Modules

#### 2.2.1 Subdomain `khoahoc.giaibaitap247.com` (Tháng 10-12)
> ⚠️ **Ghi chú reuse:** KHÔNG dùng LearnDash WordPress (bạn đang Next.js). Build trên cùng Next.js codebase, deploy alias subdomain.
- [ ] `web/app/(khoahoc)/` route group, deploy với domain alias trên Vercel
- [ ] Schema: `KhoaHoc`, `BaiHoc`, `DangKy`, `ThanhToan`
- [ ] Video player: Mux (free tier) hoặc Cloudflare Stream
- [ ] Payment integration: VNPay + Momo + ZaloPay
- [ ] Testbenches: payment flow, video access control, refund

#### 2.2.2 Subdomain `thi.giaibaitap247.com` (Tháng 7-9)
- [ ] `app/(thi)/` cho trắc nghiệm online
- [ ] Schema: `DeTracNghiem`, `CauHoi`, `LuaChon`, `KetQua`
- [ ] Logic chấm điểm + giải thích đáp án
- [ ] Bảng xếp hạng theo tuần/tháng

#### 2.2.3 Subdomain `hoidap.giaibaitap247.com` (Tháng 13-18)
- [ ] Q&A engine: schema `CauHoi`, `CauTraLoi`, `Vote`, `User`
- [ ] Moderation queue
- [ ] Spam protection: hCaptcha + rate limit
- [ ] Notification: email khi câu hỏi có trả lời mới
- [ ] ⚠️ **Rủi ro spam (cao):** chuẩn bị hệ thống flagging + ban user. Thời gian setup moderation: ~2 tuần

#### 2.2.4 Subdomain `tuyensinh.giaibaitap247.com` (Tháng 6-7, mùa thi)
- [ ] Schema: `Truong`, `Nganh`, `MaTuyenSinh`, `DiemChuan` (timeseries)
- [ ] Crawler điểm chuẩn các năm từ trang chính thức trường (tự xin permission)
- [ ] Filter: theo khối, theo điểm, theo địa phương
- [ ] Tool: ước tính khả năng đỗ (input điểm + nguyện vọng)

#### 2.2.5 App Mobile (Tháng 18-24)
- [ ] **React Native** (vì có thể share code với web Next.js logic)
- [ ] Tính năng MVP: xem bài giải offline, push notif, làm trắc nghiệm
- [ ] Backend: dùng chung Strapi API
- [ ] Monetization: AdMob + In-app purchase (gỡ ads $1.99)
- [ ] ⚠️ **Rủi ro deadline (cao):** App dev cho newbie là việc lớn. Có thể outsource phần native ($1k-3k freelance VN)

#### 2.2.6 Fusion / Integration Module (Cross-subdomain SSO)
- [ ] `auth/` module: dùng chung user account giữa main + khoahoc + hoidap
  ```
  // Flow:
  // Login on main → JWT cookie domain .giaibaitap247.com
  // → tự động valid trên mọi subdomain
  ```
  - Priority: Main → Khoahoc (paid) > Thi > Hoidap

#### 2.2.7 External Interfaces
- [ ] AdSense API (programmatic reports)
- [ ] Affiliate API: Accesstrade postback
- [ ] Payment webhook: VNPay IPN, Momo callback
- [ ] Google Indexing API (push bài mới index nhanh)

#### 2.2.8 Top-level Integration
- [ ] Single search across subdomains (Meilisearch multi-index)
- [ ] Cross-promotion banners
- [ ] Unified analytics dashboard

---

### 2.3 Functional Verification (QA cho Production)

#### Unit Tests (Vitest + React Testing Library)
- [ ] `lib/url.test.ts`: tất cả URL builder edge cases
- [ ] `lib/seo.test.ts`: meta template không bị truncate
- [ ] `components/article/MathRenderer.test.tsx`: KaTeX render đúng
- [ ] `lib/strapi.test.ts`: API client error handling

#### Integration Tests (Playwright)
- [ ] `e2e/article-flow.spec.ts`: search → click → đọc bài → bookmark
- [ ] `e2e/payment-flow.spec.ts` (phase khoahoc): chọn khoá → pay → xem video
- [ ] `e2e/quiz-flow.spec.ts`: làm trắc nghiệm → submit → xem điểm

#### Coverage Targets
- [ ] Code coverage > 60% (lib/, components/article/)
- [ ] E2E coverage: 5 user journey chính phải pass
- [ ] Corner cases: URL có dấu, slug trùng, content có XSS

---

### 2.4 SEO Offpage & Backlink Strategy

> **Nguyên tắc:** Backlink "tự nhiên + chất lượng" — KHÔNG mua link rẻ trên forum spam (Google penalty).

- [ ] **Tháng 4-6 — Foundation backlinks (10-20 links chất lượng)**
  - Đăng bài guest post trên blog giáo dục lớn (Edu2Review, Dân trí trang giáo dục)
  - Tham gia forum giáo viên (Diễn đàn giáo dục - dayhocintel.org)
  - Submit lên thư mục: Yahoo VN directory, Vietnam Edu Directory
  - Comment chuyên môn trên TaiLieu.vn, VnDoc với link profile

- [ ] **Tháng 7-12 — Scale backlinks (50-100 links)**
  - Group Facebook học sinh: chia sẻ bài có giá trị, không spam link
  - YouTube channel: video bài giảng, embed bài viết, kéo backlink từ description
  - TikTok ngắn 30-60s: mẹo nhớ công thức, dẫn đến bài viết
  - PR baøi báo: VnExpress, Dân trí (bài về xu hướng giáo dục, tự nhiên mention)

- [ ] **Tháng 13-24 — Authority links**
  - Cộng tác với trường học/giáo viên (cho dùng nội dung free → backlink)
  - Sponsor sự kiện giáo dục (small budget)
  - Tích hợp với edu marketplace (EduFun, Top1Tot, etc.)

- [ ] **Toxic link audit** mỗi quý
  - Dùng GSC Links report
  - Disavow những link spam được trỏ đến

> ⚠️ **Rủi ro Penguin penalty (cao nếu mua link):** KHÔNG mua link 50k-200k trên dichvu-seo. Mất hơn được nhiều.

---

### 2.5 Monetization Activation (4 nguồn)

#### 2.5.1 Google AdSense (Tháng 4+) ⭐⭐⭐
- [x] Apply (xem 1B.9.2)
- [ ] Optimize placement sau 30 ngày data:
  - Đo CTR/RPM theo position (Header vs In-article #1 vs #2 vs Sidebar)
  - Loại bỏ vị trí RPM < $0.30
  - A/B test kích thước ad (300x250 vs 336x280 vs responsive)
- [ ] Mục tiêu RPM theo tháng:
  - Tháng 4-6: $0.4-0.7 (mới, chưa optimize)
  - Tháng 7-12: $0.8-1.2 (optimized)
  - Năm 2: $1.5-2.5 (audience mature)
- [ ] **Pass criterion:** RPM ≥ $1 trước cuối năm 1

#### 2.5.2 Affiliate Marketing (Tháng 6+) ⭐⭐⭐
- [ ] Đăng ký Accesstrade VN (BẮT BUỘC có web > 1k traffic/ngày)
- [ ] Đăng ký Shopee Affiliate
- [ ] Đăng ký Tiki Affiliate (sách)
- [ ] Insert affiliate link CHỌN LỌC (không spam):
  - Bài Toán → link Casio fx-580VN-X (Shopee)
  - Bài Văn → link sách Văn Mẫu Tuyển Tập (Tiki/Fahasa)
  - Bài luyện thi → link sách luyện thi Megabook (Tiki)
  - Bài lập trình → link laptop sinh viên (Lazada)
- [ ] Banner sidebar: rotate 3-5 banner affiliate
- [ ] Disclosure rõ ràng: footer mỗi bài + trang Affiliate Disclosure
- [ ] Track conversion: UTM tag + Accesstrade dashboard
- [ ] **Mục tiêu**: $50-200/tháng tháng 6, $300-1000/tháng tháng 12

#### 2.5.3 Khoá học trả phí (Tháng 10-12) ⭐⭐⭐
- [ ] Validate demand TRƯỚC: gửi email khảo sát 1k user → có ai sẵn sàng trả 500k cho khoá?
- [ ] Nếu < 5% → KHÔNG làm khoá học, focus AdSense + Affiliate
- [ ] Nếu ≥ 5% → MVP 1 khoá đầu tiên:
  - "Luyện thi TN THPT Toán 12 - 30 buổi" (giá 500k-800k)
  - 30 video × 30 phút = 15h content
  - Quay tự (cần webcam tốt + mic + OBS)
  - Hoặc thuê giáo viên ($50-100/buổi quay)
- [ ] Platform: tự build trên Next.js (xem 2.2.1) hoặc bán qua Kyna/Edumall (chia 50% nhưng có sẵn audience)

#### 2.5.4 Bonus: Bán giáo án + sách PDF (Tháng 6+) ⭐⭐
- [ ] Section `/giao-an` cho giáo viên
- [ ] Giá 5k-50k/giáo án
- [ ] Thanh toán: chuyển khoản + auto deliver email
- [ ] Doanh thu kỳ vọng: $50-200/tháng (low effort)

---

### 2.6 Sign-off / Quarterly KPI Review

> **Format:** Mỗi quý (3 tháng) review toàn diện, ghi vào `docs/quarterly-reviews/`.

#### Quý 1 (Tháng 1-3) Review
- [ ] Traffic actual vs target
- [ ] Bài viết actual vs target (200)
- [ ] AdSense status (approved/pending/rejected)
- [ ] Bug list & fix
- [ ] Burn rate vs ngân sách
- [ ] Decision point: tiếp tục Next.js? Đổi WordPress? Hire CTV?

#### Quý 2 (Tháng 4-6)
- [ ] AdSense earning thực tế vs mục tiêu
- [ ] Top 10 bài traffic cao nhất → analyze pattern
- [ ] Backlink growth
- [ ] Lighthouse score evolution

#### Quý 3-8 (Tháng 7-24)
- [ ] Tương tự, thêm review từng module mới (khoahoc, thi, app)

> ⚠️ **Targets có thể không đạt với resource solo + < 100tr.** Nếu sau Q2 vẫn không có doanh thu → seriously consider:
> - Phương án A: Pivot sang ngách hẹp (chỉ Toán 12 luyện thi) — thắng nhỏ, focus
> - Phương án B: Tìm partner / co-founder
> - Phương án C: Bán site cho người khác (web có content giá trị, có thể bán $5-20k)

---

### 2.7 Ecosystem Integration (Năm 2)

- [ ] Clone Vercel project staging:
  ```bash
  vercel clone giaibaitap-prod giaibaitap-staging
  ```
- [ ] Migrate khoá học subdomain
- [ ] Map signals user cross-platform:
  - Web user_id ↔ App user_id ↔ Email subscriber ↔ Khoá học enrollment
- [ ] Newsletter campaign: build list 10k+ email, gửi weekly
- [ ] YouTube channel: 50+ video bài giảng → 10k subscriber
- [ ] TikTok: 100+ video ngắn → 20k follower
- [ ] Chạy precheck trước khi scale lớn: `pnpm run audit:full`
- [ ] Fix violations: vi phạm AdSense policy, copyright complaint, broken links

---

### 2.8 Final Submission / Year 2 Goals

- [ ] **Tháng 18:** Đăng ký công ty TNHH MTV (nếu doanh thu > 200tr/tháng)
- [ ] **Tháng 18:** Đăng ký với Bộ Công Thương (Nghị định 52)
- [ ] Upload deliverables:
  - Hệ sinh thái: web + app + YouTube + TikTok + Email
  - Doanh thu mix: AdSense + Affiliate + Khoá học + Giáo án + Sponsor
- [ ] Submit profile lên các bảng xếp hạng web giáo dục VN
- [ ] Chờ event/window mùa thi (Tháng 5-7) — peak traffic
- [ ] **Milestone cuối Năm 2:** 🎯
  - 10M pageview/tháng
  - $30k+/tháng doanh thu
  - Top 5 web giáo dục VN
  - Có thể bán hoặc gọi vốn ($500k-2M valuation cho site này)
- [ ] Post-delivery: maintenance mode, hire team, lên CEO

---

## Timeline Ước Tính (FE-first)

| Phase | Công việc | Thời gian | Rủi ro kiểm soát |
|-------|-----------|-----------|------------------|
| **1A.1** | Setup tài khoản FE + DNS + local dev | 1 tuần | Trung bình (newbie) |
| **1A.2** | Học Next.js + Tailwind + Git | song song tuần 1-2 | Trung bình |
| **1A.3** | Keyword research + URL structure | 1 tuần | Thấp |
| **1A.4** | Architecture + init Next.js repo | 0.5 tuần | Trung bình |
| **1A.5** | Init Next.js + deploy Vercel + connect domain | 1 tuần | **CAO** (newbie tắc) |
| **1A.6** | Build UI Shell (Header, Footer, Nav) | 1 tuần | Trung bình |
| **1A.7** | Build mọi Page Template với placeholder | 1.5 tuần | Trung bình |
| **1A.8** | SEO templates + Schema markup | 0.5 tuần | Thấp |
| **1A.9** | UX Features (search UI, ToC, dark mode...) | 1 tuần | Trung bình |
| **1A.10** | Performance optimization | 0.5 tuần | Thấp (nếu theo guide) |
| **1A.11** | 5 trang pháp lý + ads.txt + manifest | 0.5 tuần | Thấp |
| **1A.12** | FE Milestone Verification | 0.5 tuần | Thấp |
| **Phase 1A tổng** | **FE shell hoàn chỉnh, deploy `giaibaitap247.com`** | **~6 tuần** | |
| **1B.1** | Setup tài khoản BE (Railway, Cloudinary, Resend) | 0.5 tuần | Thấp |
| **1B.2** | Học Strapi v5 | 0.5 tuần | Thấp |
| **1B.3** | Chuẩn bị tài nguyên SGK + content templates | 1 tuần | Thấp |
| **1B.4** | Strapi schema design | 0.5 tuần | Trung bình |
| **1B.5** | Init Strapi + deploy Railway | 1 tuần | **CAO** (newbie tắc) |
| **1B.6** | Wire FE → BE (replace placeholder) | 1 tuần | Trung bình |
| **1B.7** | CMS workflow + bulk import + indexes | 0.5 tuần | Thấp |
| **1B.8** | 200 bài content pilot | 6-8 tuần (parallel) | **CAO** (burnout risk) |
| **1B.9** | AdSense application | 1 tuần (+ chờ duyệt 1-4 tuần) | Trung bình |
| **1B.10** | Pre-launch verification (analytics, sitemap, backup) | 1 tuần | Thấp |
| **Phase 1B tổng** | **BE wired, content ≥ 200 bài, AdSense applied** | **~8-10 tuần** | |
| **Phase 1 tổng** | | **~14-16 tuần (3.5-4 tháng)** | |
| 2.1 | Scale-up architecture | 1-2 tuần | Thấp |
| 2.2 | Subdomain modules (5 modules) | 6 tháng | Cao (rộng + sâu) |
| 2.3 | QA + testing | 1-2 tuần | Trung bình |
| 2.4 | SEO offpage + backlink | Liên tục 18 tháng | Cao (cần kiên nhẫn) |
| 2.5 | Monetization full activation | 6 tháng | Trung bình |
| 2.6 | Quarterly KPI review | 1 ngày × 8 quý | Bắt buộc |
| 2.7 | Ecosystem integration | 6 tháng | Cao |
| 2.8 | Final submission Year 2 | 2 tuần | Trung bình |
| **Phase 2 tổng** | | **~80-90 tuần (~20 tháng)** | |
| **Buffer** | Dự phòng debug, ốm đau, làm lại | 8-10 tuần | Bắt buộc |
| **Tổng dự án** | | **~100-110 tuần (~24-26 tháng)** | |

> ⚠️ Timeline gốc trong brief 24 tháng phù hợp giả định **team 5-10 người**. Với **solo + newbie**, timeline thực tế:
> - **Phase 1A (FE)**: 6 tuần — newbie học Next.js focused
> - **Phase 1B (BE + content)**: 8-10 tuần — Strapi + 200 bài
> - **AdSense duyệt**: tuần 14-18 (~tháng 4-5) — realistic
> - **$30k/tháng**: tháng 30-36 (không phải 24) — solo không scale nhanh được
> Nếu vẫn muốn 24 tháng → **bắt buộc thuê CTV/dev từ tháng 4** sau khi có dòng tiền AdSense.

---

## Metrics Mục Tiêu

> **Cập nhật 2026-05-09:** Targets điều chỉnh giảm 60-90% so với brief gốc do solo + newbie + < 100tr.

### Traffic Targets

| Mốc | Config | Current (đã đo) | Final Target | Pass Criterion |
|-----|--------|-----------------|--------------|----------------|
| **Tuần 6** | Cuối Phase 1A | **0** | FE shell live, 0 PV (chưa content) | Lighthouse ≥ 80 |
| **Tháng 4** | Cuối Phase 1B | **0** | ≥ 1,000 PV/tháng | ≥ 500 PV |
| **Tháng 6** | Sau AdSense + 500 bài | **0** | ≥ 30,000 PV/tháng | ≥ 15,000 PV |
| **Tháng 12** | Hết năm 1 | **0** | ≥ 500,000 PV/tháng | ≥ 200,000 PV |
| **Tháng 18** | Năm 2 mid | **0** | ≥ 3M PV/tháng | ≥ 1M PV |
| **Tháng 24** | Hết năm 2 | **0** | ≥ 10M PV/tháng | ≥ 3M PV |

> ⚠️ Targets 10M PV có thể không đạt nếu không có team. Nếu Q3 (tháng 9) chưa đạt 30k PV → seriously reduce target hoặc đổi chiến lược.

### Revenue Targets

| Nguồn | Tháng 6 | Tháng 12 | Tháng 24 |
|-------|---------|----------|----------|
| AdSense | $30-100 | $300-1,000 | $5,000-15,000 |
| Affiliate | $0 | $200-500 | $1,000-3,000 |
| Khoá học | $0 | $0-500 | $5,000-15,000 |
| App + Khác | $0 | $0 | $1,000-3,000 |
| **Tổng** | **~$50** | **~$700** | **~$15-25k** |

> ⚠️ Brief gốc target $30-100k/tháng — không thực tế cho solo. Mục tiêu **realistic** là $15-25k/tháng cuối năm 2 — đã rất tốt cho solo founder.

### Technical Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance Mobile | ≥ 80 |
| LCP | < 1.8s |
| CLS | < 0.05 |
| INP | < 100ms |
| Uptime | > 99.5% |
| Sitemap coverage (GSC) | > 95% indexed |
| AdSense violations | 0 |
| Copyright DMCA strikes | 0 |
| Site speed (Cốc Cốc, mobile VN) | < 2s |

### Content Quality Targets

| Metric | Target |
|--------|--------|
| Bài có > 800 chữ | > 90% |
| Bài có ảnh/sơ đồ | > 70% |
| Bài có công thức KaTeX (Toán/Lý/Hoá) | 100% (môn liên quan) |
| Bài có FAQ + Schema | > 50% |
| Bounce rate trung bình | < 65% |
| Time on page trung bình | > 90s |
| Trùng lặp Copyscape | < 15% |

---

## Tài Liệu Tham Khảo

| Nguồn | Nội dung | Link |
|-------|----------|------|
| Next.js 14 Docs | App Router + ISR + Metadata API | https://nextjs.org/docs |
| Strapi v5 Docs | Headless CMS, content-types, webhook | https://docs.strapi.io |
| Vercel Docs | Deploy, env vars, edge config | https://vercel.com/docs |
| Google AdSense Program Policies | Quy định nội dung + ad placement | https://support.google.com/adsense/answer/48182 |
| Google Search Central | SEO best practices, schema | https://developers.google.com/search |
| Schema.org (LearningResource) | Schema cho nội dung giáo dục | https://schema.org/LearningResource |
| Web.dev Core Web Vitals | LCP/INP/CLS optimization | https://web.dev/vitals/ |
| KaTeX Docs | Render công thức Toán | https://katex.org |
| VietJack.com | Reference đối thủ #1 | https://vietjack.com |
| Loigiaihay.com | Reference đối thủ #2 | https://loigiaihay.com |
| Bộ GD&ĐT | Đề thi chính thức + chương trình | https://moet.gov.vn |
| NXB Giáo dục VN | SGK 3 bộ | https://hanhtrangso.nxbgd.vn |
| Mắt Bão | Đăng ký domain .com.vn | https://matbao.net |
| Accesstrade VN | Affiliate network lớn nhất VN | https://accesstrade.vn |
| Cookieyes | Cookie consent banner free | https://www.cookieyes.com |
| Microsoft Clarity | Heatmap + recording free | https://clarity.microsoft.com |
| Cloudflare | DNS + CDN + WAF free | https://cloudflare.com |
| Railway | Hosting Strapi + DB | https://railway.app |
| Cloudinary | Image hosting free 25GB | https://cloudinary.com |
| Meilisearch | Self-host search engine | https://www.meilisearch.com |
| Resend | Email transactional free 3k/tháng | https://resend.com |

---

## Roadmap 30-60-90 Ngày Đầu (Action Plan FE-first)

### 30 ngày đầu — Phase 1A Sprint (Front-end)

**Tuần 1: Setup + Học FE**
- D1-2: Đăng ký domain + tạo tài khoản FE (GitHub, Vercel, Cloudflare)
- D3-7: Học Next.js + Tailwind (~6h/ngày) + làm xong keyword research 200 từ + URL structure

**Tuần 2: Init Codebase + Deploy "Hello World"**
- D8-9: Init Next.js project, deploy "Hello World" lên Vercel
- D10-11: Connect domain + Cloudflare DNS, HTTPS hoạt động
- D12-14: Build UI Shell (Header, Footer, Sidebar, MobileNav)

**Tuần 3: Build Page Templates với placeholder**
- D15-17: Trang chủ + landing lớp + landing môn (Lorem ipsum)
- D18-21: Bài chi tiết + soạn văn + đề thi + trắc nghiệm + tìm kiếm (Lorem ipsum)

**Tuần 4: SEO + UX Features + Pháp lý**
- D22-24: SEO templates (lib/seo.ts) + Schema markup + sitemap/robots
- D25-27: UX features (search UI mock, ToC, breadcrumb, dark mode, share, prev/next)
- D28-30: 5 trang pháp lý (Privacy, Terms, About, Contact, DMCA) + ads.txt + manifest

🎯 **End of D30 deliverable:** FE shell live tại `giaibaitap247.com` với mọi route render OK (placeholder), 5 trang pháp lý xong, Lighthouse mobile ≥ 70.

### 60 ngày — Phase 1A Polish + Phase 1B Start

**Tuần 5-6: Phase 1A Polish**
- Performance optimization (LCP < 2s, bundle < 100KB)
- Lighthouse mobile ≥ 80 trên 5 page tiêu biểu
- Mobile responsive fix mọi edge case
- Pass FE Milestone Verification 1A.12 → chuyển sang 1B

**Tuần 7-8: Phase 1B Setup + Strapi**
- Setup tài khoản Railway + Cloudinary + Resend
- Học Strapi v5 (~4h)
- Chuẩn bị SGK reference + content templates
- Strapi schema design + init Strapi + deploy Railway
- Tạo 5 bài demo trong Strapi admin

🎯 **End of D60:** FE shell stable + Strapi live trên Railway + 5 bài demo trong CMS.

### 90 ngày — Wire FE-BE + Content Push + AdSense

**Tuần 9-10: Wire FE → BE + Content Sprint**
- Replace placeholder bằng `fetch()` Strapi (lib/strapi.ts)
- Webhook revalidate hoạt động end-to-end
- Bắt đầu sản xuất content: 4-5 bài/ngày → ~50-60 bài
- Sitemap động từ Strapi + submit GSC

**Tuần 11-12: Content Push + AdSense Apply**
- Tiếp tục content: target ~100-150 bài tổng (với AI assist 35-40 phút/bài)
- Setup GA4 + GSC + Clarity tracking đầy đủ
- Submit AdSense application
- Backlink phase 1: 10 guest post, group Facebook

🎯 **End of D90:** ~100-150 bài chất lượng, AdSense applied (chờ duyệt), traffic ~500-2,000 PV/tháng (organic mới khởi động).

> ⚠️ **Note:** Roadmap này lùi target content từ 200 → 150 bài tại D90 vì tách FE/BE giúp newbie học chắc nhưng tốn thêm ~1 tuần. Bù lại: chất lượng FE cao hơn, ít bug, dễ scale ở Phase 2.

---

## Việc làm hàng ngày (Daily Routine — Solo Founder)

```
8h-9h:    Review task file → tick task → quyết định task hôm nay
9h-12h:   Deep work block 1 — viết bài / code feature (3h)
12h-13h:  Nghỉ
13h-15h:  Deep work block 2 — viết bài / code (2h)
15h-16h:  Admin: email, Facebook, GSC check, GA4 check
16h-18h:  Deep work block 3 — viết bài (2h)
18h-19h:  Nghỉ + ăn
19h-20h:  Học (khoá học YouTube, đọc Next.js docs)
20h-21h:  Buffer (làm thêm task gấp / nghỉ ngơi tuỳ ngày)
```

**Năng suất kỳ vọng:**
- Phase 1A (tuần 1-6): focus code FE, ít content
- Phase 1B (tuần 7+): 4-6 bài/ngày sau khi BE wire xong
- 1 feature kỹ thuật/tuần
- 1 quyết định lớn/tuần (review weekly)

**Chủ Nhật:** OFF hoặc chỉ review task file 30 phút (không viết bài).

---

> **Cuối cùng:** File task này là **bản đồ 24 tháng**. Đừng cố làm hết trong 1 tháng. Từng bước, từng bước. Solo founder không thua vì không thông minh — thua vì burnout do làm quá nhanh hoặc bỏ cuộc do không thấy tiến độ. File này giúp bạn thấy tiến độ rõ ràng, tránh cả 2 bẫy.

> **Triết lý FE-first:** Giao diện user nhìn thấy + thao tác phải hoàn chỉnh trước khi đụng đến backend. Lý do: (1) newbie học 1 stack tại 1 thời điểm, (2) deploy FE nhanh tạo cảm giác tiến độ, (3) khi BE wire vào chỉ cần thay placeholder bằng fetch() — không phải refactor lại UI.

> **Nhắc lại:** Mỗi Chủ Nhật mở file này, tick task tuần qua, update Header trạng thái, commit Git. Đó là kỷ luật quan trọng nhất của founder solo.

🚀 **Chúc dự án giaibaitap247.com thành công!**
