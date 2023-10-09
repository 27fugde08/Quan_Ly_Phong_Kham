import express from "express";

// Hàm cấu hình view engine cho ứng dụng Express
let configViewEngine = (app) => {
    // Sử dụng thư mục "./src/public" để lưu trữ tài nguyên tĩnh (ví dụ: hình ảnh, CSS, JS)
    app.use(express.static("./src/public"));

    // Thiết lập view engine là EJS
    app.set("view engine", "ejs");

    // Xác định đường dẫn tới thư mục chứa các file view (templates) của ứng dụng
    app.set("views", "./src/views");
}

// Xuất hàm cấu hình view engine để sử dụng trong các module khác
module.exports = configViewEngine;
