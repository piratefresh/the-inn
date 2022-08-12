"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Membership = void 0;
var _typeGraphql = require("type-graphql");
var _membershipRole = require("../typedefs/MembershipRole");
var _user = require("./User");
var _campaign = require("./Campaign");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Membership = class Membership {
};
exports.Membership = Membership;
__decorate([
    (0, _typeGraphql).Field((_type)=>_membershipRole.MembershipRole
    ),
    __metadata("design:type", typeof _membershipRole.MembershipRole === "undefined" ? Object : _membershipRole.MembershipRole)
], Membership.prototype, "role", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Membership.prototype, "campaignId", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Membership.prototype, "userId", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_user.User
    ),
    __metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Membership.prototype, "user", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_campaign.Campaign
    ),
    __metadata("design:type", typeof _campaign.Campaign === "undefined" ? Object : _campaign.Campaign)
], Membership.prototype, "campaign", void 0);
exports.Membership = Membership = __decorate([
    (0, _typeGraphql).ObjectType()
], Membership);

//# sourceMappingURL=Membership.js.map