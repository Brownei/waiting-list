/* eslint-disable @typescript-eslint/lines-between-class-members */
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

config();

const joinedTheWaitingListTemplate = (email: string, name: string): MailOptions => {
  return {
    from: `Brownson From 4D Solutions, ${process.env.GMAIL_USER}`,
    to: email,
    subject: 'Welcome to the Waiting List!',
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
      <p>Warm regards,<br>Brownson Esiti<br>Co-Founder<br>4D Solutions</p>
    `,
  };
};

export class Emailer {
  private readonly transporter: nodemailer.Transporter;
  email: string;
  name: string;

  constructor(email: string, name: string) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    this.email = email;
    this.name = name;
  }

  private async sendEmail(mailOptions: MailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
      // console.log(mail.messageId);
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  public notifyUserForJoiningWaitingList() {
    this.sendEmail(joinedTheWaitingListTemplate(this.email, this.name));
  }
}


