import express from 'express';
import { prisma } from '../utils/db';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, country } = req.body;

  if (!name || !email || !country) {
    return res.sendStatus(409);
  }

  try {
    const alreadyInTheWaitingList = await prisma.waitingList.findUnique({
      where: {
        email,
      },
    });
    
    if (alreadyInTheWaitingList) {
      return res.sendStatus(409);
    } else {

      await prisma.waitingList.create({
        data: {
          name,
          email,
          country,
        },
      });
  
      return res.sendStatus(201);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

});

export default router;
