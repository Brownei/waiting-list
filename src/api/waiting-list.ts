import express from 'express';
import WaitingList from './model';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, country } = req.body;

  try {
    const alreadyInTheWaitingList = await WaitingList.findOne({
      where: {
        email,
      },
    });
    
    if (alreadyInTheWaitingList) {
      return res.sendStatus(409);
    } else {

      await WaitingList.create({
        name,
        email,
        country,
      });
  
      return res.sendStatus(201);

    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

});

export default router;
