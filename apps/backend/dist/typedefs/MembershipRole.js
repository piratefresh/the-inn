"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MembershipRole = void 0;
var _typeGraphql = require("type-graphql");
var MembershipRole;
exports.MembershipRole = MembershipRole;
(function(MembershipRole) {
    MembershipRole["GM"] = "GM";
    MembershipRole["PLAYER"] = "PLAYER";
})(MembershipRole || (exports.MembershipRole = MembershipRole = {}));
(0, _typeGraphql).registerEnumType(MembershipRole, {
    name: 'MembershipRole'
});

//# sourceMappingURL=MembershipRole.js.map