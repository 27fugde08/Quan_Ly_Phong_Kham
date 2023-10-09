// Import các module cần thiết
import db from '../models/index';
import CRUDservice from '../services/CRUDservice';

/**
 * Hàm xử lý yêu cầu trang chủ
 */
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        // Render trang "homepage.ejs"
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // Ghi chú: Truyền dữ liệu người dùng dưới dạng chuỗi
        });
    } catch (e) {
        console.log(e);
    }
}

/**
 * Hàm xử lý yêu cầu trang giới thiệu
 */
let getAboutPage = (req, res) => {
    // Render trang "test/about.ejs"
    return res.render('test/about.ejs');
}

/**
 * Hàm xử lý yêu cầu trang CRUD
 */
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

/**
 * Hàm xử lý yêu cầu POST để tạo người dùng mới
 */
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message); // Ghi chú: Ghi log tin nhắn
    return res.send('post crud from server');
}


let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data // Ghi chú: Truyền dữ liệu người dùng dưới dạng dataTable
    });
}

/**
 * Hàm xử lý yêu cầu trang chỉnh sửa thông tin người dùng trên trang CRUD
 */
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: userData // Ghi chú: Truyền dữ liệu người dùng cho việc chỉnh sửa
        });
    } else {
        return res.send('Users not found');
    }
}

/**
 * Hàm xử lý yêu cầu PUT để cập nhật thông tin người dùng trên trang CRUD
 */
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    // return res.send('update done!!!')
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers // Ghi chú: Truyền dữ liệu người dùng đã được cập nhật
    });
}

/**
 * Hàm xử lý yêu cầu DELETE để xóa người dùng trên trang CRUD
 */
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete user succeed');
    } else {
        return res.send('User not found');
    }
}

// Đối tượng chứa các hàm xử lý yêu cầu
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};
