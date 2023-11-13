import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // (!data.email || !data.doctorId || !data.timeType || !data.date)
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!!'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Nguyễn Trọng Duy patient name',
                    time: '8:00-9:00 Chủ nhật 25/11/2023',
                    doctorName: 'Nguyễn Trọng Duy',
                    redirectLink: 'https://www.facebook.com/berrydayisawaking/'
                })
                // upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email

                    },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                })
                console.log('check user', user[0])
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    postBookAppointment: postBookAppointment
}