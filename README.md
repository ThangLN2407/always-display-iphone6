# StandBy 6s

Ứng dụng web PWA hiển thị ngang tối giản dành riêng cho **iPhone 6s (iOS 15, `667×375`)** cắm sạc và treo cố định 24/7.

- **Trang chạy trực tuyến (GitHub Pages):** https://thangln2407.github.io/always-display-iphone6/

## Tính năng chính
- **Đồng hồ tối giản nhìn rõ từ 1–3m:** 3 kiểu hiển thị chạm để chuyển nhanh (*Tối giản*, *Thẻ đôi*, *Đậm nét*), hỗ trợ 24h/12h và thanh tiến trình giây mảnh.
- **Lịch Dương & Âm lịch Việt Nam 100% Offline:** Thuật toán Âm lịch Hồ Ngọc Đức (`GMT+7`), hiển thị lưới 6 tuần, đánh dấu Mùng 1, Rằm 15 và Can Chi.
- **Thời tiết & Độ ẩm ngoài trời:** Lấy dữ liệu tự động mỗi 15 phút từ **Open-Meteo API** (miễn phí, không cần API Key), lưu cache offline khi mất Wi-Fi.
- **Tối ưu cho iPhone 6s chạy iOS 15 treo 24/7:**
  - Chế độ **Đỏ ban đêm (Night Red)** đơn sắc đạt chuẩn tương phản WCAG ≥ 4.5:1 (tự động `22:00 – 06:00` hoặc bật/tắt nhanh).
  - **Giảm sáng LCD phần mềm (`0% – 75%`)** cho phòng ngủ tối.
  - **Giữ sáng màn hình (`nosleep.mp4` H.264)** cho Safari iOS 15 + nút khóa xoay ngang **`90°`** + tự dịch chuyển vi điểm (**Pixel Shift**) bảo vệ tấm nền LCD.

## Cài đặt lên iPhone 6s (iOS 15)
1. Mở **Safari** trên iPhone 6s và truy cập `https://thangln2407.github.io/always-display-iphone6/`.
2. Chạm nút **Chia sẻ (Share)** → **Thêm vào MH chính (Add to Home Screen)**.
3. Mở **StandBy 6s** từ màn hình chính, vào biểu tượng **Cài đặt** góc trên bên phải để chọn Tỉnh/Thành phố (hoặc bấm **GPS**).
4. Vào **Cài đặt iPhone → Màn hình & Độ sáng → Tự động khóa → Chọn "Không" (Never)** để màn hình luôn sáng 24/7 khi cắm sạc.
