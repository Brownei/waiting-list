/* eslint-disable @typescript-eslint/lines-between-class-members */
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

config();

const joinedTheWaitingListTemplate = (email: string, name: string): MailOptions => {
  return {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to the Waiting List!',
    text: `
      Dear ${name},
      We are thrilled to welcome you to our exclusive waiting list community! 🎉
      Thank you for expressing interest in LinT. Your decision to join our waiting list demonstrates your enthusiasm for a collaborative platform designed to empower tech enthusiasts like yourself to be able to enhance your skills, share knowledge, and advance your career.
      While you await your turn, rest assured that you are part of an exciting journey towards growing your career and skills. We are continuously working to ensure that your experience with us exceeds your expectations.
      As a member of our waiting list, you'll enjoy the following perks:
      Priority access to LinT when it becomes available.
      Exclusive updates and insights about our progress.
      Opportunities to provide feedback and shape the future of LinT.
      We appreciate your patience and trust in us. Please feel free to reach out if you have any questions or suggestions. We value your input and look forward to serving you.
      In the meantime, keep an eye on your inbox for exciting updates and announcements. Great things are on the horizon!
      Warm regards,
      Brownson Esiti
      Co-Founder
      4D Solutions
    `,
    html: `
      <p>Dear ${name},</p>
      <p>We are thrilled to welcome you to our exclusive waiting list community! 🎉</p>
      <p>Thank you for expressing interest in LinT. Your decision to join our waiting list demonstrates your enthusiasm for a collaborative platform designed to empower tech enthusiasts like yourself to be able to enhance your skills, share knowledge, and advance your career.</p>
      <p>While you await your turn, rest assured that you are part of an exciting journey towards growing your career and skills. We are continuously working to ensure that your experience with us exceeds your expectations.</p>
      <p>As a member of our waiting list, you'll enjoy the following perks:</p>
      <ol>
        <li>Priority access to LinT when it becomes available.</li>
        <li>Exclusive updates and insights about our progress.</li>
        <li>Opportunities to provide feedback and shape the future of LinT.</li>
      </ol>
      <p>We appreciate your patience and trust in us. Please feel free to reach out if you have any questions or suggestions. We value your input and look forward to serving you.</p>
      <p>In the meantime, keep an eye on your inbox for exciting updates and announcements. Great things are on the horizon!</p>
      <p>Warm regards,<br>4D Solutions</p>
    `,
  };
};


export class Emailer {
  private readonly transporter: nodemailer.Transporter;
  private readonly email: string;
  private readonly name: string;
  private readonly access: string;

  constructor(email: string, name: string, accessToken:string) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        user: process.env.GMAIL_USER,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    this.email = email;
    this.name = name;
    this.access = accessToken;
  }

  private async sendEmail(mailOptions: MailOptions) {
    try {
      const mail = await this.transporter.sendMail(mailOptions);
      return {
        id: mail.messageId,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        id: null,
        success: false,
      };
    }
  }

  public async notifyUserForJoiningWaitingList() {
    const sendMail = await this.sendEmail(joinedTheWaitingListTemplate(this.email, this.name));
    return sendMail.id !== null ? 'Mail sent' : 'Mail not sent';
  }
}


