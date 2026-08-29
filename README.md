# HRManager

Website giới thiệu và quản lý dữ liệu giao dịch nông sản, xây dựng cho bài thực hành Thiết kế Web Buổi 4-5.

## Demo và thiết kế

- Demo: https://vkhanh2012.github.io/tkw_2354050051_khanh/
- Trang dữ liệu: `records.html`
- Ảnh chụp màn hình: cần bổ sung ảnh chụp bản production vào thư mục `assets/img/`.
- File Figma: chưa có link Figma công khai trong repository.

## Tính năng

- Menu mobile, dark mode, nút lên đầu trang và hiệu ứng reveal.
- Slider cảm nhận, accordion FAQ và chuyển đổi giá tháng/năm.
- Trang dữ liệu render từ `data/records.json` bằng `fetch`.
- Loading, có dữ liệu, rỗng và lỗi; tìm kiếm debounce; lọc và sắp xếp kết hợp.
- Thêm, xóa và lưu phiếu cân bằng `localStorage`, có khôi phục dữ liệu mẫu.
- Form liên hệ dùng Constraint Validation API, thông báo lỗi tiếng Việt, `aria-invalid` và focus vào ô lỗi đầu tiên.

## Chạy dự án

```bash
npm install
npm run build
npx serve .
```

Mở URL máy chủ và truy cập `/records.html`. Không mở trực tiếp bằng `file://` vì trình duyệt sẽ chặn `fetch` dữ liệu JSON.

## Build và kiểm tra

```bash
npm run build
```

Đã có tag `buoi-1` đến `buoi-5`. Các thay đổi Buổi 5 được chia thành hai commit và chưa push vào `main`.

## Ba điều sẽ làm lại nếu có thêm thời gian

1. Bổ sung test tự động cho bộ lọc, localStorage và các trạng thái tải dữ liệu.
2. Hoàn thiện thiết kế Figma và chụp ảnh production responsive ở 360px, 768px và 1440px.
3. Thêm backend để dữ liệu thêm/xóa được đồng bộ giữa nhiều người dùng thay vì chỉ lưu trên trình duyệt.