import { promise } from "bcrypt/promises";
import userService from '../services/userService';

/**
 * Xử lý yêu cầu đăng nhập.
 *
 * @param {object} req - Đối tượng yêu cầu từ client.
 * @param {object} res - Đối tượng phản hồi từ server.
 * @returns {object} - Kết quả xử lý yêu cầu đăng nhập.
 */
let handleLogin = async (req, res) => {
    // Lấy email và password từ body của yêu cầu
    let email = req.body.email;
    let password = req.body.password;
    // Kiểm tra xem email và password có tồn tại hay không
    if (!email || !password) {
        // Nếu thiếu email hoặc password, trả về lỗi và thông báo
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        });
    }

    // Gọi hàm xử lý đăng nhập từ service
    let userData = await userService.handleUserLogin(email, password);
    console.log(userData)
    // Trả về kết quả xử lý đăng nhập
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });
};

/**
 * Xử lý yêu cầu lấy tất cả người dùng.
 *
 * @param {object} req - Đối tượng yêu cầu từ client.
 * @param {object} res - Đối tượng phản hồi từ server.
 * @returns {object} - Kết quả xử lý yêu cầu lấy tất cả người dùng.
 */
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // All, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing Required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
};
