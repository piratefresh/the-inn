"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CampaignResolver = exports.AddPlayerCampaignInput = exports.CreateCampaignResult = exports.AuthResult = void 0;
var _typeGraphql = require("type-graphql");
var _myContext = require("../typedefs/MyContext");
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _badCredentialsError = require("../errors/BadCredentialsError");
var _campaign = require("../models/Campaign");
var _nonExistingCampaignError = require("../errors/NonExistingCampaignError");
var _cloudinary = require("cloudinary");
var _membershipRole = require("../typedefs/MembershipRole");
var _createCampaignInput = require("./CreateCampaignInput");
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
let AddPlayerCampaignInput = class AddPlayerCampaignInput {
};
exports.AddPlayerCampaignInput = AddPlayerCampaignInput;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], AddPlayerCampaignInput.prototype, "campaignId", void 0);
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
let CampaignPagination = class CampaignPagination {
};
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaign.Campaign
        ]
    ),
    __metadata("design:type", Array)
], CampaignPagination.prototype, "campaigns", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CampaignPagination.prototype, "cursor", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>Boolean
    ),
    __metadata("design:type", Boolean)
], CampaignPagination.prototype, "hasNextPage", void 0);
CampaignPagination = __decorate([
    (0, _typeGraphql).ObjectType()
], CampaignPagination);
const generateAlgoliaCampaigns = async ({ campaigns  })=>{
    return await Promise.all(campaigns.map(async (campaign)=>{
        return _objectSpread({}, campaign, {
            objectID: campaign.id,
            members: 0,
            pending: 0
        });
    }));
};
let CampaignResolver = class CampaignResolver {
    async hellogame() {
        return "hello game";
    }
    async getCampaigns({ prisma  }) {
        const campaigns = await prisma.campaign.findMany({
            orderBy: {
                updatedAt: "desc"
            },
            include: {
                memberships: {
                    include: {
                        user: true
                    }
                },
                gameMaster: true
            }
        });
        return campaigns;
    }
    async getCampaignsPagination(cursor, limit, { prisma , res , req  }) {
        let queryResults = null;
        if (cursor) queryResults = await prisma.campaign.findMany({
            take: limit,
            skip: 1,
            cursor: {
                id: cursor
            },
            orderBy: {
                createdAt: "asc"
            }
        });
        else queryResults = await prisma.campaign.findMany({
            take: limit
        });
        if (queryResults.length > 0) {
            const lastPostInResults = queryResults[queryResults.length - 1];
            const after = lastPostInResults.id;
            const secondQueryResults = await prisma.campaign.findMany({
                take: limit,
                cursor: {
                    id: after
                },
                orderBy: {
                    createdAt: "asc"
                }
            });
            return {
                campaigns: queryResults,
                cursor: after,
                hasNextPage: secondQueryResults.length >= limit
            };
        }
        return {
            campaigns: [],
            cursor: null,
            hasNextPage: false
        };
    }
    async getCampaign(id, { prisma , res , req  }) {
        return prisma.campaign.findUnique({
            where: {
                id
            },
            include: {
                gameMaster: true,
                memberships: {
                    select: {
                        role: true,
                        user: true,
                        campaign: true,
                        application: true
                    }
                }
            }
        });
    }
    async getUserCampaign({ prisma , res , req  }) {
        console.log("user ID: ", req.session.userId);
        return prisma.campaign.findMany({
            where: {
                gameMaster: {
                    id: req.session.userId
                }
            },
            include: {
                memberships: {
                    include: {
                        user: true
                    }
                },
                gameMaster: true
            }
        });
    }
    async createCampaign(createCampaignInput, { prisma , req , theInnIndex  }) {
        try {
            const campaign = await prisma.campaign.create({
                data: _objectSpread({}, createCampaignInput, {
                    gameMaster: {
                        connect: {
                            id: req.session.userId
                        }
                    },
                    memberships: {
                        create: {
                            role: _membershipRole.MembershipRole.GM,
                            userId: req.session.userId
                        }
                    }
                }),
                include: {
                    memberships: true
                }
            });
            const players = campaign.memberships.filter((member)=>member.role === _membershipRole.MembershipRole.PLAYER
            );
            await theInnIndex.saveObject(_objectSpread({}, campaign, {
                objectID: campaign.id,
                members: players.length,
                pending: 0
            }));
            return Object.assign(new _campaign.Campaign(), campaign);
        } catch (err) {
            console.log("err: ", err);
            throw err;
        }
    }
    async updateCampaign(createCampaignInput, campaignId, { prisma , req , theInnIndex  }) {
        try {
            const campaign = await prisma.campaign.update({
                where: {
                    id: campaignId
                },
                data: _objectSpread({}, createCampaignInput)
            });
            await theInnIndex.saveObject(_objectSpread({}, campaign, {
                objectID: campaign.id
            }));
            return Object.assign(new _campaign.Campaign(), campaign);
        } catch (err) {
            console.log("err: ", err);
            throw err;
        }
    }
    async deactivateCampaign(campaignId, { prisma , req , theInnIndex  }) {
        try {
            await prisma.campaign.update({
                where: {
                    id: campaignId
                },
                data: {
                    isActive: false
                }
            });
            await theInnIndex.partialUpdateObject({
                isActive: false,
                objectID: campaignId
            });
            return true;
        } catch (err) {
            console.log("err: ", err);
            throw err;
        }
    }
    async deleteCampaign(campaignId, { prisma , req , theInnIndex  }) {
        try {
            await prisma.campaign.deleteMany({
                where: {
                    id: campaignId,
                    gameMaster: {
                        id: req.session.userId
                    }
                }
            });
            await theInnIndex.deleteObject(campaignId);
            return true;
        } catch (err) {
            console.log("err: ", err);
            throw err;
        }
    }
    async addCampaignPlayer(addPlayerCampaignInput, { prisma , res , req  }) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.session.userId
                }
            });
            const userMembership = await prisma.membership.create({
                data: {
                    role: _membershipRole.MembershipRole.PLAYER,
                    campaignId: addPlayerCampaignInput.campaignId,
                    userId: user.id
                },
                include: {
                    campaign: true,
                    user: true
                }
            });
            if (userMembership) {
                const foundCampaign = await prisma.campaign.findUnique({
                    where: {
                        id: addPlayerCampaignInput.campaignId
                    },
                    include: {
                        memberships: {
                            select: {
                                campaign: true,
                                role: true,
                                user: true
                            }
                        },
                        gameMaster: true
                    }
                });
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
            upload_preset: "the_inn_campaign",
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
    (0, _typeGraphql).Query(()=>CampaignPagination
    ),
    __param(0, (0, _typeGraphql).Arg("cursor", {
        nullable: true
    })),
    __param(1, (0, _typeGraphql).Arg("limit", {
        defaultValue: 4
    })),
    __param(2, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
        Number,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "getCampaignsPagination", null);
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
    (0, _typeGraphql).Query(()=>[
            _campaign.Campaign
        ]
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "getUserCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateCampaignResult
    ),
    __param(0, (0, _typeGraphql).Arg("createCampaignInput")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _createCampaignInput.CreateCampaignInput === "undefined" ? Object : _createCampaignInput.CreateCampaignInput,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "createCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateCampaignResult
    ),
    __param(0, (0, _typeGraphql).Arg("createCampaignInput")),
    __param(1, (0, _typeGraphql).Arg("campaignId")),
    __param(2, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _createCampaignInput.CreateCampaignInput === "undefined" ? Object : _createCampaignInput.CreateCampaignInput,
        String,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "updateCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>Boolean
    ),
    __param(0, (0, _typeGraphql).Arg("campaignId")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "deactivateCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>Boolean
    ),
    __param(0, (0, _typeGraphql).Arg("campaignId")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], CampaignResolver.prototype, "deleteCampaign", null);
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