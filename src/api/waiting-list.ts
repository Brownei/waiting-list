import express from 'express';
import { prisma } from '../utils/db';
import { Emailer } from '../utils/emailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, country } = req.body;

  if (!name || !email || !country) {
    return res.sendStatus(404);
  }

  try {
    const alreadyInTheWaitingList = await prisma.waitingList.findUnique({
      where: {
        email,
      },
    });
    
    if (alreadyInTheWaitingList) {
      return res.sendStatus(400);
    } else {
      const emailer = new Emailer(email, name);

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
