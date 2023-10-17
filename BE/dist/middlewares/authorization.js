"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCookie_1 = require("../utils/getCookie");
const roleAuthorization = (allowedRoles) => {
    return async (req, res, next) => {
        const decodedToken = (0, getCookie_1.getToken)(req);
        const { userRole } = (0, getCookie_1.loggedUser)(decodedToken);
        if (!decodedToken) {
            return res.status(401).send({ message: "Token not provided" });
        }
        try {
            if (req.userRole && !allowedRoles.includes(userRole)) {
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
