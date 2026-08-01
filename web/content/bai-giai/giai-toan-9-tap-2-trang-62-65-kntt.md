---
tieu_de: "Giải Toán 9 Tập 2 trang 62-65 - Kết nối tri thức"
slug: "giai-toan-9-tap-2-trang-62-65-kntt"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải bài tập Toán 9 Tập 2 trang 62-65 Kết nối tri thức: Bài 26 Xác suất của biến cố liên quan tới phép thử, bài tập 8.5-8.8. Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 2 trang 62-65 - Kết nối tri thức"
meta_description: "Giải Toán 9 Tập 2 trang 62-65 Kết nối tri thức: Bài 26 Xác suất của biến cố liên quan tới phép thử — kết quả thuận lợi, bài tập 8.5-8.8."
---

## Bài 26. Xác suất của biến cố liên quan tới phép thử

**HĐ1.** Bạn Tùng gieo một con xúc xắc liên tiếp hai lần. Xét các biến cố:

E: "Cả hai lần gieo con xúc xắc đều xuất hiện mặt có số chấm là số nguyên tố";

F: "Cả hai lần gieo con xúc xắc đều không xuất hiện mặt có số chấm là số chẵn".

a) Phép thử là gì?

b) Giả sử số chấm xuất hiện trong lần gieo thứ nhất, thứ hai tương ứng là $2$ và $5$ chấm. Khi đó biến cố nào xảy ra, biến cố nào không xảy ra?

**Lời giải:**

a) Phép thử là: gieo một con xúc xắc liên tiếp hai lần.

b) Với kết quả $(2; 5)$: cả $2$ và $5$ đều là số nguyên tố nên biến cố **E xảy ra**. Lần gieo thứ nhất xuất hiện mặt $2$ chấm là số chẵn nên biến cố **F không xảy ra**.

Kết quả của phép thử làm cho biến cố E xảy ra được gọi là **kết quả thuận lợi** cho E.

---

**Ví dụ 1.** Một tấm bìa cứng hình tròn được chia làm bốn hình quạt bằng nhau, đánh số $1$; $2$; $3$; $4$ và được gắn vào trục quay có mũi tên ở tâm. Bạn Tuấn quay tấm bìa hai lần, quan sát và ghi lại số của hình quạt mà mũi tên chỉ vào.

a) Phép thử là gì? Hãy mô tả không gian mẫu của phép thử.

**Lời giải:**

a) Phép thử là: quay tấm bìa hai lần. Kết quả của phép thử là cặp số $(a, b)$, trong đó $a$ và $b$ lần lượt là số của hình quạt mà mũi tên chỉ vào ở lần quay thứ nhất và thứ hai. Không gian mẫu là:

$$\Omega = \{(a, b) \mid a, b \in \{1; 2; 3; 4\}\},$$

gồm $4 \cdot 4 = 16$ phần tử: $(1, 1)$; $(1, 2)$; $(1, 3)$; $(1, 4)$; $(2, 1)$; $(2, 2)$; $(2, 3)$; $(2, 4)$; $(3, 1)$; $(3, 2)$; $(3, 3)$; $(3, 4)$; $(4, 1)$; $(4, 2)$; $(4, 3)$; $(4, 4)$.

---

**Luyện tập 1.** Bạn Hoàng lấy ngẫu nhiên một quả cầu từ một túi đựng $2$ quả cầu gồm một quả màu đen và một quả màu trắng, có cùng khối lượng và kích thước. Bạn Hải rút ngẫu nhiên một tấm thẻ từ một hộp đựng $3$ tấm thẻ A, B, C.

a) Mô tả không gian mẫu của phép thử.

b) Xét các biến cố E: "Bạn Hoàng lấy được quả cầu màu đen"; F: "Bạn Hoàng lấy được quả cầu màu trắng và bạn Hải không rút được tấm thẻ A". Hãy mô tả các kết quả thuận lợi cho E và F.

**Lời giải:**

a) Kết quả của phép thử là cặp (màu quả cầu, chữ trên tấm thẻ). Không gian mẫu là:

$$\Omega = \{(\text{đen}, A); (\text{đen}, B); (\text{đen}, C); (\text{trắng}, A); (\text{trắng}, B); (\text{trắng}, C)\}$$

— có $2 \cdot 3 = 6$ phần tử.

b) Các kết quả thuận lợi cho E (quả cầu màu đen): $(\text{đen}, A)$; $(\text{đen}, B)$; $(\text{đen}, C)$.

Các kết quả thuận lợi cho F (quả cầu trắng và thẻ không phải A): $(\text{trắng}, B)$; $(\text{trắng}, C)$.

---

**Công thức xác suất (kết quả đồng khả năng):**

$$P(E) = \frac{n(E)}{n(\Omega)},$$

trong đó $n(E)$ là số kết quả thuận lợi cho biến cố E và $n(\Omega)$ là số phần tử của không gian mẫu.

---

**Luyện tập 2.** Cho hai túi I và II, mỗi túi chứa $3$ tấm thẻ ghi các số $2$; $3$; $7$. Rút ngẫu nhiên từ mỗi túi ra một tấm thẻ và ghép thành số có hai chữ số với chữ số trên tấm thẻ rút từ túi I là chữ số hàng chục. Tính xác suất của các biến cố:

a) A: "Số tạo thành chia hết cho $4$";

b) B: "Số tạo thành là số nguyên tố".

**Lời giải:**

Các số có thể tạo thành: $22$; $23$; $27$; $32$; $33$; $37$; $72$; $73$; $77$. Không gian mẫu có $3 \cdot 3 = 9$ phần tử, các kết quả đồng khả năng.

a) Trong các số trên, các số chia hết cho $4$ là $32$ và $72$ — có $2$ kết quả thuận lợi. Vậy $P(A) = \dfrac{2}{9}$.

b) Các số nguyên tố là $23$; $37$; $73$ — có $3$ kết quả thuận lợi (chú ý $27 = 3^3$, $33 = 3 \cdot 11$, $77 = 7 \cdot 11$ là hợp số). Vậy $P(B) = \dfrac{3}{9} = \dfrac{1}{3}$.

---

**Luyện tập 3.** Cho lai hai cây đậu Hà Lan, trong đó cây bố có kiểu gene (AA, Bb), cây mẹ có kiểu gene (Aa, Bb) — allele trội A: hạt vàng, allele lặn a: hạt xanh; allele trội B: hạt trơn, allele lặn b: hạt nhăn. Tính xác suất để cây con có hạt vàng và nhăn.

**Lời giải:**

Theo Vận dụng của Bài 25, không gian mẫu của phép thử có $8$ phần tử đồng khả năng:

$$\Omega = \{(AA, BB); (AA, Bb); (AA, bB); (AA, bb); (Aa, BB); (Aa, Bb); (Aa, bB); (Aa, bb)\}.$$

Cây con có **hạt vàng** khi cặp gene màu hạt chứa allele trội A — cả hai kiểu AA và Aa đều thỏa mãn. Cây con có **hạt nhăn** khi cặp gene dạng hạt là bb (không chứa allele trội B).

Các kết quả thuận lợi cho biến cố "hạt vàng và nhăn" là: $(AA, bb)$ và $(Aa, bb)$ — có $2$ kết quả.

Vậy xác suất cần tìm là $P = \dfrac{2}{8} = \dfrac{1}{4}$.

---

## Bài tập

**Bài 8.5.** Chọn ngẫu nhiên một gia đình có hai con. Giả thiết rằng biến cố "Sinh con trai" và biến cố "Sinh con gái" là đồng khả năng. Tính xác suất của các biến cố:

A: "Gia đình đó có cả con trai và con gái";

B: "Gia đình đó có con trai".

**Lời giải:**

Kí hiệu T là con trai, G là con gái. Không gian mẫu $\Omega = \{(T, T); (T, G); (G, T); (G, G)\}$ có $4$ phần tử đồng khả năng (cặp thứ tự: con đầu, con thứ hai).

- Kết quả thuận lợi cho A: $(T, G)$; $(G, T)$ — có $2$ kết quả. Vậy $P(A) = \dfrac{2}{4} = \dfrac{1}{2}$.

- Kết quả thuận lợi cho B: $(T, T)$; $(T, G)$; $(G, T)$ — có $3$ kết quả. Vậy $P(B) = \dfrac{3}{4}$.

---

**Bài 8.6.** Gieo đồng thời hai con xúc xắc cân đối, đồng chất I và II. Tính xác suất của các biến cố:

E: "Có đúng một con xúc xắc xuất hiện mặt $6$ chấm";

F: "Có ít nhất một con xúc xắc xuất hiện mặt $6$ chấm";

G: "Tích của hai số chấm xuất hiện trên hai con xúc xắc nhỏ hơn hoặc bằng $6$".

**Lời giải:**

Không gian mẫu $\Omega = \{(a, b) \mid a, b \in \{1; \ldots; 6\}\}$ có $36$ phần tử đồng khả năng ($a$, $b$ là số chấm trên xúc xắc I, II).

**Biến cố E:** xúc xắc I ra $6$, xúc xắc II khác $6$: có $5$ kết quả $(6, 1), \ldots, (6, 5)$; hoặc ngược lại: $5$ kết quả. Vậy $n(E) = 10$ và $P(E) = \dfrac{10}{36} = \dfrac{5}{18}$.

**Biến cố F:** thêm kết quả $(6, 6)$ so với E: $n(F) = 10 + 1 = 11$. Vậy $P(F) = \dfrac{11}{36}$.

**Biến cố G:** đếm các cặp có $ab \le 6$: với $a = 1$: $b \in \{1; \ldots; 6\}$ — $6$ cặp; $a = 2$: $b \in \{1; 2; 3\}$ — $3$ cặp; $a = 3$: $b \in \{1; 2\}$ — $2$ cặp; $a = 4$, $a = 5$, $a = 6$: $b = 1$ — mỗi trường hợp $1$ cặp. Tổng: $6 + 3 + 2 + 1 + 1 + 1 = 14$. Vậy $P(G) = \dfrac{14}{36} = \dfrac{7}{18}$.

---

**Bài 8.7.** Bạn An gieo một đồng xu cân đối và bạn Bình rút ngẫu nhiên một tấm thẻ từ hộp chứa $5$ tấm thẻ ghi các số $1$; $2$; $3$; $4$; $5$. Tính xác suất của các biến cố:

E: "Rút được tấm thẻ ghi số lẻ";

F: "Rút được tấm thẻ ghi số chẵn và đồng xu xuất hiện mặt sấp";

G: "Rút được tấm thẻ ghi số $5$ hoặc đồng xu xuất hiện mặt ngửa".

**Lời giải:**

Không gian mẫu $\Omega = \{(S, 1); \ldots; (S, 5); (N, 1); \ldots; (N, 5)\}$ có $2 \cdot 5 = 10$ phần tử đồng khả năng (S: sấp, N: ngửa).

**Biến cố E:** thẻ lẻ ($1$; $3$; $5$) với mặt xu bất kì: $n(E) = 3 \cdot 2 = 6$. Vậy $P(E) = \dfrac{6}{10} = \dfrac{3}{5}$.

**Biến cố F:** thẻ chẵn ($2$; $4$) và mặt sấp: $(S, 2)$; $(S, 4)$ — $n(F) = 2$. Vậy $P(F) = \dfrac{2}{10} = \dfrac{1}{5}$.

**Biến cố G:** mặt ngửa: $5$ kết quả $(N, 1), \ldots, (N, 5)$; thêm thẻ $5$ với mặt sấp: $(S, 5)$. $n(G) = 5 + 1 = 6$. Vậy $P(G) = \dfrac{6}{10} = \dfrac{3}{5}$.

---

**Bài 8.8.** Có hai túi I và II, mỗi túi chứa $4$ tấm thẻ được đánh số $1$; $2$; $3$; $4$. Rút ngẫu nhiên từ mỗi túi ra một tấm thẻ và nhân hai số ghi trên hai tấm thẻ với nhau. Tính xác suất của các biến cố:

A: "Kết quả là một số lẻ";

B: "Kết quả là $1$ hoặc một số nguyên tố".

**Lời giải:**

Không gian mẫu $\Omega = \{(a, b) \mid a, b \in \{1; 2; 3; 4\}\}$ có $16$ phần tử đồng khả năng.

**Biến cố A:** tích $ab$ lẻ khi và chỉ khi cả $a$ và $b$ đều lẻ, tức $a, b \in \{1; 3\}$: $n(A) = 2 \cdot 2 = 4$. Vậy $P(A) = \dfrac{4}{16} = \dfrac{1}{4}$.

**Biến cố B:** tích bằng $1$: chỉ có $(1, 1)$. Tích là số nguyên tố: một thừa số bằng $1$ và thừa số kia là số nguyên tố ($2$ hoặc $3$): $(1, 2)$; $(2, 1)$; $(1, 3)$; $(3, 1)$. Vậy $n(B) = 1 + 4 = 5$ và $P(B) = \dfrac{5}{16}$.
