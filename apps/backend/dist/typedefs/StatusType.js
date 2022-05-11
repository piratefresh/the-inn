"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatusType = void 0;
var _typeGraphql = require("type-graphql");
var StatusType;
exports.StatusType = StatusType;
(function(StatusType) {
    StatusType["ONLINE"] = "ONLINE";
    StatusType["IDLE"] = "IDLE";
    StatusType["DND"] = "DND";
    StatusType["OFFLINE"] = "OFFLINE";
})(StatusType || (exports.StatusType = StatusType = {}));
(0, _typeGraphql).registerEnumType(StatusType, {
    name: 'StatusType'
});

//# sourceMappingURL=StatusType.js.map