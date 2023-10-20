"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedUser = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/auth/jwt");
const getToken = (req) => {
    const token = req.cookies['accessToken'];
    if (!token) {
        return null;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_Sign);
        return decoded;
    }
    catch (error) {
        // Handle token verification errors here
        return null;
    }
};
exports.getToken = getToken;
const loggedUser = (decodedToken) => {
    return {
        userRole: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role,
        username: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.username,
        userId: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id
    };
};
exports.loggedUser = loggedUser;
