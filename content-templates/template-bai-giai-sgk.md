# Template: Bài giải SGK (Toán/Lý/Hoá/Sinh)

> Dành cho: bài giải bài tập trong sách giáo khoa các môn tự nhiên (Toán, Vật Lý, Hoá Học, Sinh Học)
> Mục tiêu SEO: keyword chính `giải [môn] lớp [N] bài [X] [tên bài]` + long-tail `bài [X] trang [P] sgk [môn] [N]`

---

## Frontmatter (điền vào Strapi khi tạo entry)

| Field | Giá trị mẫu |
|---|---|
| `tieu_de` | `Bài 1: Tính đơn điệu của hàm số` |
| `slug` | `bai-1-tinh-don-dieu-cua-ham-so` (auto từ tiêu đề) |
| `lop` | `12` |
| `loai` | `giai-sgk` |
| `bai_so` | `Bài 1` |
| `bo_sach` | (relation) Kết nối tri thức / Chân trời sáng tạo / Cánh diều |
| `chuong` | (relation) Chương 1: Ứng dụng đạo hàm... |
| `mon_hoc` | (relation) Toán |
| `meta_title` | `Bài 1: Tính đơn điệu của hàm số - Toán 12 KNTT \| Giải Bài Tập` (≤ 70 ký tự) |
| `meta_description` | `Lời giải chi tiết Bài 1 Tính đơn điệu của hàm số - Toán 12 Kết nối tri thức. Lý thuyết, ví dụ, bài tập có đáp án.` (≤ 160 ký tự) |
| `tom_tat` | 1-2 câu (~150 ký tự) — dùng làm preview, snippet |

---

## Cấu trúc nội dung (`noi_dung` field, markdown)

```markdown
## Lý thuyết

**Định nghĩa:** [Định nghĩa khái niệm chính]

**Tính chất / Định lý quan trọng:**
- Tính chất 1: ...
- Tính chất 2: ...

> **Công thức / Định lý:**
> $f'(x) > 0 \\Rightarrow f(x)$ đồng biến

## Phương pháp giải

**Bước 1:** [Mô tả bước 1]
**Bước 2:** [Mô tả bước 2]
**Bước 3:** [Mô tả bước 3]

## Bài tập có đáp án

### Bài 1 (trang X SGK)

**Đề bài:** [Trích đề bài — không copy nguyên văn, paraphrase]

**Lời giải:**

[Trình bày từng bước có giải thích, dùng KaTeX `$...$` cho công thức inline, `$$...$$` cho công thức block]

**Đáp án:** ...

### Bài 2 (trang X SGK)

[Tương tự Bài 1]

## Câu hỏi thường gặp (FAQ — tăng SEO snippet)

**Q: [Câu hỏi 1 phổ biến học sinh thường tìm]?**
A: [Trả lời 2-3 câu, có chứa keyword chính]

**Q: [Câu hỏi 2]?**
A: ...

## Ghi chú

- Đề bài thuộc bản quyền NXB Giáo dục Việt Nam
- Lời giải do Giải Bài Tập biên soạn
```

---

## Quy tắc viết

1. **Trích đề bài** — fair use giáo dục, paraphrase nếu có thể, không copy nguyên văn cả đoạn dài
2. **Lời giải tự viết 100%** — không copy từ vietjack/loigiaihay
3. **Toán/Lý/Hoá**: dùng KaTeX cho mọi công thức (`$...$` inline, `$$...$$` block)
4. **Heading**: dùng `##` cho section chính, `###` cho bài cụ thể (auto vào TOC)
5. **Code công thức**: dùng `code` chỉ cho ký tự đặc biệt không có trong KaTeX
6. **Ảnh sơ đồ** (nếu có): upload lên Cloudinary qua Strapi media, alt text mô tả
7. **Độ dài**: tối thiểu 800 từ, tối đa 3,000 từ — sweet spot 1,200-1,800
8. **Anti-duplicate**: chạy Quillbot paraphrase trước publish + check Copyscape free tier
