"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const cors_1 = __importDefault(require("../middlewares/cors"));
const cors_2 = __importDefault(require("cors"));
const userRoutes = express_1.default.Router();
userRoutes.options('/users', (0, cors_2.default)(cors_1.default.clientGlobal));
userRoutes.options('/reset-req', (0, cors_2.default)(cors_1.default.clientGlobal));
userRoutes.options('/reset', (0, cors_2.default)(cors_1.default.clientGlobal));
userRoutes.get('/users', (0, cors_2.default)(cors_1.default.clientGlobal), userController_1.getAllUsers);
userRoutes.put('/users', (0, cors_2.default)(cors_1.default.clientGlobal), userController_1.update);
userRoutes.post('/reset-req', (0, cors_2.default)(cors_1.default.clientGlobal), userController_1.resetPassReq);
userRoutes.post('/reset', (0, cors_2.default)(cors_1.default.clientGlobal), userController_1.resetPass);
exports.default = userRoutes;
