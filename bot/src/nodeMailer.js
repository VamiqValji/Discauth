require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (
  to = String,
  verificationCode = String,
  serverName
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: to,
    subject: "Discauth Verification",
    text: `Your Discauth verification code is '${verificationCode}'. DM the Discauth bot '.verify ${verificationCode} to verify yourself.'`,
    //                                    ^ for the server '${serverName}'
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      return "Error";
    } else {
      return "Email sent.";
    }
  });
};

module.exports = { sendEmail };
