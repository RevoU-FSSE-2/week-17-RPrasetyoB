"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookiesParser_1 = __importDefault(require("./cookiesParser"));
const middleWares = (app) => {
    // helmetApp(app);
    // morganApp(app);
    (0, cookiesParser_1.default)(app);
};
exports.default = middleWares;
