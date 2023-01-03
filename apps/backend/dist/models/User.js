"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = void 0;
var _typeGraphql = require("type-graphql");
var _experience = require("../typedefs/Experience");
var _statusType = require("../typedefs/StatusType");
var _account = require("./Account");
var _session = require("./Session");
var _review = require("./Review");
var _campaign = require("./Campaign");
var _membership = require("./Membership");
var _campaignMessage = require("./CampaignMessage");
var _privateMessage = require("./PrivateMessage");
var _notification = require("./Notification");
var _application = require("./Application");
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
    (0, _typeGraphql).Field(),
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
], User.prototype, "emailVerifyToken", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "aboutMe", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "htmlAboutMe", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "playStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "htmlPlayStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "gmStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "htmlGmStyle", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_experience.Experience
    ),
    __metadata("design:type", typeof _experience.Experience === "undefined" ? Object : _experience.Experience)
], User.prototype, "experience", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "gameSystems", void 0);
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
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "instagram", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "twitch", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "profileCSS", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_statusType.StatusType
    ),
    __metadata("design:type", typeof _statusType.StatusType === "undefined" ? Object : _statusType.StatusType)
], User.prototype, "status", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _membership.Membership
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "memberships", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _account.Account
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaign.Campaign
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "hosted", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _review.Review
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _session.Session
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaignMessage.CampaignMessage
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "sentCampaignMessage", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _privateMessage.PrivateMessage
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "sentPrivateMessages", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _privateMessage.PrivateMessage
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "receivedPrivateMessage", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _notification.Notification
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "Notification", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _application.Application
        ]
    ),
    __metadata("design:type", Array)
], User.prototype, "Application", void 0);
exports.User = User = __decorate([
    (0, _typeGraphql).InputType("UserInput"),
    (0, _typeGraphql).ObjectType("User", {
        isAbstract: true
    })
], User);

//# sourceMappingURL=User.js.map