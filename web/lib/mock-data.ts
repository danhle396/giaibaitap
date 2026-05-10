import type { BaiGiai, SoanVan, DeThi, CauHoiTracNghiem } from "@/types";

export const MOCK_BAI_GIAI: BaiGiai = {
  id: "1",
  slug: "bai-1-tinh-don-dieu-cua-ham-so",
  tieu_de: "Bài 1: Tính đơn điệu của hàm số",
  lop: 12,
  mon: "toan",
  loai: "giai-sgk",
  bo_sach: "ket-noi-tri-thuc",
  bo_sach_label: "Kết nối tri thức",
  chuong: "Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số",
  bai_so: "Bài 1",
  noi_dung: `
## Lý thuyết

Hàm số $f(x)$ đồng biến trên khoảng $(a; b)$ nếu với mọi $x_1, x_2 \\in (a; b)$:
$$x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$$

Hàm số $f(x)$ nghịch biến trên khoảng $(a; b)$ nếu với mọi $x_1, x_2 \\in (a; b)$:
$$x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$$

## Bài giải

**Câu 1.** Xét tính đơn điệu của hàm số $y = x^3 - 3x + 2$.

**Giải:**

Ta có: $y' = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$

$y' = 0 \\Leftrightarrow x = \\pm 1$

| $x$ | $(-\\infty; -1)$ | $-1$ | $(-1; 1)$ | $1$ | $(1; +\\infty)$ |
|-----|--------|-----|--------|-----|--------|
| $y'$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $y$ | ↗ | $4$ | ↘ | $0$ | ↗ |

**Kết luận:** Hàm số đồng biến trên $(-\\infty; -1)$ và $(1; +\\infty)$, nghịch biến trên $(-1; 1)$.
  `,
  published_at: "2026-01-15",
  updated_at: "2026-05-09",
};

export const MOCK_BAIS_CUNG_CHUONG: BaiGiai[] = [
  {
    ...MOCK_BAI_GIAI,
    id: "2",
    slug: "bai-2-cuc-tri-cua-ham-so",
    tieu_de: "Bài 2: Cực trị của hàm số",
    bai_so: "Bài 2",
  },
  {
    ...MOCK_BAI_GIAI,
    id: "3",
    slug: "bai-3-gia-tri-lon-nhat-nho-nhat",
    tieu_de: "Bài 3: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    bai_so: "Bài 3",
  },
  {
    ...MOCK_BAI_GIAI,
    id: "4",
    slug: "bai-4-duong-tiem-can",
    tieu_de: "Bài 4: Đường tiệm cận",
    bai_so: "Bài 4",
  },
  {
    ...MOCK_BAI_GIAI,
    id: "5",
    slug: "bai-tap-cuoi-chuong-1",
    tieu_de: "Bài tập cuối chương 1",
    bai_so: "Bài tập",
  },
];

export const MOCK_SOAN_VAN: SoanVan = {
  id: "1",
  slug: "tuyen-kieu",
  tieu_de: "Truyện Kiều",
  lop: 9,
  phien_ban: {
    hay_nhat: `## Soạn bài Truyện Kiều - Phiên bản Hay nhất

### I. Tìm hiểu chung

**1. Tác giả Nguyễn Du (1765-1820)**

Nguyễn Du là đại thi hào dân tộc Việt Nam, danh nhân văn hóa thế giới. Ông sinh ra trong gia đình quý tộc phong kiến, có truyền thống học vấn uyên thâm. Cuộc đời ông trải qua nhiều biến cố lịch sử của đất nước, điều đó tạo nên những cảm xúc sâu sắc trong thơ văn.

**2. Truyện Kiều**

Truyện Kiều (Đoạn trường tân thanh) được Nguyễn Du sáng tác dựa trên cốt truyện của Kim Vân Kiều truyện (Thanh Tâm Tài Nhân, Trung Quốc), nhưng đã được Việt hóa hoàn toàn và nâng lên tầm cao nghệ thuật mới.

### II. Phân tích

**1. Giá trị nội dung**

*Giá trị hiện thực:* Tác phẩm phản ánh chân thực xã hội phong kiến bất công, đặc biệt số phận bi thảm của người phụ nữ tài sắc.

*Giá trị nhân đạo:* Tác giả thể hiện tình yêu thương sâu sắc với con người, đặc biệt người phụ nữ bị áp bức.

**2. Giá trị nghệ thuật**

Truyện Kiều là đỉnh cao của thể thơ lục bát, ngôn ngữ trong sáng, biểu cảm, giàu hình ảnh.`,
    ngan_nhat: `## Soạn bài Truyện Kiều - Phiên bản Ngắn nhất

**Tác giả:** Nguyễn Du (1765-1820), đại thi hào dân tộc.

**Tác phẩm:** Dựa trên Kim Vân Kiều truyện (Trung Quốc), viết bằng thơ lục bát, 3.254 câu.

**Nội dung:** Cuộc đời 15 năm lưu lạc của Thúy Kiều - người con gái tài sắc vẹn toàn.

**Ý nghĩa:** Phê phán xã hội phong kiến, ngợi ca vẻ đẹp và khát vọng tự do của con người.`,
    sieu_ngan: `**Truyện Kiều** - Nguyễn Du: 3.254 câu lục bát kể về số phận bi thảm của Thúy Kiều trong 15 năm lưu lạc. Phê phán chế độ phong kiến, đề cao giá trị con người.`,
  },
  published_at: "2026-01-20",
};

export const MOCK_DE_THI: DeThi = {
  id: "1",
  slug: "de-thi-tot-nghiep-thpt-2025-mon-toan-de-101",
  tieu_de: "Đề thi Tốt nghiệp THPT 2025 môn Toán - Đề 101",
  lop: 12,
  mon: "toan",
  loai: "tot-nghiep",
  nam: 2025,
  noi_dung: `## Phần I - Trắc nghiệm (7 điểm)

**Câu 1.** Cho hàm số $y = x^3 - 3x + 2$. Hàm số đồng biến trên khoảng nào?

A. $(-1; 1)$ &nbsp;&nbsp; B. $(-\\infty; -1)$ &nbsp;&nbsp; C. $(-1; +\\infty)$ &nbsp;&nbsp; D. $(-\\infty; -1) \\cup (1; +\\infty)$

## Phần II - Tự luận (3 điểm)

**Câu 1 (1,5 điểm).** Giải phương trình $2\\sin x - \\sqrt{3} = 0$.`,
  dap_an: `## Đáp án

**Phần I:**
- Câu 1: D

**Phần II:**
- Câu 1: $x = \\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\pi - \\frac{\\pi}{3} + k2\\pi$, $k \\in \\mathbb{Z}$`,
  published_at: "2025-06-01",
};

export const MOCK_QUIZ: CauHoiTracNghiem[] = [
  {
    id: "1",
    cau_hoi: "Hàm số $y = x^3 - 3x$ đồng biến trên khoảng nào?",
    dap_an: ["D"],
    lua_chon: {
      A: "$(-\\infty; 0)$",
      B: "$(0; +\\infty)$",
      C: "$(-1; 1)$",
      D: "$(-\\infty; -1) \\cup (1; +\\infty)$",
    },
    giai_thich: "$y' = 3x^2 - 3 > 0 \\Leftrightarrow x < -1$ hoặc $x > 1$",
  },
  {
    id: "2",
    cau_hoi: "Đạo hàm của $f(x) = \\sin(2x)$ là?",
    dap_an: ["B"],
    lua_chon: {
      A: "$\\sin(2x)$",
      B: "$2\\cos(2x)$",
      C: "$\\cos(2x)$",
      D: "$-2\\cos(2x)$",
    },
    giai_thich: "$f'(x) = \\cos(2x) \\cdot 2 = 2\\cos(2x)$",
  },
];

export const MOCK_SEARCH_RESULTS: Array<{
  title: string;
  href: string;
  description: string;
  tag: string;
}> = [
  {
    title: "Bài 1: Tính đơn điệu của hàm số - Toán 12 Kết nối tri thức",
    href: "/lop-12/toan/giai-sgk-toan-lop-12-ket-noi-tri-thuc/bai-1-tinh-don-dieu-cua-ham-so",
    description: "Lời giải chi tiết Bài 1 chương 1 Toán 12, bao gồm lý thuyết và bài tập có lời giải.",
    tag: "Toán 12",
  },
  {
    title: "Soạn bài Truyện Kiều - Ngữ Văn 9",
    href: "/soan-van/tuyen-kieu",
    description: "Soạn bài Truyện Kiều đầy đủ 3 phiên bản: hay nhất, ngắn nhất, siêu ngắn.",
    tag: "Văn 9",
  },
  {
    title: "Đề thi Tốt nghiệp THPT 2025 Toán đề 101 có đáp án",
    href: "/de-thi/de-thi-tot-nghiep-thpt-2025-mon-toan-de-101",
    description: "Đề thi chính thức kèm đáp án chi tiết, hướng dẫn giải từng câu.",
    tag: "Đề thi",
  },
];
