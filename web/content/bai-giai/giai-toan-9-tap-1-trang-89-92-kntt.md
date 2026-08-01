---
tieu_de: "Giải Toán 9 Tập 1 trang 89-92 - Kết nối tri thức"
slug: "giai-toan-9-tap-1-trang-89-92-kntt"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải bài tập Toán 9 Tập 1 trang 89-92 Kết nối tri thức: Bài 14 Cung và dây của một đường tròn. Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 1 trang 89-92 - Kết nối tri thức"
meta_description: "Giải Toán 9 Tập 1 trang 89-92 Kết nối tri thức: Bài 14 Cung và dây của một đường tròn. Lời giải chi tiết từng bài."
---

## Bài 14. Cung và dây của một đường tròn

**HĐ.** Xét dây $AB$ tuỳ ý không đi qua tâm của đường tròn $(O; R)$. Dựa vào quan hệ giữa các cạnh của tam giác $AOB$, chứng minh $AB < 2R$.

**Lời giải:**

Vì dây $AB$ không đi qua tâm nên ba điểm $A$, $O$, $B$ không thẳng hàng, tạo thành tam giác $AOB$.

Theo bất đẳng thức tam giác:

$$
AB < OA + OB = R + R = 2R. \qquad \blacksquare
$$

Từ đó suy ra định lí: *trong một đường tròn, đường kính là dây cung lớn nhất* (đường kính có độ dài đúng bằng $2R$, mọi dây khác đều nhỏ hơn $2R$).

---

**Luyện tập 1.** Cho đường tròn đường kính $BC$. Chứng minh rằng với điểm $A$ bất kì (khác $B$ và $C$) nằm trên đường tròn, ta đều có $BC < AB + AC < 2BC$.

**Lời giải:**

- Xét tam giác $ABC$: theo bất đẳng thức tam giác, $BC < AB + AC$. (1)

- $AB$ và $AC$ là hai dây của đường tròn; vì $A$ khác $B$ và $C$ nên chúng không phải là đường kính $BC$, tức là hai dây không đi qua tâm. Theo định lí "đường kính là dây cung lớn nhất":

$$
AB < BC \quad \text{và} \quad AC < BC \implies AB + AC < 2BC. \qquad (2)
$$

Từ (1) và (2): $BC < AB + AC < 2BC$. $\blacksquare$

---

**Luyện tập 2.** Cho điểm $C$ nằm trên đường tròn $(O)$. Đường trung trực của đoạn $OC$ cắt $(O)$ tại $A$ và $B$. Tính số đo của các cung $\overset\frown{ACB}$ và $\overset\frown{ABC}$.

**Lời giải:**

Vì $A$ nằm trên đường trung trực của $OC$ nên $AO = AC$. Mà $AO = OC = R$ (bán kính), nên tam giác $AOC$ **đều**, suy ra $\widehat{AOC} = 60^\circ$.

Tương tự, tam giác $BOC$ đều nên $\widehat{BOC} = 60^\circ$.

- Cung $\overset\frown{ACB}$ (cung có hai mút $A$, $B$ đi qua $C$):

$$
\text{sđ}\,\overset\frown{ACB} = \text{sđ}\,\overset\frown{AC} + \text{sđ}\,\overset\frown{CB} = 60^\circ + 60^\circ = 120^\circ.
$$

- Cung $\overset\frown{ABC}$ (cung có hai mút $A$, $C$ đi qua $B$) là cung lớn có chung hai mút với cung nhỏ $\overset\frown{AC}$:

$$
\text{sđ}\,\overset\frown{ABC} = 360^\circ - \text{sđ}\,\overset\frown{AC} = 360^\circ - 60^\circ = 300^\circ.
$$

> **Kết quả:** $\text{sđ}\,\overset\frown{ACB} = 120^\circ$; $\text{sđ}\,\overset\frown{ABC} = 300^\circ$.

---

## Bài tập

**Bài 5.5.** Cho nửa đường tròn đường kính $AB$ và một điểm $M$ tùy ý thuộc nửa đường tròn đó. Chứng minh rằng khoảng cách từ $M$ đến $AB$ không lớn hơn $\dfrac{AB}{2}$.

**Lời giải:**

Gọi $O$ là tâm (trung điểm của $AB$) và $H$ là chân đường vuông góc hạ từ $M$ xuống $AB$. Khoảng cách từ $M$ đến $AB$ là $MH$.

Trong các đường kẻ từ $M$ đến đường thẳng $AB$, đường vuông góc $MH$ ngắn nhất, do đó:

$$
MH \le MO = R = \frac{AB}{2}.
$$

(Dấu bằng xảy ra khi $H \equiv O$, tức $M$ là điểm chính giữa nửa đường tròn.) $\blacksquare$

---

**Bài 5.6.** Cho đường tròn $(O; 5\text{ cm})$ và $AB$ là một dây của đường tròn với $AB = 6$ cm.

a) Tính khoảng cách từ $O$ đến đường thẳng $AB$.

b) Tính $\tan \alpha$ nếu góc ở tâm chắn cung $AB$ bằng $2\alpha$.

**Lời giải:**

a) Gọi $H$ là chân đường vuông góc hạ từ $O$ xuống $AB$. Tam giác $OAB$ cân tại $O$ ($OA = OB = 5$) nên đường cao $OH$ đồng thời là trung tuyến, suy ra $H$ là trung điểm của $AB$:

$$
AH = \frac{AB}{2} = 3 \text{ (cm)}.
$$

Theo định lí Pythagore trong tam giác vuông $OHA$:

$$
OH = \sqrt{OA^2 - AH^2} = \sqrt{25 - 9} = 4 \text{ (cm)}.
$$

b) Vì $OH$ vừa là đường cao vừa là phân giác của tam giác cân $OAB$ nên $\widehat{AOH} = \dfrac{\widehat{AOB}}{2} = \alpha$.

Trong tam giác vuông $OHA$:

$$
\tan \alpha = \frac{AH}{OH} = \frac{3}{4}.
$$

> **Kết quả:** a) $4$ cm; b) $\tan \alpha = \dfrac{3}{4}$.

---

**Bài 5.7.** Tâm $O$ của một đường tròn cách dây $AB$ của nó một khoảng $3$ cm. Tính bán kính của đường tròn $(O)$, biết rằng cung nhỏ $AB$ có số đo bằng $100^\circ$ (làm tròn kết quả đến hàng phần mười).

**Lời giải:**

Số đo cung nhỏ $AB$ bằng số đo góc ở tâm: $\widehat{AOB} = 100^\circ$.

Gọi $H$ là chân đường vuông góc hạ từ $O$ xuống $AB$ thì $OH = 3$ cm, đồng thời $OH$ là phân giác của góc $AOB$ (tam giác $OAB$ cân tại $O$):

$$
\widehat{AOH} = \frac{100^\circ}{2} = 50^\circ.
$$

Trong tam giác vuông $OHA$:

$$
\cos \widehat{AOH} = \frac{OH}{OA} \implies OA = \frac{OH}{\cos 50^\circ} = \frac{3}{\cos 50^\circ} \approx \frac{3}{0{,}643} \approx 4{,}7 \text{ (cm)}.
$$

> **Kết quả:** $R \approx 4{,}7$ cm.

---

**Bài 5.8.** Trên mặt một chiếc đồng hồ có các vạch chia. Hỏi cứ sau mỗi khoảng thời gian $36$ phút:

a) Đầu kim phút vạch nên một cung có số đo bằng bao nhiêu độ?

b) Đầu kim giờ vạch nên một cung có số đo bằng bao nhiêu độ?

**Lời giải:**

a) Kim phút quay đủ một vòng ($360^\circ$) trong $60$ phút. Vậy trong $36$ phút, đầu kim phút vạch nên cung:

$$
\frac{36}{60} \cdot 360^\circ = 216^\circ.
$$

b) Kim giờ quay đủ một vòng ($360^\circ$) trong $12$ giờ $= 720$ phút. Vậy trong $36$ phút, đầu kim giờ vạch nên cung:

$$
\frac{36}{720} \cdot 360^\circ = 18^\circ.
$$

> **Kết quả:** a) $216^\circ$; b) $18^\circ$.
