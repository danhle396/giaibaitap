---
tieu_de: "Giải Toán 9 Tập 2 trang 126-129 - Kết nối tri thức"
slug: "giai-toan-9-tap-2-trang-126-129-kntt"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải Toán 9 Tập 2 trang 126-129 Kết nối tri thức: thực hành Excel, gene trội trong lai giống Mendel và Bài tập ôn tập cuối năm (1-7). Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 2 trang 126-129 - Kết nối tri thức"
meta_description: "Giải Toán 9 Tập 2 trang 126-129 Kết nối tri thức: quy luật Mendel bằng xác suất và Bài tập ôn tập cuối năm phần Đại số (bài 1-7)."
---

## Thực hành 2 (Excel)

Thời gian chờ của bệnh nhân tại một phòng khám bệnh được cho trong bảng tần số tương đối ghép nhóm:

| Thời gian (phút) | $[0; 10)$ | $[10; 20)$ | $[20; 30)$ | $[30; 40)$ |
| :--: | :--: | :--: | :--: | :--: |
| Tần số tương đối | $50\%$ | $10\%$ | $24\%$ | $16\%$ |

Dùng Excel: nhập bảng, chọn vùng dữ liệu rồi Insert → Column → chọn Layout histogram để vẽ **biểu đồ cột** (bốn cột kề nhau cao $50$; $10$; $24$; $16$); Insert → Line để vẽ **biểu đồ đoạn thẳng** nối các điểm ứng với giá trị đại diện $5$; $15$; $25$; $35$. Hoàn thiện tiêu đề "Thời gian chờ của bệnh nhân". Nhận xét: nhóm $[0; 10)$ phút chiếm tỉ lệ cao nhất ($50\%$).

---

## Gene trội trong các thế hệ lai — Giải thích quy luật Mendel bằng xác suất

Lai cây đậu Hà Lan hoa đỏ thuần chủng (AA) với cây hoa trắng thuần chủng (aa): đời $F_1$ đều có kiểu gene Aa (hoa đỏ). Cho $F_1$ tự thụ phấn, mỗi cây con $F_2$ nhận ngẫu nhiên một allele từ "bố" và một allele từ "mẹ", mỗi allele là A hoặc a với khả năng như nhau.

**a) Các phương án tổ hợp kiểu gene $F_2$:**

| "mẹ" \ "bố" | A | a |
| :--: | :--: | :--: |
| A | AA | Aa |
| a | aA | aa |

Không gian mẫu có $4$ kết quả đồng khả năng: AA, Aa, aA, aa.

**b) Tính xác suất:**

- Kiểu gene AA: chỉ có $1$ kết quả → $P(\text{AA}) = \dfrac{1}{4}$;
- Kiểu gene aa: chỉ có $1$ kết quả → $P(\text{aa}) = \dfrac{1}{4}$;
- Kiểu gene Aa (gồm Aa và aA): $2$ kết quả → $P(\text{Aa}) = \dfrac{2}{4} = \dfrac{1}{2}$;
- Hoa đỏ (kiểu gene có ít nhất một allele trội A: AA, Aa, aA): $3$ kết quả → $P(\text{đỏ}) = \dfrac{3}{4}$;
- Hoa trắng (kiểu gene aa): $1$ kết quả → $P(\text{trắng}) = \dfrac{1}{4}$.

**c) So sánh với kết luận của Mendel:**

Tỉ lệ kiểu gene $F_2$ là $\text{AA} : \text{Aa} : \text{aa} = \dfrac{1}{4} : \dfrac{1}{2} : \dfrac{1}{4} = 1 : 2 : 1$; tỉ lệ kiểu hình hoa đỏ : hoa trắng $= \dfrac{3}{4} : \dfrac{1}{4} = 3 : 1$.

Kết quả này **đúng** với kết luận của Mendel: khi lai bố mẹ khác nhau về một cặp tính trạng thuần chủng tương phản thì $F_1$ đồng tính, còn $F_2$ phân li theo tỉ lệ trung bình $3$ trội $: 1$ lặn.

---

## Bài tập ôn tập cuối năm (Đại số)

**Bài 1.** Xét biểu thức $P = \dfrac{x\sqrt{x} - x + 2\sqrt{x} + 4}{x\sqrt{x} + 8}$ với $x \ge 0$.

a) Chứng minh rằng $P = 1 - \dfrac{1}{\sqrt{x} + 2}$.

b) Tính giá trị của $P$ tại $x = 64$.

**Lời giải:**

a) Đặt $t = \sqrt{x} \ge 0$. Mẫu $x\sqrt{x} + 8 = t^3 + 8 = (t + 2)(t^2 - 2t + 4)$.

Tử $x\sqrt{x} - x + 2\sqrt{x} + 4 = t^3 - t^2 + 2t + 4$. Chia tử cho $(t + 2)$:

$$t^3 - t^2 + 2t + 4 = (t + 2)(t^2 - 3t + 8) - 12 \quad ?$$

Ta khai triển trực tiếp theo hướng cần chứng minh: $1 - \dfrac{1}{t+2} = \dfrac{t+1}{t+2}$. Nhân với mẫu:

$$\frac{t+1}{t+2} = \frac{(t+1)(t^2 - 2t + 4)}{(t+2)(t^2 - 2t + 4)} = \frac{t^3 - t^2 + 2t + 4}{t^3 + 8}.$$

Tử vế phải: $(t+1)(t^2 - 2t + 4) = t^3 - 2t^2 + 4t + t^2 - 2t + 4 = t^3 - t^2 + 2t + 4$ — đúng bằng tử của $P$. Vậy $P = \dfrac{t+1}{t+2} = 1 - \dfrac{1}{\sqrt{x} + 2}$ (điều phải chứng minh).

b) Tại $x = 64$ thì $\sqrt{x} = 8$: $P = 1 - \dfrac{1}{8 + 2} = 1 - \dfrac{1}{10} = \dfrac{9}{10}$.

---

**Bài 2.** Một vệ tinh địa tĩnh chuyển động theo quỹ đạo tròn cách bề mặt Trái Đất khoảng $AB = 36\,000$ km, tâm quỹ đạo trùng với tâm $O$ của Trái Đất. Vệ tinh phát tín hiệu theo đường thẳng. Cho bán kính Trái Đất khoảng $6\,400$ km, vị trí xa nhất trên bề mặt Trái Đất có thể nhận được tín hiệu từ vệ tinh cách vệ tinh bao nhiêu kilômét? (Làm tròn đến hàng đơn vị.)

**Lời giải:**

Gọi $A$ là vị trí vệ tinh, $O$ là tâm Trái Đất. Vị trí xa nhất nhận được tín hiệu là điểm $C$ trên bề mặt Trái Đất mà tại đó đường thẳng $AC$ **tiếp xúc** với mặt Trái Đất, nên $OC \perp AC$ với $OC = 6\,400$ km (bán kính).

Khoảng cách từ vệ tinh đến tâm: $OA = OB + AB = 6\,400 + 36\,000 = 42\,400$ (km).

Trong tam giác vuông $OCA$ (vuông tại $C$):

$$AC = \sqrt{OA^2 - OC^2} = \sqrt{42\,400^2 - 6\,400^2} = \sqrt{1\,797\,760\,000 - 40\,960\,000} = \sqrt{1\,756\,800\,000} \approx 41\,915 \text{ (km)}.$$

Vậy vị trí xa nhất cách vệ tinh khoảng $41\,915$ km.

---

**Bài 3.** Giải các bất phương trình:

a) $-6x + 3(x + 1) > 4x - (x - 4)$;

b) $(2x + 1)(2x - 1) < 4x^2 - 4x + 1$.

**Lời giải:**

a) $-6x + 3x + 3 > 4x - x + 4 \iff -3x + 3 > 3x + 4 \iff -6x > 1 \iff x < -\dfrac{1}{6}$.

b) $4x^2 - 1 < 4x^2 - 4x + 1 \iff -1 < -4x + 1 \iff 4x < 2 \iff x < \dfrac{1}{2}$.

---

**Bài 4.** Giải các phương trình:

a) $\dfrac{2}{x+1} - \dfrac{2x}{x^2 - x + 1} = \dfrac{3}{x^3 + 1}$;

b) $\dfrac{x+1}{2x-1} - \dfrac{2}{2x+1} = \dfrac{2x^2}{4x^2 - 1}$.

**Lời giải:**

a) Điều kiện $x \ne -1$. Vì $x^3 + 1 = (x+1)(x^2 - x + 1)$, quy đồng:

$$2(x^2 - x + 1) - 2x(x+1) = 3 \iff 2x^2 - 2x + 2 - 2x^2 - 2x = 3 \iff -4x + 2 = 3 \iff x = -\frac{1}{4}.$$

$x = -\dfrac{1}{4}$ thỏa mãn điều kiện. Vậy nghiệm là $x = -\dfrac{1}{4}$.

b) Điều kiện $x \ne \pm\dfrac{1}{2}$. Vì $4x^2 - 1 = (2x-1)(2x+1)$, quy đồng:

$$(x+1)(2x+1) - 2(2x-1) = 2x^2 \iff 2x^2 + 3x + 1 - 4x + 2 = 2x^2 \iff -x + 3 = 0 \iff x = 3.$$

$x = 3$ thỏa mãn điều kiện. Vậy nghiệm là $x = 3$.

---

**Bài 5.** Kí hiệu $(d_1)$ là đường thẳng $x + 2y = 4$, $(d_2)$ là đường thẳng $x - y = 1$.

a) Vẽ $(d_1)$ và $(d_2)$ trên cùng một mặt phẳng tọa độ.

b) Giải hệ để tìm tọa độ giao điểm của $(d_1)$ và $(d_2)$.

**Lời giải:**

a) $(d_1)\colon y = \dfrac{4 - x}{2}$ đi qua $(0; 2)$ và $(4; 0)$; $(d_2)\colon y = x - 1$ đi qua $(0; -1)$ và $(1; 0)$.

b) Trừ hai phương trình: $(x + 2y) - (x - y) = 4 - 1 \iff 3y = 3 \iff y = 1$; suy ra $x = y + 1 = 2$.

Vậy giao điểm của $(d_1)$ và $(d_2)$ là $(2; 1)$.

---

**Bài 6.** Với mỗi giá trị của $m$, giải hệ $\begin{cases} x\sqrt{2} - 3y = m \\ m^2 x - 3y\sqrt{2} = 2 \end{cases}$ khi:

a) $m = \sqrt{2}$;  b) $m = -\sqrt{2}$;  c) $m = 2\sqrt{2}$.

**Lời giải:**

a) $m = \sqrt{2}$ ($m^2 = 2$): $\begin{cases} x\sqrt{2} - 3y = \sqrt{2} \\ 2x - 3y\sqrt{2} = 2 \end{cases}$. Từ phương trình đầu $x\sqrt{2} = \sqrt{2} + 3y$, nhân $\sqrt{2}$: $2x = 2 + 3y\sqrt{2}$, thay vào phương trình sau: $2 + 3y\sqrt{2} - 3y\sqrt{2} = 2 \iff 2 = 2$ (luôn đúng). Hệ có **vô số nghiệm**: $x = 1 + \dfrac{3y}{\sqrt{2}}$ với $y$ tùy ý.

b) $m = -\sqrt{2}$ ($m^2 = 2$): $\begin{cases} x\sqrt{2} - 3y = -\sqrt{2} \\ 2x - 3y\sqrt{2} = 2 \end{cases}$. Từ phương trình đầu, nhân $\sqrt{2}$: $2x - 3y\sqrt{2} = -2$. Kết hợp phương trình sau $2x - 3y\sqrt{2} = 2$ suy ra $-2 = 2$ (vô lí). Hệ **vô nghiệm**.

c) $m = 2\sqrt{2}$ ($m^2 = 8$): $\begin{cases} x\sqrt{2} - 3y = 2\sqrt{2} \\ 8x - 3y\sqrt{2} = 2 \end{cases}$. Nhân phương trình đầu với $\sqrt{2}$: $2x - 3y\sqrt{2} = 4$. Trừ với phương trình sau: $(8x - 3y\sqrt{2}) - (2x - 3y\sqrt{2}) = 2 - 4 \iff 6x = -2 \iff x = -\dfrac{1}{3}$. Thay vào $x\sqrt{2} - 3y = 2\sqrt{2}$: $-\dfrac{\sqrt{2}}{3} - 3y = 2\sqrt{2} \iff 3y = -\dfrac{7\sqrt{2}}{3} \iff y = -\dfrac{7\sqrt{2}}{9}$.

Vậy hệ có nghiệm duy nhất $\left(-\dfrac{1}{3};\ -\dfrac{7\sqrt{2}}{9}\right)$.

---

**Bài 7.** Chú Ba dự tính tổng diện tích xây dựng khoảng $100$ m² với tổng chi phí $600$ triệu đồng. Khi thực hiện, diện tích tăng thêm $20$ m² và mỗi mét vuông, tiền vật liệu tăng $10\%$, tiền công thợ tăng $\dfrac{1}{5}$ so với dự tính. Tổng chi phí thực tế là $804$ triệu đồng. Hỏi thực tế chú Ba phải trả bao nhiêu tiền vật liệu và bao nhiêu tiền công thợ cho mỗi mét vuông?

**Lời giải:**

Gọi tiền vật liệu và tiền công thợ dự tính cho mỗi mét vuông lần lượt là $x$ và $y$ (triệu đồng, $x, y > 0$).

Theo dự tính ($100$ m²): $100(x + y) = 600 \iff x + y = 6$. $\quad(1)$

Khi thực hiện: diện tích $120$ m²; mỗi mét vuông tiền vật liệu là $1{,}1x$, tiền công thợ là $1{,}2y$. Tổng chi phí thực tế:

$$120(1{,}1x + 1{,}2y) = 804 \iff 1{,}1x + 1{,}2y = 6{,}7. \quad(2)$$

Từ (1): $x = 6 - y$; thay vào (2): $1{,}1(6 - y) + 1{,}2y = 6{,}7 \iff 6{,}6 + 0{,}1y = 6{,}7 \iff y = 1$, suy ra $x = 5$.

Thực tế mỗi mét vuông: tiền vật liệu $1{,}1 \cdot 5 = 5{,}5$ triệu đồng; tiền công thợ $1{,}2 \cdot 1 = 1{,}2$ triệu đồng.
