"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = void 0;
var _typeGraphql = require("type-graphql");
var _statusType = require("../typedefs/StatusType");
var _account = require("./Account");
var _session = require("./Session");
var _review = require("./Review");
var _player = require("./Player");
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
let User = class User {
};
exports.User = User;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.ID
    ),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "experience", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "twitter", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "facebook", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "discord", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "youtube", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_statusType.StatusType
    ),
    __metadata("design:type", typeof _statusType.StatusType === "undefined" ? Object : _statusType.StatusType)
], User.prototype, "status", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _account.Account
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _session.Session
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _review.Review
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _player.Player
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "players", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaign.Campaign
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "Hosted", void 0);
exports.User = User = __decorate([
    (0, _typeGraphql).ObjectType()
], User);

//# sourceMappingURL=User.js.map