const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

async function sendActivationMail(to, link) {
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: `Activate your account on ${process.env.API_NAME}`,
        text: 'Thank you for joining us.',
        html:
            `
                <div>
                    <h1>Click the link:</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
}

async function sendResetPasswordEmail(to, link, password) {
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: `Reset your password on ${process.env.API_NAME}`,
        text: '',
        html:
            `
                <div>
                    <h3>Confrim:</h3>
                    <span>Your temporary password:</span><span>${password}</span>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
}

async function sendConfirmResetPasswordEmail(to) {
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: `Your ${process.env.API_NAME} password has been changed`,
        html:
            `
                <div>
                    <span>This is a confirmation that the password for your account has just been changed.</span>
                </div>
            `,
    });
}

module.exports = {
    sendActivationMail,
    sendResetPasswordEmail,
    sendConfirmResetPasswordEmail,
};
