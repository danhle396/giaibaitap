# Model Selection Guide — giaibaitap.com.vn

> **Nguyên tắc:** Haiku cho volume cao / đơn giản. Sonnet cho code + content chất lượng. Opus chỉ khi thực sự bí.
>
> **Models:** `haiku` = claude-haiku-4-5 | `sonnet` = claude-sonnet-4-6 | `opus` = claude-opus-4-7

---

## PHASE 1A — FRONT-END

| Task | Model | Lý do |
|------|-------|-------|
| Hỏi khái niệm Next.js / Tailwind | haiku | Q&A đơn giản |
| Viết component UI nhỏ (Button, Card, Badge) | haiku | Template lặp lại |
| Viết layout lớn (Header, Footer, Sidebar) | sonnet | Nhiều logic, responsive phức tạp |
| Build page template (bài chi tiết, listing) | sonnet | ISR config + generateStaticParams |
| Viết lib/url.ts + lib/seo.ts | sonnet | Logic cần chính xác, TypeScript types |
| Viết Schema JSON-LD (Article, Breadcrumb, FAQ) | sonnet | Cần đúng spec Schema.org |
| Config tailwind.config.ts + next.config.js | haiku | File config ngắn |
| Fix lỗi CSS / responsive nhỏ | haiku | Scope hẹp |
| Debug layout shift (CLS) / LCP phức tạp | sonnet | Cần phân tích sâu |
| Viết 5 trang pháp lý (Privacy, Terms...) | haiku | Nội dung template, ít sáng tạo |
| Setup PWA manifest + service worker | haiku | Boilerplate config |
| Viết dark mode toggle + localStorage logic | haiku | Logic đơn giản |
| Viết ToC auto-extract H2/H3 | sonnet | DOM traversal + sticky scroll logic |
| Viết Search box autocomplete UI | sonnet | State management + keyboard nav |
| Viết Share buttons (window.open) | haiku | Logic đơn giản |
| Performance audit + fix bundle size | sonnet | Cần phân tích output next build |

---

## PHASE 1B — BACK-END

| Task | Model | Lý do |
|------|-------|-------|
| Thiết kế Strapi content type schema | sonnet | Cần nghĩ quan hệ giữa các type |
| Viết config/database.ts (PostgreSQL) | haiku | Boilerplate config |
| Viết lib/strapi.ts (API client) | sonnet | TypeScript types + cache tags + error handling |
| Viết app/api/revalidate/route.ts (webhook) | haiku | Logic ngắn, template rõ ràng |
| Viết generateStaticParams() từ Strapi | haiku | Fetch + map slug, lặp đi lặp lại |
| Replace placeholder → fetch() Strapi thật | haiku | Thay thế cơ học, không phức tạp |
| Viết sitemap động từ Strapi | haiku | Fetch + format XML |
| Debug Strapi API / CORS / Railway deploy | sonnet | Cần trace lỗi phức tạp |
| Viết bulk-import.ts (Markdown → Strapi) | sonnet | File I/O + API + error handling |
| Setup Meilisearch index + search route | sonnet | Config multi-field search |
| Debug Railway deploy fail / env vars | opus | Production incident, cần chẩn đoán nhanh |

---

## CONTENT PRODUCTION (Phase 1B.8)

| Task | Model | Lý do |
|------|-------|-------|
| **Draft bài giải Toán 12 / Lý / Hoá** | **haiku** | Template cố định, công thức KaTeX rõ ràng |
| **Draft bài giải Toán 9** | **haiku** | Tương tự, phức tạp vừa |
| **Draft soạn văn (phiên bản Ngắn nhất / Siêu ngắn)** | **haiku** | Tóm tắt ngắn, ít phân tích |
| **Draft soạn văn (phiên bản Hay nhất)** | **sonnet** | Cần phân tích văn học sâu, diễn đạt tốt |
| **Draft lý thuyết + công thức** | **haiku** | Liệt kê công thức, ít sáng tạo |
| **Draft đề thi + đáp án** | **sonnet** | Cần kiểm tra tính chính xác của đáp án |
| Verify / edit lại draft AI (bước 2 workflow) | — | Founder tự làm, không dùng AI |
| Viết meta title + description cho bài | haiku | Điền template SEO_TEMPLATES sẵn có |
| Viết FAQ cuối bài (3-5 câu hỏi) | haiku | Template Q&A lặp lại |
| Paraphrase đoạn bị Copyscape flag | haiku | Rewrite ngắn |

---

## SEO & ANALYTICS

| Task | Model | Lý do |
|------|-------|-------|
| Keyword research — hỏi gợi ý cluster | sonnet | Cần hiểu search intent |
| Phân tích competitor (VietJack, Loigiaihay) | sonnet | Cần phán đoán chiến lược |
| Viết content brief cho 1 cluster từ khoá | haiku | Outline ngắn |
| Hỏi cách fix GSC coverage error | haiku | Q&A tra cứu |
| Phân tích Lighthouse report + gợi ý fix | sonnet | Cần hiểu CWV metrics |
| Setup GA4 event tracking | haiku | Config copy-paste |

---

## PHASE 2 — SCALE & MONETIZATION

| Task | Model | Lý do |
|------|-------|-------|
| Thiết kế architecture scale-up (Redis, replica) | opus | High-stakes, cần reasoning sâu |
| Viết Playwright e2e test | sonnet | Logic test phức tạp |
| Viết unit test (Vitest) | haiku | Test đơn giản, lặp lại |
| Setup payment VNPay / Momo webhook | sonnet | Security-sensitive, cần chính xác |
| Thiết kế cross-subdomain SSO (JWT cookie) | opus | Auth architecture phức tạp |
| Build trắc nghiệm interactive (quiz engine) | sonnet | State management phức tạp |
| Setup Meilisearch multi-index | sonnet | Config nâng cao |
| Viết newsletter email template | haiku | HTML email template |
| React Native app architecture | opus | Cross-platform, cần kinh nghiệm sâu |

---

## QUY TẮC CHUNG

```
Nếu task có thể mô tả bằng 1 câu rõ ràng      → haiku
Nếu task cần suy nghĩ nhiều bước               → sonnet
Nếu task ảnh hưởng production / security / arch → opus

Nếu không chắc → thử haiku trước, không đủ mới lên sonnet
```

### Ước tính chi phí (API pricing, ~2026)

| Model | Input (M tokens) | Output (M tokens) | 200 bài draft |
|-------|-----------------|-------------------|---------------|
| Haiku 4.5 | $0.80 | $4.00 | ~$1-2 |
| Sonnet 4.6 | $3.00 | $15.00 | ~$5-8 |
| Opus 4.7 | $15.00 | $75.00 | ~$25-40 |

> Dùng Haiku cho bulk content (200 bài) tiết kiệm 10-20x so với Opus.
> Dùng Sonnet cho code thay vì Opus tiết kiệm 5x.

---

*Cập nhật: 2026-05-09*
