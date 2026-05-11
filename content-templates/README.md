# Content Templates

Templates cho 5 loại bài viết phục vụ content production pipeline (Phase 1B.7-1B.8).

| Template | Strapi `loai` | Khi dùng |
|---|---|---|
| [template-bai-giai-sgk.md](template-bai-giai-sgk.md) | `giai-sgk` | Bài giải SGK Toán/Lý/Hoá/Sinh |
| [template-soan-van.md](template-soan-van.md) | `soan-van` | Soạn văn 3 phiên bản (Hay nhất / Ngắn / Siêu ngắn) |
| [template-de-thi.md](template-de-thi.md) | n/a (`de-thi` content type) | Đề thi + đáp án |
| [template-trac-nghiem.md](template-trac-nghiem.md) | n/a (`trac-nghiem` content type) | Bộ câu hỏi trắc nghiệm online |
| [template-ly-thuyet.md](template-ly-thuyet.md) | `ly-thuyet` | Lý thuyết tổng hợp + công thức |

## Workflow

1. Mở template phù hợp với loại bài cần viết
2. Copy frontmatter → fill vào Strapi admin (Content Manager → tạo entry mới)
3. Copy "Cấu trúc nội dung" markdown → paste vào field `noi_dung` (hoặc `cau_hoi` cho trắc nghiệm)
4. Điền nội dung theo template, tuân thủ "Quy tắc viết" cuối mỗi template
5. Lưu draft → review → Publish

## Style guide chung

- **Markdown headings**: `##` cho section chính, `###` cho subsection (auto vào Table of Contents)
- **Math**: KaTeX `$...$` (inline) và `$$...$$` (block)
- **Bold**: `**text**` cho khái niệm quan trọng
- **Blockquote**: `> text` cho định lý / công thức nổi bật
- **Bảng**: dùng cho công thức / đáp án trắc nghiệm
- **Image**: upload qua Strapi media → markdown `![alt text](url)` (Cloudinary CDN)

## Bản quyền

- ❌ KHÔNG copy nguyên văn lời giải/phân tích từ vietjack.com, loigiaihay.com, tailieumoi.vn
- ❌ KHÔNG re-host PDF SGK
- ✅ Trích đề bài (fair use giáo dục) — paraphrase nếu copy đoạn dài
- ✅ Lời giải tự viết 100%
- ✅ Footer mỗi bài: "Lời giải do giaibaitap247.com biên soạn"
- ✅ Sẵn sàng takedown trong 24h nếu nhận DMCA

## Anti-plagiarism

- Quillbot paraphrase trước publish
- Copyscape free tier check (1 bài / lần)
- Mục tiêu: < 10% similarity với top 10 results trên Google cho cùng query
