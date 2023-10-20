"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const task_route_1 = __importDefault(require("./task.route"));
const cors_1 = __importDefault(require("../middlewares/cors"));
const cors_2 = __importDefault(require("cors"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to RPB rest API'
    });
});
routes.use('/v1', (0, cors_2.default)(cors_1.default.clientGlobal), user_route_1.default);
routes.use('/v1', (0, cors_2.default)(cors_1.default.clientGlobal), task_route_1.default);
exports.default = routes;
