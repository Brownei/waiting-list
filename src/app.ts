import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './utils/middlewares';
import api from './api';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
