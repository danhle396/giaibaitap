---
tieu_de: "Giải Toán 10 Tập 2 trang 90-93 - Kết nối tri thức"
slug: "giai-toan-10-tap-2-trang-90-93-kntt"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải bài tập Toán 10 Tập 2 trang 90-93 Kết nối tri thức. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "Giải Toán 10 Tập 2 trang 90-93 - Kết nối tri thức"
meta_description: "Giải bài tập Toán 10 Tập 2 trang 90-93 Kết nối tri thức. Lời giải chi tiết từng bài, đầy đủ các bước."
---

## Trang 90 — Chương 9

**Bài 9.20.** Dự báo thời tiết trong ba ngày thứ Hai, thứ Ba, thứ Tư của tuần sau cho biết, trong mỗi ngày này, khả năng có mưa và không mưa như nhau.

a) Vẽ sơ đồ hình cây mô tả không gian mẫu.

b) Tính xác suất của các biến cố:

$F$: "Trong ba ngày, có đúng một ngày có mưa";

$G$: "Trong ba ngày, có ít nhất hai ngày không mưa".

**Lời giải:**

a) Không gian mẫu được mô tả như sau:

- Mỗi ngày có 2 khả năng: có mưa ($\text{M}$) hoặc không mưa ($\text{K}$).
- Ba ngày, mỗi ngày có 2 khả năng, nên không gian mẫu có $2^3 = 8$ phần tử:

$\{ \text{MMM}, \text{MMK}, \text{MKM}, \text{MKK}, \text{KMM}, \text{K MK}, \text{KKM}, \text{KKK} \}$

Sơ đồ cây:

- Ngày thứ nhất: $\text{M}$ hoặc $\text{K}$.
  - Từ $\text{M}$: Ngày thứ hai $\text{M}$ hoặc $\text{K}$.
    - Từ $\text{MM}$: Ngày thứ ba $\text{M}$ hoặc $\text{K}$.
      - $\text{MMM}$
      - $\text{MMK}$
    - Từ $\text{MK}$: Ngày thứ ba $\text{M}$ hoặc $\text{K}$.
      - $\text{MKM}$
      - $\text{MKK}$
  - Từ $\text{K}$: Ngày thứ hai $\text{M}$ hoặc $\text{K}$.
    - Từ $\text{KM}$: Ngày thứ ba $\text{M}$ hoặc $\text{K}$.
      - $\text{KMM}$
      - $\text{K MK}$
    - Từ $\text{KK}$: Ngày thứ ba $\text{M}$ hoặc $\text{K}$.
      - $\text{KKM}$
      - $\text{KKK}$

b) Tính xác suất:

- Tổng số phần tử không gian mẫu: $n(\Omega) = 8$.

- Biến cố $F$: "Trong ba ngày, có đúng một ngày có mưa".
  - Các phần tử thuận lợi: $\{ \text{MKK}, \text{K MK}, \text{KKM} \}$.
  - Số phần tử thuận lợi: $n(F) = 3$.
  - Xác suất: $P(F) = \frac{n(F)}{n(\Omega)} = \frac{3}{8}$.

- Biến cố $G$: "Trong ba ngày, có ít nhất hai ngày không mưa".
  - Các phần tử thuận lợi: $\{ \text{MKK}, \text{K MK}, \text{KKM}, \text{KKK} \}$.
  - Số phần tử thuận lợi: $n(G) = 4$.
  - Xác suất: $P(G) = \frac{n(G)}{n(\Omega)} = \frac{4}{8} = \frac{1}{2}$.

> **Kết quả:** $P(F) = \frac{3}{8};\, P(G) = \frac{1}{2}$.

**Bài 9.21.** Gieo một đồng xu cân đối liên tiếp bốn lần.

a) Vẽ sơ đồ hình cây mô tả không gian mẫu.

b) Tính xác suất để trong bốn lần gieo đó có hai lần xuất hiện mặt sấp và hai lần xuất hiện mặt ngửa.

**Lời giải:**

a) Không gian mẫu:

- Mỗi lần gieo có 2 khả năng: mặt sấp ($\text{S}$) hoặc mặt ngửa ($\text{N}$).
- Bốn lần gieo, mỗi lần có 2 khả năng, nên không gian mẫu có $2^4 = 16$ phần tử.

- Liệt kê các phần tử:
  $\{ \text{SSSS}, \text{SSSN}, \text{S SNS}, \text{SNNN}, \text{NSSS}, \text{NS SN}, \text{NNSN}, \text{NNNS}, \text{NNN S}, \text{NNSN}, \text{NSNN}, \text{SNNN}, \text{SNSN}, \text{SNNS}, \text{SSNN}, \text{NSSS} \}$

  Sơ đồ cây:
  - Bốn lần gieo, mỗi lần rẽ nhánh thành 2 nhánh: $\text{S}$ hoặc $\text{N}$.

b) Biến cố: có hai lần xuất hiện mặt sấp và hai lần xuất hiện mặt ngửa.
  - Các phần tử thuận lợi, ví dụ: $\{ \text{SSTT}, \text{STST}, \text{TSTS}, \text{TSST}, \text{TSS T}, \text{STTS} \}$.
  - Số phần tử thuận lợi: $n(A) = 6$.
  - Xác suất: $P(A) = \frac{6}{16} = \frac{3}{8}$.

> **Kết quả:** $P(A) =\frac{3}{8}$.

**Bài 9.22.** Chọn ngẫu nhiên 4 viên bi từ một túi đựng 4 viên bi đỏ và 6 viên bi xanh đôi một khác nhau. Gọi $A$ là biến cố: "Trong bốn viên bi đó có cả bi đỏ và cả bi xanh". Tính $P(A)$.

**Lời giải:**

- Tổng số bi: $4 + 6 = 10$.
- Số cách chọn 4 viên bi từ 10 viên bi: $n(\Omega) = C(10, 4) = 210$.

- Biến cố đối $\overline{A}$: "Không có bi đỏ hoặc không có bi xanh".
  - Trường hợp 1: Không có bi đỏ (chọn 4 bi xanh): $C(6, 4) = 15$.
  - Trường hợp 2: Không có bi xanh (chọn 4 bi đỏ): $C(4, 4) = 1$.

- Tổng số trường hợp của $\overline{A}$: $n(\overline{A}) = 15 + 1 = 16$.

- Xác suất biến cố $\overline{A}$: $P(\overline{A}) = \frac{16}{210}$.

- Xác suất biến cố $A$: $P(A) = 1 - P(\overline{A}) = 1 - \frac{16}{210} $.

$$
P(A) = \frac{194}{210} = \frac{97}{105}.
$$

> **Kết quả:** $P(A) = \frac{97}{105}$.

---

## Trang 90 — Hoạt động thực hành trải nghiệm

Trang này không có **BÀI TẬP / CÂU HỎI / LUYỆN TẬP / VÍ DỤ** cần giải.

---

## Trang 92 — Hình học 

Không có bài tập, câu hỏi, luyện tập hay ví dụ cụ thể trên trang này. Toàn bộ nội dung trang 92 đều là phần lý thuyết và hướng dẫn thực hành.

---

## Trang 93 — 

Không có bài tập, câu hỏi, luyện tập, ví dụ trên trang này. Toàn bộ nội dung là phần lý thuyết và hướng dẫn thực hành.
