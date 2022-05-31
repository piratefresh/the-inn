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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignResolver = exports.AddPlayerCampaignInput = exports.CreateCampaignInput = exports.CreateCampaignResult = exports.AuthResult = void 0;
const type_graphql_1 = require("type-graphql");
const FieldsValidationError_1 = require("@errors/FieldsValidationError");
const BadCredentialsError_1 = require("@errors/BadCredentialsError");
const Campaign_1 = require("@models/Campaign");
const NonExistingCampaignError_1 = require("@errors/NonExistingCampaignError");
const Experiance_1 = require("@typedefs/Experiance");
const Difficulty_1 = require("@typedefs/Difficulty");
const cloudinary_1 = require("cloudinary");
exports.AuthResult = (0, type_graphql_1.createUnionType)({
    name: "AuthResult",
    types: () => [
        Campaign_1.Campaign,
        FieldsValidationError_1.FieldsValidationError,
        NonExistingCampaignError_1.NonExistingCampaignError,
        BadCredentialsError_1.BadCredentialsError,
    ],
});
exports.CreateCampaignResult = (0, type_graphql_1.createUnionType)({
    name: "CreateCampaignResult",
    types: () => [Campaign_1.Campaign, FieldsValidationError_1.FieldsValidationError],
});
let CreateCampaignInput = class CreateCampaignInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "summary", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateCampaignInput.prototype, "isOnline", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "state", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "lat", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "lng", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateCampaignInput.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateCampaignInput.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "days", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "time_periods", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "game_system", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "max_seats", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Experiance_1.Experiance),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "experiance", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "puzzles", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "combat", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Difficulty_1.Difficulty),
    __metadata("design:type", String)
], CreateCampaignInput.prototype, "roleplay", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateCampaignInput.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateCampaignInput.prototype, "price", void 0);
CreateCampaignInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateCampaignInput);
exports.CreateCampaignInput = CreateCampaignInput;
let AddPlayerCampaignInput = class AddPlayerCampaignInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddPlayerCampaignInput.prototype, "campaignId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], AddPlayerCampaignInput.prototype, "playerIds", void 0);
AddPlayerCampaignInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddPlayerCampaignInput);
exports.AddPlayerCampaignInput = AddPlayerCampaignInput;
let ImageSignature = class ImageSignature {
};
__decorate([
    (0, type_graphql_1.Field)((_type) => String),
    __metadata("design:type", String)
], ImageSignature.prototype, "signature", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => type_graphql_1.Int),
    __metadata("design:type", Number)
], ImageSignature.prototype, "timestamp", void 0);
ImageSignature = __decorate([
    (0, type_graphql_1.ObjectType)()
], ImageSignature);
let CampaignResolver = class CampaignResolver {
    async hellogame() {
        return "hello game";
    }
    async getCampaigns({ prisma, res }) {
        return prisma.campaign.findMany({});
    }
    async getCampaign(id, { prisma, res }) {
        return prisma.campaign.findUnique({
            where: {
                id,
            },
            include: {
                game_master: true,
                players: {
                    select: {
                        user: true,
                        campaign: true,
                    },
                },
            },
        });
    }
    async createCampaign(createCampaignInput, { prisma, res, req }) {
        try {
            const campaign = await prisma.campaign.create({
                data: {
                    ...createCampaignInput,
                    gmId: req.session.userId,
                },
            });
            return Object.assign(new Campaign_1.Campaign(), campaign);
        }
        catch (err) {
            throw err;
        }
    }
    async addCampaignPlayer(addPlayerCampaignInput, { prisma, res, req }) {
        try {
            const players = await prisma.user.findMany({
                where: {
                    id: { in: addPlayerCampaignInput.playerIds },
                },
            });
            const playersArr = await players.map((player) => ({
                userId: player.id,
                campaignId: addPlayerCampaignInput.campaignId,
            }));
            const createdPlayers = await prisma.player.createMany({
                data: playersArr,
                skipDuplicates: true,
            });
            if (createdPlayers) {
                const foundCampaign = await prisma.campaign.findUnique({
                    where: {
                        id: addPlayerCampaignInput.campaignId,
                    },
                    include: {
                        players: {
                            select: {
                                user: true,
                                campaign: true,
                            },
                        },
                        game_master: true,
                    },
                });
                console.log("foundCampaign: ", foundCampaign);
                return Object.assign(new Campaign_1.Campaign(), foundCampaign);
            }
        }
        catch (err) {
            throw err;
        }
    }
    createImageSignature() {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary_1.v2.utils.api_sign_request({
            timestamp,
        }, "J3sbYn9Kz2vYmW4peAyCn2SAsMA");
        return { timestamp, signature };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "hellogame", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Campaign_1.Campaign]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "getCampaigns", null);
__decorate([
    (0, type_graphql_1.Query)(() => Campaign_1.Campaign),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "getCampaign", null);
__decorate([
    (0, type_graphql_1.Mutation)((_type) => exports.CreateCampaignResult),
    __param(0, (0, type_graphql_1.Arg)("createCampaignInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCampaignInput, Object]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "createCampaign", null);
__decorate([
    (0, type_graphql_1.Mutation)((_type) => exports.CreateCampaignResult),
    __param(0, (0, type_graphql_1.Arg)("AddPlayerCampaignInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddPlayerCampaignInput, Object]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "addCampaignPlayer", null);
__decorate([
    (0, type_graphql_1.Mutation)((_returns) => ImageSignature),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ImageSignature)
], CampaignResolver.prototype, "createImageSignature", null);
CampaignResolver = __decorate([
    (0, type_graphql_1.Resolver)(Campaign_1.Campaign)
], CampaignResolver);
exports.CampaignResolver = CampaignResolver;
//# sourceMappingURL=campaign.js.map