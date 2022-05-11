"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusType = void 0;
const type_graphql_1 = require("type-graphql");
var StatusType;
(function (StatusType) {
    StatusType["ONLINE"] = "ONLINE";
    StatusType["IDLE"] = "IDLE";
    StatusType["DND"] = "DND";
    StatusType["OFFLINE"] = "OFFLINE";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
(0, type_graphql_1.registerEnumType)(StatusType, {
    name: 'StatusType',
});
//# sourceMappingURL=StatusType.js.map