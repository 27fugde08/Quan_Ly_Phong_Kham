import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
// import cors from 'cors'
require('dotenv').config();

let app = express();
// app.use(cors({ origin: true }));


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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
