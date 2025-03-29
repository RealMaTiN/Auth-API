const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async (to, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Password Reset',
        html: `
            <div>
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>This link will expire in 15 minutes.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };