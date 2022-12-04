const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const mailer = require("./nodemailer");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/sendmail", (req, res) => {
  try {
    if (req.body.text && req.body.email) {
      mailer({
        subject: "Письмо отправленное из Express через Nodemailer",
        text: req.body.text,
        to: req.body.email,
      });
      console.log("mail sent");
      res.status(200).json({
        mail: req.body.email,
        text: req.body.text,
        message: "mail sent",
      });
    } else {
      res
        .status(400)
        .json({ mail: req.body.email, text: req.body.text, message: "error" });
    }
  } catch (e) {
    console.log("express error: ", e);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
