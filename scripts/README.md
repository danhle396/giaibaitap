# Scripts

## bulk-import.ts

Bulk import Markdown files into Strapi as `bai-giai` entries.

### Setup (one-time)

1. **Start Strapi**: `cd cms && pnpm develop`
2. **Create admin user**: open http://localhost:1337/admin and register
3. **Generate API token**:
   - Settings → API Tokens → "Create new API Token"
   - Name: `bulk-import` (any)
   - Token type: **Full access**
   - Token duration: Unlimited (or any)
   - Click Save → **copy the token shown** (it appears only once!)
4. **Save token to env**: add to your shell or `.env.local`:
   ```bash
   export STRAPI_API_TOKEN=<paste-token-here>
   ```

> **Note:** Strapi v5 doesn't expose the `admin::api-token` service during
> bootstrap, so we can't auto-generate this. The bootstrap logs a warning
> and skips the auto-token; manual creation above is required.

### Usage

```bash
# From project root, with STRAPI_API_TOKEN exported:
npx tsx scripts/bulk-import.ts ./content-templates/inbox/
```

Or inline:
```bash
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
