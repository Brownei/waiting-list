"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const db_1 = require("../utils/db");
const sequelize_1 = require("sequelize");
const waitingListSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    country: zod_1.z.string(),
});
const WaitingList = db_1.sequelize.define('waiting-list', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.default = WaitingList;
//# sourceMappingURL=model.js.map