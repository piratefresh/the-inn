"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Account = void 0;
var _typeGraphql = require("type-graphql");
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
let Account = class Account {
};
exports.Account = Account;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.ID
    ),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Account.prototype, "type", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Account.prototype, "provider", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Account.prototype, "providerAccountId", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "refreshToken", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "accessToken", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", Number)
], Account.prototype, "expiresAt", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "tokenType", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "scope", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "idToken", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "sessionState", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "oauthTokenSecret", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Account.prototype, "oauthToken", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Account.prototype, "userId", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_user.User
    ),
    __metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Account.prototype, "user", void 0);
exports.Account = Account = __decorate([
    (0, _typeGraphql).InputType("AccountInput"),
    (0, _typeGraphql).ObjectType()
], Account);

//# sourceMappingURL=Account.js.map