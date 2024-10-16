import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: '"Revenda" <contato@lypes.agency>',
    to,
    subject,
    text,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email");
  }
};

export default sendEmail;
