---
tieu_de: "Giải Toán 10 Tập 2 trang 84-87 - Chân trời sáng tạo"
slug: "giai-toan-10-tap-2-trang-84-87-ctst"
lop: "10"
loai: "giai-sgk"
mon: "toan"
bo_sach: "chan-troi-sang-tao"
tom_tat: "Giải bài tập Toán 10 Tập 2 trang 84-87 Chân trời sáng tạo. Lời giải chi tiết, đủ bước, dành cho học sinh THPT."
meta_title: "Giải Toán 10 Tập 2 trang 84-87 - Chân trời sáng tạo"
meta_description: "Giải bài tập Toán 10 Tập 2 trang 84-87 Chân trời sáng tạo. Lời giải chi tiết từng bài, đầy đủ các bước."
---

## Trang 84 — Xác suất

**Bài 2.** Ba bạn Lan, Mai và Đào đặt thẻ học sinh của mình vào một hộp kín, sau đó mỗi bạn lấy ngẫu nhiên một thẻ từ hộp. Tính xác suất của biến cố "Không bạn nào lấy đúng thẻ của mình".

**Lời giải:**

Gọi $A$ là biến cố "Lan lấy đúng thẻ", $B$ là biến cố "Mai lấy đúng thẻ" và $C$ là biến cố "Đào lấy đúng thẻ".

Ta cần tính xác suất của biến cố $\overline{A} \cap \overline{B} \cap \overline{C}$.

Số phần tử của không gian mẫu là $n(\Omega) = 3! = 6$ (vì có $3$ cách chọn thẻ cho Lan, $2$ cách chọn thẻ cho Mai và $1$ cách chọn thẻ cho Đào).

Các kết quả thuận lợi cho biến cố $\overline{A} \cap \overline{B} \cap \overline{C}$ là các hoán vị của $3$ phần tử mà không có phần tử nào ở đúng vị trí ban đầu. Có $2$ kết quả như vậy: 

- Lan lấy thẻ của Mai, Mai lấy thẻ của Đào, Đào lấy thẻ của Lan.
- Lan lấy thẻ của Đào, Mai lấy thẻ của Lan, Đào lấy thẻ của Mai.

Do đó, số kết quả thuận lợi cho biến cố $\overline{A} \cap \overline{B} \cap \overline{C}$ là $2$.

Xác suất của biến cố $\overline{A} \cap \overline{B} \cap \overline{C}$ là:

$$
P(\overline{A} \cap \overline{B} \cap \overline{C}) = \frac{2}{6} = \frac{1}{3}.
$$

> **Kết quả:** $\frac{1}{3}$

---

## Trang 85 — Xác suất

**Bài 1.** Một hộp có 10 tấm thẻ giống nhau được đánh số lần lượt từ 1 đến 10. Chọn ra ngẫu nhiên cùng một lúc 3 thẻ. Tính xác suất của biến cố tích các số ghi trên 3 thẻ đó là số chẵn.

**Lời giải:**

Số kết quả có thể xảy ra khi chọn 3 thẻ từ 10 thẻ là:

$$
C_{10}^3 = 120
$$

Để tích các số ghi trên 3 thẻ là số chẵn, ít nhất một trong ba thẻ phải có số chẵn. Ta tính xác suất của biến cố đối: tích các số ghi trên 3 thẻ là số lẻ.

Số kết quả thuận lợi cho biến cố tích các số ghi trên 3 thẻ là số lẻ là số cách chọn 3 thẻ từ 5 thẻ có số lẻ, tức là:

$$
C_{5}^3 = 10
$$

Xác suất của biến cố tích các số ghi trên 3 thẻ là số lẻ là:

$$
P = \frac{10}{120} = \frac{1}{12}
$$

Do đó, xác suất của biến cố tích các số ghi trên 3 thẻ là số chẵn là:

$$
P = 1 - \frac{1}{12} = \frac{11}{12}
$$

> **Kết quả:** $\frac{11}{12}$

**Bài 2.** gieo đồng thời ba con xúc xắc cân đối và đồng chất. Tính xác suất của các biến cố:

a) "Tích các số chấm ở mặt xuất hiện trên ba con xúc xắc chia hết cho 3";

b) "Tổng các số chấm ở mặt xuất hiện trên ba con xúc xắc lớn hơn 4".

**Lời giải:**

Số kết quả có thể xảy ra khi gieo ba con xúc xắc là:

$$
6^3 = 216
$$

a) Để tích các số chấm ở mặt xuất hiện trên ba con xúc xắc chia hết cho 3, ít nhất một trong ba con xúc xắc phải có số chấm chia hết cho 3.

Số kết quả thuận lợi cho biến cố "tích các số chấm ở mặt xuất hiện trên ba con xúc xắc không chia hết cho 3" là số cách gieo mà không con xúc xắc nào có số chấm chia hết cho 3. Có $4$ kết quả cho mỗi con xúc xắc không chia hết cho $3$, do đó:

$$
n(\overline{A}) = 4^3 = 64
$$

Xác suất của biến cố "tích các số chấm ở mặt xuất hiện trên ba con xúc xắc không chia hết cho 3" là:

$$
P(\overline{A}) = \frac{64}{216} = \frac{8}{27}
$$

Do đó, xác suất của biến cố "tích các số chấm ở mặt xuất hiện trên ba con xúc xắc chia hết cho 3" là:

$$
P(A) = 1 - \frac{8}{27} = \frac{19}{27}
$$

b) Ta tính xác suất của biến cố đối: "tổng các số chấm ở mặt xuất hiện trên ba con xúc xắc nhỏ hơn hoặc bằng 4".

Các kết quả thuận lợi cho biến cố này là:
- $(1, 1, 1)$
- $(1, 1, 2)$
- $(1, 2, 1)$
- $(2, 1, 1)$

Do đó:

$$
n(\overline{B}) = 4
$$

Xác suất của biến cố "tổng các số chấm ở mặt xuất hiện trên ba con xúc xắc nhỏ hơn hoặc bằng 4" là:

$$
P(\overline{B}) = \frac{4}{216} = \frac{1}{54}
$$

Do đó, xác suất của biến cố "tổng các số chấm ở mặt xuất hiện trên ba con xúc xắc lớn hơn 4" là:

$$
P(B) = 1 - \frac{1}{54} = \frac{53}{54}
$$

> **Kết quả:** 
> a) $\frac{19}{27}$ 
> b) $\frac{53}{54}$ 

**Bài 3.** Trong hộp có 3 bi xanh, 4 bi đỏ và 5 bi vàng có kích thước và khối lượng như nhau. Lấy ngẫu nhiên từ trong hộp 4 viên bi. Tính xác suất để trong 4 bi lấy ra:

a) có ít nhất 1 bi xanh.

b) có ít nhất 2 bi đỏ.

**Lời giải:**

Số kết quả có thể xảy ra khi lấy 4 viên bi từ 12 viên bi là:

$$
C_{12}^4 = 495
$$

a) Ta tính xác suất của biến cố đối: "không có bi xanh nào".

Số kết quả thuận lợi cho biến cố này là số cách lấy 4 bi từ 9 bi (không có bi xanh), tức là:

$$
C_{9}^4 = 126
$$

Xác suất của biến cố "không có bi xanh" là:

$$
P = \frac{126}{495} = \frac{14}{55}
$$

Do đó, xác suất của biến cố "có ít nhất 1 bi xanh" là:

$$
P = 1 - \frac{14}{55} = \frac{41}{55}
$$

b) Ta tính xác suất của biến cố đối: "có ít nhất 2 bi đỏ", tức là có từ 2 bi đỏ trở lên.

- Số kết quả thuận lợi cho biến cố "lấy được đúng 2 bi đỏ" là:

$$
C_{4}^2 \cdot C_{8}^2 = 168
$$

- Số kết quả thuận lợi cho biến cố "lấy được đúng 3 bi đỏ" là:

$$
C_{4}^3 \cdot C_{8}^1 = 32
$$

- Số kết quả thuận lợi cho biến cố "lấy được 4 bi đỏ" là:

$$
C_{4}^4 = 1
$$

Tổng số kết quả thuận lợi cho biến cố "có ít nhất 2 bi đỏ" là:

$$
168 + 32 + 1 = 201
$$

Xác suất của biến cố "có ít nhất 2 bi đỏ" là:

$$
P = \frac{201}{495} = \frac{67}{165}
$$

Do đó, xác suất của biến cố "có ít nhất 2 bi đỏ" là:

$$
P = \frac{67}{165}
$$

> **Kết quả:** 
> a) $\frac{41}{55}$ 
> b) $\frac{67}{165}$ 

**Bài 4.** Có 1 hạt gạo nếp nằm lẫn trong một cái thùng chứa 10 kg gạo tẻ. Lấy ngẫu nhiên 1 hạt gạo từ thùng. Theo bạn, hạt gạo lấy ra là gạo tẻ hay gạo nếp?

**Lời giải:**

Số kết quả có thể xảy ra khi lấy 1 hạt gạo từ thùng là $10,001$ (gồm 10kg gạo tẻ và 1 hạt gạo nếp).

Xác suất lấy ra hạt gạo nếp là:

$$
P = \frac{1}{10001} \approx 0.0001
$$

Xác suất lấy ra hạt gạo tẻ là:

$$
P = \frac{10000}{10001} \approx 0.9999
$$

Vì xác suất lấy ra hạt gạo tẻ rất lớn, gần bằng 1, nên khả năng hạt gạo lấy ra là gạo tẻ rất cao.

> **Kết quả:** Gạo tẻ

---

## Trang 86 — Xác suất

**Bài 1.** Tung ba đồng xu cân đối và đồng chất. Xác định biến cố đối của mỗi biến cố sau và tính xác suất của nó.

a) "Xuất hiện ba mặt sấp";

b) "Xuất hiện ít nhất một mặt sấp".

**Lời giải:**

a) Gọi biến cố $A$: "Xuất hiện ba mặt sấp".

Biến cố đối của $A$ là $\overline{A}$: "Không xuất hiện ba mặt sấp".

Không gian mẫu $\Omega$ khi tung ba đồng xu:
$\Omega = \{SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN\}$

Số phần tử không gian mẫu là: $|\Omega| = 2^3 = 8$.

Biến cố $A = \{SSS\}$.

Xác suất của biến cố $A$ là:
$P(A) = \frac{|A|}{|\Omega|} = \frac{1}{8}.$

Xác suất của biến cố $\overline{A}$ là:
$P(\overline{A}) = 1 - P(A) = 1 - \frac{1}{8} = \frac{7}{8}.$

b) Gọi biến cố $B$: "Xuất hiện ít nhất một mặt sấp".

Biến cố đối của $B$ là $\overline{B}$: "Không xuất hiện mặt sấp nào" hay $\overline{B}$: "Xuất hiện ba mặt ngửa".

Biến cố $\overline{B} = \{NNN\}$.

Xác suất của biến cố $\overline{B}$ là:
$P(\overline{B}) = \frac{1}{8}.$

Xác suất của biến cố $B$ là:
$P(B) = 1 - P(\overline{B}) = 1 - \frac{1}{8} = \frac{7}{8}.$

> **Kết quả:** $\frac{7}{8};\frac{7}{8}$

**Bài 2.** Gieo hai con xúc xắc cân đối và đồng chất. Tính xác suất của mỗi biến cố sau:

a) "Tổng số chấm xuất hiện nhỏ hơn $10$";

b) "Tích số chấm xuất hiện chia hết cho $3$".

**Lời giải:**

Khi gieo hai con xúc xắc cân đối, đồng chất, số phần tử không gian mẫu là: $6 \cdot 6 = 36$.

a) Gọi biến cố $A$: "Tổng số chấm xuất hiện nhỏ hơn $10$".

Các kết quả thuận lợi cho biến cố $A$ là:

$A = \{(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), 
(2,1), (2,2), (2,3), (2,4), (2,5), 
(3,1), (3,2), (3,3), (3,4), 
(4,1), (4,2), (4,3), 
(5,1), (5,2), 
(6,1), (6,2), (6,3), (6,4), (6,5), (6,6)\}$.

Số phần tử của biến cố $A$ là: $|A| = 30$.

Xác suất của biến cố $A$ là:
$P(A) = \frac{|A|}{|\Omega|} = \frac{30}{36} = \frac{5}{6}.$

b) Gọi biến cố $B$: "Tích số chấm xuất hiện chia hết cho $3$".

Các kết quả thuận lợi cho biến cố $B$ là:

$B = \{(1,3), (1,6), 
(2,3), (2,6), 
(3,1), (3,2), (3,3), (3,4), (3,5), (3,6),
(4,3), (4,6), 
(5,3), (5,6), 
(6,1), (6,2), (6,3), (6,4), (6,5), (6,6)\}$.

Số phần tử của biến cố $B$ là: $|B| = 12$.

Xác suất của biến cố $B$ là:
$P(B) = \frac{|B|}{|\Omega|} = \frac{12}{36} = \frac{1}{3}.$

> **Kết quả:** $\frac{5}{6};\frac{1}{3}$

**Bài 3.** Hộp thứ nhất đựng $1$ thẻ xanh, $1$ thẻ đỏ và $1$ thẻ vàng. Hộp thứ hai đựng $1$ thẻ xanh và $1$ thẻ đỏ. Các tấm thẻ có kích thước và khối lượng như nhau. Lần lượt lấy ra ngẫu nhiên từ mỗi hộp một tấm thẻ.

a) Sử dụng sơ đồ hình cây, hãy liệt kê tất cả các kết quả có thể xảy ra.

b) Tính xác suất của biến cố "Trong $2$ thẻ lấy ra có ít nhất $1$ thẻ màu đỏ".

**Lời giải:**

a) Sơ đồ hình cây:

- Lấy thẻ từ hộp $1$: $1$ thẻ xanh, $1$ thẻ đỏ, $1$ thẻ vàng.

- Lấy thẻ từ hộp $2$: $1$ thẻ xanh, $1$ thẻ đỏ.

Các kết quả có thể xảy ra:

$\{ (X,Z), (X,R), (R,Z), (R,R), (V,Z), (V,R) \}$

b) Gọi biến cố $C$: "Trong $2$ thẻ lấy ra có ít nhất $1$ thẻ màu đỏ".

Các kết quả thuận lợi cho biến cố $C$ là:

$\{ (X,R), (R,Z), (R,R), (V,R) \}$.

Số phần tử không gian mẫu là: $3 \cdot 2 = 6$.

Số phần tử của biến cố $C$ là: $|C| = 4$.

Xác suất của biến cố $C$ là:
$P(C) = \frac{|C|}{|\Omega|} = \frac{4}{6} = \frac{2}{3}.$

> **Kết quả:** $\frac{2}{3}$

**Bài 4.** Trong hộp có một số quả bóng màu xanh và màu đỏ có kích thước và khối lượng như nhau. An nhận thấy nếu lấy ngẫu nhiên hai quả bóng từ hộp thì xác suất để hai quả bóng này khác màu là $0,6$. Hỏi xác suất để hai quả bóng lấy ra cùng màu là bao nhiêu?

**Lời giải:**

Gọi $n$ là số lượng bóng trong hộp.

Gọi $A$ là biến cố: "Lấy ra hai quả bóng cùng màu".

Gọi $B$ là biến cố: "Lấy ra hai quả bóng khác màu".

Ta có: $P(B) = 0,6$.

Mà $P(B) = 1 - P(A)$, suy ra:

$P(A) = 1 - 0,6 = 0,4.$

> **Kết quả:** $0,4$

**Bài 5.** Năm bạn Nhân, Lẽ, Nghĩa, Trí và Tin xếp một cách ngẫu nhiên thành một hàng ngang để chụp ảnh. Tính xác suất của biến cố:

a) "Nhân và Tín không đứng cạnh nhau";

b) "Trí không đứng ở đầu hàng".

**Lời giải:**

a) Số cách xếp $5$ bạn thành hàng ngang là $5!$.

Gọi biến cố $D$: "Nhân và Tín đứng cạnh nhau".

Ta xem Nhân và Tín là một người, khi đó có $4$ người xếp thành hàng ngang.

Số cách xếp $4$ người là: $4! = 24$.

Tuy nhiên, Nhân và Tín có thể đổi chỗ cho nhau nên có $2$ cách.

Do đó, số cách xếp để Nhân và Tín đứng cạnh nhau là: $2 \cdot 24 = 48$.

Biến cố $\overline{D}$: "Nhân và Tín không đứng cạnh nhau".

Xác suất của biến cố $\overline{D}$ là:
$P(\overline{D}) = 1 - \frac{48}{120} = \frac{72}{120} = \frac{3}{5}.$

b) Gọi biến cố $E$: "Trí đứng ở đầu hàng".

Có $2$ cách chọn vị trí đầu hàng.

Số cách xếp $4$ người còn lại là: $4! = 24$.

Do đó, số cách xếp để Trí đứng ở đầu hàng là: $2 \cdot 24 = 48$.

Biến cố $\overline{E}$: "Trí không đứng ở đầu hàng".

Xác suất của biến cố $\overline{E}$ là:
$P(\overline{E}) = 1 - \frac{48}{120} = \frac{72}{120} = \frac{3}{5}.$

> **Kết quả:** $\frac{3}{5};\frac{3}{5}$

---

## Trang 87 — Bài tập cuối chương X

**Bài 1.** Chọn ngẫu nhiên một số nguyên dương có ba chữ số.

a) Hãy mô tả không gian mẫu.

b) Tính xác suất của biến cố "Số được chọn là lập phương của một số nguyên".

c) Tính xác suất của biến cố "Số được chọn chia hết cho 5".

**Lời giải:**

a) Không gian mẫu $\Omega$ bao gồm tất cả các số nguyên dương có ba chữ số, tức là $\Omega = \{100, 101, 102, \ldots, 999\}$ với $|\Omega| = 900$.

b) Các số là lập phương của một số nguyên trong khoảng từ $100$ đến $999$ là $125, 216, 343, 512, 729$. Do đó, xác suất của biến cố "Số được chọn là lập phương của một số nguyên" là:

$$P = \frac{5}{900} = \frac{1}{180}.$$

> **Kết quả:** $\frac{1}{180}$

c) Các số chia hết cho $5$ trong khoảng từ $100$ đến $999$ là các số có chữ số hàng đơn vị là $0$ hoặc $5$. Có $180$ số chia hết cho $5$ trong khoảng này. Do đó, xác suất của biến cố "Số được chọn chia hết cho $5$" là:

$$P = \frac{180}{900} = \frac{1}{5}.$$

> **Kết quả:** $\frac{1}{5}$

**Bài 2.** Gieo bốn đồng xu cân đối và đồng chất. Xác định biến cố đối của mỗi biến cố sau và tính xác suất của nó.

a) "Xuất hiện ít nhất ba mặt sấp";

b) "Xuất hiện ít nhất một mặt ngửa".

**Lời giải:**

a) Biến cố đối của biến cố "Xuất hiện ít nhất ba mặt sấp" là biến cố "Xuất hiện nhiều nhất hai mặt sấp". Xác suất của biến cố "Xuất hiện ít nhất ba mặt sấp" là:

- Số phần tử của không gian mẫu: $2^4 = 16$.
- Các trường hợp xuất hiện ít nhất ba mặt sấp: $\{(S, S, S, S), (S, S, S, N), (S, S, N, S), (S, N, S, S), (N, S, S, S)\}$.

Do đó, xác suất của biến cố "Xuất hiện ít nhất ba mặt sấp" là:

$$P = \frac{5}{16}.$$

b) Biến cố đối của biến cố "Xuất hiện ít nhất một mặt ngửa" là biến cố "Không xuất hiện mặt ngửa nào" hay "Tất cả các mặt đều là mặt sấp". Xác suất của biến cố "Không xuất hiện mặt ngửa nào" là:

$$P = \frac{1}{16}.$$

Do đó, xác suất của biến cố "Xuất hiện ít nhất một mặt ngửa" là:

$$P = 1 - \frac{1}{16} = \frac{15}{16}.$$

> **Kết quả:** $\frac{5}{16}$, $\frac{15}{16}$

**Bài 3.** Gieo ba con xúc xắc cân đối và đồng chất. Tính xác suất của mỗi biến cố sau:

a) "Tổng số chấm xuất hiện nhỏ hơn 5";

b) "Tích số chấm xuất hiện chia hết cho 5".

**Lời giải:**

a) Không gian mẫu $\Omega$ có $6^3 = 216$ phần tử.

Các trường hợp thoả mãn điều kiện "Tổng số chấm xuất hiện nhỏ hơn $5$" là:

- $(1, 1, 1)$;
- $(1, 1, 2)$; $(1, 2, 1)$; $(2, 1, 1)$.

Do đó, xác suất của biến cố "Tổng số chấm xuất hiện nhỏ hơn $5$" là:

$$P = \frac{4}{216} = \frac{1}{54}.$$

b) Biến cố "Tích số chấm xuất hiện chia hết cho $5$" xảy ra khi và chỉ khi có ít nhất một trong các số chấm xuất hiện là $5$. 

Số phần tử của không gian mẫu là $216$. Số cách chọn sao cho không có số chấm nào là $5$ là $5^3 = 125$.

Do đó, xác suất của biến cố "Tích số chấm xuất hiện chia hết cho $5$" là:

$$P = 1 - \frac{125}{216} = \frac{91}{216}.$$

> **Kết quả:** $\frac{1}{54}$, $\frac{91}{216}$

**Bài 4.** Hộp thứ nhất chứa 4 viên bi xanh, 3 viên bi đỏ. Hộp thứ hai chứa 5 viên bi xanh, 2 viên bi đỏ. Các viên bi có kích thước và khối lượng như nhau. Lấy ngẫu nhiên từ mỗi hộp 2 viên bi. Tính xác suất của mỗi biến cố sau:

a) "Bốn viên bi lấy ra có cùng màu";

b) "Trong 4 viên bi lấy ra có đúng 1 viên bi xanh";

c) "Trong 4 viên bi lấy ra có đủ cả hai màu xanh và đỏ".

**Lời giải:**

a) Số cách lấy $2$ viên bi từ hộp thứ nhất: $C_7^2 = 21$.

Số cách lấy $2$ viên bi từ hộp thứ hai: $C_7^2 = 21$.

Do đó, số phần tử của không gian mẫu là $21 \cdot 21 = 441$.

- Số cách lấy $2$ viên bi xanh từ hộp thứ nhất: $C_4^2 = 6$.

- Số cách lấy $2$ viên bi xanh từ hộp thứ hai: $C_5^2 = 10$.

- Xác suất của biến cố "Bốn viên bi lấy ra có cùng màu xanh" là $\frac{6 \cdot 10}{441} = \frac{60}{441}$.

- Số cách lấy $2$ viên bi đỏ từ hộp thứ nhất: $C_3^2 = 3$.

- Số cách lấy $2$ viên bi đỏ từ hộp thứ hai: $C_2^2 = 1$.

- Xác suất của biến cố "Bốn viên bi lấy ra có cùng màu đỏ" là $\frac{3 \cdot 1}{441} = \frac{3}{441}$.

- Xác suất của biến cố "Bốn viên bi lấy ra có cùng màu" là:

$$P = \frac{60}{441} + \frac{3}{441} = \frac{63}{441} = \frac{7}{49}.$$

b) - Số cách lấy $1$ viên bi xanh và $1$ viên bi đỏ từ hộp thứ nhất: $C_4^1 \cdot C_3^1 = 12$.

- Số cách lấy $1$ viên bi xanh và $1$ viên bi đỏ từ hộp thứ hai: $C_5^1 \cdot C_2^1 = 10$.

- Xác suất của biến cố "Trong 4 viên bi lấy ra có đúng 1 viên bi xanh" là:

$$P = \frac{12 \cdot 10}{441} = \frac{120}{441}.$$

c) Biến cố đối của biến cố "Trong $4$ viên bi lấy ra có đủ cả hai màu xanh và đỏ" là biến cố "Trong $4$ viên bi lấy ra có cùng màu". 

Do đó, xác suất của biến cố "Trong $4$ viên bi lấy ra có đủ cả hai màu xanh và đỏ" là:

$$P = 1 - \frac{7}{49} = \frac{42}{49}.$$

> **Kết quả:** $\frac{7}{49}$, $\frac{120}{441}$, $\frac{42}{49}$
