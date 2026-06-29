# Thư mục PDF Sách Giáo Khoa

Bỏ file PDF vào đúng folder theo lớp.

## Cấu trúc

```
pdfs/
├── lop-9/
│   ├── toan-9-ket-noi.pdf
│   ├── toan-9-chan-troi.pdf
│   └── ...
├── lop-10/
│   ├── toan-10-ket-noi.pdf
│   └── ...
├── lop-11/
│   └── toan-11-ket-noi.pdf
└── lop-12/
    ├── toan-12-ket-noi.pdf
    ├── toan-12-chan-troi.pdf
    └── toan-12-canh-dieu.pdf
```

## Quy tắc đặt tên file

`{mon}-{lop}-{bo-sach}.pdf`

| Môn | Ký hiệu |
|-----|---------|
| Toán | `toan` |
| Ngữ Văn | `van` |
| Tiếng Anh | `anh` |
| Vật Lý | `ly` |
| Hóa Học | `hoa` |
| Sinh Học | `sinh` |

| Bộ sách | Ký hiệu |
|---------|---------|
| Kết nối tri thức | `ket-noi` |
| Chân trời sáng tạo | `chan-troi` |
| Cánh diều | `canh-dieu` |

**Ví dụ:** `toan-12-ket-noi.pdf`, `ly-11-chan-troi.pdf`

## Chạy pipeline

```bash
# 1. Trích xuất bài tập từ PDF
npx tsx scripts/pdf-extract.ts \
  --pdf=pdfs/lop-12/toan-12-ket-noi.pdf \
  --out=content-templates/extracted/toan-12-ket-noi

# 2. Claude giải tự động
ANTHROPIC_API_KEY="sk-ant-..." \
npx tsx scripts/pdf-solver.ts \
  --extracted=content-templates/extracted/toan-12-ket-noi \
  --lop=12 --mon=toan --bo_sach=ket-noi-tri-thuc

# 3. Import vào Strapi
STRAPI_URL=http://localhost:1337 \
STRAPI_API_TOKEN="..." \
npx tsx scripts/bulk-import.ts content-templates/inbox
```
