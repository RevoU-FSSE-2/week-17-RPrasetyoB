"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.passwordReset = exports.passResetReq = exports.updateRole = exports.registerUser = exports.loginUser = void 0;
const schema_1 = require("../config/schemas/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const date_fns_1 = require("date-fns");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/auth/jwt");
;
const node_cache_1 = __importDefault(require("node-cache"));
const errorCatch_1 = __importDefault(require("../utils/errorCatch"));
const uuid_1 = require("uuid");
const failedLogins = new node_cache_1.default({ stdTTL: 20 });
const cache = new node_cache_1.default({ stdTTL: 20 });
//------ login ------
const loginUser = async ({ username, password }) => {
    try {
        const user = await schema_1.userModel.findOne({ username });
        const loginAttempts = failedLogins.get(username) || 0;
        console.log('loginAttempts', loginAttempts);
        if (loginAttempts >= 4) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Too many failed login attempts. please try again later',
                status: 429
            });
        }
        if (!user) {
            failedLogins.set(username, loginAttempts + 1);
            throw new errorCatch_1.default({
                success: false,
                message: 'Username or Password invalid',
                status: 401
            });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (isPasswordCorrect) {
            const accessTokenExpired = (0, date_fns_1.addDays)(new Date(), 1);
            const accessToken = jsonwebtoken_1.default.sign({
                username: user.username,
                id: user._id,
                role: user.role
            }, jwt_1.JWT_Sign, { expiresIn: '10m' });
            const refreshTokenPayload = {
                username: user.username,
                id: user._id,
                role: user.role,
            };
            const refreshToken = jsonwebtoken_1.default.sign(refreshTokenPayload, jwt_1.JWT_Sign, {
                expiresIn: '7d',
            });
            await failedLogins.del(username);
            return {
                success: true,
                message: {
                    accessToken,
                    refreshToken,
                    accessTokenExpired
                },
            };
        }
        else {
            failedLogins.set(username, loginAttempts + 1);
            throw new errorCatch_1.default({
                success: false,
                message: 'Username or Password invalid',
                status: 401
            });
        }
    }
    catch (error) {
        console.log(error);
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status
        });
    }
};
exports.loginUser = loginUser;
//------ register ------
const registerUser = async ({ username, email, password }) => {
    try {
        if (!username) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Username cannot be empty',
                status: 400
            });
        }
        if (password.length < 8) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Password must be at least 8 characters long',
                status: 400
            });
        }
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Password must contain both alphabetic and numeric characters',
                status: 400
            });
        }
        const existUser = await schema_1.userModel.findOne({ username });
        if (existUser) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Username already exists',
                status: 409
            });
        }
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const newUser = await schema_1.userModel.create({ username, email, password: hashedPass });
        return {
            success: true,
            message: newUser
        };
    }
    catch (error) {
        console.log(error);
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status
        });
    }
};
exports.registerUser = registerUser;
//------ update user role ------
const updateRole = async ({ username, role }) => {
    try {
        const response = await schema_1.userModel.findOneAndUpdate({ username: username }, { role: role }, { new: true });
        if (response) {
            return {
                success: true,
                message: response
            };
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (error) {
        console.log(error);
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
};
exports.updateRole = updateRole;
//------ password reset request ------
const sendEmail = (email, key) => {
    console.log(`Subject: Password reset request`);
    console.log(`To: ${email}`);
    console.log(`${key}`);
    // const linkReset = `https://week-16-rprasetyob-production.up.railway.app/reset?key=${key}  
};
const passResetReq = async (email) => {
    try {
        const user = await schema_1.userModel.findOne({ email: email });
        if (!user) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Email not registered',
                status: 404,
            });
        }
        const key = (0, uuid_1.v4)();
        cache.set(key, email, 25 * 1000);
        sendEmail(user.email, key);
        const linkReset = `${key}`;
        // const linkReset = `https://week-16-rprasetyob-production.up.railway.app/reset?key=${key}`
        return {
            success: true,
            message: "Password reset link sent",
            data: linkReset
        };
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
};
exports.passResetReq = passResetReq;
const passwordReset = async (key, password) => {
    try {
        const email = cache.get(key);
        if (!email) {
            throw new errorCatch_1.default({
                success: false,
                status: 401,
                message: "Invalid or expired token",
            });
        }
        const user = await schema_1.userModel.findOne({ email: email });
        if (!user) {
            throw new errorCatch_1.default({
                success: false,
                message: 'Email invalid / not registered',
                status: 401,
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await user.updateOne({ password: hashedPassword });
        cache.del(key);
        return {
            success: true,
            message: 'Password reset successful',
        };
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
};
exports.passwordReset = passwordReset;
//------- RefreshToken -------
const refreshAccessToken = async (refreshToken) => {
    try {
        const user = jsonwebtoken_1.default.verify(refreshToken, jwt_1.JWT_Sign);
        const accessToken = jsonwebtoken_1.default.sign({ user }, jwt_1.JWT_Sign, { expiresIn: '15m' });
        return accessToken;
    }
    catch (error) {
        throw new errorCatch_1.default({
            success: false,
            message: error.message,
            status: error.status,
        });
    }
};
exports.refreshAccessToken = refreshAccessToken;
