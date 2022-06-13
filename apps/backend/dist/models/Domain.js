"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Domain = void 0;
var _typeGraphql = require("type-graphql");
var _campaign = require("./Campaign");
var _user = require("./User");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Domain = class Domain {
};
exports.Domain = Domain;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.ID
    ),
    __metadata("design:type", String)
], Domain.prototype, "domain", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Boolean)
], Domain.prototype, "isValid", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaign.Campaign
        ]
    ),
    __metadata("design:type", Array)
], Domain.prototype, "Campaign", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], Domain.prototype, "campaignId", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_user.User
    , {
        nullable: true
    }),
    __metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Domain.prototype, "User", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Domain.prototype, "userId", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Domain.prototype, "createdAt", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Domain.prototype, "updatedAt", void 0);
exports.Domain = Domain = __decorate([
    (0, _typeGraphql).ObjectType()
], Domain);

//# sourceMappingURL=Domain.js.map