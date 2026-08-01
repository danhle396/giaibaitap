---
tieu_de: "Giải Toán 10 Bài 14: Các số đặc trưng đo độ phân tán - Kết nối tri thức"
slug: "giai-toan-10-bai-14-do-phan-tan-kntt"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải Toán 10 Bài 14 Các số đặc trưng đo độ phân tán (Kết nối tri thức). Lời giải đầy đủ luyện tập và bài tập 5.11–5.16: khoảng biến thiên, phương sai, độ lệch chuẩn, biểu đồ hộp."
meta_title: "Giải Toán 10 Bài 14 Đo độ phân tán - Kết nối tri thức"
meta_description: "Giải bài tập Toán 10 Bài 14 Các số đặc trưng đo độ phân tán Kết nối tri thức. Lời giải chi tiết luyện tập và bài tập 5.11 đến 5.16, đủ bước."
---

## Bài 14. Các số đặc trưng đo độ phân tán (SGK Toán 10 – Kết nối tri thức, Tập 1, trang 85–91)

---

### Tóm tắt lý thuyết

**Khoảng biến thiên** $R = x_{\max} - x_{\min}$.

**Khoảng tứ phân vị** $\Delta Q = Q_3 - Q_1$.

**Phương sai** của mẫu $x_1, x_2, \ldots, x_n$ (số trung bình $\bar{x}$):

$$s^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2.$$

**Độ lệch chuẩn:** $s = \sqrt{s^2}$.

Phương sai và độ lệch chuẩn càng nhỏ, dữ liệu càng tập trung quanh trung bình.

**Biểu đồ hộp (box plot):** Biểu diễn 5 số: $x_{\min}$, $Q_1$, $Q_2$, $Q_3$, $x_{\max}$.

**Phát hiện giá trị ngoại lệ:**
- Giá trị ngoại lệ phía dưới: $x < Q_1 - 1{,}5\,\Delta Q$.
- Giá trị ngoại lệ phía trên: $x > Q_3 + 1{,}5\,\Delta Q$.

---

### A. Luyện tập trong bài

**Luyện tập 1** (trang 86). Nhiệt độ cao nhất (°C) trong 6 tháng tại Hà Nội: $23,\;25,\;28,\;32,\;33,\;35$ và tại Điện Biên: $16,\;23,\;28,\;32,\;45,\;50$.

Tính khoảng biến thiên và khoảng tứ phân vị. So sánh mức độ phân tán.

**Giải:**

**Hà Nội** ($n=6$, đã sắp xếp):

$R_1 = 35-23 = 12$.

$Q_1 = \dfrac{25+28}{2} = 26{,}5$; $\quad Q_3 = \dfrac{33+35}{2} = 34$; $\quad \Delta Q_1 = 7{,}5$.

**Điện Biên** ($n=6$, đã sắp xếp):

$R_2 = 50-16 = 34$.

$Q_1 = \dfrac{23+28}{2} = 25{,}5$; $\quad Q_3 = \dfrac{45+50}{2} = 47{,}5$; $\quad \Delta Q_2 = 22$.

**Nhận xét:** $R_2 > R_1$ và $\Delta Q_2 > \Delta Q_1$ → nhiệt độ Điện Biên **phân tán hơn** (dao động lớn hơn).

---

**Luyện tập 2** (trang 86). Điểm kiểm tra của hai lớp bằng (tần số bằng nhau). Lớp A: $Q_1=5$, $Q_3=8$. Lớp B: $Q_1=6$, $Q_3=9$. Nhận xét khoảng tứ phân vị và sự phân bố.

**Giải:**

$\Delta Q_A = 8-5 = 3$; $\Delta Q_B = 9-6 = 3$.

Hai lớp có cùng khoảng tứ phân vị → mức độ phân tán **tương đương**. Tuy nhiên lớp B có điểm cao hơn (trung vị cao hơn).

---

**Luyện tập 3** (trang 87). Mẫu số liệu thời gian (phút) của 5 học sinh: $43,\;45,\;40,\;46,\;41$. Tính phương sai và độ lệch chuẩn.

**Giải:**

$$\bar{x} = \frac{43+45+40+46+41}{5} = \frac{215}{5} = 43.$$

Phương sai:

$$s^2 = \frac{(43-43)^2+(45-43)^2+(40-43)^2+(46-43)^2+(41-43)^2}{5}$$

$$= \frac{0+4+9+9+4}{5} = \frac{26}{5} = 5{,}2.$$

$$s = \sqrt{5{,}2} \approx 2{,}28 \text{ phút}.$$

---

**Luyện tập 4** (trang 88). Tìm tứ phân vị và xác định giá trị ngoại lệ của mẫu:

$$0,\;100,\;130,\;140,\;150,\;200,\;210,\;340.$$

**Giải:**

$n=8$. Đã sắp xếp.

$Q_2 = \dfrac{140+150}{2} = 145$; $\quad Q_1 = \dfrac{100+130}{2} = 115$; $\quad Q_3 = \dfrac{200+210}{2} = 205$.

$\Delta Q = 205-115 = 90$.

Giới hạn phát hiện ngoại lệ:
- Dưới: $Q_1 - 1{,}5\,\Delta Q = 115 - 135 = -20$.
- Trên: $Q_3 + 1{,}5\,\Delta Q = 205 + 135 = 340$.

Giá trị $0 > -20$ và $340 \leq 340$ → **không có giá trị ngoại lệ** theo tiêu chí này. (Giá trị 0 và 340 ở sát biên nhưng không vượt quá.)

---

**Luyện tập 5** (trang 88). Đo 7 lần thời gian rơi tự do (giây), kết quả:

$$0{,}398;\;0{,}399;\;0{,}406;\;0{,}410;\;0{,}408;\;0{,}405;\;0{,}402.$$

Tính phương sai và độ lệch chuẩn. Nhận xét độ chính xác.

**Giải:**

$$\bar{x} = \frac{0{,}398+0{,}399+0{,}406+0{,}410+0{,}408+0{,}405+0{,}402}{7} = \frac{2{,}828}{7} \approx 0{,}404.$$

Bình phương độ lệch:

| $x_i$ | $x_i - \bar{x}$ | $(x_i-\bar{x})^2$ |
|:---:|:---:|:---:|
| 0,398 | −0,006 | 0,000 036 |
| 0,399 | −0,005 | 0,000 025 |
| 0,406 | +0,002 | 0,000 004 |
| 0,410 | +0,006 | 0,000 036 |
| 0,408 | +0,004 | 0,000 016 |
| 0,405 | +0,001 | 0,000 001 |
| 0,402 | −0,002 | 0,000 004 |

$s^2 = \dfrac{0{,}000\,122}{7} \approx 0{,}0000174$; $\quad s \approx 0{,}0042$ s.

**Nhận xét:** Độ lệch chuẩn $s \approx 0{,}004$ s rất nhỏ so với giá trị đo ($\approx 0{,}404$ s), phép đo **khá chính xác** (sai số tương đối $\approx 1\%$).

---

### B. Bài tập (trang 89–91)

---

**Bài 5.11.** Cho mẫu số liệu: $3,\;5,\;5,\;8,\;13,\;20$.

a) Tìm khoảng biến thiên $R$ và khoảng tứ phân vị $\Delta Q$.  
b) Biểu diễn biểu đồ hộp.

**Lời giải:**

$n=6$. Sắp xếp: $3,\;5,\;5,\;8,\;13,\;20$.

**a)** $R = 20-3 = 17$.

$Q_1 = 5$ (trung vị của $3,\;5,\;5$); $\quad Q_2 = \dfrac{5+8}{2} = 6{,}5$; $\quad Q_3 = 13$ (trung vị của $8,\;13,\;20$).

$$\Delta Q = Q_3 - Q_1 = 13-5 = 8.$$

**b)** Biểu đồ hộp gồm 5 số: $x_{\min}=3$, $Q_1=5$, $Q_2=6{,}5$, $Q_3=13$, $x_{\max}=20$.

```
--|---[=====|=====]--------|-
  3   5   6.5   13        20
```

---

**Bài 5.12.** Cho hai biểu đồ hộp của mẫu số liệu $A$ và $B$:

- Mẫu $A$: $Q_1=30$, $Q_2=45$, $Q_3=60$; $x_{\min}=10$, $x_{\max}=80$.
- Mẫu $B$: $Q_1=40$, $Q_2=45$, $Q_3=50$; $x_{\min}=35$, $x_{\max}=55$.

So sánh hai mẫu về vị trí trung tâm và mức độ phân tán.

**Lời giải:**

Cả hai mẫu có cùng trung vị $Q_2 = 45$ → **xu thế trung tâm bằng nhau**.

$\Delta Q_A = 60-30 = 30$; $\Delta Q_B = 50-40 = 10$.

$R_A = 80-10 = 70$; $R_B = 55-35 = 20$.

Mẫu $B$ có khoảng biến thiên và khoảng tứ phân vị **nhỏ hơn nhiều** → mẫu $B$ **tập trung hơn**; mẫu $A$ phân tán hơn.

---

**Bài 5.13.** Mẫu số liệu gồm 12 giá trị:

$$13,\;19,\;15,\;25,\;17,\;19,\;25,\;15,\;19,\;13,\;15,\;17.$$

Tính: số trung bình, mốt, trung vị, tứ phân vị, khoảng biến thiên, phương sai, độ lệch chuẩn.

**Lời giải:**

Sắp xếp: $13,\;13,\;15,\;15,\;15,\;17,\;17,\;19,\;19,\;19,\;25,\;25$ ($n=12$).

$$\bar{x} = \frac{13{\times}2 + 15{\times}3 + 17{\times}2 + 19{\times}3 + 25{\times}2}{12} = \frac{26+45+34+57+50}{12} = \frac{212}{12} \approx 17{,}7.$$

**Mốt:** $M_0 = 15$ và $M_0 = 19$ (cùng tần số 3).

$Q_2 = \dfrac{17+17}{2} = 17$; $\quad Q_1 = \dfrac{15+15}{2} = 15$; $\quad Q_3 = \dfrac{19+19}{2} = 19$.

$R = 25-13 = 12$; $\quad \Delta Q = 19-15 = 4$.

**Phương sai** (dùng $\bar{x} = 212/12 = 53/3$):

$$s^2 = \frac{2\left(\tfrac{13-53/3}{1}\right)^2 + 3\left(\tfrac{15-53/3}{1}\right)^2 + 2\left(\tfrac{17-53/3}{1}\right)^2 + 3\left(\tfrac{19-53/3}{1}\right)^2 + 2\left(\tfrac{25-53/3}{1}\right)^2}{12}$$

$$= \frac{2\cdot\tfrac{196}{9} + 3\cdot\tfrac{64}{9} + 2\cdot\tfrac{4}{9} + 3\cdot\tfrac{16}{9} + 2\cdot\tfrac{484}{9}}{12} = \frac{(392+192+8+48+968)/9}{12} = \frac{1608}{108} = \frac{134}{9} \approx 14{,}9.$$

$$s = \sqrt{134/9} \approx 3{,}86.$$

---

**Bài 5.14.** Thời gian chạy cự ly 100 m (giây) của 6 vận động viên:

$$11{,}2;\;11{,}8;\;10{,}9;\;12{,}1;\;11{,}5;\;11{,}3.$$

Tính phương sai và độ lệch chuẩn. Nhận xét.

**Lời giải:**

$$\bar{x} = \frac{11{,}2+11{,}8+10{,}9+12{,}1+11{,}5+11{,}3}{6} = \frac{68{,}8}{6} \approx 11{,}47.$$

Bình phương độ lệch (dùng $\bar{x} = 11{,}47$):

| $x_i$ | $x_i-\bar{x}$ | $(x_i-\bar{x})^2$ |
|:---:|:---:|:---:|
| 11,2 | −0,27 | 0,0729 |
| 11,8 | +0,33 | 0,1089 |
| 10,9 | −0,57 | 0,3249 |
| 12,1 | +0,63 | 0,3969 |
| 11,5 | +0,03 | 0,0009 |
| 11,3 | −0,17 | 0,0289 |

$$s^2 = \frac{0{,}9334}{6} \approx 0{,}156; \quad s \approx 0{,}39 \text{ giây}.$$

Độ lệch chuẩn $\approx 0{,}39$ s là nhỏ so với trung bình $11{,}47$ s → thành tích khá **đồng đều**.

---

**Bài 5.15.** Tỉ lệ học sinh giỏi (%) của 10 trường Trung học phổ thông:

$$32,\;26,\;24,\;39,\;42,\;28,\;35,\;30,\;38,\;26.$$

Hãy tính các số đặc trưng đo độ phân tán.

**Lời giải:**

$n=10$. Sắp xếp: $24,\;26,\;26,\;28,\;30,\;32,\;35,\;38,\;39,\;42$.

$R = 42-24 = 18$.

$Q_1 = \dfrac{26+28}{2} = 27$; $\quad Q_3 = \dfrac{38+39}{2} = 38{,}5$; $\quad \Delta Q = 11{,}5$.

$$\bar{x} = \frac{320}{10} = 32.$$

$$s^2 = \frac{(24-32)^2+(26-32)^2+(26-32)^2+(28-32)^2+(30-32)^2+(32-32)^2+(35-32)^2+(38-32)^2+(39-32)^2+(42-32)^2}{10}$$

$$= \frac{64+36+36+16+4+0+9+36+49+100}{10} = \frac{350}{10} = 35.$$

$$s = \sqrt{35} \approx 5{,}92\%.$$

---

**Bài 5.16.** Điểm thi học kì Tiếng Anh của 9 học sinh:

$$7{,}5;\;8{,}0;\;6{,}5;\;9{,}0;\;7{,}0;\;8{,}5;\;6{,}0;\;7{,}5;\;8{,}0.$$

Tính khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn. Xác định giá trị ngoại lệ (nếu có).

**Lời giải:**

$n=9$. Sắp xếp: $6{,}0,\;6{,}5,\;7{,}0,\;7{,}5,\;7{,}5,\;8{,}0,\;8{,}0,\;8{,}5,\;9{,}0$.

$R = 9{,}0-6{,}0 = 3{,}0$.

$Q_2 = 7{,}5$ (vị trí 5); $\quad Q_1 = 7{,}0$ (vị trí 3 của nửa dưới $6{,}0,\;6{,}5,\;7{,}0,\;7{,}5$)

Thực ra nửa dưới (4 giá trị): $6{,}0,\;6{,}5,\;7{,}0,\;7{,}5$ → $Q_1 = (6{,}5+7{,}0)/2 = 6{,}75$.

Nửa trên (4 giá trị): $7{,}5,\;8{,}0,\;8{,}0,\;8{,}5,\;9{,}0$ — thực ra nửa trên 4 giá trị (loại $Q_2$): $8{,}0,\;8{,}0,\;8{,}5,\;9{,}0$ → $Q_3 = (8{,}0+8{,}5)/2 = 8{,}25$.

$\Delta Q = 8{,}25 - 6{,}75 = 1{,}5$.

$$\bar{x} = \frac{6{,}0+6{,}5+7{,}0+7{,}5+7{,}5+8{,}0+8{,}0+8{,}5+9{,}0}{9} = \frac{68}{9} \approx 7{,}56.$$

$$s^2 = \frac{(6{,}0-7{,}56)^2+\cdots+(9{,}0-7{,}56)^2}{9} \approx \frac{6{,}22}{9} \approx 0{,}69; \quad s \approx 0{,}83.$$

**Ngoại lệ:** Dưới: $6{,}75 - 1{,}5\times1{,}5 = 4{,}5$; trên: $8{,}25+2{,}25 = 10{,}5$. Mọi giá trị nằm trong $[4{,}5;\;10{,}5]$ → **không có giá trị ngoại lệ**.
