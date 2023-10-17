"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
userRoutes.get('/users', authentication_1.default, userController_1.getAllUsers);
userRoutes.put('/users', authentication_1.default, userController_1.update);
userRoutes.post('/reset-req', authentication_1.default, userController_1.resetPassReq);
userRoutes.post('/reset', authentication_1.default, userController_1.resetPass);
exports.default = userRoutes;