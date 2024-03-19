"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const waiting_list_1 = __importDefault(require("./waiting-list"));
const router = express_1.default.Router();
router.use('/waiting-list', waiting_list_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map