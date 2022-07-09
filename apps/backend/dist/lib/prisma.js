"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prisma = void 0;
var _client = require("@prisma/client");
const prisma = global.prisma || new _client.PrismaClient();
exports.prisma = prisma;
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

//# sourceMappingURL=prisma.js.map