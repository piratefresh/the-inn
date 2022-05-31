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
exports.Player = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Campaign_1 = require("./Campaign");
let Player = class Player {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Player.prototype, "campaignId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Player.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => User_1.User),
    __metadata("design:type", User_1.User)
], Player.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => Campaign_1.Campaign),
    __metadata("design:type", Campaign_1.Campaign)
], Player.prototype, "campaign", void 0);
Player = __decorate([
    (0, type_graphql_1.ObjectType)()
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.js.map