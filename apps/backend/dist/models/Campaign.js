"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Campaign = void 0;
var _typeGraphql = require("type-graphql");
var _experiance = require("../typedefs/Experiance");
var _difficulty = require("../typedefs/Difficulty");
var _user = require("./User");
var _membership = require("./Membership");
var _domain = require("./Domain");
var _item = require("./Item");
var _npc = require("./Npc");
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
], Campaign.prototype, "gmId", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "summary", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "additional_details", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "note", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "image", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isOnline", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "city", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "state", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    ),
    __metadata("design:type", Number)
], Campaign.prototype, "lat", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    ),
    __metadata("design:type", Number)
], Campaign.prototype, "lng", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Campaign.prototype, "geolocation_lat", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Campaign.prototype, "geolocation_lng", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, _typeGraphql).Field(),
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
], Campaign.prototype, "time_periods", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Campaign.prototype, "game_system", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_experiance.Experiance
    ),
    __metadata("design:type", typeof _experiance.Experiance === "undefined" ? Object : _experiance.Experiance)
], Campaign.prototype, "experiance", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "voip_system", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], Campaign.prototype, "max_seats", void 0);
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
    (0, _typeGraphql).Field((_type)=>_user.User
    ),
    __metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Campaign.prototype, "game_master", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _membership.Membership
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "memberships", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _domain.Domain
        ]
    ),
    __metadata("design:type", Array)
], Campaign.prototype, "Domain", void 0);
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
], Campaign.prototype, "extraImage", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_item.Item
    , {
        nullable: true
    }),
    __metadata("design:type", typeof _item.Item === "undefined" ? Object : _item.Item)
], Campaign.prototype, "Item", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "itemId", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_npc.Npc
    , {
        nullable: true
    }),
    __metadata("design:type", typeof _npc.Npc === "undefined" ? Object : _npc.Npc)
], Campaign.prototype, "Npc", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], Campaign.prototype, "npcId", void 0);
exports.Campaign = Campaign = __decorate([
    (0, _typeGraphql).ObjectType()
], Campaign);

//# sourceMappingURL=Campaign.js.map