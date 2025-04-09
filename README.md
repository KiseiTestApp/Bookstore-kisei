# [Read&Chill] - Website bán sách online

## 1 ☀️ Tính năng

Webiste **Read&Chill** cung cấp các tính năng như sau:
- **Tìm kiếm sách**: tìm kiếm theo tên sách, tác giả
- **Tài khoản**: tạo tài khoản, đăng nhập, và quản lý thông tin cá nhân trên trang web
- **Giỏ hàng**: Thêm sách/xóa sách khỏi giỏ và kiểm tra checkout
- **Admin Dashboard**: quản lý sách, đơn hàng, và khách hàng trên trang web cho admin

## 2 🛠️ Các công nghệ được sử dụng

- **Frontend**:
    - Ngôn ngữ: TypeScript + React
    - Framework: [Next.js 15](https://nextjs.org/)
    - UI Library: 
      - [Material UI](https://mui.com/)
      - [Embla Carousel](https://www.embla-carousel.com/)
      - [Material Design Icons](https://pictogrammers.com/library/mdi/)
      - [Tailwind](https://tailwindcss.com/)
      - [Typesense](https://typesense.org/)
- **Backend**:
  - Nền tảng: 
    - Firebase [Authentication, Realtime Database]
    - Typesense Cloud 
- **Công cụ quản lý gói cài đặt**:
  - Nền tảng: Node.js

## 3 ✈️ Các bước triển khai

1. **Chuẩn bị môi trường**

- Cài đặt Node.js 20 trên máy
- Cấu hình Firebase Project trên [Firebase Console](https://console.firebase.google.com)
- 
2. **Phát triển Frontend**

- Tạo các component chính: Trang chủ, Giỏ hàng, Thanh toán, Quản lý tài khoản, Thông tin sách, Admin Dashboard.
- Tích hợp Firebase SDK cho Authentication (xác thực) và Firestore Firebase (cơ sở dữ liệu)
- Tối ưu giao diện thân thiện đối với người sử dụng, hỗ trợ responsive trên các thiết bị phổ biến

3. **Phát triển backend**

- Thiết lập Firebase Authentication để quản lý đăng nhập
- Cấu hình Firestore để lưu trữ:
  - Sách (books)
  - Người dùng (users)
  - Địa chỉ (addresses) (subcollection của users)
  - Đơn hàng (orders)
  - Giỏ hàng (cart)
- Triển khai Typesense bằng cách cài đặt Typesense cho Firestore và làm theo các bước được hướng dẫn

4. **Triển khai sản phẩm**

- Triển khai cơ sở dữ liệu và lưu trữ tệp trên Firebase Firestore và Firebase Storage
- Triển khai website trên Firebase Hosting hoặc Vercel Deploy

Nếu cần thêm hướng dẫn chi tiết, vui lòng tham khảo tài liệu hướng dẫn chính thức của
[Firebase](https://firebase.google.com/docs) và [Vercel](https://vercel.com/docs/frameworks/nextjs)

## 4 📃 Cài đặt dự án

1. **Cài đặt môi trường**
- Đảm bảo đã cài đặt [Node.js](https://nodejs.org/en/download) phiên bản 20 hoặc cao hơn
2. **Cấu hình Firebase**
- Tạo Firebase Project mới trên Firebase Console
- Cấu hình và thiết lập Firestore Database, Firebase Authentication và Firebase Storage
- Tải tệp cấu hình `firebaseConfig` từ Firebase cung cấp và thay thế trong project
- Tải tệp cấu hình `typesenseConfig` từ Typesense và thay thế API key trong file `.env.local`
3. **Cài đặt phụ thuộc**
- Frontend: 
```bash
$ npm install
```
- Backend:
  - Firebase sử dụng trực tiếp
  - Typesense:
    - Cài đặt Typesense client:
    ```bash
    npm install typesense @babel/runtime
    npm install react-instantsearch
    ```
    - Cấu hình file client:
    ```
    const typesenseClient = new Typesense.Client({
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_KEY  // api key,
    nodes: [
        {
            host: process.env.NEXT_PUBLIC_TYPESENSE_HOST // hoặc ''localhost',
            port: 443, //hoặc '8108' nếu sử dụng localhost
            protocol: 'https',
        }
    ],
    connectionTimeoutSeconds: 2,
    })
    ```
4. Chạy dự án cục bộ
```bash
npm next dev 
```
- Ứng dụng chạy tại: `https//localhost:3000`
5. Triển khai sản phẩm
- Build project Next.js:
```bash
next start
next build
```
