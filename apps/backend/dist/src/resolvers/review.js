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
exports.ReviewResolver = exports.CreateReviewInput = exports.CreateReviewResult = void 0;
const FieldsValidationError_1 = require("@errors/FieldsValidationError");
const Review_1 = require("@models/Review");
const type_graphql_1 = require("type-graphql");
exports.CreateReviewResult = (0, type_graphql_1.createUnionType)({
    name: "CreateReviewResult",
    types: () => [Review_1.Review, FieldsValidationError_1.FieldsValidationError],
});
let CreateReviewInput = class CreateReviewInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateReviewInput.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "userId", void 0);
CreateReviewInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateReviewInput);
exports.CreateReviewInput = CreateReviewInput;
let ReviewResolver = class ReviewResolver {
    async createReview(createReviewInput, { prisma, res, req }) {
        try {
            const createdReview = await prisma.review.create({
                data: {
                    ...createReviewInput,
                },
                include: {
                    user: true,
                },
            });
            return Object.assign(new Review_1.Review(), createdReview);
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((_type) => exports.CreateReviewResult),
    __param(0, (0, type_graphql_1.Arg)("createReviewInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReviewInput, Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "createReview", null);
ReviewResolver = __decorate([
    (0, type_graphql_1.Resolver)(Review_1.Review)
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.js.map