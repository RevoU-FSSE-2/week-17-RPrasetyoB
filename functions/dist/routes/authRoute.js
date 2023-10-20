"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("../middlewares/cors"));
const authRoute = express_1.default.Router();
authRoute.options('/v1/auth/register', (0, cors_1.default)(cors_2.default.clientGlobal));
authRoute.options('/v1/auth/login', (0, cors_1.default)(cors_2.default.clientGlobal));
authRoute.options('/v1/logout', (0, cors_1.default)(cors_2.default.clientGlobal));
authRoute.post('/v1/auth/register', (0, cors_1.default)(cors_2.default.clientGlobal), userController_1.regUser);
authRoute.post('/v1/auth/login', (0, cors_1.default)(cors_2.default.clientGlobal), userController_1.login);
authRoute.post('/v1/logout', (0, cors_1.default)(cors_2.default.clientGlobal), userController_1.logoutUser);
exports.default = authRoute;
