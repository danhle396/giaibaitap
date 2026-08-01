---
tieu_de: "Giải Toán 10 Tập 2 trang 87-88 - Kết nối tri thức"
slug: "giai-toan-10-tap-2-trang-87-88-kntt"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải bài tập Toán 10 Tập 2 trang 87-88 Kết nối tri thức. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "Giải Toán 10 Tập 2 trang 87-88 - Kết nối tri thức"
meta_description: "Giải bài tập Toán 10 Tập 2 trang 87-88 Kết nối tri thức. Lời giải chi tiết từng bài, đầy đủ các bước."
---

## Luyện tập 4

### a) Vẽ sơ đồ hình cây để mô tả các phần tử của không gian mẫu.

Để vẽ sơ đồ hình cây, ta thực hiện theo các bước sau:

- Chọn một hộp (ví dụ hộp A) và liệt kê các thẻ có thể rút ra: $1, 2, 3$.
- Từ mỗi thẻ của hộp A, vẽ các nhánh tương ứng với các thẻ có thể rút ra từ hộp B: $2, 3$.
- Từ mỗi nhánh của hộp B, vẽ các nhánh tương ứng với các thẻ có thể rút ra từ hộp C: $1, 2$.

Sơ đồ hình cây có thể được mô tả như sau:

- Từ hộp A: $1 \rightarrow$ Từ hộp B: $2 \rightarrow$ Từ hộp C: $1, 2$  
- Từ hộp A: $1 \rightarrow$ Từ hộp B: $3 \rightarrow$ Từ hộp C: $1, 2$  
- Từ hộp A: $2 \rightarrow$ Từ hộp B: $2 \rightarrow$ Từ hộp C: $1, 2$  
- Từ hộp A: $2 \rightarrow$ Từ hộp B: $3 \rightarrow$ Từ hộp C: $1, 2$  
- Từ hộp A: $3 \rightarrow$ Từ hộp B: $2 \rightarrow$ Từ hộp C: $1, 2$  
- Từ hộp A: $3 \rightarrow$ Từ hộp B: $3 \rightarrow$ Từ hộp C: $1, 2$  

Không gian mẫu $\Omega$ gồm $12$ phần tử:  
$(1, 2, 1), (1, 2, 2), (1, 3, 1), (1, 3, 2), (2, 2, 1), (2, 2, 2), (2, 3, 1), (2, 3, 2), (3, 2, 1), (3, 2, 2), (3, 3, 1), (3, 3, 2)$.

### b) Gọi $M$ là biến cố: "Trong ba thẻ rút ra có ít nhất một thẻ số $1$". Biến cố $\overline{M}$ là tập con nào của không gian mẫu?

Biến cố $M$ gồm các phần tử có ít nhất một thẻ số $1$:  
$(1, 2, 1), (1, 2, 2), (1, 3, 1), (1, 3, 2), (2, 2, 1), (2, 3, 1), (3, 2, 1), (3, 3, 1)$.

Biến cố $\overline{M}$ là các phần tử không có thẻ số $1$:  
$(2, 2, 2), (2, 3, 2), (3, 2, 2), (3, 3, 2)$.

### c) Tính $P(M)$ và $P(\overline{M})$.

Số phần tử của không gian mẫu $n(\Omega) = 12$.  
Số phần tử của biến cố $M$: $n(M) = 8$.  
Số phần tử của biến cố $\overline{M}$: $n(\overline{M}) = 4$.

Xác suất của biến cố $M$:  
$$P(M) = \frac{n(M)}{n(\Omega)} = \frac{8}{12} = \frac{2}{3}$$

Xác suất của biến cố $\overline{M}$:  
$$P(\overline{M}) = \frac{n(\overline{M})}{n(\Omega)} = \frac{4}{12} = \frac{1}{3}$$

> **Kết quả:** $P(M) = \frac{2}{3}$, $P(\overline{M}) = \frac{1}{3}$

## 9.6

Chọn ngẫu nhiên một gia đình có ba con và quan sát giới tính của ba người con này. Tính xác suất của các biến cố sau:

### a) $A$: "Con đầu là gái";

### b) $B$: "Có ít nhất một người con trai".

## Lời giải:

Không gian mẫu $\Omega$ gồm $2^3 = 8$ phần tử:  
$(B, B, B), (B, B, G), (B, G, B), (B, G, G), (G, B, B), (G, B, G), (G, G, B), (G, G, G)$.

### a) $A$: "Con đầu là gái"

Biến cố $A$ gồm các phần tử:  
$(G, B, B), (G, B, G), (G, G, B), (G, G, G)$.

Xác suất của biến cố $A$:  
$$P(A) = \frac{n(A)}{n(\Omega)} = \frac{4}{8} = \frac{1}{2}$$

### b) $B$: "Có ít nhất một người con trai"

Biến cố $\overline{B}$: "Không có người con trai nào"  
$\overline{B} = (G, G, G)$.

Xác suất của biến cố $\overline{B}$:  
$$P(\overline{B}) = \frac{1}{8}$$

Xác suất của biến cố $B$:  
$$P(B) = 1 - P(\overline{B}) = 1 - \frac{1}{8} = \frac{7}{8}$$

> **Kết quả:** $P(A) = \frac{1}{2}$, $P(B) = \frac{7}{8}$

## 9.7

Một hộp đựng các tấm thẻ đánh số $10; 11;...; 20$. Rút ngẫu nhiên từ hộp hai tấm thẻ. Tính xác suất của các biến cố sau:

### a) $C$: "Cả hai thẻ rút được đều mang số lẻ";

### b) $D$: "Cả hai thẻ rút được đều mang số chẵn".

## Lời giải:

Hộp có $11$ tấm thẻ.

Số cách rút $2$ tấm thẻ:  
$$n(\Omega) = C_{11}^2 = 55$$

### a) $C$: "Cả hai thẻ rút được đều mang số lẻ"

Các thẻ mang số lẻ: $11, 13, 15, 17, 19$.

Số cách rút $2$ tấm thẻ lẻ:  
$$n(C) = C_5^2 = 10$$

Xác suất của biến cố $C$:  
$$P(C) = \frac{n(C)}{n(\Omega)} = \frac{10}{55} = \frac{2}{11}$$

### b) $D$: "Cả hai thẻ rút được đều mang số chẵn"

Các thẻ mang số chẵn: $10, 12, 14, 16, 18, 20$.

Số cách rút $2$ tấm thẻ chẵn:  
$$n(D) = C_6^2 = 15$$

Xác suất của biến cố $D$:  
$$P(D) = \frac{n(D)}{n(\Omega)} = \frac{15}{55} = \frac{3}{11}$$

> **Kết quả:** $P(C) = \frac{2}{11}$, $P(D) = \frac{3}{11}$

## 9.8

Một chiếc hộp đựng $6$ viên bi trắng, $4$ viên bi đỏ và $2$ viên bi đen. Chọn ngẫu nhiên ra $6$ viên bi. Tính xác suất để trong $6$ viên bi đó có $3$ viên bi trắng, $2$ viên bi đỏ và $1$ viên bi đen.

## Lời giải:

Tổng số viên bi: $6 + 4 + 2 = 12$.

Số cách chọn $6$ viên bi:  
$$n(\Omega) = C_{12}^6 = 924$$

Số cách chọn $3$ viên bi trắng:  
$$C_6^3 = 20$$

Số cách chọn $2$ viên bi đỏ:  
$$C_4^2 = 6$$

Số cách chọn $1$ viên bi đen:  
$$C_2^1 = 2$$

Số cách chọn thỏa mãn:  
$$n(E) = 20 \cdot 6 \cdot 2 = 240$$

Xác suất của biến cố $E$:  
$$P(E) = \frac{n(E)}{n(\Omega)} = \frac{240}{924} = \frac{20}{77}$$

> **Kết quả:** $P(E) = \frac{20}{77}$

## 9.9

Gieo liên tiếp một con xúc xắc và một đồng xu.

### a) Vẽ sơ đồ hình cây mô tả các phần tử của không gian mẫu.

### b) Tính xác suất của các biến cố sau:

$F$: "Đồng xu xuất hiện mặt ngửa";

$G$: "Đồng xu xuất hiện mặt sấp hoặc số chấm xuất hiện trên con xúc xắc là $5$".

## Lời giải:

### a) Vẽ sơ đồ hình cây

- Con xúc xắc: $1, 2, 3, 4, 5, 6$.
- Đồng xu: $S, N$.

Sơ đồ hình cây có $12$ nhánh.

Không gian mẫu $\Omega$:  
$(1, S), (1, N), (2, S), (2, N), (3, S), (3, N), (4, S), (4, N), (5, S), (5, N), (6, S), (6, N)$.

### b) Tính xác suất

### $F$: "Đồng xu xuất hiện mặt ngửa"

Biến cố $F$ gồm các phần tử:  
$(1, N), (2, N), (3, N), (4, N), (5, N), (6, N)$.

Xác suất của biến cố $F$:  
$$P(F) = \frac{6}{12} = \frac{1}{2}$$

### $G$: "Đồng xu xuất hiện mặt sấp hoặc số chấm xuất hiện trên con xúc xắc là $5$"

Biến cố $G$ gồm các phần tử:  
$(1, S), (2, S), (3, S), (4, S), (5, S), (6, S), (5, N)$.

Xác suất của biến cố $G$:  
$$P(G) = \frac{7}{12}$$

> **Kết quả:** $P(F) = \frac{1}{2}$, $P(G) = \frac{7}{12}$

---

## Trang 88 — Xác suất

**Bài 9.10.** Trên một phố có hai quán ăn X, Y. Ba bạn Sơn, Hải, Văn mỗi người chọn ngẫu nhiên một trong hai quán ăn.

a) Vẽ sơ đồ hình cây mô tả các phần tử của không gian mẫu.

b) Tính xác suất của biến cố "Hai bạn vào quán X, bạn còn lại vào quán Y".

**Lời giải:**

a) Sơ đồ hình cây:

- Bước 1: Sơn chọn quán X (QX) hoặc quán Y (QY).
- Bước 2: Hải chọn quán X hoặc quán Y.
- Bước 3: Văn chọn quán X hoặc quán Y.

Không gian mẫu gồm các kết quả có thể xảy ra là:

- (QX, QX, QX), (QX, QX, QY), (QX, QY, QX), (QX, QY, QY)
- (QY, QX, QX), (QY, QX, QY), (QY, QY, QX), (QY, QY, QY)

Tổng số kết quả: $2^3=8$.

b) Gọi $A$ là biến cố: "Hai bạn vào quán X, bạn còn lại vào quán Y".

Các kết quả thuận lợi cho $A$ là: (QX, QX, QY), (QX, QY, QX), (QY, QX, QX).

Số kết quả thuận lợi: $3$.

Xác suất của biến cố $A$ là:

$$
P(A) = \frac{3}{8}
$$

> **Kết quả:** $\frac{3}{8}$

**Bài 9.11.** Gieo lần lượt hai con xúc xắc cân đối. Tính xác suất để ít nhất một con xúc xắc xuất hiện mặt 6 chấm.

**Lời giải:**

Không gian mẫu khi gieo hai con xúc xắc:

- Con xúc xắc 1 có 6 mặt.
- Con xúc xắc 2 có 6 mặt.

Tổng số kết quả: $6 \times 6 = 36$.

Gọi $B$ là biến cố: "Ít nhất một con xúc xắc xuất hiện mặt 6 chấm".

Ta tính xác suất bằng cách lấy 1 trừ xác suất không có con xúc xắc nào xuất hiện mặt 6 chấm.

Xác suất không có con xúc xắc nào xuất hiện mặt 6 chấm:

- Mỗi con xúc xắc có 5 mặt không phải 6 chấm.
- Xác suất: $\left(\frac{5}{6}\right)^2 = \frac{25}{36}$.

Xác suất có ít nhất một con xúc xắc xuất hiện mặt 6 chấm:

$$
P(B) = 1 - \frac{25}{36} = \frac{11}{36}
$$

> **Kết quả:** $\frac{11}{36}$

**Bài 9.12.** Màu hạt của đậu Hà Lan có hai kiểu hình là màu vàng và màu xanh tương ứng với hai loại gen là gen trội $A$ và gen lặn $a$. Hình dạng hạt của đậu Hà Lan có hai kiểu hình là hạt tròn và hạt nhăn tương ứng với hai loại gen là gen trội $B$ và gen lặn $b$. Biết rằng, cây con lấy ngẫu nhiên một gen từ cây bố và một gen từ cây mẹ. Phép thử là cho lai hai loại đậu Hà Lan, trong đó cả cây bố và cây mẹ đều có kiểu gen là $(Aa,Bb)$ và kiểu hình hạt màu vàng và tròn. Giả sử các kết quả có thể là đồng khả năng. Tính xác suất để cây con cũng có kiểu hình là hạt màu vàng và tròn.

**Lời giải:**

Cây bố và cây mẹ có kiểu gen $(Aa, Bb)$.

- Kiểu gen của cây con được tạo thành từ 1 gen của bố và 1 gen của mẹ.
- Xác suất cây con có gen $A$ (màu vàng): $\frac{1}{2}$.
- Xác suất cây con có gen $B$ (hạt tròn): $\frac{1}{2}$.

Xác suất cây con có kiểu hình hạt màu vàng và tròn:

$$
P = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}
$$

> **Kết quả:** $\frac{1}{4}$
