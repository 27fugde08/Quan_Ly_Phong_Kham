import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors'
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));

// Cấu hình ứng dụng Express
app.use(bodyParser.json()); // Parse các body của request dưới dạng JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse các body của request dưới dạng URL-encoded

// Cấu hình view engine
viewEngine(app);

// Khởi tạo các route của ứng dụng web
initWebRoutes(app);

// Kết nối tới cơ sở dữ liệu
connectDB();

let port = process.env.PORT || 6969; // Sử dụng port được xác định trong biến môi trường PORT hoặc sử dụng port mặc định là 6969 nếu không có

app.listen(port, () => {
    // Callback khi server bắt đầu lắng nghe kết nối
    console.log("Backend Nodejs đang chạy trên cổng: " + port);
});
