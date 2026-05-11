# Template: Lý thuyết / Công thức

> Dành cho: bài lý thuyết tổng hợp + công thức cần nhớ (đặc biệt mạnh cho query "công thức X")
> Strapi: dùng `bai-giai` với `loai = "ly-thuyet"`
> SEO: keyword chính `lý thuyết [chủ đề] [lớp]` + `công thức [chủ đề]`

---

## Frontmatter

| Field | Giá trị mẫu |
|---|---|
| `tieu_de` | `Lý thuyết Tính đơn điệu của hàm số - Toán 12` |
| `slug` | `ly-thuyet-tinh-don-dieu-cua-ham-so` |
| `lop` | `12` |
| `loai` | `ly-thuyet` |
| `bai_so` | (để trống — đây là tổng hợp lý thuyết) |
| `bo_sach` | (relation) bộ sách (hoặc `co-ban` nếu chung 3 bộ) |
| `chuong` | (relation) Chương 1: Ứng dụng đạo hàm |
| `mon_hoc` | (relation) Toán |
| `meta_title` | `Lý thuyết Tính đơn điệu hàm số - Toán 12 đầy đủ \| Giải Bài Tập` |
| `meta_description` | `Tổng hợp lý thuyết Tính đơn điệu của hàm số Toán 12: định nghĩa, định lý, công thức, các dạng bài và phương pháp giải.` |

---

## Cấu trúc nội dung

```markdown
## Tóm tắt nhanh

> **Lý thuyết cốt lõi:** [1 câu mô tả ngắn gọn nhất khái niệm]
> 
> **Công thức quan trọng nhất:**
> $$\\text{[công thức chính]}$$

## I. Định nghĩa

**Định nghĩa 1:** [Định nghĩa chính xác từ SGK, paraphrase]

**Ví dụ:** Hàm số $f(x) = x^3$ là hàm số ...

**Lưu ý:** [Các trường hợp đặc biệt cần nhớ]

## II. Các định lý / Tính chất

### Định lý 1: [Tên định lý]

**Phát biểu:** [Phát biểu định lý đầy đủ]

**Hệ quả:** [Hệ quả nếu có]

### Định lý 2

[Tương tự]

## III. Công thức cần nhớ

| Tên công thức | Biểu thức | Áp dụng khi |
|---|---|---|
| Đạo hàm $x^n$ | $(x^n)' = nx^{n-1}$ | Với mọi $n$ |
| Đạo hàm $\\sin x$ | $(\\sin x)' = \\cos x$ | Mọi $x$ |
| ... | ... | ... |

## IV. Các dạng bài tập

### Dạng 1: [Tên dạng]

**Phương pháp:**
1. Bước 1: ...
2. Bước 2: ...
3. Bước 3: ...

**Ví dụ minh họa:**

[Đề bài → Lời giải đầy đủ]

### Dạng 2: [Tên dạng]

[Tương tự]

### Dạng 3: [Tên dạng]

[Tương tự]

## V. Bài tập áp dụng (có đáp án)

### Bài 1: [Đề]

**Lời giải:**
[Trình bày]

**Đáp án:** ...

[3-5 bài tập áp dụng]

## VI. Mẹo / Tips ghi nhớ

- 💡 **Tip 1:** [Mẹo nhớ công thức]
- 💡 **Tip 2:** [Cách nhận diện dạng bài]
- ⚠️ **Sai lầm thường gặp:** [Lỗi học sinh hay mắc]

## VII. Câu hỏi thường gặp

**Q: Khi nào hàm số đồng biến?**
A: ...

**Q: Phân biệt đồng biến và đơn điệu tăng?**
A: ...
```

---

## Quy tắc viết

1. **Tóm tắt ngay đầu bài** — featured snippet target (~50 từ)
2. **Bảng công thức** ở section riêng — dễ scan, dễ ranking cho query `công thức X`
3. **Phân chia "Dạng bài"** rõ ràng — đây là điểm khác biệt với SGK (chỉ có lý thuyết)
4. **Mỗi dạng kèm 1 ví dụ** + 2-3 bài áp dụng có đáp án
5. **Tips và Sai lầm thường gặp** — content unique vs đối thủ
6. **Độ dài**: 1,500-2,500 từ — bài lý thuyết thường dài hơn bài giải
7. **Internal link**: link đến từng bài giải SGK + trắc nghiệm cùng chương ở cuối

---

## SEO bonus

- **Featured snippet** target: tóm tắt nhanh ở đầu (50-60 từ)
- **Bảng** giúp Google extract dễ → rich result
- **FAQ section** với schema markup → có thể chiếm "People also ask" box
