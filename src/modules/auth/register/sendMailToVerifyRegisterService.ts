import { transporter } from "../../../services/transporter";

export const sendMailToVerifyRegisterService = async (
  to: string,
  link: string
) => {
  return await transporter.sendMail({
    from: process.env.NODEMAILER_GMAIL,
    to,
    subject: "Vericar email para chat 🎩",
    html: `<a href=${link} style="color: royalblue">Haz clic en mí para verificar su registro</a>`,
  });
};
