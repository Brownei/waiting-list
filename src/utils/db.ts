require('dotenv').config();
import { Sequelize } from 'sequelize';

export function getDatabaseVariables() {
  const url = process.env.POSTGRES_URL;

  if ( !url ) {
    throw new Error('No variables for the Postgres database!');
  }

  return {
    url,
  };
}

export const sequelize = new Sequelize(getDatabaseVariables().url);

sequelize.authenticate().then(() => {
  console.log('Connection established with Postgres database');
}).catch((error: unknown) => {
  console.log('Error establishing connection with Postgres database', error);
});