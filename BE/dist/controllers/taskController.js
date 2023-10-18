"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneTask = exports.deleteTask = exports.updateTask = exports.getAllTask = exports.createTask = void 0;
const schema_1 = require("../config/schemas/schema");
const taskService_1 = require("../services/taskService");
const getCookie_1 = require("../utils/getCookie");
//------ getTasks ------
const getAllTask = async (req, res) => {
    const decodedToken = (0, getCookie_1.getToken)(req);
    const { userRole, username } = (0, getCookie_1.loggedUser)(decodedToken);
    console.log('userRole', userRole);
    try {
        if (userRole === "manager") {
            const task = await (0, taskService_1.getMakerTasks)();
            return res.status(200).json({
                success: true,
                message: "Successfully fetched all tasks",
                result: task,
            });
        }
        else {
            const task = await (0, taskService_1.getMakerTasks)(username);
            return res.status(200).json({
                success: true,
                message: "Successfully fetched tasks for the user",
                data: task,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get tasks",
        });
    }
};
exports.getAllTask = getAllTask;
const getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await schema_1.taskModel.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "success get task",
            user: task,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Internal server erro while get Task or Task id wrong format"
        });
    }
};
exports.getOneTask = getOneTask;
const createTask = async (req, res) => {
    const decodedToken = (0, getCookie_1.getToken)(req);
    const { username } = (0, getCookie_1.loggedUser)(decodedToken);
    try {
        const { task } = req.body;
        const newTask = await schema_1.taskModel.create({ task, maker: username });
        return res.status(200).json({
            success: true,
            message: "Task registration success",
            data: newTask,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const decodedToken = (0, getCookie_1.getToken)(req);
    const { username } = (0, getCookie_1.loggedUser)(decodedToken);
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedStatus = await (0, taskService_1.updateMakerTasks)(id, status, username);
        if (updatedStatus.success) {
            return res.status(200).json({
                success: true,
                message: "Successfully updated status",
                data: {
                    status: status,
                },
            });
        }
        else {
            return res.status(updatedStatus.status).json({
                success: false,
                message: updatedStatus.message,
            });
        }
    }
    catch (err) {
        console.log("Error updating status:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the status",
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const decodedToken = (0, getCookie_1.getToken)(req);
    const { username } = (0, getCookie_1.loggedUser)(decodedToken);
    try {
        const { id } = req.params;
        const task = await schema_1.taskModel.findOne({ _id: id });
        if (task && task.maker === username) {
            const deletedTask = await (0, taskService_1.deleteMakerTasks)(id, username);
            if (deletedTask.status = 200) {
                return res.status(200).json({
                    success: true,
                    message: "Task deleted successfully",
                    data: deletedTask,
                });
            }
            else {
                return res.status(deletedTask.status).json({
                    success: false,
                    message: 'Failed deteted task',
                });
            }
        }
        else {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete this task",
            });
        }
    }
    catch (err) {
        console.log("Error deleting task:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the task",
        });
    }
};
exports.deleteTask = deleteTask;
