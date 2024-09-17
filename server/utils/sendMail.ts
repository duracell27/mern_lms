import nodemailer, { Transporter } from "nodemailer";
require("dotenv").config();
import path from "path";
import ejs from "ejs";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}
const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { email, subject, template, data } = options;

  //get path to email template file
  const templatePath = path.join(__dirname, "../mails", template);

  // render the email template
  const html = await ejs.renderFile(templatePath, data);

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
