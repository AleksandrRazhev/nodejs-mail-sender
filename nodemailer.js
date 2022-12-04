const nodemailer = require("nodemailer");

const transportObject = {
  host: process.env.HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
};

const mailOptions = {
  from: process.env.MAIL,
  to: process.env.MAIL,
};

const transporter = nodemailer.createTransport(transportObject, {
  from: `Mailer Test <${process.env.MAIL}>`,
});

const mailer = (message) => {
  transporter.sendMail({ ...mailOptions, ...message });
};

module.exports = mailer;
