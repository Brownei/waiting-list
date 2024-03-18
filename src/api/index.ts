import express from 'express';
import list from './waiting-list';

const router = express.Router();
router.use('/waiting-list', list);

export default router;
