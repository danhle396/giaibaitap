---
tieu_de: "Giải Toán 9 Tập 2 trang 114-117 - Kết nối tri thức"
slug: "giai-toan-9-tap-2-trang-114-117-kntt"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải Toán 9 Tập 2 trang 114-117 Kết nối tri thức: Hoạt động thực hành trải nghiệm — giải phương trình, hệ phương trình và vẽ đồ thị với GeoGebra."
meta_title: "Giải Toán 9 Tập 2 trang 114-117 - Kết nối tri thức"
meta_description: "Giải Toán 9 Tập 2 trang 114-117 Kết nối tri thức: thực hành GeoGebra — lệnh Solve, Solutions, Intersect; giải phương trình, hệ phương trình, vẽ đồ thị."
---

## Hoạt động thực hành trải nghiệm: Giải phương trình, hệ phương trình và vẽ đồ thị hàm số với GeoGebra

**Các lệnh cơ bản (cửa sổ CAS):**

- Giải phương trình một ẩn: `Solve(<phương trình>)` hoặc `Solutions(<phương trình>)`. Kết quả hiển thị dạng tập hợp; kí hiệu `{}` nghĩa là phương trình vô nghiệm.
- Giải hệ hai phương trình: `Solve({<pt 1>, <pt 2>}, {x, y})` hoặc `Solutions({<pt 1>, <pt 2>}, {x, y})`.
- Tìm giao điểm hai đồ thị: `Intersect(<hàm số 1>, <hàm số 2>)`.
- Nhập căn bậc hai của $a$: gõ `sqrt(a)`; nhập $x^2$: gõ `x^2`.
- Giao diện tiếng Việt: Options → Language → Vietnamese; khi đó các lệnh tương ứng là `Giai(...)`, `CacNghiem(...)`, `GiaoDiem(...)`.

Để vẽ đồ thị: chọn đồng thời hai chế độ Graphic 2 và CAS, nhập công thức hàm số (ví dụ `g: y = 2x^2` và `h: y = -x + 1`) vào ô lệnh CAS rồi nháy nút tròn ở đầu ô lệnh để hiển thị đồ thị.

---

## Thực hành

**Câu 1.** Giải các phương trình sau (bằng lệnh `Solve`/`Solutions`, kết quả đối chiếu như dưới đây):

a) $x^2 - 4x + 10 = 0$;

b) $x + \dfrac{9}{x-1} = 7$;

c) $x^2 - 2(\sqrt{3} - 1)x - 2\sqrt{3} = 0$;

d) $\dfrac{x+1}{x-1} - \dfrac{x-1}{x+1} = \dfrac{4}{x^2-1}$.

**Lời giải:**

a) Nhập `Solutions(x^2 - 4x + 10 = 0)`, kết quả `{}`. Thật vậy, $\Delta' = 4 - 10 = -6 < 0$ nên phương trình **vô nghiệm**.

b) Nhập `Solutions(x + 9/(x-1) = 7)`, kết quả `{4}`. Kiểm tra: với điều kiện $x \ne 1$, quy đồng ta được $x^2 - x + 9 = 7x - 7$, tức $x^2 - 8x + 16 = 0 \iff (x-4)^2 = 0 \iff x = 4$ (thỏa mãn). Thử lại: $4 + \dfrac{9}{3} = 7$ ✓.

c) Nhập `Solutions(x^2 - 2(sqrt(3)-1)x - 2sqrt(3) = 0)`, kết quả $\{\sqrt{3} - 3;\ \sqrt{3} + 1\}$. Thật vậy: $\Delta' = (\sqrt{3}-1)^2 + 2\sqrt{3} = 4 - 2\sqrt{3} + 2\sqrt{3} = 4$, nên $x = (\sqrt{3} - 1) \pm 2$, tức $x_1 = \sqrt{3} + 1$; $x_2 = \sqrt{3} - 3$.

d) Điều kiện $x \ne \pm 1$. Quy đồng: $(x+1)^2 - (x-1)^2 = 4 \iff 4x = 4 \iff x = 1$ — **không thỏa mãn** điều kiện. Vậy phương trình **vô nghiệm**.

---

**Câu 2.** Giải các hệ phương trình sau (bằng lệnh `Solve({...}, {x, y})`):

a) $\begin{cases} 3x - 2y = 4 \\ 2x + y = 5 \end{cases}$  c) $\begin{cases} 3x + 2y = 0 \\ 2x - 3y = 0 \end{cases}$  d) $\begin{cases} x\sqrt{5} - (1+\sqrt{3})y = 1 \\ (1-\sqrt{3})x + y\sqrt{5} = 1 \end{cases}$

**Lời giải:**

a) Nhập `Solve({3x - 2y = 4, 2x + y = 5}, {x, y})`, kết quả $\{(2;\ 1)\}$. Kiểm tra: từ phương trình thứ hai $y = 5 - 2x$; thay vào phương trình thứ nhất: $3x - 10 + 4x = 4 \iff 7x = 14 \iff x = 2$, suy ra $y = 1$ ✓.

c) Nhập `Solve({3x + 2y = 0, 2x - 3y = 0}, {x, y})`, kết quả $\{(0;\ 0)\}$. Hai đường thẳng cùng đi qua gốc tọa độ và có hệ số góc khác nhau nên hệ có nghiệm duy nhất $x = 0$; $y = 0$.

d) Nhập `Solve({sqrt(5)x - (1+sqrt(3))y = 1, (1-sqrt(3))x + sqrt(5)y = 1}, {x, y})`. Giải tay để đối chiếu (quy tắc Cramer):

$$D = \sqrt{5} \cdot \sqrt{5} + (1+\sqrt{3})(1-\sqrt{3}) = 5 + (1 - 3) = 3;$$

$$D_x = \sqrt{5} + (1+\sqrt{3}); \qquad D_y = \sqrt{5} - (1-\sqrt{3}).$$

Vậy hệ có nghiệm:

$$x = \frac{\sqrt{5} + \sqrt{3} + 1}{3} \approx 1{,}66; \qquad y = \frac{\sqrt{5} + \sqrt{3} - 1}{3} \approx 0{,}99.$$

---

**Câu 3.** Cho đường thẳng $(d)\colon y = 2x + \sqrt{3}$ và parabol $(P)\colon y = x^2$.

a) Vẽ đường thẳng $(d)$ và parabol $(P)$ trên cùng một mặt phẳng tọa độ.

b) Tìm tọa độ giao điểm của $(d)$ và $(P)$.

**Lời giải:**

a) Trong cửa sổ CAS nhập hai ô lệnh `f: y = x^2` và `g: y = 2x + sqrt(3)` rồi bật nút hiển thị để vẽ hai đồ thị trong cửa sổ Graphic 2: parabol $(P)$ có bề lõm quay lên, đỉnh tại gốc tọa độ; đường thẳng $(d)$ cắt trục tung tại $(0; \sqrt{3})$.

b) Nhập `Intersect(y = x^2, y = 2x + sqrt(3))`. Phương trình hoành độ giao điểm:

$$x^2 = 2x + \sqrt{3} \iff x^2 - 2x - \sqrt{3} = 0, \qquad \Delta' = 1 + \sqrt{3} \implies x = 1 \pm \sqrt{1 + \sqrt{3}}.$$

Vậy $(d)$ cắt $(P)$ tại hai điểm:

$$\left(1 + \sqrt{1+\sqrt{3}};\ \left(1 + \sqrt{1+\sqrt{3}}\right)^2\right) \approx (2{,}65;\ 7{,}04); \qquad \left(1 - \sqrt{1+\sqrt{3}};\ \left(1 - \sqrt{1+\sqrt{3}}\right)^2\right) \approx (-0{,}65;\ 0{,}43).$$

---

## Vẽ hình đơn giản với GeoGebra

**HĐ1. Vẽ đường tròn ngoại tiếp tam giác:**

- **Bước 1.** Vẽ tam giác $ABC$: chọn công cụ Đa giác, lần lượt nháy chuột chọn ba điểm $A$, $B$, $C$ rồi nháy lại vào điểm $A$.
- **Bước 2.** Vẽ đường tròn ngoại tiếp: chọn công cụ Đường tròn đi qua $3$ điểm, lần lượt nháy vào $A$, $B$, $C$.
- **Bước 3.** Hiển thị tâm: chọn công cụ Điểm → Trung điểm hoặc tâm, nháy vào đường tròn vừa vẽ để hiện tâm $D$.

Ví dụ với $A = (8; 1)$, $B = (6; -3)$, $C = (12; -3)$, phần mềm cho tâm $D = (9; -2)$ và đường tròn ngoại tiếp có phương trình $(x-9)^2 + (y+2)^2 = 25$, tức bán kính bằng $5$.
