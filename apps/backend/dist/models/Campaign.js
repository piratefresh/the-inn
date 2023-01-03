"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Campaign = void 0;
var _typeGraphql = require("type-graphql");
var _experience = require("../typedefs/Experience");
var _difficulty = require("../typedefs/Difficulty");
var _user = require("./User");
var _membership = require("./Membership");
var _campaignMessage = require("./CampaignMessage");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Campaign = class Campaign {
};
exports.Campaign = Campaign;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.ID
    ),
    __metadata("design:type", String)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "createdAt", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "updatedAt", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "title", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "summary", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "jsonSummary", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "additionalDetails", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "jsonAdditionalDetails", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "note", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "imageUrl", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isOnline", void 0);
__decorate([
    (0, _typeGraphql).Field({
        defaultValue: "Campaign"
    }),
    __metadata("design:type", String)
], Campaign.prototype, "campaignType", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "city", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "state", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "area", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Campaign.prototype, "lat", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Campaign.prototype, "lng", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "endDate", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "days", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "timePeriods", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "timezone", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "gmId", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_experience.Experience
    ),
    __metadata("design:type", typeof _experience.Experience === "undefined" ? Object : _experience.Experience)
], Campaign.prototype, "experience", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "voipSystem", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "gameSystem", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "virtualTable", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], Campaign.prototype, "maxSeats", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isActive", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], Campaign.prototype, "puzzles", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], Campaign.prototype, "combat", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], Campaign.prototype, "roleplay", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "tags", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Campaign.prototype, "price", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "gallery", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_user.User
    ),
    __metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Campaign.prototype, "gameMaster", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _membership.Membership
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "memberships", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaignMessage.CampaignMessage
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "campaignMessage", void 0);
exports.Campaign = Campaign = __decorate([
    (0, _typeGraphql).InputType("campaignInput"),
    (0, _typeGraphql).ObjectType()
], Campaign);

//# sourceMappingURL=Campaign.js.map