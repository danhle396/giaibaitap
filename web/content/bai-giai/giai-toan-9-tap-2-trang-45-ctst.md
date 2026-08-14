---
tieu_de: "Giải Toán 9 Tập 2 trang 45 - Chân trời sáng tạo"
slug: "giai-toan-9-tap-2-trang-45-ctst"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "chan-troi-sang-tao"
tom_tat: "Giải bài tập Toán 9 Tập 2 trang 45 Chân trời sáng tạo: Thực hành 3, Thực hành 4 và Vận dụng 2 — bảng tần số từ biểu đồ, tần số tương đối ghép nhóm, so sánh chỉ số AQI. Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 2 trang 45 - Chân trời sáng tạo"
meta_description: "Giải Toán 9 Tập 2 trang 45 Chân trời sáng tạo: bài tuổi thọ bóng đèn, cân nặng trẻ sơ sinh và so sánh chất lượng không khí AQI, có lời giải chi tiết."
nguon: "gemini:gemini-3-flash-preview"
---
**Thực hành 3 (trang 45).** Biểu đồ cột bên mô tả tuổi thọ (đơn vị: nghìn giờ) của $100$ chiếc bóng đèn dây tóc trong một lô sản xuất.

![Biểu đồ tần số tương đối của số bóng đèn theo tuổi thọ](/hinh/toan-9-ctst-t2/trang-45-bong-den.webp)

*Dữ kiện đọc từ biểu đồ:* các nhóm tuổi thọ $[1; 1{,}25)$, $[1{,}25; 1{,}5)$, $[1{,}5; 1{,}75)$, $[1{,}75; 2)$ (nghìn giờ) có tần số tương đối lần lượt là $18\%$; $21\%$; $56\%$; $5\%$.

a) Hãy lập bảng tần số mô tả dữ liệu ở biểu đồ bên.

b) Một bóng đèn được cho là thuộc loại I nếu có tuổi thọ từ $1500$ giờ trở lên. Hỏi có bao nhiêu bóng đèn thuộc loại I trong số các bóng đèn được thống kê?

c) Hãy vẽ biểu đồ tần số tương đối ghép nhóm dạng đoạn thẳng biểu diễn dữ liệu ở biểu đồ bên.

**Lời giải:**

a) Tổng số bóng đèn là $n = 100$.
Tần số của mỗi nhóm được tính theo công thức: $n_{i} = n \cdot f_{i}$.

- Tần số nhóm $[1; 1{,}25)$ là: $100 \cdot 18\% = 18$ (bóng đèn).
- Tần số nhóm $[1{,}25; 1{,}5)$ là: $100 \cdot 21\% = 21$ (bóng đèn).
- Tần số nhóm $[1{,}5; 1{,}75)$ là: $100 \cdot 56\% = 56$ (bóng đèn).
- Tần số nhóm $[1{,}75; 2)$ là: $100 \cdot 5\% = 5$ (bóng đèn).

Ta có bảng tần số ghép nhóm như sau:

| Tuổi thọ (nghìn giờ) | $[1; 1{,}25)$ | $[1{,}25; 1{,}5)$ | $[1{,}5; 1{,}75)$ | $[1{,}75; 2)$ |
| :--- | :---: | :---: | :---: | :---: |
| Tần số | $18$ | $21$ | $56$ | $5$ |

b) Tuổi thọ từ $1500$ giờ trở lên tương ứng với tuổi thọ từ $1{,}5$ nghìn giờ trở lên. Số bóng đèn thuộc loại I là tổng tần số của hai nhóm cuối:
$$ 56 + 5 = 61 $$
Vậy có $61$ bóng đèn thuộc loại I.

c) Để vẽ biểu đồ đoạn thẳng, ta xác định giá trị đại diện cho mỗi nhóm:
- Nhóm $[1; 1{,}25)$ có giá trị đại diện là $x_{1} = (1 + 1{,}25) : 2 = 1{,}125$.
- Nhóm $[1{,}25; 1{,}5)$ có giá trị đại diện là $x_{2} = (1{,}25 + 1{,}5) : 2 = 1{,}375$.
- Nhóm $[1{,}5; 1{,}75)$ có giá trị đại diện là $x_{3} = (1{,}5 + 1{,}75) : 2 = 1{,}625$.
- Nhóm $[1{,}75; 2)$ có giá trị đại diện là $x_{4} = (1{,}75 + 2) : 2 = 1{,}875$.

Các bước vẽ:
- Trục ngang biểu diễn tuổi thọ (nghìn giờ), trục đứng biểu diễn tần số tương đối $(\%)$.
- Xác định các điểm: $(1{,}125; 18)$; $(1{,}375; 21)$; $(1{,}625; 56)$; $(1{,}875; 5)$.
- Nối các điểm liên tiếp bằng các đoạn thẳng để hoàn thành biểu đồ.

---

**Thực hành 4 (trang 45).** Bảng tần số ghép nhóm sau biểu diễn kết quả khảo sát cân nặng (đơn vị: kg) của một số trẻ sơ sinh ở một khu vực.

| Cân nặng $X$ (kg) | $[2{,}9; 3{,}1)$ | $[3{,}1; 3{,}3)$ | $[3{,}3; 3{,}5)$ | $[3{,}5; 3{,}7)$ | $[3{,}7; 3{,}9)$ |
| :--: | :--: | :--: | :--: | :--: | :--: |
| Số trẻ sơ sinh | 3 | 7 | 5 | 3 | 2 |

a) Hãy lập bảng tần số tương đối ghép nhóm cho mẫu số liệu trên.

b) Hãy vẽ các biểu đồ tần số tương đối ghép nhóm dạng cột và dạng đoạn thẳng biểu diễn số liệu trên.

**Lời giải:**

a) Tổng số trẻ sơ sinh là:
$$ n = 3 + 7 + 5 + 3 + 2 = 20 $$

Tần số tương đối $f_{i}$ của từng nhóm là:
- Nhóm $[2{,}9; 3{,}1)$: $f_{1} = \frac{3}{20} \cdot 100\% = 15\%$.
- Nhóm $[3{,}1; 3{,}3)$: $f_{2} = \frac{7}{20} \cdot 100\% = 35\%$.
- Nhóm $[3{,}3; 3{,}5)$: $f_{3} = \frac{5}{20} \cdot 100\% = 25\%$.
- Nhóm $[3{,}5; 3{,}7)$: $f_{4} = \frac{3}{20} \cdot 100\% = 15\%$.
- Nhóm $[3{,}7; 3{,}9)$: $f_{5} = \frac{2}{20} \cdot 100\% = 10\%$.

Bảng tần số tương đối ghép nhóm:

| Cân nặng (kg) | $[2{,}9; 3{,}1)$ | $[3{,}1; 3{,}3)$ | $[3{,}3; 3{,}5)$ | $[3{,}5; 3{,}7)$ | $[3{,}7; 3{,}9)$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Tần số tương đối $(\%)$ | $15$ | $35$ | $25$ | $15$ | $10$ |

b) Hướng dẫn vẽ biểu đồ:

**Biểu đồ dạng cột:**
- Trục ngang biểu diễn cân nặng (kg) chia theo các khoảng nhóm.
- Trục đứng biểu diễn tần số tương đối $(\%)$.
- Vẽ các cột sát nhau với độ cao tương ứng là $15$; $35$; $25$; $15$; $10$.

**Biểu đồ dạng đoạn thẳng:**
- Tính giá trị đại diện: $3{,}0$; $3{,}2$; $3{,}4$; $3{,}6$; $3{,}8$.
- Xác định các điểm: $(3{,}0; 15)$; $(3{,}2; 35)$; $(3{,}4; 25)$; $(3{,}6; 15)$; $(3{,}8; 10)$.
- Nối các điểm này bằng các đoạn thẳng.

---

**Vận dụng 2 (trang 45).** Hai bạn Hà và Hồng thống kê lại chỉ số chất lượng không khí (AQI) nơi mình ở tại thời điểm 12:00 mỗi ngày trong tháng 9/2022 ở bảng sau:

| Chỉ số $X$ | $[50; 100)$ | $[100; 150)$ | $[150; 200)$ | $[200; 250)$ |
| :--: | :--: | :--: | :--: | :--: |
| Tại nơi ở của Hà | 12 | 8 | 6 | 4 |
| Tại nơi ở của Hồng | 16 | 6 | 5 | 3 |

a) Hãy vẽ trên cùng một hệ trục hai biểu đồ dạng đoạn thẳng biểu diễn tần số tương đối cho bảng chỉ số chất lượng không khí tại nơi ở của bạn Hà và tại nơi ở của bạn Hồng.

b) Chỉ số AQI từ $150$ trở lên được coi là không lành mạnh. Dựa vào biểu đồ tần số tương đối trên, hãy so sánh tỉ lệ số ngày chất lượng không khí được coi là không lành mạnh ở mỗi khu vực.

**Lời giải:**

a) Tổng số ngày khảo sát ở mỗi nơi đều là $n = 30$ ngày (tháng 9).

Tính tần số tương đối cho nơi ở của Hà:
- Nhóm $[50; 100)$: $f_{H,1} = \frac{12}{30} \cdot 100\% = 40\%$.
- Nhóm $[100; 150)$: $f_{H,2} = \frac{8}{30} \cdot 100\% \approx 26{,}67\%$.
- Nhóm $[150; 200)$: $f_{H,3} = \frac{6}{30} \cdot 100\% = 20\%$.
- Nhóm $[200; 250)$: $f_{H,4} = \frac{4}{30} \cdot 100\% \approx 13{,}33\%$.

Tính tần số tương đối cho nơi ở của Hồng:
- Nhóm $[50; 100)$: $f_{Hg,1} = \frac{16}{30} \cdot 100\% \approx 53{,}33\%$.
- Nhóm $[100; 150)$: $f_{Hg,2} = \frac{6}{30} \cdot 100\% = 20\%$.
- Nhóm $[150; 200)$: $f_{Hg,3} = \frac{5}{30} \cdot 100\% \approx 16{,}67\%$.
- Nhóm $[200; 250)$: $f_{Hg,4} = \frac{3}{30} \cdot 100\% = 10\%$.

Giá trị đại diện các nhóm lần lượt là: $75$; $125$; $175$; $225$.
Để vẽ biểu đồ, ta xác định các điểm tương ứng cho Hà và Hồng trên cùng một hệ trục rồi nối lại (dùng hai màu sắc hoặc kiểu đường khác nhau để phân biệt).

b) Tỉ lệ số ngày có chất lượng không khí không lành mạnh ($AQI \ge 150$):

- Tại nơi ở của Hà:
$$ 20\% + 13{,}33\% = 33{,}33\% $$

- Tại nơi ở của Hồng:
$$ 16{,}67\% + 10\% = 26{,}67\% $$

Vì $33{,}33\% > 26{,}67\%$ nên tỉ lệ số ngày chất lượng không khí không lành mạnh ở nơi bạn Hà ở cao hơn so với nơi bạn Hồng ở.
