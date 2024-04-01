import express from 'express';
import { prisma } from '../utils/db';
import { Emailer } from '../utils/emailer';
import { google } from 'googleapis';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, country } = req.body;

  if (!name || !email || !country) {
    return res.sendStatus(404);
  }

  try {
    const OAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
    OAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const alreadyInTheWaitingList = await prisma.waitingList.findUnique({
      where: {
        email,
      },
    });
    
    if (alreadyInTheWaitingList) {
      return res.sendStatus(400);
    } else {
      const accessToken = await OAuth2Client.getAccessToken();
      const emailer = new Emailer(email, name, accessToken.token!);

      await prisma.waitingList.create({
        data: {
          name,
          email,
          country,
        },
      });
  
      const mail = await emailer.notifyUserForJoiningWaitingList();
      return mail === 'Mail sent' ? res.sendStatus(201) : res.sendStatus(409);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

});

export default router;
