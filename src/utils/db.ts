require('dotenv').config();
import { Sequelize } from 'sequelize';

export function getDatabaseVariables() {
  const host = process.env.MYSQL_HOST;
  const port = Number(process.env.MYSQL_PORT);
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const databaseName = process.env.MYSQL_DATABASE_NAME;

  if ( !host || !port || !user || !password || !databaseName ) {
    throw new Error('No variables for the MYSQL database!');
  }

  return {
    host,
    port,
    user,
    password,
    databaseName,
  };
}

export const sequelize = new Sequelize({
  host: getDatabaseVariables().host,
  dialect: 'mysql',
  database: getDatabaseVariables().databaseName,
  password: getDatabaseVariables().password,
  port: getDatabaseVariables().port,
  username: getDatabaseVariables().user,
});

sequelize.authenticate().then(() => {
  console.log('Connection established with MYSQL database');
}).catch((error: unknown) => {
  console.log('Error establishing connection with MYSQL database', error);
});