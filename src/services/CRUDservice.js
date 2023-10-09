import bcrypt from 'bcryptjs';
import db from '../models/index';
import { reject } from 'bcrypt/promises';

const salt = bcrypt.genSaltSync(10)

// Tạo một người dùng mới và lưu vào cơ sở dữ liệu
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Băm mật khẩu người dùng trước khi lưu vào cơ sở dữ liệu
            let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('create a new user succeed');
        } catch (e) {
            reject(e);
        }
    });
}

// Băm mật khẩu sử dụng bcryptjs
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

// Lấy tất cả người dùng từ cơ sở dữ liệu
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

// Lấy thông tin người dùng theo ID
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

// Cập nhật thông tin người dùng
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                // Cập nhật thông tin người dùng
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                // Lấy danh sách tất cả người dùng sau khi cập nhật
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e)
        }
    })
}

// Xóa người dùng theo ID
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                // Xóa người dùng
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}
