"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReviewResolver = exports.CreateReviewInput = exports.CreateReviewResult = void 0;
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _review = require("../models/Review");
var _myContext = require("../typedefs/MyContext");
var _typeGraphql = require("type-graphql");
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
const CreateReviewResult = (0, _typeGraphql).createUnionType({
    name: "CreateReviewResult",
    types: ()=>[
            _review.Review,
            _fieldsValidationError.FieldsValidationError
        ]
});
exports.CreateReviewResult = CreateReviewResult;
let CreateReviewInput = class CreateReviewInput {
};
exports.CreateReviewInput = CreateReviewInput;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", Number)
], CreateReviewInput.prototype, "rating", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "comment", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "userId", void 0);
exports.CreateReviewInput = CreateReviewInput = __decorate([
    (0, _typeGraphql).InputType()
], CreateReviewInput);
let ReviewResolver = class ReviewResolver {
    async createReview(createReviewInput, { prisma , res , req  }) {
        try {
            const createdReview = await prisma.review.create({
                data: _objectSpread({}, createReviewInput),
                include: {
                    user: true
                }
            });
            return Object.assign(new _review.Review(), createdReview);
        } catch (err) {
            throw err;
        }
    }
};
exports.ReviewResolver = ReviewResolver;
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateReviewResult
    ),
    __param(0, (0, _typeGraphql).Arg("createReviewInput")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof CreateReviewInput === "undefined" ? Object : CreateReviewInput,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], ReviewResolver.prototype, "createReview", null);
exports.ReviewResolver = ReviewResolver = __decorate([
    (0, _typeGraphql).Resolver(_review.Review)
], ReviewResolver);

//# sourceMappingURL=review.js.map