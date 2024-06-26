import nodemailer from 'nodemailer';
import { MailtrapClient } from "mailtrap"
import { env } from "../config"

class Mailtrap {
    private client = new MailtrapClient({ token: env.MAILTRAP_TOKEN })


    private transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'your_mailtrap_username', // replace with your Mailtrap username
          pass: 'your_mailtrap_password', // replace with your Mailtrap password
        },
      });

    sendEmail = async (subject: string, text: string, to:string) => {
        try {
            await this.transporter.sendMail({ from: env.MAILTRAP_SENDER_EMAIL, to: [to], subject, text })
        } catch (error) {
            console.error(error)            
        }
    }
}

export const mailtrap = new Mailtrap()