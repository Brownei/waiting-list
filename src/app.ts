import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './utils/middlewares';
import api from './api';
import { sequelize } from './utils/db';


require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173/',
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

//Synchronize all models created to the database
sequelize.sync({ force: false }).then(() => {
  console.log('Synchronization successful');
}).catch((error: unknown) => {
  console.log('Error with the synchronization', error);
});


app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
