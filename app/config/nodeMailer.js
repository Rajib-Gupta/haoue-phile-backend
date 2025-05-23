const nodemailer = require("nodemailer");

// Set up Nodemailer transporter to send verification emails
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // You can use other services or configure your own SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  module.exports = transporter;
  