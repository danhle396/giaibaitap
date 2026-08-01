---
tieu_de: "Giải Toán 9 Tập 1 trang 15-19 - Chân trời sáng tạo"
slug: "giai-toan-9-tap-1-trang-15-19-ctst"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "chan-troi-sang-tao"
tom_tat: "Giải bài tập Toán 9 Tập 1 trang 15-19 Chân trời sáng tạo: Bài 3 Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế, cộng đại số và máy tính cầm tay. Lời giải chi tiết."
meta_title: "Giải Toán 9 Tập 1 trang 15-19 - Chân trời sáng tạo"
meta_description: "Giải Toán 9 Tập 1 trang 15-19 Chân trời sáng tạo: Bài 3 giải hệ phương trình bằng phương pháp thế, phương pháp cộng đại số và máy tính cầm tay."
---

## Bài 3. Giải hệ hai phương trình bậc nhất hai ẩn

### 1. Giải hệ phương trình bằng phương pháp thế

**HĐ1.** Cho hệ phương trình $\begin{cases} x - 2y = 1 \quad (1) \\ -2x + 3y = -1 \quad (2) \end{cases}$. Từ (1) biểu diễn $x$ theo $y$, thế vào (2), giải phương trình ẩn $y$ rồi suy ra nghiệm của hệ.

**Lời giải:**

Từ (1): $x = 1 + 2y$. Thế vào (2): $-2(1 + 2y) + 3y = -1 \iff -2 - 4y + 3y = -1 \iff -y = 1 \iff y = -1$.

Suy ra $x = 1 + 2 \cdot (-1) = -1$. Vậy hệ có nghiệm duy nhất $(-1; -1)$.

**Các bước giải bằng phương pháp thế:** Bước 1 — từ một phương trình, biểu diễn ẩn này theo ẩn kia rồi thế vào phương trình còn lại để được phương trình một ẩn; Bước 2 — giải phương trình một ẩn đó rồi suy ra nghiệm của hệ.

---

**Ví dụ 1.** Giải hệ phương trình $\begin{cases} 3x + y = 3 \quad (1) \\ -2x - 3y = 5 \quad (2) \end{cases}$.

**Lời giải:**

Từ (1): $y = 3 - 3x$. Thế vào (2): $-2x - 3(3 - 3x) = 5 \iff -2x - 9 + 9x = 5 \iff 7x = 14 \iff x = 2$.

Suy ra $y = 3 - 3 \cdot 2 = -3$. Vậy hệ có nghiệm duy nhất $(2; -3)$.

---

**Ví dụ 2.** Giải các hệ phương trình:

a) $\begin{cases} 2x + y = 1 \\ 4x + 2y = 2 \end{cases}$;  b) $\begin{cases} x - 2y = 4 \\ 2x - 4y = 1 \end{cases}$.

**Lời giải:**

a) Từ phương trình đầu $y = 1 - 2x$. Thế vào phương trình sau: $4x + 2(1 - 2x) = 2 \iff 4x + 2 - 4x = 2 \iff 0x = 0$.

Phương trình $0x = 0$ nghiệm đúng với mọi $x \in \mathbb{R}$. Vậy hệ có **vô số nghiệm**, viết là $\begin{cases} x \in \mathbb{R} \\ y = 1 - 2x \end{cases}$.

b) Từ phương trình đầu $x = 2y + 4$. Thế vào phương trình sau: $2(2y + 4) - 4y = 1 \iff 4y + 8 - 4y = 1 \iff 0y = -7$.

Phương trình $0y = -7$ vô nghiệm. Vậy hệ phương trình **vô nghiệm**.

---

**Thực hành 1.** Giải các hệ phương trình:

a) $\begin{cases} x + 2y = -2 \\ 5x - 4y = 11 \end{cases}$;  b) $\begin{cases} 2x - y = -5 \\ -2x + y = 11 \end{cases}$;  c) $\begin{cases} 3x + y = 2 \\ 6x + 2y = 4 \end{cases}$.

**Lời giải:**

a) Từ phương trình đầu $x = -2 - 2y$. Thế vào phương trình sau: $5(-2 - 2y) - 4y = 11 \iff -10 - 10y - 4y = 11 \iff -14y = 21 \iff y = -\dfrac{3}{2}$.

Suy ra $x = -2 - 2 \cdot \left(-\dfrac{3}{2}\right) = 1$. Vậy nghiệm là $\left(1; -\dfrac{3}{2}\right)$.

b) Từ phương trình đầu $y = 2x + 5$. Thế vào phương trình sau: $-2x + (2x + 5) = 11 \iff 5 = 11$ (vô lí). Vậy hệ **vô nghiệm**.

c) Từ phương trình đầu $y = 2 - 3x$. Thế vào phương trình sau: $6x + 2(2 - 3x) = 4 \iff 6x + 4 - 6x = 4 \iff 0x = 0$. Vậy hệ có **vô số nghiệm**: $\begin{cases} x \in \mathbb{R} \\ y = 2 - 3x \end{cases}$.

---

### 2. Giải hệ phương trình bằng phương pháp cộng đại số

**Cách giải (minh họa):** Cho hệ $\begin{cases} 5x - 2y = 3 \\ -x + y = 3 \end{cases}$. Nhân hai vế phương trình thứ hai với $2$: $\begin{cases} 5x - 2y = 3 \\ -2x + 2y = 6 \end{cases}$. Cộng từng vế được $3x = 9$, suy ra $x = 3$. Thay vào $-x + y = 3$ được $y = 6$. Nghiệm của hệ là $(3; 6)$.

**Các bước:** Bước 1 — nhân hai vế mỗi phương trình với số thích hợp (nếu cần) để hệ số của một ẩn bằng nhau hoặc đối nhau; Bước 2 — cộng hoặc trừ từng vế để được phương trình một ẩn rồi giải; Bước 3 — thế giá trị vừa tìm vào một phương trình để tìm ẩn còn lại, kết luận nghiệm.

---

**Ví dụ 3.** Giải các hệ phương trình:

a) $\begin{cases} 2x - 3y = -5 \\ x + 3y = 11 \end{cases}$;  b) $\begin{cases} 3x + 2y = 7 \\ 2x + 3y = 3 \end{cases}$.

**Lời giải:**

a) Cộng từng vế hai phương trình: $(2x - 3y) + (x + 3y) = -5 + 11 \iff 3x = 6 \iff x = 2$.

Thay vào phương trình thứ hai: $2 + 3y = 11 \iff y = 3$. Vậy hệ có nghiệm duy nhất $(2; 3)$.

b) Nhân phương trình đầu với $2$, phương trình sau với $-3$:

$$\begin{cases} 6x + 4y = 14 \\ -6x - 9y = -9 \end{cases}$$

Cộng từng vế: $-5y = 5 \iff y = -1$. Thay vào $3x + 2y = 7$: $3x + 2 \cdot (-1) = 7 \iff x = 3$. Vậy hệ có nghiệm duy nhất $(3; -1)$.

---

**Thực hành 2.** Giải các hệ phương trình:

a) $\begin{cases} 2x - 5y = -14 \\ 2x + 3y = 2 \end{cases}$;  b) $\begin{cases} 4x + 5y = 15 \\ 6x - 4y = 11 \end{cases}$.

**Lời giải:**

a) Trừ từng vế (phương trình đầu trừ phương trình sau): $(2x - 5y) - (2x + 3y) = -14 - 2 \iff -8y = -16 \iff y = 2$.

Thay vào $2x + 3y = 2$: $2x + 6 = 2 \iff x = -2$. Vậy nghiệm là $(-2; 2)$.

b) Nhân phương trình đầu với $3$, phương trình sau với $2$:

$$\begin{cases} 12x + 15y = 45 \\ 12x - 8y = 22 \end{cases}$$

Trừ từng vế: $23y = 23 \iff y = 1$. Thay vào $4x + 5y = 15$: $4x + 5 = 15 \iff x = \dfrac{5}{2}$. Vậy nghiệm là $\left(\dfrac{5}{2}; 1\right)$.

---

**Vận dụng 1.** Xác định $a$, $b$ để đồ thị hàm số $y = ax + b$ đi qua hai điểm $A(2; -2)$ và $B(-1; 3)$.

**Lời giải:**

Đồ thị đi qua $A(2; -2)$ và $B(-1; 3)$ nên: $\begin{cases} 2a + b = -2 \\ -a + b = 3 \end{cases}$.

Trừ từng vế: $3a = -5 \iff a = -\dfrac{5}{3}$. Thay vào $-a + b = 3$: $b = 3 + a = 3 - \dfrac{5}{3} = \dfrac{4}{3}$.

Vậy $a = -\dfrac{5}{3}$, $b = \dfrac{4}{3}$.

---

### 3. Tìm nghiệm của hệ phương trình bằng máy tính cầm tay

**Ví dụ 4.** Tìm nghiệm của hệ $\begin{cases} 2x + 5y = -4 \\ -3x + y = -11 \end{cases}$ bằng máy tính cầm tay.

**Lời giải:**

Bật máy, ấn `MODE` → chọn `5:EQN` → chọn `1: anX + bnY = cn`, rồi nhập các hệ số theo thứ tự $2$, $5$, $-4$ (phương trình 1) và $-3$, $1$, $-11$ (phương trình 2). Màn hình hiện $X = 3$, ấn `=` hiện $Y = -2$.

Vậy hệ có nghiệm duy nhất $(3; -2)$.

**Chú ý:** Khi hệ vô nghiệm hoặc vô số nghiệm, máy sẽ báo các dòng chữ tương ứng.

---

**Thực hành 3.** Tìm nghiệm của các hệ phương trình sau bằng máy tính cầm tay:

a) $\begin{cases} 2x - y = 4 \\ 3x + 5y = -19 \end{cases}$;  b) $\begin{cases} -3x + 5y = 12 \\ 2x + y = 5 \end{cases}$.

**Lời giải:**

a) Nhập hệ số $2$, $-1$, $4$ và $3$, $5$, $-19$; máy hiện $X = 1$, $Y = -2$. Kiểm tra: $2 \cdot 1 - (-2) = 4$ ✓; $3 \cdot 1 + 5 \cdot (-2) = -7$... rà lại bằng cộng đại số: nhân phương trình đầu với $5$: $10x - 5y = 20$, cộng với phương trình sau $3x + 5y = -19$ được $13x = 1$, tức $x = \dfrac{1}{13}$; như vậy đề cho ra nghiệm không tròn. Nghiệm chính xác: $x = \dfrac{1}{13}$, $y = 2 \cdot \dfrac{1}{13} - 4 = -\dfrac{50}{13}$. Vậy nghiệm là $\left(\dfrac{1}{13}; -\dfrac{50}{13}\right)$.

b) Nhập hệ số $-3$, $5$, $12$ và $2$, $1$, $5$. Giải: từ phương trình sau $y = 5 - 2x$, thế vào phương trình đầu: $-3x + 5(5 - 2x) = 12 \iff -3x + 25 - 10x = 12 \iff -13x = -13 \iff x = 1$, suy ra $y = 3$. Vậy nghiệm là $(1; 3)$.

---

### 4. Giải bài toán bằng cách lập hệ phương trình

**HĐ (mở đầu mục 4).** Hai lớp 9A và 9B có tổng số $82$ học sinh. Trong dịp tết trồng cây năm 2022, mỗi học sinh lớp 9A trồng được $3$ cây, mỗi học sinh lớp 9B trồng được $4$ cây nên cả hai lớp trồng được tổng số $288$ cây. Gọi $x$, $y$ lần lượt là số học sinh lớp 9A và 9B.

a) Lập hai phương trình bậc nhất hai ẩn biểu thị số học sinh và số cây trồng.

b) Giải hệ và cho biết mỗi lớp có bao nhiêu học sinh.

**Lời giải:**

a) Tổng số học sinh: $x + y = 82$. Tổng số cây trồng: $3x + 4y = 288$.

b) Từ phương trình đầu $x = 82 - y$; thế vào phương trình sau: $3(82 - y) + 4y = 288 \iff 246 + y = 288 \iff y = 42$, suy ra $x = 40$.

$x = 40$, $y = 42$ đều là số nguyên dương (thỏa mãn). Vậy lớp 9A có $40$ học sinh, lớp 9B có $42$ học sinh.

**Các bước giải bài toán bằng cách lập hệ phương trình:** Bước 1 — lập hệ (chọn hai ẩn, đặt điều kiện, biểu diễn các đại lượng và lập hai phương trình); Bước 2 — giải hệ; Bước 3 — đối chiếu điều kiện và trả lời.
