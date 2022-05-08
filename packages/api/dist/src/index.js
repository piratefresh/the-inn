"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusType = exports.Experiance = exports.Difficulty = exports.UserResolver = exports.VerificationToken = exports.User = exports.Session = exports.Review = exports.Campaign = exports.Account = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: ["query"],
});
var Account_1 = require("./models/Account");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return Account_1.Account; } });
var Campaign_1 = require("./models/Campaign");
Object.defineProperty(exports, "Campaign", { enumerable: true, get: function () { return Campaign_1.Campaign; } });
var Review_1 = require("./models/Review");
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return Review_1.Review; } });
var Session_1 = require("./models/Session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return Session_1.Session; } });
var User_1 = require("./models/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
var VerificationToken_1 = require("./models/VerificationToken");
Object.defineProperty(exports, "VerificationToken", { enumerable: true, get: function () { return VerificationToken_1.VerificationToken; } });
var user_1 = require("./resolvers/user");
Object.defineProperty(exports, "UserResolver", { enumerable: true, get: function () { return user_1.UserResolver; } });
var Difficulty_1 = require("./types/Difficulty");
Object.defineProperty(exports, "Difficulty", { enumerable: true, get: function () { return Difficulty_1.Difficulty; } });
var Experiance_1 = require("./types/Experiance");
Object.defineProperty(exports, "Experiance", { enumerable: true, get: function () { return Experiance_1.Experiance; } });
var StatusType_1 = require("./types/StatusType");
Object.defineProperty(exports, "StatusType", { enumerable: true, get: function () { return StatusType_1.StatusType; } });
//# sourceMappingURL=index.js.map