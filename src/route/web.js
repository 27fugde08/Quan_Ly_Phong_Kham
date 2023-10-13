import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

const router = express.Router();

let initWebRoutes = (app) => {
    // Định nghĩa route cho trang chủ "/"
    router.get("/", homeController.getHomePage);

    // Định nghĩa route cho trang "about"
    router.get("/about", homeController.getAboutPage);

    // Định nghĩa route cho trang "crud"
    router.get("/crud", homeController.getCRUD);

    // Định nghĩa route xử lý gửi dữ liệu từ form CRUD
    router.post("/post-crud", homeController.postCRUD);

    // Định nghĩa route hiển thị dữ liệu CRUD
    router.get("/get-crud", homeController.displayGetCRUD);

    // Định nghĩa route hiển thị trang chỉnh sửa CRUD
    router.get("/edit-crud", homeController.getEditCRUD);

    // Định nghĩa route xử lý cập nhật dữ liệu CRUD
    router.post("/put-crud", homeController.putCRUD);

    // Định nghĩa route xử lý xóa dữ liệu CRUD
    router.get("/delete-crud", homeController.deleteCRUD);

    // Định nghĩa route xử lý yêu cầu đăng nhập
    router.post("/api/login", userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.post('/api/create-new-user ', userController.handleCreateNewUser);

    router.put('/api/edit-user ', userController.handleEditUser);

    router.delete('/api/delete-user ', userController.handleDeleteUser);

    // Sử dụng router cho các route bắt đầu từ "/" (gốc)
    return app.use("/", router);
};

module.exports = initWebRoutes;
