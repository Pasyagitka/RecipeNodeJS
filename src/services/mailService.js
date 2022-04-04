const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports.sendActivationMail = async function sendActivationMail(to, link) {
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_NAME,
        text: 'Text',
        html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })
}