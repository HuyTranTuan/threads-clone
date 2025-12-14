// ...existing code...

# 🧵 Threads Clone — Hướng dẫn chạy dự án (Vite + React)

Tài liệu ngắn gọn và đầy đủ để cài đặt, chạy và deploy dự án React (Vite + Tailwind + Shadcn UI).

---

## Yêu cầu trước khi bắt đầu

- Node.js >= 18.0.0 — kiểm tra: `node -v`
- npm (hoặc yarn)
- Git (để clone / deploy)

---

## 1. Clone repository

Mở terminal (Windows — PowerShell hoặc CMD) và chạy:

```bash
git clone https://github.com/huytrantuan/threads-clone.git
cd threads-clone
```

---

## 2. Cài đặt dependencies

Chạy:

```bash
npm install
```

hoặc nếu dùng yarn:

```bash
yarn
```

---

## 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến cần thiết. Ví dụ:

```env
VITE_API_URL=http://localhost:8000/api
# Thêm biến khác nếu backend yêu cầu
```

Lưu ý: Vite chỉ expose biến bắt đầu bằng `VITE_` vào mã client.

---

## 4. Chạy ở chế độ phát triển (Dev)

Khởi động dev server (hot reload):

```bash
npm run dev
```

Trên Windows PowerShell/CMD, sau khi chạy, mở trình duyệt tới URL hiển thị trong terminal (thường là `http://localhost:5173/threads-clone/` hoặc `http://localhost:5173/` tùy cấu hình `base` trong `vite.config.js`).

---

## 5. Các script (câu lệnh thường dùng)

- `npm run dev` — Chạy dev server (hot reload).
- `npm run build` — Build production (thư mục `dist/`).
- `npm run preview` — Xem trước bản build trên máy local.
- `npm run deploy` — Deploy lên GitHub Pages (nếu cấu hình sẵn).
- `npm run lint` — Kiểm tra linting (nếu cấu hình).

Chạy từng lệnh:

```bash
npm run build
npm run preview
```

---

## 6. Cấu hình để Deploy lên GitHub Pages

1. Trong `vite.config.js` đảm bảo có `base` trỏ tới tên repository (bắt buộc nếu deploy GH Pages):

```js
export default defineConfig({
  base: "/threads-clone/", // thay bằng tên repo của bạn
  plugins: [react()],
});
```

2. Đảm bảo có file rỗng `.nojekyll` trong `public/` để tránh GitHub Pages bỏ qua một số file.

3. Deploy (nếu script `deploy` đã cấu hình):

```bash
npm run deploy
```

Script thường sẽ thực hiện `vite build` rồi push `dist/` lên nhánh `gh-pages` (thông qua `gh-pages` package).

---

## 7. Một số lưu ý & Troubleshooting

- 404 sau khi deploy: kiểm tra `base` trong `vite.config.js` và file `.nojekyll`.
- Tailwind không nhận class mới: dùng `export default` trong `tailwind.config.js`, sau đó restart dev server.
- Lỗi môi trường backend (ví dụ thiếu region cho S3/R2): kiểm tra file `.env` của backend và thêm biến cần thiết (ví dụ `AWS_REGION` hoặc `TOMLAWS_DEFAULT_REGION=us-east-1`).
- Nếu thay đổi cấu hình PostCSS / Tailwind, khởi động lại dev server.

---

## 8. Kiểm tra phiên bản Node trên Windows

PowerShell:

```powershell
node -v
npm -v
```

---

## 9. Tác giả

Huy Tran Tuan — nếu cần hỗ trợ, mở Issue trên repository GitHub.
