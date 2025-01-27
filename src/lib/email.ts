import nodemailer from "nodemailer";

interface Attachment {
  filename: string;
  path: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: import.meta.env.EMAIL_USER,
    pass: import.meta.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  attachments?: Attachment[]
) => {
  transporter.sendMail({
    from: import.meta.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments,
  });
};
