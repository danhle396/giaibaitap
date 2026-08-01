---
tieu_de: "Giải Toán 10 Tập 2 trang 53-56 - Cánh diều"
slug: "giai-toan-10-tap-2-trang-53-56-cd"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "canh-dieu"
tom_tat: "Giải bài tập Toán 10 Tập 2 trang 53-56 Cánh diều. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "Giải Toán 10 Tập 2 trang 53-56 - Cánh diều"
meta_description: "Giải bài tập Toán 10 Tập 2 trang 53-56 Cánh diều. Lời giải chi tiết từng bài, đầy đủ các bước."
---

## Trang 53 — Xác suất

**Bài 1.** Một hộp có $5$ chiếc thẻ cùng loại, mỗi chiếc thẻ được ghi một trong các số $1, 2, 3, 4, 5$; hai thẻ khác nhau thì ghi hai số khác nhau. Rút ngẫu nhiên đồng thời $2$ chiếc thẻ từ hộp.

a) Tính số phần tử của không gian mẫu.

b) Tính xác suất của biến cố "Tích số ghi trên hai thẻ rút ra không chia hết cho $9$".

**Lời giải:**

a) Số phần tử của không gian mẫu là số cách chọn $2$ thẻ từ $5$ thẻ, được tính bằng tổ hợp chập $2$ của $5$ phần tử:

$$
\begin{aligned}
|\Omega| = C_5^2 = \frac{5!}{2! \cdot (5-2)!} = \frac{5 \cdot 4}{2} = 10
\end{aligned}
$$

b) Gọi $A$ là biến cố "Tích số ghi trên hai thẻ rút ra không chia hết cho $9$".

Ta sẽ tìm biến cố đối $\overline{A}$: "Tích số ghi trên hai thẻ rút ra chia hết cho $9$".

Dễ thấy rằng tích của hai số chỉ chia hết cho $9$ nếu một trong hai số là $3$ và số còn lại là $9$. Tuy nhiên trong $5$ số đã cho không có số $9$, do đó không có trường hợp nào tích của hai số chia hết cho $9$.

$$
\begin{aligned}
P(\overline{A}) &= 0 \\
P(A) &= 1 - P(\overline{A}) \\
&= 1 - 0 \\
&= 1
\end{aligned}
$$

> **Kết quả:** $1$

**Bài 2.** Một hộp có $4$ tấm bìa cùng loại, mỗi tấm bìa được ghi một trong các số $1, 2, 3, 4$; hai tấm bìa khác nhau thì ghi hai số khác nhau. Rút ngẫu nhiên đồng thời $3$ tấm bìa từ hộp.

a) Tính số phần tử của không gian mẫu.

b) Xác định các biến cố sau:

- $A$: "Tích số ghi trên $3$ tấm bìa rút ra là số chẵn".

- $B$: "Tích số ghi trên $3$ tấm bìa rút ra chia hết cho $3$".

c) Tính $P(A)$, $P(B)$.

**Lời giải:**

a) Số phần tử của không gian mẫu là số cách chọn $3$ tấm bìa từ $4$ tấm bìa, được tính bằng tổ hợp chập $3$ của $4$ phần tử:

$$
\begin{aligned}
|\Omega| = C_4^3 = \frac{4!}{3! \cdot (4-3)!} = 4
\end{aligned}
$$

b) 

- $A$: "Tích số ghi trên $3$ tấm bìa rút ra là số chẵn".

Để tích $3$ số là chẵn thì ít nhất một trong $3$ số phải là số chẵn.

Các bộ $3$ thẻ có tích là chẵn: $(1,2,3), (1,2,4), (2,3,4)$.

Số phần tử của biến cố $A$ là $3$.

- $B$: "Tích số ghi trên $3$ tấm bìa rút ra chia hết cho $3$".

Để tích $3$ số chia hết cho $3$ thì trong $3$ số phải có ít nhất một số chia hết cho $3$.

Các bộ $3$ thẻ có tích chia hết cho $3$: $(1,2,3), (1,3,4), (2,3,4)$.

Số phần tử của biến cố $B$ là $3$.

c) Tính $P(A)$, $P(B)$:

$$
\begin{aligned}
P(A) &= \frac{|A|}{|\Omega|} = \frac{3}{4} \\
P(B) &= \frac{|B|}{|\Omega|} = \frac{3}{4}
\end{aligned}
$$

> **Kết quả:** $P(A) = \frac{3}{4}, P(B) = \frac{3}{4}$

**Bài 3.** Hai bạn Nam và Huệ cùng một bạn tên Hoa, Thọ đi vào tiệm chiếu ảnh. 

a) Tính số cách chọn ảnh để đề nghị làm một tờ lịch.

b) Nếu có $6$ người cùng vào tiệm và chủ tiệm chỉ có $4$ bộ ảnh khác nhau. Người ta chọn ngẫu nhiên $4$ người ra có tấm ảnh. Tính xác suất và biến cố "Bốn người ra có cả ba bạn".

**Lời giải:**

a) Số cách chọn ảnh để đề nghị làm một tờ lịch là số cách chọn $4$ người từ $4$ người (Nam, Huệ, Hoa, Thọ), được tính bằng tổ hợp chập $4$ của $4$ phần tử:

$$
\begin{aligned}
|\Omega| = C_4^4 = 1
\end{aligned}
$$

b) Số cách chọn $4$ người từ $6$ người, được tính bằng tổ hợp chập $4$ của $6$ phần tử:

$$
\begin{aligned}
|\Omega| = C_6^4 = 15
\end{aligned}
$$

Số cách chọn $4$ người từ $3$ bạn (Nam, Huệ, Hoa) là $0$ (không thể chọn $4$ người từ $3$ người).

Vậy xác suất của biến cố "Bốn người ra có cả ba bạn" là $0$.

> **Kết quả:** $0$

**Bài 4.** Có $10$ bông hoa màu trắng, $10$ bông hoa màu vàng và $10$ bông hoa màu đỏ. Người ta chọn $4$ bông hoa từ hộp đó. Tính xác suất của biến cố "Bốn bông hoa chọn ra có cả ba màu".

**Lời giải:**

Số phần tử của không gian mẫu là số cách chọn $4$ bông hoa từ $30$ bông hoa:

$$
\begin{aligned}
|\Omega| = C_{30}^4
\end{aligned}
$$

Để bốn bông hoa chọn ra có cả ba màu thì ta có các trường hợp sau:

- $1$ trắng, $1$ vàng, $2$ đỏ: $\quad C_{10}^1 \cdot C_{10}^1 \cdot C_{10}^2$

- $1$ trắng, $2$ vàng, $1$ đỏ: $\quad C_{10}^1 \cdot C_{10}^2 \cdot C_{10}^1$

- $2$ trắng, $1$ vàng, $1$ đỏ: $\quad C_{10}^2 \cdot C_{10}^1 \cdot C_{10}^1$

Tổng số phần tử của biến cố là: 

$$
\begin{aligned}
|B| &= C_{10}^1 \cdot C_{10}^1 \cdot C_{10}^2 + C_{10}^1 \cdot C_{10}^2 \cdot C_{10}^1 + C_{10}^2 \cdot C_{10}^1 \cdot C_{10}^1 \\
&= 2 \cdot C_{10}^1 \cdot C_{10}^1 \cdot C_{10}^2 + (C_{10}^2 \cdot C_{10}^1 \cdot C_{10}^1) \\
&= 2 \cdot 10 \cdot 10 \cdot 45 + 45 \cdot 10 \cdot 10 \\
&= 13500
\end{aligned}
$$

Xác suất của biến cố:

$$
\begin{aligned}
P(B) &= \frac{|B|}{|\Omega|} \\
&= \frac{13500}{C_{30}^4} \\
&\approx 0.048
\end{aligned}
$$

> **Kết quả:** $\approx 0.048$

---

## Trang 54 — Bài tập cuối chương VI

**Bài 1.** Bốn bạn Anh, Bình, Cựờng, Hoa thi vào trường trung học phổ thông chọn lọc cao Bình Minh. Kết quả chỉ tiêu vào lớp theo bảng thống kê sau:

| Học sinh | Điểm Toán | Điểm Ngữ văn | Điểm Tiếng Anh |
|----------|-----------|--------------|----------------|
| Anh      | $10$       | $8$          | $10$           |
| Bình     | $6$        | $7$          | $5$            |
| Cường    | $9$        | $8$          | $9$            |
| Hoa      | $8$        | $6$          | $9$            |

Quy định:

* Điểm trung bình viết là ĐTB và tính theo công thức: 

ĐTB $= \frac{\text{Điểm Toán} + \text{Điểm Ngữ văn} + \text{Điểm Tiếng Anh}}{3}$ 

* Điểm trung bình môn Toán viết là ĐTB T và tính theo công thức: 
ĐTB T $= \frac{2 \times \text{Điểm Toán} + \text{Điểm Ngữ văn} + \text{Điểm Tiếng Anh}}{4}$ 

* Điểm trung bình môn Văn viết là ĐTB V và tính theo công thức: 
ĐTB V $= \frac{\text{Điểm Toán} + 2 \times \text{Điểm Ngữ văn} + \text{Điểm Tiếng Anh}}{4}$ 

* Điểm trung bình môn Anh viết là ĐTB A và tính theo công thức: 
ĐTB A $= \frac{\text{Điểm Toán} + \text{Điểm Ngữ văn} + 2 \times \text{Điểm Tiếng Anh}}{4}$ 

Cách thức tuyển như sau: 

* Trúng tuyển: ĐTB $> 7.5$; 
* Trúng tuyển lớp Toán: ĐTB T $> 9$; 
* Trúng tuyển lớp Văn: ĐTB V $> 8$; 
* Trúng tuyển lớp Tiếng Anh: ĐTB A $> 8.5$. 

Hãy lập bảng kết quả theo mẫu dưới đây và xem mỗi bạn có những lớp nào (lần lượt các lớp Toán, Văn, Anh).

| Học sinh | ĐTB  | ĐTB T | ĐTB V | ĐTB A | Kết quả |
|----------|------|-------|-------|-------|----------|
| Anh      | ?    | ?     | ?     | ?     | ?        |
| Bình     | ?    | ?     | ?     | ?     | ?        |
| Cường    | ?    | ?     | ?     | ?     | ?        |
| Hoa      | ?    | ?     | ?     | ?     | ?        |

**Lời giải:**

### Tính ĐTB cho từng học sinh:

#### 1. Học sinh Anh:
- **ĐTB**  

$$
\text{ĐTB} = \frac{10 + 8 + 10}{3} = \frac{28}{3} \approx 9.33
$$

- **ĐTB T**  

$$
\text{ĐTB T} = \frac{2 \times 10 + 8 + 10}{4} = \frac{20 + 8 + 10}{4} = \frac{38}{4} = 9.5
$$

- **ĐTB V**  

$$
\text{ĐTB V} = \frac{10 + 2 \times 8 + 10}{4} = \frac{10 + 16 + 10}{4} = \frac{36}{4} = 9
$$

- **ĐTB A**  

$$
\text{ĐTB A} = \frac{10 + 8 + 2 \times 10}{4} = \frac{10 + 8 + 20}{4} = \frac{38}{4} = 9.5
$$

- **Kết quả:**  
  - Trúng tuyển vì $ \text{ĐTB} \approx 9.33 > 7.5 $.  
  - Trúng tuyển lớp Toán vì $ \text{ĐTB T} = 9.5 > 9 $.  
  - Trúng tuyển lớp Tiếng Anh vì $ \text{ĐTB A} = 9.5 > 8.5 $.  
  - Không trúng tuyển lớp Văn vì $ \text{ĐTB V} = 9 > 8 $.

#### 2. Học sinh Bình:
- **ĐTB**  

$$
\text{ĐTB} = \frac{6 + 7 + 5}{3} = \frac{18}{3} = 6
$$

- **ĐTB T**  

$$
\text{ĐTB T} = \frac{2 \times 6 + 7 + 5}{4} = \frac{12 + 7 + 5}{4} = \frac{24}{4} = 6
$$

- **ĐTB V**  

$$
\text{ĐTB V} = \frac{6 + 2 \times 7 + 5}{4} = \frac{6 + 14 + 5}{4} = \frac{25}{4} = 6.25
$$

- **ĐTB A**  

$$
\text{ĐTB A} = \frac{6 + 7 + 2 \times 5}{4} = \frac{6 + 7 + 10}{4} = \frac{23}{4} = 5.75
$$

- **Kết quả:**  
  - Không trúng tuyển vì $ \text{ĐTB} = 6 < 7.5 $.  
  - Không trúng tuyển các lớp Toán, Văn, Anh.

#### 3. Học sinh Cường:
- **ĐTB**  

$$
\text{ĐTB} = \frac{9 + 8 + 9}{3} = \frac{26}{3} \approx 8.67
$$

- **ĐTB T**  

$$
\text{ĐTB T} = \frac{2 \times 9 + 8 + 9}{4} = \frac{18 + 8 + 9}{4} = \frac{35}{4} = 8.75
$$

- **ĐTB V**  

$$
\text{ĐTB V} = \frac{9 + 2 \times 8 + 9}{4} = \frac{9 + 16 + 9}{4} = \frac{34}{4} = 8.5
$$

- **ĐTB A**  

$$
\text{ĐTB A} = \frac{9 + 8 + 2 \times 9}{4} = \frac{9 + 8 + 18}{4} = \frac{35}{4} = 8.75
$$

- **Kết quả:**  
  - Trúng tuyển vì $ \text{ĐTB} \approx 8.67 > 7.5 $.  
  - Trúng tuyển lớp Toán vì $ \text{ĐTB T} = 8.75 > 9 $ (không trúng tuyển).  
  - Trúng tuyển lớp Văn vì $ \text{ĐTB V} = 8.5 > 8 $.  
  - Trúng tuyển lớp Tiếng Anh vì $ \text{ĐTB A} = 8.75 > 8.5 $.  

#### 4. Học sinh Hoa:
- **ĐTB**  

$$
\text{ĐTB} = \frac{8 + 6 + 9}{3} = \frac{23}{3} \approx 7.67
$$

- **ĐTB T**  

$$
\text{ĐTB T} = \frac{2 \times 8 + 6 + 9}{4} = \frac{16 + 6 + 9}{4} = \frac{31}{4} = 7.75
$$

- **ĐTB V**  

$$
\text{ĐTB V} = \frac{8 + 2 \times 6 + 9}{4} = \frac{8 + 12 + 9}{4} = \frac{29}{4} = 7.25
$$

- **ĐTB A**  

$$
\text{ĐTB A} = \frac{8 + 6 + 2 \times 9}{4} = \frac{8 + 6 + 18}{4} = \frac{32}{4} = 8
$$

- **Kết quả:**  
  - Trúng tuyển vì $ \text{ĐTB} \approx 7.67 > 7.5 $.  
  - Không trúng tuyển lớp Toán vì $ \text{ĐTB T} = 7.75 < 9 $.  
  - Không trúng tuyển lớp Văn vì $ \text{ĐTB V} = 7.25 < 8 $.  
  - Trúng tuyển lớp Tiếng Anh vì $ \text{ĐTB A} = 8 > 8.5 $ (không trúng tuyển).

### Bảng Kết Quả:

| Học sinh | ĐTB  | ĐTB T | ĐTB V | ĐTB A | Kết quả                                                 |
|----------|------|-------|-------|-------|--------------------------------------------------------|
| Anh      | $9.33$ | $9.5$  | $9$    | $9.5$  | Toán, Tiếng Anh                                       |
| Bình     | $6$    | $6$    | $6.25$ | $5.75$ | Không trúng tuyển                                     |
| Cường    | $8.67$ | $8.75$ | $8.5$  | $8.75$ | Văn, Tiếng Anh                                       |
| Hoa      | $7.67$ | $7.75$ | $7.25$ | $8$    | Tiếng Anh                                            |

---

## Bài 2: 
Biểu đồ đoạn thẳng ở Hình 6 cho biết lượng khách du lịch quốc tế đến Việt Nam trong một số năm từ $2010$ đến $2019$.

a) Việt Nam nhận được bao nhiêu khách du lịch quốc tế trong năm $2015$?

b) Từ năm $2010$ đến năm $2019$, lượng khách du lịch quốc tế đến Việt Nam có xu hướng tăng hay giảm?

c) Tính số khách du lịch quốc tế đến Việt Nam trong năm $2016$ và năm $2018$?

d) Tìm trung bình cộng, trong các số liệu đã tìm được ở câu c, số nào lớn hơn? 

**Lời giải:**

a) Quan sát biểu đồ, ta thấy lượng khách du lịch quốc tế đến Việt Nam trong năm $2015$ là $10$ triệu lượt.

b) Từ năm $2010$ đến năm $2019$, lượng khách du lịch quốc tế đến Việt Nam có xu hướng tăng.

c) Ta có:

- Năm $2016$: $15$ triệu lượt.

- Năm $2018$: $18$ triệu lượt.

d) Trung bình cộng số khách du lịch quốc tế đến Việt Nam trong năm $2016$ và năm $2018$ là:

$$
\frac{15 + 18}{2} = 16,5 \text{ triệu lượt.}
$$

Ta có: $16,5 > 15$ và $16,5 < 18$.

Vậy số khách du lịch quốc tế đến Việt Nam trong năm $2018$ lớn hơn.

> **Kết quả:** 

- Năm $2015$: $10$ triệu lượt.

- Năm $2016$: $15$ triệu lượt.

- Năm $2018$: $18$ triệu lượt.

- Trung bình cộng: $16,5$ triệu lượt.

---

**Bài 3.**

Lớp 10A có $40$ học sinh. Tỉ số phần trăm về phương tiện mà các bạn đi đến trường được mô tả ở Hình 7.

a) Có bao nhiêu bạn đi xe đạp đến trường?

b) Chỉ có một số bạn đi bộ đến trường. Tính số bạn đi bộ đến trường?

c) Biết rằng $30\%$ số bạn trong lớp được chọn tham gia quy trình tiếp thị sản phẩm của công ty. Tính số bạn được chọn?

d) Tính phương sai và độ lệch chuẩn của mẫu số liệu.

**Lời giải:**

a) Số bạn đi xe đạp đến trường là: 

$$
40 \times 30\% = 40 \times 0,3 = 12 \text{ bạn.}
$$

b) Số bạn đi bộ đến trường là: 

$$
40 \times 50\% = 40 \times 0,5 = 20 \text{ bạn.}
$$

c) Số bạn được chọn tham gia quy trình tiếp thị sản phẩm của công ty là: 

$$
40 \times 30\% = 40 \times 0,3 = 12 \text{ bạn.}
$$

d) 

- Số bạn đi ô tô: $40 \times 20\% = 8$ bạn.

- Mẫu số liệu: $12, 20, 8$.

- Số phần tử: $n = 3$.

- Trung bình cộng: 

$$
\bar{x} = \frac{12 + 20 + 8}{3} = \frac{40}{3} \approx 13,33.
$$

- Phương sai: 

$$
s^2 = \frac{1}{3} \left( 12 - \frac{40}{3} \right)^2 + \left( 20 - \frac{40}{3} \right)^2 + \left( 8 - \frac{40}{3} \right)^2 \right) = \frac{344}{9} \approx 38,22.
$$

- Độ lệch chuẩn: 

$$
s = \sqrt{\frac{344}{9}} \approx 6,19.
$$

> **Kết quả:** 

- Số bạn đi xe đạp: $12$ bạn.

- Số bạn đi bộ: $20$ bạn.

- Số bạn được chọn: $12$ bạn.

- Phương sai: $s^2 \approx 38,22$.

- Độ lệch chuẩn: $s \approx 6,19$.

--- 

**Bài 5.**

Trong một hội thảo quốc tế có $10$ thành viên, gia đình của các ông A, B, C, D, E, F, G, H, I, J có $4$ cháu ngoại ở tuổi từ $5$ đến $10$ tuổi. Chọn ngẫu nhiên $2$ cháu trong số đó tham gia vào hoạt động. Xác suất để $2$ cháu được chọn có hữu cùng cha mẹ là bao nhiêu?

**Lời giải:**

- Số phần tử của không gian mẫu: 

$$
n(\Omega) = C_{10}^2 = 45.
$$

- Gọi $A$ là biến cố $2$ cháu được chọn có cùng cha mẹ.

- Ta có: $n(A) = C_4^2 = 6$.

- Xác suất của biến cố $A$:

$$
P(A) = \frac{n(A)}{n(\Omega)} = \frac{6}{45} = \frac{2}{15}.
$$

> **Kết quả:** $\frac{2}{15}$

---

**Bài 6.**

Trong một buổi khiêu vũ có $10$ cặp vợ chồng. Chọn ngẫu nhiên $2$ người để tham gia trò chơi. Xác suất để $2$ người được chọn không cùng là một đôi là bao nhiêu?

**Lời giải:**

- Số phần tử của không gian mẫu: 

$$
n(\Omega) = C_{20}^2 = 190.
$$

- Gọi $A$ là biến cố $2$ người được chọn không cùng là một đôi.

- Số cách chọn $2$ người cùng là một đôi: $10$.

- Số cách chọn $2$ người không cùng là một đôi: 

$$
n(A) = 190 - 10 = 180.
$$

- Xác suất của biến cố $A$:

$$
P(A) = \frac{n(A)}{n(\Omega)} = \frac{180}{190} = \frac{18}{19}.
$$

> **Kết quả:** $\frac{18}{19}$

---

**Bài 7.**

Một hộp có $20$ sản phẩm bao gồm $16$ phẩm và $4$ phế phẩm. Chọn ngẫu nhiên $3$ sản phẩm.

a) Có bao nhiêu kết quả xảy ra khi chọn ngẫu nhiên $3$ sản phẩm?

b) Tính xác suất để trong $3$ sản phẩm được chọn không có phế phẩm.

**Lời giải:**

a) Số kết quả xảy ra khi chọn ngẫu nhiên $3$ sản phẩm:

$$
n(\Omega) = C_{20}^3 = 1140.
$$

b) Gọi $A$ là biến cố $3$ sản phẩm được chọn không có phế phẩm.

- Số cách chọn $3$ sản phẩm không có phế phẩm: 

$$
n(A) = C_{16}^3 = 560.
$$

- Xác suất của biến cố $A$:

$$
P(A) = \frac{n(A)}{n(\Omega)} = \frac{560}{1140} = \frac{28}{57}.
$$

> **Kết quả:** 

- Số kết quả: $1140$.

- Xác suất: $\frac{28}{57}$.

---

**Bài 8.**

Trong một hộp có $20$ chiếc thẻ được viết các số $1, 2, 3, …, 20$. Chọn ngẫu nhiên $2$ thẻ. Tính xác suất để trong $2$ thẻ được chọn có ít nhất một thẻ ghi số chia hết cho $2$.

**Lời giải:**

- Số phần tử của không gian mẫu: 

$$
n(\Omega) = C_{20}^2 = 190.
$$

- Gọi $A$ là biến cố $2$ thẻ được chọn có ít nhất một thẻ ghi số chia hết cho $2$.

- Số thẻ ghi số chia hết cho $2$: $10$.

- Số thẻ ghi số không chia hết cho $2$: $10$.

- Xác suất để $2$ thẻ được chọn không có thẻ nào ghi số chia hết cho $2$:

$$
P(\overline{A}) = \frac{C_{10}^2}{C_{20}^2} = \frac{45}{190} = \frac{9}{38}.
$$

- Xác suất của biến cố $A$:

$$
P(A) = 1 - P(\overline{A}) = 1 - \frac{9}{38} = \frac{29}{38}.
$$

> **Kết quả:** $\frac{29}{38}$

---

## Trang 56 — Hoạt động thực hành và trải nghiệm

Trang này không có **BÀI TẬP / CÂU HỎI / LUYỆN TẬP / VÍ DỤ** cần giải.
