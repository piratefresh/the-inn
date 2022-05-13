"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_COOKIE_NAME = "rid";
const JWT_SECRET_KEY = "keyboard-cat";
const setToken = (user, res) => {
    const payload = {
        email: user.email,
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, "keyboard-cat");
    res.cookie(JWT_COOKIE_NAME, token, {
        httpOnly: true,
    });
};
exports.setToken = setToken;
//# sourceMappingURL=setToken.js.map