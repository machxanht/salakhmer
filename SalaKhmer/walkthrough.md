# Tự động hóa Dữ liệu Anki & Xây dựng Dashboard Học tập

## Những thay đổi chính

- Viết script `process_all_anki.mjs` có khả năng tự động giải nén hàng chục file `.apkg` và `.zip`, quét cơ sở dữ liệu SQLite bên trong và bóc tách nội dung flashcard Khmer.
- Cải tiến thuật toán RegExp để quét tìm file MP3 hiệu quả (không bị giới hạn bởi thẻ `[sound:]`), bóc tách thành công 338 thẻ flashcard hợp lệ cùng toàn bộ âm thanh giọng người thật đi kèm.
- **Smart Content Classification:** Tự động phân loại thẻ thành 5 mảng: `alphabet`, `greetings`, `vocabulary_1k`, `numbers`, `others`.
- Thay đổi `src/routes/home.tsx` để biến trang chủ thành Dashboard học tập, render các danh mục trực tiếp từ file `contentSyllabus.json`.
- Cấu hình lại `mock-lessons.ts` để nó trở thành Trình tạo lộ trình bài học thông minh: Tự động chia nhỏ 338 từ vựng bóc được thành các bài học (mỗi bài 10 từ).
- Cập nhật luồng âm thanh trong `audioService.ts` để đọc thẳng từ Syllabus, kết nối vòng lặp học flashcard liền mạch với giọng đọc gốc chuẩn Anki.

## Kết quả kiểm thử

- Script chạy mượt mà, dọn dẹp thư mục tạm sạch sẽ.
- Routing mới đã ăn khớp. Người học hiện tại có thể bấm vào mục Alphabet (អក្ខរក្រម) trên Dashboard để học 205 từ vựng vừa được bóc ra từ deck Khmer, được chia làm 20 bài học khác nhau.
