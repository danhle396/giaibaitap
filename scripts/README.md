# Scripts

## bulk-import.ts

Bulk import Markdown files into Strapi as `bai-giai` entries.

### Usage

```bash
# 1. Get a Strapi API token (Settings → API Tokens → Create new, type: Full access)
# 2. Run from project root:
STRAPI_URL=http://localhost:1337 \
STRAPI_API_TOKEN=xxx \
npx tsx scripts/bulk-import.ts ./content-templates/inbox/
```

### Markdown file format

Each `.md` file must start with YAML-style frontmatter:

```markdown
---
tieu_de: Bài 1: Tính đơn điệu của hàm số
slug: bai-1-tinh-don-dieu-cua-ham-so
lop: 12
loai: giai-sgk
mon: toan
bo_sach: ket-noi-tri-thuc
bai_so: "Bài 1"
tom_tat: "Hướng dẫn xét tính đơn điệu của hàm số dựa vào dấu của đạo hàm."
meta_title: "Bài 1: Tính đơn điệu - Toán 12 KNTT | Giải Bài Tập"
meta_description: "Lời giải chi tiết Bài 1..."
chuong_slug: chuong-1-ung-dung-dao-ham-khao-sat-ham-so
---

## Lý thuyết

**Định nghĩa:** ...

(rest of markdown body becomes noi_dung)
```

### Allowed enum values

- `loai`: `giai-sgk` | `giai-sbt` | `giai-vbt` | `soan-van` | `ly-thuyet`
- `mon`: `toan` | `van` | `anh` | `ly` | `hoa` | `sinh` | `su` | `dia` | `gdcd` | `tin`
- `bo_sach`: `ket-noi-tri-thuc` | `chan-troi-sang-tao` | `canh-dieu` | `co-ban`
- `lop`: integer 1-12

### Behavior

- **Idempotent**: skips entries whose slug already exists
- **Auto-publish**: Strapi v5 creates draft → publish step calls `/api/bai-giais/{documentId}/actions/publish`
- **Resolves relations**: looks up `mon_hoc` / `bo_sach` by `ma`, `chuong` by `slug`
- **Logs**: ✓ created, ⏭ skipped, ✗ error per file

### Recommended folder layout

```
content-templates/
├── inbox/        ← drop new .md files here, run bulk-import
├── done/         ← move successful files here manually
└── *.md          ← templates (do not import these)
```
