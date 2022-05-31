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
exports.Campaign = void 0;
const type_graphql_1 = require("type-graphql");
const Experiance_1 = require("../typedefs/Experiance");
const Difficulty_1 = require("../typedefs/Difficulty");
const User_1 = require("./User");
const Player_1 = require("./Player");
let Campaign = class Campaign {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.ID),
    __metadata("design:type", String)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Campaign.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Campaign.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "gmId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "summary", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Campaign.prototype, "additional_details", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Campaign.prototype, "note", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isOnline", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "state", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], Campaign.prototype, "lat", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Float),
    __metadata("design:type", Number)
], Campaign.prototype, "lng", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Campaign.prototype, "geolocation_lat", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Campaign.prototype, "geolocation_lng", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Campaign.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [String]),
    __metadata("design:type", Array)
], Campaign.prototype, "days", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [String]),
    __metadata("design:type", Array)
], Campaign.prototype, "time_periods", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Campaign.prototype, "game_system", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Experiance_1.Experiance),
    __metadata("design:type", String)
], Campaign.prototype, "experiance", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Campaign.prototype, "voip_system", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Int),
    __metadata("design:type", Number)
], Campaign.prototype, "max_seats", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], Campaign.prototype, "puzzles", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], Campaign.prototype, "combat", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], Campaign.prototype, "roleplay", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => User_1.User),
    __metadata("design:type", User_1.User)
], Campaign.prototype, "game_master", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Player_1.Player]),
    __metadata("design:type", Array)
], Campaign.prototype, "players", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [String]),
    __metadata("design:type", Array)
], Campaign.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Campaign.prototype, "price", void 0);
Campaign = __decorate([
    (0, type_graphql_1.ObjectType)()
], Campaign);
exports.Campaign = Campaign;
//# sourceMappingURL=Campaign.js.map