# Template: Trắc nghiệm online

> Dành cho: bộ câu hỏi trắc nghiệm online (làm trên web, chấm điểm tức thì)
> Strapi content type: `trac-nghiem` (field `cau_hoi` là JSON array)
> SEO: `trắc nghiệm [môn] [chương/bài]` + `[chủ đề] online có đáp án`

---

## Frontmatter

| Field | Giá trị mẫu |
|---|---|
| `tieu_de` | `Trắc nghiệm Toán 12 - Tính đơn điệu của hàm số` |
| `slug` | `trac-nghiem-toan-12-tinh-don-dieu-cua-ham-so` |
| `lop` | `12` |
| `mon_hoc` | (relation) Toán |
| `chuong` | (relation) Chương 1: Ứng dụng đạo hàm |
| `do_kho` | `thong-hieu` (enum: nhan-biet / thong-hieu / van-dung / van-dung-cao) |
| `thoi_gian` | `600` (giây = 10 phút) |
| `so_cau` | `15` (auto từ length cau_hoi.length) |
| `meta_title` | `Trắc nghiệm Tính đơn điệu hàm số - Toán 12 (15 câu) \| Giải Bài Tập` |
| `meta_description` | `Bộ 15 câu trắc nghiệm Tính đơn điệu của hàm số - Toán 12 có đáp án và lời giải chi tiết. Làm online, chấm điểm tức thì.` |

---

## Cấu trúc `cau_hoi` (JSON array)

```json
[
  {
    "cau_hoi": "Cho hàm số y = x³ - 3x² + 2. Hàm số đồng biến trên khoảng nào?",
    "dap_an": [
      "(-∞; 0)",
      "(0; 2)",
      "(2; +∞)",
      "(-1; 1)"
    ],
    "dap_an_dung": 2,
    "giai_thich": "Tính y' = 3x² - 6x = 3x(x-2). y' > 0 khi x < 0 hoặc x > 2. Vậy hàm số đồng biến trên (2; +∞). [Đáp án thứ 3, index = 2]"
  },
  {
    "cau_hoi": "Hàm số nào sau đây nghịch biến trên ℝ?",
    "dap_an": [
      "y = x³",
      "y = -x³ + x",
      "y = -x³ - 3x",
      "y = x² + 1"
    ],
    "dap_an_dung": 2,
    "giai_thich": "Xét y = -x³ - 3x → y' = -3x² - 3 < 0 ∀x → nghịch biến trên ℝ."
  }
]
```

**Lưu ý**:
- `dap_an_dung` là **index** (bắt đầu từ 0), không phải nhãn A/B/C/D
- `dap_an` array có thể 4 phần tử (kiểu A/B/C/D) hoặc 2 (Đúng/Sai) hoặc nhiều hơn
- `giai_thich` bắt buộc — học sinh xem sau khi nộp bài

---

## Quy tắc viết câu hỏi

### Phân bổ độ khó (15 câu chuẩn)

| Độ khó | Số câu | Mục đích |
|---|---|---|
| Nhận biết | 4 | Định nghĩa, công thức cơ bản |
| Thông hiểu | 6 | Áp dụng trực tiếp lý thuyết |
| Vận dụng | 4 | Giải bài tập tổng hợp |
| Vận dụng cao | 1 | Câu phân loại học sinh giỏi |

### Nguyên tắc

1. **4 phương án trả lời** — không quá ít (dễ đoán) cũng không quá nhiều (rối)
2. **Đáp án sai** phải có vẻ "hợp lý" — không loại trừ rõ ràng (gây cảm giác dễ)
3. **Tránh câu hỏi "Tất cả đáp án trên" / "Không có đáp án nào"** — không phổ biến trong VN
4. **Công thức**: viết qua KaTeX (`$x^2$`) trong cau_hoi, dap_an, giai_thich
5. **Giải thích đầy đủ** — không chỉ nói "vì A đúng" mà phải show steps

---

## SEO bonus

- **Schema markup `Quiz`** nếu được — Google rich result
- **Cau_hoi đầu tiên** chứa keyword chính (tăng relevance)
- **Title** có cụm "(15 câu)" / "(20 câu)" — CTR cao hơn
