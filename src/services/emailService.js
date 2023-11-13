require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Nguyễn Trọng Duy 👻" <nguyentrongduy27082002@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(dataSend),

    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here<a/>
    </div>
    <div>Xin chân thành cảm ơn</div>
    `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Hello ${dataSend.patientName}!</h3>
            <p>You received this email because you booked an online medical appointment on Bookingcare</p>
            <p>Information for scheduling medical examination:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the above information is true, please click on the link below to confirm and complete the medical appointment procedure.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here<a/>
            </div>
            <div>Sincerely thank</div>
    `
    }
    return result;
}

async function main() {


}
module.exports = {
    sendSimpleEmail: sendSimpleEmail
}