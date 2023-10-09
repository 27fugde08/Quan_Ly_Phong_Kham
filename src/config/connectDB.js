const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
// Khởi tạo đối tượng Sequelize để làm việc với cơ sở dữ liệu MySQL
const sequelize = new Sequelize('quanlyphongkham', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// Hàm kết nối tới cơ sở dữ liệu
let connectDB = async () => {
    try {
        // Kiểm tra xác thực kết nối
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Xuất module để sử dụng ở phần code khác
module.exports = connectDB;
