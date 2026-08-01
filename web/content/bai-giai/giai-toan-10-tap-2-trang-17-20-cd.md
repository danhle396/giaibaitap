---
tieu_de: "Giải Toán 10 Tập 2 trang 17-20 - Cánh diều"
slug: "giai-toan-10-tap-2-trang-17-20-cd"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "canh-dieu"
tom_tat: "Giải bài tập Toán 10 Tập 2 trang 17-20 Cánh diều. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "Giải Toán 10 Tập 2 trang 17-20 - Cánh diều"
meta_description: "Giải bài tập Toán 10 Tập 2 trang 17-20 Cánh diều. Lời giải chi tiết từng bài, đầy đủ các bước."
---

## Trang 17 — 

**Bài tập**

**Bài 1.** Lớp 10A có 18 bạn nữ và 20 bạn nam.

a) Có bao nhiêu cách chọn 3 bạn nữ trong 18 bạn nữ?

b) Có bao nhiêu cách chọn 3 bạn nam trong 20 bạn nam?

**Lời giải:**

a) Số cách chọn 3 bạn nữ trong 18 bạn nữ là số tổ hợp chập 3 của 18, được tính bằng công thức:

$$
C_{18}^3 = \frac{18!}{3!(18-3)!} = \frac{18!}{3! \cdot 15!} = \frac{18 \times 17 \times 16}{3 \times 2 \times 1} = 816 
$$

b) Số cách chọn 3 bạn nam trong 20 bạn nam là số tổ hợp chập 3 của 20, được tính bằng công thức:

$$
C_{20}^3 = \frac{20!}{3!(20-3)!} = \frac{20!}{3! \cdot 17!} = \frac{20 \times 19 \times 18}{3 \times 2 \times 1} = 1140
$$

> **Kết quả:** a) $816$; b) $1140$.

---

## Trang 18 — Tổ hợp

**Bài 1.** Cho 8 điểm sao cho không có 3 điểm nào thẳng hàng. Có bao nhiêu tam giác với 3 đỉnh được định ra trong 8 điểm đó?

**Lời giải:**

Ta có thể tính số tam giác bằng cách chọn 3 điểm từ 8 điểm đã cho.

Số cách chọn 3 điểm từ 8 điểm là 

$$
\binom{8}{3} = \frac{8!}{3!(8-3)!} = \frac{8!}{3!5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56 
$$

> **Kết quả:** $56$

**Bài 2.** Có 10 điểm tham gia một giải đấu có 3 vòng đấu. Có bao nhiêu cách xếp 10 đội vào vòng đấu nếu có hai đội đối đầu đúng một lần?

**Lời giải:**

Mỗi đội phải đấu với $9$ đội khác. Tuy nhiên, nếu tính $10$ đội $\times$ $9$ trận $= 90$ trận thì mỗi trận đã được tính $2$ lần. Do đó, số trận thực tế là 

$$
\frac{10 \times 9}{2} = 45 
$$

Mà mỗi trận có $2$ đội đấu, nên có 

$$
\binom{10}{2} = 45 
$$

cặp đấu.

> **Kết quả:** $45$

**Bài 3.** Khối 10 có 16 học sinh nam và 18 bạn nữ tham gia đợt tình nguyện Mùa hè xanh. Đoàn trường định một tổng số gồm 3 học sinh nam và 2 nữ. Có bao nhiêu cách chọn như vậy?

**Lời giải:**

Số cách chọn $3$ học sinh nam là 

$$
\binom{16}{3} = \frac{16!}{3!(16-3)!} = 560 
$$

Số cách chọn $2$ học sinh nữ là 

$$
\binom{18}{2} = \frac{18!}{2!(18-2)!} = 153 
$$

Số cách chọn $3$ học sinh nam và $2$ học sinh nữ là 

$$
\binom{16}{3} \times \binom{18}{2} = 560 \times 153 = 85\,680
$$

> **Kết quả:** $85\,680$

**Bài 4.** Một quán nhỏ bày bán hoa gồm 50 bông hồng và 60 bông cúc. Bác Ngọc muốn mua 5 bó hoa gồm hai loại hoa với số lượng tùy ý sao cho bó vừa có hồng vừa có cúc, và mỗi bó hoa có nhiều nhất 7 bông. Bác Ngọc có bao nhiêu cách chọn hoa?

**Lời giải:**

Trường hợp 1: Mỗi bó có 5 bông, gồm  $k$ bông hồng và $5-k$ bông cúc ($0 \le k \le 5$).

Số cách chọn là 

$$
\binom{50}{k} \times \binom{60}{5-k}
$$

với $k = 1,2,3,4$.

Trường hợp 2: Mỗi bó có 6 bông, gồm  $k$ bông hồng và $6-k$ bông cúc ($0 \le k \le 6$).

Số cách chọn là 

$$
\binom{50}{k} \times \binom{60}{6-k}
$$

với $k = 1,2,3,4,5$.

Trường hợp 3: Mỗi bó có 7 bông, gồm  $k$ bông hồng và $7-k$ bông cúc ($0 \le k \le 7$).

Số cách chọn là 

$$
\binom{50}{k} \times \binom{60}{7-k}
$$

với $k = 1,2,3,4,5,6$.

Tổng số cách chọn là 

$$
\begin{aligned}
N &= \sum_{k=1}^{4} \binom{50}{k} \times \binom{60}{5-k} 
+ \sum_{k=1}^{5} \binom{50}{k} \times \binom{60}{6-k} 
+ \sum_{k=1}^{6} \binom{50}{k} \times \binom{60}{7-k} 
\end{aligned}
$$

Dùng máy tính cầm tay ta thu được kết quả $N = 127\,100$.

> **Kết quả:** $127\,100$

**Bài 5.** Tính tổng $C_{12}^2 + C_{12}^3 + \dots + C_{12}^{12}$.

**Lời giải:**

Ta có 

$$
C_n^k = C_n^{n-k}
$$

Do đó 

$$
\begin{aligned}
C_{12}^2 + C_{12}^3 + \dots + C_{12}^{12} 
&= C_{12}^{10} + C_{12}^{9} + \dots + C_{12}^{0} \\
&= C_{12}^{0} + C_{12}^{1} + \dots + C_{12}^{10} \\
&= 2^{12} - C_{12}^{0} - C_{12}^{1} \\
&= 4096 - 1 - 12 \\
&= 4083 
\end{aligned}
$$

> **Kết quả:** $4083$

---

## Trang 19 — Nhị thức Newton

**Bài tập**

### Luyện tập

Không có bài tập cụ thể trên trang này, chỉ có phần lý thuyết và ví dụ minh họa về **Nhị thức Newton**. Nội dung chủ yếu trình bày công thức khai triển $(a + b)^n$ với $n = 2, 3, 4, 5$, các hệ số nhị thức và cách tính các hệ số này.

---

## Trang này có BÀI TẬP / CÂU HỎI / LUYỆN TẬP / VÍ DỤ cần giải không?
Trang này có các phần **Ví dụ** và **Bài tập**.

## Ví dụ 1
**Khai triển $(x + 1)^4$.**  
**Lời giải:**  
Ta có:  
$(x + 1)^4 = C_4^0 x^4 + C_4^1 x^3 . 1 + C_4^2 x^2 . 1^2 + C_4^3 x . 1^3 + C_4^4 . 1^4$  
$= x^4 + 4x^3 + 6x^2 + 4x + 1$.

## Ví dụ 2
**Khai triển $(x - 1)^4$.**  
**Lời giải:**  
Ta có:  
$(x - 1)^4 = [x + (-1)]^4 = C_4^0 x^4 + C_4^1 x^3 . (-1) + C_4^2 x^2 . (-1)^2 + C_4^3 x . (-1)^3 + C_4^4 . (-1)^4$  
$= x^4 - 4x^3 + 6x^2 - 4x + 1$.

## Ví dụ 3
**Khai triển các biểu thức sau:**  
a) $(x - 2y)^4$;  
b) $(3x - y)^5$.  

**Lời giải:**  
a) Ta có:  
$(x - 2y)^4 = [x + (-2y)]^4 = C_4^0 x^4 + C_4^1 x^3 . (-2y) + C_4^2 x^2 . (-2y)^2 + C_4^3 x . (-2y)^3 + C_4^4 . (-2y)^4$  
$= x^4 - 8x^3 y + 24x^2 y^2 - 32xy^3 + 16y^4$.  

b) Ta có:  
$(3x - y)^5 = [3x + (-y)]^5 = C_5^0 (3x)^5 + C_5^1 (3x)^4 . (-y) + C_5^2 (3x)^3 . (-y)^2 + C_5^3 (3x)^2 . (-y)^3 + C_5^4 (3x) . (-y)^4 + C_5^5 . (-y)^5$  
$= 243x^5 - 405x^4 y + 270x^3 y^2 - 90x^2 y^3 + 15xy^4 - y^5$.

## Ví dụ 4
**Tính:**  
a) $C_5^0 + C_5^1 + C_5^2 + C_5^3 + C_5^4 + C_5^5$;  
b) $C_5^0 - C_5^1 + C_5^2 - C_5^3 + C_5^4 - C_5^5$.  

**Lời giải:**  
a) Ta có:  
$C_5^0 + C_5^1 + C_5^2 + C_5^3 + C_5^4 + C_5^5 = 2^5 = 32$.  

b) Ta có:  
$C_5^0 - C_5^1 + C_5^2 - C_5^3 + C_5^4 - C_5^5 = (1 - 1)^5 = 0$.

## Bài 1
**Khai triển các biểu thức sau:**  
a) $(2x + 1)^4$;  
b) $(3y - 2)^4$;  
c) $\left(x + \frac{1}{2}\right)^4$;  
d) $\left(x - \frac{1}{3}\right)^4$.  

**Lời giải:**  
a) Ta có:  
$(2x + 1)^4 = C_4^0 (2x)^4 + C_4^1 (2x)^3 . 1 + C_4^2 (2x)^2 . 1^2 + C_4^3 (2x) . 1^3 + C_4^4 . 1^4$  
$= 16x^4 + 32x^3 + 24x^2 + 8x + 1$.  

b) Ta có:  
$(3y - 2)^4 = [3y + (-2)]^4 = C_4^0 (3y)^4 + C_4^1 (3y)^3 . (-2) + C_4^2 (3y)^2 . (-2)^2 + C_4^3 (3y) . (-2)^3 + C_4^4 . (-2)^4$  
$= 81y^4 - 216y^3 + 216y^2 - 96y + 16$.  

c) Ta có:  
$\left(x + \frac{1}{2}\right)^4 = C_4^0 x^4 + C_4^1 x^3 . \frac{1}{2} + C_4^2 x^2 . \left(\frac{1}{2}\right)^2 + C_4^3 x . \left(\frac{1}{2}\right)^3 + C_4^4 . \left(\frac{1}{2}\right)^4$  
$= x^4 + 2x^3 + \frac{3}{2}x^2 + \frac{1}{2}x + \frac{1}{16}$.  

d) Ta có:  
$\left(x - \frac{1}{3}\right)^4 = \left[x + \left(-\frac{1}{3}\right)\right]^4 = C_4^0 x^4 + C_4^1 x^3 . \left(-\frac{1}{3}\right) + C_4^2 x^2 . \left(-\frac{1}{3}\right)^2 + C_4^3 x . \left(-\frac{1}{3}\right)^3 + C_4^4 . \left(-\frac{1}{3}\right)^4$  
$= x^4 - \frac{4}{3}x^3 + \frac{2}{3}x^2 - \frac{4}{27}x + \frac{1}{81}$.

## Bài 2
**Khai triển các biểu thức sau:**  
a) $(x + 1)^5$;  
b) $(x - 3y)^5$.  

**Lời giải:**  
a) Ta có:  
$(x + 1)^5 = C_5^0 x^5 + C_5^1 x^4 . 1 + C_5^2 x^3 . 1^2 + C_5^3 x^2 . 1^3 + C_5^4 x . 1^4 + C_5^5 . 1^5$  
$= x^5 + 5x^4 + 10x^3 + 10x^2 + 5x + 1$.  

b) Ta có:  
$(x - 3y)^5 = [x + (-3y)]^5 = C_5^0 x^5 + C_5^1 x^4 . (-3y) + C_5^2 x^3 . (-3y)^2 + C_5^3 x^2 . (-3y)^3 + C_5^4 x . (-3y)^4 + C_5^5 . (-3y)^5$  
$= x^5 - 15x^4 y + 135x^3 y^2 - 405x^2 y^3 + 810xy^4 - 243y^5$.

## Bài 3
**Xác định hệ số của $x^4$ trong khai triển biểu thức $(3x + 2)^5$.**  

**Lời giải:**  
Ta có:  
$(3x + 2)^5 = C_5^0 (3x)^5 + C_5^1 (3x)^4 . 2 + C_5^2 (3x)^3 . 2^2 + C_5^3 (3x)^2 . 2^3 + C_5^4 (3x) . 2^4 + C_5^5 . 2^5$  
Hệ số của $x^4$ là $C_5^1 . 3^4 . 2 = 5 . 81 . 2 = 810$.

## Bài 4
**Cho $\left(1 - \frac{1}{2}\right)^5 = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + a_4 x^4 + a_5 x^5$.**  
a) Tính $a_5$.  
b) Tính $a_0 + a_1 + a_2 + a_3 + a_4 + a_5$.  

**Lời giải:**  
a) Ta có:  
$\left(1 - \frac{1}{2}\right)^5 = C_5^0 . 1^5 . \left(-\frac{1}{2}\right)^0 + C_5^1 . 1^4 . \left(-\frac{1}{2}\right) + C_5^2 . 1^3 . \left(-\frac{1}{2}\right)^2 + C_5^3 . 1^2 . \left(-\frac{1}{2}\right)^3 + C_5^4 . 1 . \left(-\frac{1}{2}\right)^4 + C_5^5 . \left(-\frac{1}{2}\right)^5$  
$\Rightarrow a_5 = C_5^5 . \left(-\frac{1}{2}\right)^5 = \frac{-1}{32}$.  

b) Ta có:  
$\left(1 - \frac{1}{2}\right)^5 = a_0 + a_1 + a_2 + a_3 + a_4 + a_5 = \left(1 - \frac{1}{2}\right)^5 = \frac{1}{32}$.

## Bài 5
**Cho tập hợp $A$ có 5 phần tử. Số tập hợp con của $A$ là bao nhiêu?**  

**Lời giải:**  
Số tập hợp con của $A$ là:  
$2^5 = 32$.
