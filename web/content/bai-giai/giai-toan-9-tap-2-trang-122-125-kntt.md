---
tieu_de: "Giải Toán 9 Tập 2 trang 122-125 - Kết nối tri thức"
slug: "giai-toan-9-tap-2-trang-122-125-kntt"
lop: "9"
loai: "giai-sgk"
mon: "toan"
bo_sach: "ket-noi-tri-thuc"
tom_tat: "Giải Toán 9 Tập 2 trang 122-125 Kết nối tri thức: xác định tần số, tần số tương đối và vẽ biểu đồ bằng Excel — Pivot Table, biểu đồ cột, quạt tròn."
meta_title: "Giải Toán 9 Tập 2 trang 122-125 - Kết nối tri thức"
meta_description: "Giải Toán 9 Tập 2 trang 122-125 Kết nối tri thức: thực hành Excel — lập bảng tần số, tần số tương đối bằng Pivot Table và vẽ biểu đồ."
---

## Hoạt động thực hành trải nghiệm: Xác định tần số, tần số tương đối và vẽ biểu đồ bằng Excel

**Các bước chung** để lập bảng tần số, tần số tương đối từ dãy dữ liệu dạng liệt kê trong Excel:

- **Bước 1.** Nhập dữ liệu dạng liệt kê vào một cột trong bảng tính.
- **Bước 2.** Tạo bảng dữ liệu: chọn Insert → Table, xác định vùng dữ liệu và đặt tên bảng.
- **Bước 3.** Dùng chức năng **Pivot Table** (Insert → Pivot Table): kéo thả trường dữ liệu vào ô Row Labels và Values để được bảng tần số; thêm cột chia mỗi tần số cho tổng (hàm `=SUM(...)`) để được tần số tương đối.
- **Bước 4.** Chọn vùng dữ liệu kết quả rồi Insert → chọn biểu đồ cột hoặc biểu đồ hình quạt tròn; điền tiêu đề, chú giải để hoàn thiện.

Chú ý: nhờ tạo bảng dữ liệu ở Bước 2, khi dữ liệu thay đổi chỉ cần cập nhật và chọn Refresh, không phải làm lại từ đầu.

---

**Ví dụ 1.** Trước vòng bán kết giải bóng đá trường, Ban tổ chức phát phiếu hỏi $30$ cổ động viên về đội vô địch với bốn lựa chọn: A (lớp 9A), B (lớp 8C), C (lớp 7D), D (lớp 9B). Dùng Excel lập bảng tần số, tần số tương đối và vẽ biểu đồ.

**Kết quả:**

Sau khi nhập dữ liệu vào vùng A2:A31, tạo bảng tên `Dudoandoivodich` và chạy Pivot Table, ta được bảng tần số và tần số tương đối:

| Lựa chọn | A | B | C | D |
| :--: | :--: | :--: | :--: | :--: |
| Tần số | $12$ | $8$ | $6$ | $4$ |
| Tần số tương đối | $40\%$ | $27\%$ | $20\%$ | $13\%$ |

Chọn vùng dữ liệu kết quả rồi Insert → biểu đồ cột (thể hiện số lượng bình chọn từng đội) hoặc biểu đồ hình quạt tròn (thể hiện tỉ lệ các lựa chọn: A chiếm $40\%$ — được kì vọng vô địch nhiều nhất).

---

**Thực hành 1.** Hỏi ý kiến của các bạn trong lớp về địa điểm đi dã ngoại với ba lựa chọn: Tràng An, Ba Vì, Đại Lải, thu được kết quả sau:

Tràng An, Ba Vì, Tràng An, Tràng An, Ba Vì, Ba Vì, Đại Lải, Tràng An, Tràng An, Ba Vì, Tràng An, Đại Lải, Tràng An, Tràng An, Tràng An, Tràng An, Tràng An, Ba Vì, Đại Lải, Tràng An, Ba Vì, Tràng An, Đại Lải, Ba Vì, Ba Vì, Ba Vì, Đại Lải, Tràng An.

Sử dụng bảng tính Excel, hãy lập bảng tần số, bảng tần số tương đối cho dãy dữ liệu trên và vẽ các biểu đồ cột, biểu đồ hình quạt tròn biểu diễn chúng.

**Lời giải:**

Nhập $28$ giá trị vào một cột, tạo bảng dữ liệu rồi dùng Pivot Table như hướng dẫn. Đếm được: Tràng An xuất hiện $14$ lần; Ba Vì $9$ lần; Đại Lải $5$ lần (tổng $= 28$ ✓).

Bảng tần số và tần số tương đối:

| Địa điểm | Tràng An | Ba Vì | Đại Lải |
| :--: | :--: | :--: | :--: |
| Tần số | $14$ | $9$ | $5$ |
| Tần số tương đối | $50\%$ | $32{,}1\%$ | $17{,}9\%$ |

- **Biểu đồ cột:** chọn vùng bảng tần số → Insert → Column → 2-D Column; ba cột có chiều cao $14$; $9$; $5$; thêm tiêu đề "Bình chọn địa điểm đi dã ngoại".
- **Biểu đồ hình quạt tròn:** chọn vùng bảng tần số tương đối → Insert → Pie → 2-D Pie; ba hình quạt ứng với $50\%$; $32{,}1\%$; $17{,}9\%$ (số đo cung $180^\circ$; $\approx 115{,}7^\circ$; $\approx 64{,}3^\circ$).

Kết luận từ dữ liệu: một nửa số bạn trong lớp muốn đi **Tràng An** — nên chọn địa điểm này.

---

## 2. Vẽ biểu đồ tần số, tần số tương đối ghép nhóm bằng Excel

**Các bước:**

- **Bước 1.** Nhập dữ liệu (các nhóm và tần số/tần số tương đối) vào bảng tính, lập bảng tần số tương đối ghép nhóm nếu cần.
- **Bước 2.** Chọn vùng dữ liệu và loại biểu đồ: biểu đồ **dạng cột** — Insert → Columns → 2-D Columns, sau đó chọn Design → Layout 8 (histogram, các cột kề sát nhau); biểu đồ **dạng đoạn thẳng** — Insert → Line → 2-D Lines.
- **Bước 3.** Hoàn thiện: điền tiêu đề, chú giải các trục; gắn nhãn dữ liệu bằng cách nháy nút phải chuột vào biểu đồ và chọn Add data labels.

**Ví dụ 2.** Chiều cao của các cầu thủ đội bóng Manchester United được cho trong bảng tần số tương đối ghép nhóm:

| Chiều cao (cm) | $[165; 170)$ | $[170; 175)$ | $[175; 180)$ | $[180; 185)$ | $[185; 190)$ | $[190; 195)$ |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Tần số tương đối | $7{,}69\%$ | $7{,}69\%$ | $7{,}69\%$ | $26{,}92\%$ | $19{,}23\%$ | $30{,}77\%$ |

**Thực hiện:** nhập bảng trên vào Excel; chọn vùng dữ liệu rồi vẽ biểu đồ cột dạng histogram (Bước 2) — sáu cột kề nhau có chiều cao $7{,}69$; $7{,}69$; $7{,}69$; $26{,}92$; $19{,}23$; $30{,}77$; hoặc vẽ biểu đồ đoạn thẳng nối các điểm tương ứng với giá trị đại diện của mỗi nhóm. Hoàn thiện tiêu đề "Chiều cao của các cầu thủ Manchester United" và gắn nhãn dữ liệu.

Nhận xét từ biểu đồ: nhóm chiều cao $[190; 195)$ cm chiếm tỉ lệ cao nhất ($30{,}77\%$) — đội bóng có nhiều cầu thủ rất cao.
