"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMakerTasks = exports.updateMakerTasks = exports.getMakerTasks = void 0;
const schema_1 = require("../config/schemas/schema");
const errorCatch_1 = __importDefault(require("../utils/errorCatch"));
//------ get tasks ------
const getMakerTasks = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = username
            ? { maker: username, isDeleted: { $exists: false } }
            : { isDeleted: { $exists: false } };
        const tasks = yield schema_1.taskModel.find(query);
        return {
            status: 200,
            data: tasks,
        };
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: 500,
        });
    }
});
exports.getMakerTasks = getMakerTasks;
// ------ update task ------
const updateMakerTasks = (id, status, maker) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield schema_1.taskModel.findOne({ _id: id, maker: maker });
        if (!task) {
            return {
                success: false,
                status: 404,
                message: "Task not found or you do not have permission to update it",
                data: null,
            };
        }
        yield schema_1.taskModel.updateOne({ _id: id }, { status: status });
        return {
            success: true,
            status: 200,
            message: "Successfully updated task",
            data: task,
        };
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: 500,
        });
    }
});
exports.updateMakerTasks = updateMakerTasks;
const deleteMakerTasks = (id, maker) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield schema_1.taskModel.findOne({ _id: id, maker: maker });
        if (!task) {
            return {
                success: false,
                status: 404,
                message: "Task not found or you do not have permission to delete it",
                data: null,
            };
        }
        const deletedTask = yield schema_1.taskModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
        return {
            status: 200,
            data: deletedTask,
        };
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: 500,
        });
    }
});
exports.deleteMakerTasks = deleteMakerTasks;
