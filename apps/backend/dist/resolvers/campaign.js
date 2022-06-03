"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CampaignResolver = exports.AddPlayerCampaignInput = exports.CreateCampaignInput = exports.CreateCampaignResult = exports.AuthResult = void 0;
var _typeGraphql = require("type-graphql");
var _myContext = require("../typedefs/MyContext");
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _badCredentialsError = require("../errors/BadCredentialsError");
var _campaign = require("../models/Campaign");
var _nonExistingCampaignError = require("../errors/NonExistingCampaignError");
var _experiance = require("../typedefs/Experiance");
var _difficulty = require("../typedefs/Difficulty");
var _cloudinary = require("cloudinary");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (void 0) && (void 0).__param || function(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
};
_cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});
const AuthResult = (0, _typeGraphql).createUnionType({
    name: "AuthResult",
    types: ()=>[
            _campaign.Campaign,
            _fieldsValidationError.FieldsValidationError,
            _nonExistingCampaignError.NonExistingCampaignError,
            _badCredentialsError.BadCredentialsError, 
        ]
});
exports.AuthResult = AuthResult;
const CreateCampaignResult = (0, _typeGraphql).createUnionType({
    name: "CreateCampaignResult",
    types: ()=>[
            _campaign.Campaign,
            _fieldsValidationError.FieldsValidationError
        ]
});
exports.CreateCampaignResult = CreateCampaignResult;
let CreateCampaignInput = class CreateCampaignInput {
};
exports.CreateCampaignInput = CreateCampaignInput;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "title", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "summary", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "image", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Boolean)
], CreateCampaignInput.prototype, "isOnline", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "city", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "state", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "lat", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "lng", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateCampaignInput.prototype, "startDate", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateCampaignInput.prototype, "endDate", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "days", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "time_periods", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "game_system", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "max_seats", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>_experiance.Experiance
    ),
    __metadata("design:type", typeof _experiance.Experiance === "undefined" ? Object : _experiance.Experiance)
], CreateCampaignInput.prototype, "experiance", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], CreateCampaignInput.prototype, "puzzles", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], CreateCampaignInput.prototype, "combat", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>_difficulty.Difficulty
    ),
    __metadata("design:type", typeof _difficulty.Difficulty === "undefined" ? Object : _difficulty.Difficulty)
], CreateCampaignInput.prototype, "roleplay", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "tags", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "price", void 0);
exports.CreateCampaignInput = CreateCampaignInput = __decorate([
    (0, _typeGraphql).InputType()
], CreateCampaignInput);
let AddPlayerCampaignInput = class AddPlayerCampaignInput {
};
exports.AddPlayerCampaignInput = AddPlayerCampaignInput;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], AddPlayerCampaignInput.prototype, "campaignId", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], AddPlayerCampaignInput.prototype, "playerIds", void 0);
exports.AddPlayerCampaignInput = AddPlayerCampaignInput = __decorate([
    (0, _typeGraphql).InputType()
], AddPlayerCampaignInput);
let ImageSignature = class ImageSignature {
};
__decorate([
    (0, _typeGraphql).Field((_type)=>String
    ),
    __metadata("design:type", String)
], ImageSignature.prototype, "signature", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], ImageSignature.prototype, "timestamp", void 0);
ImageSignature = __decorate([
    (0, _typeGraphql).ObjectType()
], ImageSignature);
let CampaignResolver = class CampaignResolver {
    async hellogame() {
        return "hello game";
    }
    async getCampaigns({ prisma , res  }) {
        return prisma.campaign.findMany({});
    }
    async getCampaign(id, { prisma , res  }) {
        return prisma.campaign.findUnique({
            where: {
                id
            },
            include: {
                game_master: true,
                players: {
                    select: {
                        user: true,
                        campaign: true
                    }
                }
            }
        });
    }
    async createCampaign(createCampaignInput, { prisma , res , req  }) {
        try {
            const campaign = await prisma.campaign.create({
                data: _objectSpread({}, createCampaignInput, {
                    gmId: req.session.userId
                })
            });
            return Object.assign(new _campaign.Campaign(), campaign);
        } catch (err) {
            throw err;
        }
    }
    async addCampaignPlayer(addPlayerCampaignInput, { prisma , res , req  }) {
        try {
            const players = await prisma.user.findMany({
                where: {
                    id: {
                        in: addPlayerCampaignInput.playerIds
                    }
                }
            });
            const playersArr = await players.map((player)=>({
                    userId: player.id,
                    campaignId: addPlayerCampaignInput.campaignId
                })
            );
            const createdPlayers = await prisma.player.createMany({
                data: playersArr,
                skipDuplicates: true
            });
            if (createdPlayers) {
                const foundCampaign = await prisma.campaign.findUnique({
                    where: {
                        id: addPlayerCampaignInput.campaignId
                    },
                    include: {
                        players: {
                            select: {
                                user: true,
                                campaign: true
                            }
                        },
                        game_master: true
                    }
                });
                console.log("foundCampaign: ", foundCampaign);
                return Object.assign(new _campaign.Campaign(), foundCampaign);
            }
        } catch (err) {
            throw err;
        }
    }
    createImageSignature() {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = _cloudinary.v2.utils.api_sign_request({
            timestamp,
            folder: "The inn/campaignmedia"
        }, process.env.CLOUDINARY_API_SECRET);
        return {
            timestamp,
            signature
        };
    }
};
exports.CampaignResolver = CampaignResolver;
__decorate([
    (0, _typeGraphql).Query(()=>String
    ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [])
], CampaignResolver.prototype, "hellogame", null);
__decorate([
    (0, _typeGraphql).Query(()=>[
            _campaign.Campaign
        ]
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "getCampaigns", null);
__decorate([
    (0, _typeGraphql).Query(()=>_campaign.Campaign
    ),
    __param(0, (0, _typeGraphql).Arg("id")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "getCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateCampaignResult
    ),
    __param(0, (0, _typeGraphql).Arg("createCampaignInput")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof CreateCampaignInput === "undefined" ? Object : CreateCampaignInput,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "createCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateCampaignResult
    ),
    __param(0, (0, _typeGraphql).Arg("AddPlayerCampaignInput")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof AddPlayerCampaignInput === "undefined" ? Object : AddPlayerCampaignInput,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "addCampaignPlayer", null);
__decorate([
    (0, _typeGraphql).Mutation((_returns)=>ImageSignature
    ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [])
], CampaignResolver.prototype, "createImageSignature", null);
exports.CampaignResolver = CampaignResolver = __decorate([
    (0, _typeGraphql).Resolver(_campaign.Campaign)
], CampaignResolver);

//# sourceMappingURL=campaign.js.map