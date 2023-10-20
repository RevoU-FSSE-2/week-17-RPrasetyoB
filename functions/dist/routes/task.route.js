"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("../middlewares/cors"));
// import roleAuthorization from '../middlewares/authorization'
const taskRoutes = express_1.default.Router();
taskRoutes.options('/tasks', (0, cors_1.default)(cors_2.default.clientGlobal));
taskRoutes.options('/tasks/:id', (0, cors_1.default)(cors_2.default.clientGlobal));
taskRoutes.get('/tasks', (0, cors_1.default)(cors_2.default.clientGlobal), taskController_1.getAllTask);
taskRoutes.get('/tasks', (0, cors_1.default)(cors_2.default.clientGlobal), taskController_1.getOneTask);
taskRoutes.post('/tasks', (0, cors_1.default)(cors_2.default.clientGlobal), taskController_1.createTask);
taskRoutes.put('/tasks/:id', (0, cors_1.default)(cors_2.default.clientGlobal), taskController_1.updateTask);
taskRoutes.delete('/tasks/:id', (0, cors_1.default)(cors_2.default.clientGlobal), taskController_1.deleteTask);
exports.default = taskRoutes;
