"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const taskRoutes = express_1.default.Router();
taskRoutes.get('/tasks', authentication_1.default, (0, authorization_1.default)(['manager', 'leader', 'member']), taskController_1.getAllTask);
taskRoutes.get('/tasks', authentication_1.default, (0, authorization_1.default)(['manager', 'leader', 'member']), taskController_1.getOneTask);
taskRoutes.post('/tasks', authentication_1.default, taskController_1.createTask);
taskRoutes.put('/tasks/:id', authentication_1.default, taskController_1.updateTask);
taskRoutes.delete('/tasks/:id', authentication_1.default, taskController_1.deleteTask);
exports.default = taskRoutes;
