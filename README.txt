WEBSITE TỎ TÌNH — HƯỚNG DẪN GITHUB PAGES
========================================

CẤU TRÚC DỰ ÁN
- index.html                 Trang website
- style.css                  Giao diện và hiệu ứng chữ
- script.js                  Nội dung, thứ tự câu, nút phát lại và nhạc
- assets/background.jpg      Ảnh nền trái tim hồng bạn đã cung cấp
- assets/ban-tinh-oi.mp3     Chưa được đưa vào vì bạn chưa cung cấp tệp nhạc

CÁCH ĐƯA LÊN GITHUB PAGES
1. Tải và giải nén file ZIP này.
2. Tạo một repository trên GitHub hoặc mở repository bạn muốn dùng.
3. Tải LÊN CÁC FILE VÀ THƯ MỤC BÊN TRONG thư mục to-tinh-github-pages; bảo đảm
   index.html nằm ngay ở thư mục gốc của repository, không nằm trong thư mục con.
4. Mở Settings → Pages.
5. Ở phần Build and deployment, chọn Deploy from a branch.
6. Chọn nhánh main và thư mục /(root), sau đó bấm Save.
7. Chờ GitHub Pages triển khai xong rồi mở địa chỉ website được GitHub hiển thị.

THÊM NHẠC HỢP PHÁP
- Dự án không kèm MP3 và không phát âm thanh giả.
- Nếu bạn có tệp MP3 được quyền sử dụng, đổi tên tệp thành ban-tinh-oi.mp3.
- Đặt tệp đó vào thư mục assets, cùng cấp với background.jpg.
- Đường dẫn mà website sử dụng là: assets/ban-tinh-oi.mp3
- Tải tệp MP3 lên repository rồi tải lại website. Nhạc chỉ phát khi người xem
  chủ động chạm nút nốt nhạc; khi bật, nhạc lặp lại xuyên suốt cho đến khi tắt.

CÁCH SỬ DỤNG
- Khi mở trang, sáu câu tự xuất hiện theo đúng thứ tự, mỗi câu trên một dòng.
- Nút ↻ ở góc trên bên trái phát lại lời nhắn từ đầu.
- Nút ♫ ở góc trên bên phải bật/tắt nhạc.
- Khi chưa thêm MP3, nút nhạc sẽ thông báo rằng cần bổ sung tệp thật.

GHI CHÚ
- Website dùng HTML, CSS và JavaScript thuần, không cần thư viện hay máy chủ riêng.
- Ảnh nền trong ZIP là bản sao của ảnh bạn đã gửi.
- Không chỉnh sửa ảnh nền. Trên màn hình có tỷ lệ khác nhau, ảnh dùng chế độ cover
  để phủ kín trang mà không kéo méo; vì vậy một phần mép ảnh có thể bị cắt tùy tỷ lệ.
- Nếu sửa nội dung trong script.js, hãy giữ nguyên mảng MESSAGES để không thay đổi
  câu chữ và thứ tự mà bạn đã yêu cầu.
