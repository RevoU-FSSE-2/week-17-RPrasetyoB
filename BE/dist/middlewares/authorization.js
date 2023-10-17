"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCookie_1 = __importDefault(require("../utils/getCookie"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roleAuthorization = (allowedRoles) => {
    return async (req, res, next) => {
        const token = (0, getCookie_1.default)(req);
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!token) {
            return res.status(401).send({ message: "Token not provided" });
        }
        try {
            req.userId = decoded._id;
            req.username = decoded.username;
            req.userRole = decoded.role;
            if (req.userRole && !allowedRoles.includes(req.userRole)) {
                return res.status(403).send({ message: "Access forbidden: Role not allowed" });
            }
            next();
        }
        catch (error) {
            res.status(401).send({ message: "Invalid token" });
        }
    };
};
exports.default = roleAuthorization;
