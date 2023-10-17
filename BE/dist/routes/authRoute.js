"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authRoute = express_1.default.Router();
authRoute.post('/auth/register', userController_1.regUser);
authRoute.post('/auth/login', userController_1.login);
authRoute.post('/logout', userController_1.logoutUser);
authRoute.post('/refresh-token', userController_1.accessTokenRefresh);
exports.default = authRoute;
