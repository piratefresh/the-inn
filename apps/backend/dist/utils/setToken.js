"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const JWT_COOKIE_NAME = "rid";
const JWT_SECRET_KEY = "keyboard-cat";
const setToken = (user, res)=>{
    const payload = {
        email: user.email,
        id: user.id
    };
    const token = _jsonwebtoken.default.sign(payload, "keyboard-cat");
    res.cookie(JWT_COOKIE_NAME, token, {
        httpOnly: true
    });
};
exports.setToken = setToken;

//# sourceMappingURL=setToken.js.map