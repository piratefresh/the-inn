"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRefreshToken = exports.createToken = exports.setToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const setToken = (user, res)=>{
    const payload = {
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        accessTokenExpires: Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000
    };
    const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET_KEY);
    console.log("token: ", token);
    res.cookie("rid", token, {
        httpOnly: true
    });
};
exports.setToken = setToken;
const createToken = (user)=>{
    const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        accessTokenExpires: Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000
    };
    const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
};
exports.createToken = createToken;
const createRefreshToken = (user)=>{
    const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        accessTokenExpires: Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000
    };
    const refreshToken = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
        algorithm: "HS512"
    });
    return refreshToken;
};
exports.createRefreshToken = createRefreshToken;

//# sourceMappingURL=setToken.js.map