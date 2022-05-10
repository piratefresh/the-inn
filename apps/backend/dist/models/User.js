"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const StatusType_1 = require("../types/StatusType");
const Account_1 = require("./Account");
const Session_1 = require("./Session");
const Review_1 = require("./Review");
const Campaign_1 = require("./Campaign");
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "twitter", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "facebook", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "discord", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "youtube", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => StatusType_1.StatusType),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Account_1.Account]),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Session_1.Session]),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Review_1.Review]),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Campaign_1.Campaign]),
    __metadata("design:type", Array)
], User.prototype, "Campaign", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Campaign_1.Campaign]),
    __metadata("design:type", Array)
], User.prototype, "Hosted", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "campaignId", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map