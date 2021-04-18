
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

const sendEmail = async (
  to:string,
  verificationCode:string,
  serverName:string
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions:nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_USER,
    to: to,
    subject: "Discauth Verification",
    text: `Your Discauth verification code for the server '${serverName}' is '${verificationCode}'. DM the Discauth bot '.verify ${verificationCode}' to verify yourself. By using Discauth and its Services, you are agreeing to our terms of service and privacy policy. More information here: https://discauth.herokuapp.com/`,
  };

  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      console.log(err);
      return "Error";
    } else {
      return "Email sent.";
    }
  });
};

// module.exports = { sendEmail };
export default sendEmail;
