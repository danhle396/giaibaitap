# Template: Đề thi + Đáp án

> Dành cho: đề thi tốt nghiệp THPT, vào 10, giữa/cuối kì, ĐGNL, học sinh giỏi
> Strapi content type: `de-thi` (riêng, schema khác `bai-giai`)
> SEO: keyword chính `đề thi [loại] năm [năm] môn [môn] [tỉnh]` + `đáp án đề thi ...`

---

## Frontmatter

| Field | Giá trị mẫu |
|---|---|
| `tieu_de` | `Đề thi tốt nghiệp THPT 2025 môn Toán - Đề 101` |
| `slug` | `de-thi-tot-nghiep-thpt-2025-mon-toan-de-101` |
| `loai_de` | `tot-nghiep-thpt` (enum: tot-nghiep-thpt, vao-10, giua-ki-1, cuoi-ki-1, giua-ki-2, cuoi-ki-2, hoc-sinh-gioi, minh-hoa, thu, dgnl) |
| `nam` | `2025` |
| `lop` | `12` |
| `tinh_thanh` | `Hà Nội` (nếu là đề tỉnh, để trống nếu đề chung) |
| `mon_hoc` | (relation) Toán |
| `thoi_gian_lam_bai` | `90` (phút) |
| `file_de` | (upload) PDF đề bài |
| `file_dap_an` | (upload) PDF đáp án (có thể tách hoặc gộp) |
| `meta_title` | `Đề thi TN THPT 2025 môn Toán Đề 101 (có đáp án) \| Giải Bài Tập` |
| `meta_description` | `Đề thi tốt nghiệp THPT năm 2025 môn Toán mã đề 101 kèm đáp án chi tiết. Tải PDF, xem online, chuẩn bị thi tốt.` |

---

## Cấu trúc nội dung

### `noi_dung_de` (markdown)

```markdown
## Đề thi [Loại] năm [Năm] - Môn [Môn]

**Thời gian làm bài:** [X] phút (không kể thời gian phát đề)

**Mã đề:** [Mã đề]

---

### Phần I. Câu hỏi trắc nghiệm

**Câu 1.** [Đề bài câu 1]

A. [Phương án A]
B. [Phương án B]  
C. [Phương án C]
D. [Phương án D]

**Câu 2.** ...

[... đến hết phần trắc nghiệm]

### Phần II. Câu hỏi tự luận (nếu có)

**Câu 1.** [Đề bài]

[Yêu cầu giải...]
```

### `noi_dung_dap_an` (markdown)

```markdown
## Đáp án chi tiết

### Phần I. Trắc nghiệm

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Đáp án | B | A | C | D | A | B | C | A | D | B |

### Lời giải chi tiết

**Câu 1.** Đáp án **B**

[Giải thích từng bước, dùng KaTeX cho công thức]

$$f'(x) = ...$$

[Suy luận và chọn đáp án B]

**Câu 2.** Đáp án **A**

[Giải thích]

[... đến hết các câu]

### Phần II. Tự luận

**Câu 1.**

[Lời giải đầy đủ, có biểu thức KaTeX]

**Bước 1:** ...
**Bước 2:** ...
**Kết luận:** ...
```

---

## Quy tắc viết

1. **Đề bài**: paraphrase nếu trích, hoặc copy nguyên văn nếu là đề công bố chính thức của Bộ GD&ĐT (public domain)
2. **Đáp án**: tự viết 100% — không copy
3. **Bảng đáp án trắc nghiệm** ở đầu cho user xem nhanh
4. **Lời giải chi tiết** từng câu — đặc biệt cho câu khó (vận dụng cao)
5. **File PDF**: upload bản sạch (không watermark), có thể chèn link tải về dưới dạng button trong page
6. **Tránh re-host nguyên đề SGK** — chỉ trích đoạn

---

## SEO bonus

- **Schema markup**: thêm `Quiz` schema nếu có thể (mã code trong app, không phải content)
- **Internal links**: link đến các đề tương tự (cùng loại / cùng năm / cùng môn) ở cuối bài
- **Outbound links**: 0 — tránh outbound đến đối thủ
