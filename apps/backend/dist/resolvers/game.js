"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserResolver = exports.UsernamePasswordInput = exports.CreateCampaignResult = exports.AuthResult = void 0;
var _typeGraphql = require("type-graphql");
var _myContext = require("../typedefs/MyContext");
var _exisitingUserError = require("../errors/ExisitingUserError");
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _badCredentialsError = require("../errors/BadCredentialsError");
var _campaign = require("../models/Campaign");
var _nonExistingCampaignError = require("../errors/NonExistingCampaignError");
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
            _fieldsValidationError.FieldsValidationError,
            _exisitingUserError.ExistingUserError
        ]
});
exports.CreateCampaignResult = CreateCampaignResult;
let UsernamePasswordInput = class UsernamePasswordInput {
};
exports.UsernamePasswordInput = UsernamePasswordInput;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "firstName", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "lastName", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "email", void 0);
exports.UsernamePasswordInput = UsernamePasswordInput = __decorate([
    (0, _typeGraphql).InputType()
], UsernamePasswordInput);
let UserResolver = class UserResolver {
    async hellogame() {
        return "hello game";
    }
    async getCampaigns({ prisma , res  }) {
        return prisma.campaign.findMany({});
    }
    async getCampaign({ prisma , res  }) {
        return prisma.campaign.findFirst({});
    }
    async createCampaign({ prisma , res  }) {
        console.log("making game");
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, _typeGraphql).Query(()=>String
    ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [])
], UserResolver.prototype, "hellogame", null);
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
], UserResolver.prototype, "getCampaigns", null);
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
], UserResolver.prototype, "getCampaign", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateCampaignResult
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "createCampaign", null);
exports.UserResolver = UserResolver = __decorate([
    (0, _typeGraphql).Resolver()
], UserResolver);

//# sourceMappingURL=game.js.map