"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.redisPrefices = exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__prod__ = void 0;
const __prod__ = process.env.NODE_ENV === "production";
exports.__prod__ = __prod__;
const COOKIE_NAME = "rid";
exports.COOKIE_NAME = COOKIE_NAME;
const FORGET_PASSWORD_PREFIX = "forget-password:";
exports.FORGET_PASSWORD_PREFIX = FORGET_PASSWORD_PREFIX;
const redisPrefices = {
    redisSessionPrefix: "sess:",
    userSessionPrefix: "userSessIds:",
    forgotPassword: "forgotPassword:"
};
exports.redisPrefices = redisPrefices;

//# sourceMappingURL=constants.js.map