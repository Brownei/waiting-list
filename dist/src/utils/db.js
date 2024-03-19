"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.getDatabaseVariables = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
function getDatabaseVariables() {
    const host = process.env.MYSQL_HOST;
    const port = Number(process.env.MYSQL_PORT);
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const databaseName = process.env.MYSQL_DATABASE_NAME;
    if (!host || !port || !user || !password || !databaseName) {
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
exports.getDatabaseVariables = getDatabaseVariables;
exports.sequelize = new sequelize_1.Sequelize({
    host: getDatabaseVariables().host,
    dialect: 'mysql',
    database: getDatabaseVariables().databaseName,
    password: getDatabaseVariables().password,
    port: getDatabaseVariables().port,
    username: getDatabaseVariables().user,
});
exports.sequelize.authenticate().then(() => {
    console.log('Connection established with MYSQL database');
}).catch((error) => {
    console.log('Error establishing connection with MYSQL database', error);
});
//# sourceMappingURL=db.js.map