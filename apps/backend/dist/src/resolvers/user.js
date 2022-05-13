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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = exports.UsernamePasswordInput = exports.CreateUserResult = exports.AuthResult = void 0;
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("@models/User");
const class_validator_1 = require("class-validator");
const setToken_1 = require("@utils/setToken");
const ExisitingUserError_1 = require("@errors/ExisitingUserError");
const FieldsValidationError_1 = require("@errors/FieldsValidationError");
const BadCredentialsError_1 = require("@errors/BadCredentialsError");
const NonUserExists_1 = require("@errors/NonUserExists");
const runtime_1 = require("@prisma/client/runtime");
exports.AuthResult = (0, type_graphql_1.createUnionType)({
    name: "AuthResult",
    types: () => [
        User_1.User,
        FieldsValidationError_1.FieldsValidationError,
        NonUserExists_1.NonExistingUserError,
        BadCredentialsError_1.BadCredentialsError,
    ],
});
exports.CreateUserResult = (0, type_graphql_1.createUnionType)({
    name: "CreateUserResult",
    types: () => [User_1.User, FieldsValidationError_1.FieldsValidationError, ExisitingUserError_1.ExistingUserError],
});
let UsernamePasswordInput = class UsernamePasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "email", void 0);
UsernamePasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], UsernamePasswordInput);
exports.UsernamePasswordInput = UsernamePasswordInput;
let UserResolver = class UserResolver {
    async helloworld() {
        return "hello world";
    }
    async getUsers({ prisma, res }) {
        return prisma.user.findMany({});
    }
    async getUser({ prisma, res }) {
        return prisma.user.findFirst({});
    }
    async signup(options, { prisma, res }) {
        const errors = await (0, class_validator_1.validate)(options);
        if (errors.length > 0)
            return FieldsValidationError_1.FieldsValidationError.from(errors);
        const hashedPassword = await argon2_1.default.hash(options.password);
        try {
            const createdUser = await prisma.user.create({
                data: {
                    ...options,
                    experience: "Beginner",
                    password: hashedPassword,
                },
            });
            await prisma.account.create({
                data: {
                    userId: createdUser.id,
                    type: "credentials",
                    provider: "Credentials",
                    providerAccountId: createdUser.id,
                },
            });
            (0, setToken_1.setToken)(createdUser, res);
            console.log("user: ", createdUser);
            return {
                user: createdUser,
            };
        }
        catch (err) {
            if (err instanceof runtime_1.PrismaClientKnownRequestError &&
                err.code === "P2002") {
                return new ExisitingUserError_1.ExistingUserError();
            }
            else {
                throw err;
            }
        }
    }
    async signin(usernameOrEmail, password, { prisma, res, req }) {
        const user = await prisma.user.findUnique({
            where: {
                email: usernameOrEmail,
            },
        });
        if (!user)
            return new NonUserExists_1.NonExistingUserError();
        const authenticated = await argon2_1.default.verify(user.password, password);
        if (!authenticated)
            return new BadCredentialsError_1.BadCredentialsError();
        (0, setToken_1.setToken)(user, res);
        req.session.userId = user.id;
        console.log(user);
        return Object.assign(new User_1.User(), user);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "helloworld", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((_type) => exports.CreateUserResult),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    (0, type_graphql_1.Mutation)((_type) => exports.AuthResult),
    __param(0, (0, type_graphql_1.Arg)("usernameOrEmail")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signin", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map