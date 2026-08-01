---
tieu_de: "Giải Toán 9 Tập 2 trang 15-16 - Chân trời sáng tạo"
slug: "giai-toan-9-tap-2-trang-15-16-ctst"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "chan-troi-sang-tao"
tom_tat: "Giải bài tập Toán 9 Tập 2 trang 15-16 Chân trời sáng tạo: tìm nghiệm phương trình bậc hai bằng máy tính cầm tay và giải bài toán bằng cách lập phương trình bậc hai. Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 2 trang 15-16 - Chân trời sáng tạo"
meta_description: "Giải Toán 9 Tập 2 trang 15-16 Chân trời sáng tạo: giải phương trình bậc hai bằng máy tính cầm tay và giải bài toán chuyển động bằng lập phương trình."
---

## Bài 2 (tiếp). Tìm nghiệm bằng máy tính cầm tay & lập phương trình bậc hai

### 4. Tìm nghiệm bằng máy tính cầm tay

**Ví dụ 7.** Tìm các nghiệm của phương trình $5x^2 - 6x + 1 = 0$ bằng máy tính cầm tay.

**Lời giải:** Bật máy, ấn `MODE` → `5:EQN` → `3: aX² + bX + c = 0`, rồi nhập các hệ số $5$, $-6$, $1$. Màn hình hiện $X_1 = 1$; ấn `=` hiện $X_2 = \dfrac{1}{5}$.

Vậy phương trình có hai nghiệm $x = 1$ và $x = \dfrac{1}{5}$.

**Chú ý:** Với phương trình có nghiệm kép, máy chỉ hiện một giá trị $X$ (ví dụ $4x^2 + 4x + 1 = 0$ cho $X = -\dfrac{1}{2}$); với phương trình vô nghiệm, máy hiện kết quả có chứa kí hiệu $i$ (số phức) — nghĩa là phương trình **vô nghiệm** trên tập số thực.

---

**Thực hành 5.** Tìm các nghiệm của mỗi phương trình sau bằng máy tính cầm tay:

a) $3x^2 - 8x + 4 = 0$;  b) $5x^2 - 2\sqrt{5}x + 12 = 0$;  c) $2x^2 - 8x + 8 = 0$.

**Lời giải:**

a) Nhập hệ số $3$, $-8$, $4$: máy hiện $x_1 = 2$; $x_2 = \dfrac{2}{3}$. (Kiểm tra: $\Delta = 64 - 48 = 16 > 0$ ✓)

b) Nhập hệ số $5$, $-2\sqrt{5}$, $12$: $\Delta = (2\sqrt{5})^2 - 4 \cdot 5 \cdot 12 = 20 - 240 = -220 < 0$, máy hiện kết quả có $i$. Phương trình **vô nghiệm**.

c) Nhập hệ số $2$, $-8$, $8$: $\Delta = 64 - 64 = 0$, máy hiện $x = 2$. Phương trình có **nghiệm kép** $x = 2$.

---

### 5. Giải bài toán bằng cách lập phương trình bậc hai

**HĐ4.** Một mảnh đất hình chữ nhật có chu vi $100$ m, diện tích $576$ m². Gọi $x$ (m) là chiều rộng của mảnh đất ($0 < x < 50$). Hãy lập phương trình biểu thị mối liên hệ giữa chiều rộng, chiều dài và diện tích của mảnh đất.

**Lời giải:**

Nửa chu vi bằng $50$ m, nên chiều dài là $50 - x$ (m). Diện tích $576$ m²:

$$x(50 - x) = 576 \iff 50x - x^2 = 576 \iff x^2 - 50x + 576 = 0.$$

**Các bước giải bài toán bằng cách lập phương trình bậc hai:** Bước 1 — lập phương trình (chọn ẩn, đặt điều kiện, biểu diễn các đại lượng, lập phương trình); Bước 2 — giải phương trình; Bước 3 — kiểm tra điều kiện và trả lời.

---

**Ví dụ 8.** Hai xe ô tô khởi hành cùng một lúc từ thành phố A đến thành phố B cách nhau $120$ km. Tốc độ của xe thứ nhất nhanh hơn tốc độ xe thứ hai là $10$ km/h nên đã đến sớm hơn xe thứ hai $24$ phút. Tính tốc độ của mỗi xe.

**Lời giải:**

Gọi tốc độ xe thứ hai là $x$ (km/h, $x > 0$); tốc độ xe thứ nhất là $x + 10$ (km/h).

Thời gian xe thứ hai đi hết quãng đường: $\dfrac{120}{x}$ (giờ); xe thứ nhất: $\dfrac{120}{x + 10}$ (giờ).

Xe thứ nhất đến sớm hơn $24$ phút $= \dfrac{2}{5}$ giờ:

$$\frac{120}{x} - \frac{120}{x + 10} = \frac{2}{5}.$$

Khử mẫu: $120 \cdot 5 \cdot (x + 10) - 120 \cdot 5 \cdot x = 2x(x + 10)$, thu gọn thành $x^2 + 10x - 3\,000 = 0$.

Giải: $\Delta' = 5^2 + 3\,000 = 3\,025$, $\sqrt{\Delta'} = 55$; $x_1 = -5 + 55 = 50$ (thỏa mãn $x > 0$); $x_2 = -5 - 55 = -60$ (loại).

Vậy tốc độ xe thứ hai là $50$ km/h, tốc độ xe thứ nhất là $50 + 10 = 60$ km/h.
