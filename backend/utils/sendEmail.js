import nodemailer from "nodemailer";

const sendEmail = async (to, subject = "Password Reset Request", text = "") => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text:
      text ||
      `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
