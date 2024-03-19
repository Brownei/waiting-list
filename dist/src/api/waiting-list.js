"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("./model"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { name, email, country } = req.body;
    try {
        const alreadyInTheWaitingList = await model_1.default.findOne({
            where: {
                email,
            },
        });
        if (alreadyInTheWaitingList) {
            return res.sendStatus(409);
        }
        else {
            await model_1.default.create({
                name,
                email,
                country,
            });
            return res.sendStatus(201);
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
exports.default = router;
//# sourceMappingURL=waiting-list.js.map