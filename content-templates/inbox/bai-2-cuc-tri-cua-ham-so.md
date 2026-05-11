---
tieu_de: "Bài 2: Cực trị của hàm số"
slug: bai-2-cuc-tri-cua-ham-so
lop: 12
loai: giai-sgk
mon: toan
bo_sach: ket-noi-tri-thuc
bai_so: "Bài 2"
tom_tat: "Khái niệm cực đại, cực tiểu của hàm số. Quy tắc xét cực trị qua đạo hàm bậc nhất và bậc hai."
meta_title: "Bài 2: Cực trị của hàm số - Toán 12 KNTT | Giải Bài Tập"
meta_description: "Lời giải chi tiết Bài 2 Cực trị của hàm số - Toán 12 Kết nối tri thức. Quy tắc, ví dụ, bài tập có đáp án."
chuong_slug: chuong-1-ung-dung-dao-ham-khao-sat-ham-so
---

## Lý thuyết

**Định nghĩa:** Cho hàm số $y = f(x)$ xác định trên khoảng $K$ và $x_0 \in K$.

- $x_0$ là **điểm cực đại** nếu tồn tại khoảng $(a; b)$ chứa $x_0$ sao cho $f(x_0) > f(x)$ với mọi $x \in (a; b) \setminus \{x_0\}$
- $x_0$ là **điểm cực tiểu** nếu tồn tại khoảng $(a; b)$ chứa $x_0$ sao cho $f(x_0) < f(x)$ với mọi $x \in (a; b) \setminus \{x_0\}$

## Quy tắc xét cực trị

**Quy tắc 1** (qua đạo hàm bậc nhất):

1. Tìm tập xác định
2. Tính $f'(x)$, giải $f'(x) = 0$
3. Lập bảng biến thiên
4. Kết luận từ dấu của $f'(x)$

**Quy tắc 2** (qua đạo hàm bậc hai):

1. Tìm $f'(x)$, giải $f'(x) = 0$ tìm các nghiệm $x_i$
2. Tính $f''(x_i)$
3. Nếu $f''(x_i) > 0$: $x_i$ là điểm cực tiểu
4. Nếu $f''(x_i) < 0$: $x_i$ là điểm cực đại

## Ví dụ minh họa

Tìm cực trị của hàm số $f(x) = x^3 - 3x^2 + 2$.

**Bước 1:** $f'(x) = 3x^2 - 6x = 3x(x - 2)$

**Bước 2:** $f'(x) = 0 \Leftrightarrow x = 0$ hoặc $x = 2$

**Bước 3:** Áp dụng Quy tắc 2: $f''(x) = 6x - 6$
- $f''(0) = -6 < 0$ → $x = 0$ là điểm cực đại, $f(0) = 2$
- $f''(2) = 6 > 0$ → $x = 2$ là điểm cực tiểu, $f(2) = -2$

**Kết luận:** Hàm số đạt cực đại tại điểm $(0; 2)$ và cực tiểu tại điểm $(2; -2)$.
