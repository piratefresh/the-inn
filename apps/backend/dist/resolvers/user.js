"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserResolver = exports.UsernamePasswordInput = exports.CreateUserResult = exports.AuthResult = void 0;
var _typeGraphql = require("type-graphql");
var _argon2 = _interopRequireDefault(require("argon2"));
var _user = require("../models/User");
var _myContext = require("../typedefs/MyContext");
var _classValidator = require("class-validator");
var _setToken = require("../utils/setToken");
var _exisitingUserError = require("../errors/ExisitingUserError");
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _badCredentialsError = require("../errors/BadCredentialsError");
var _nonUserExists = require("../errors/NonUserExists");
var _runtime = require("@prisma/client/runtime");
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
const AuthResult = (0, _typeGraphql).createUnionType({
    name: "AuthResult",
    types: ()=>[
            _user.User,
            _fieldsValidationError.FieldsValidationError,
            _nonUserExists.NonExistingUserError,
            _badCredentialsError.BadCredentialsError, 
        ]
});
exports.AuthResult = AuthResult;
const CreateUserResult = (0, _typeGraphql).createUnionType({
    name: "CreateUserResult",
    types: ()=>[
            _user.User,
            _fieldsValidationError.FieldsValidationError,
            _exisitingUserError.ExistingUserError
        ]
});
exports.CreateUserResult = CreateUserResult;
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
    async helloworld() {
        return "hello world";
    }
    async getUsers({ prisma , res  }) {
        return prisma.user.findMany({});
    }
    async getUser({ prisma , res  }) {
        return prisma.user.findFirst({});
    }
    async signup(options, { prisma , res  }) {
        const errors = await (0, _classValidator).validate(options);
        if (errors.length > 0) return _fieldsValidationError.FieldsValidationError.from(errors);
        const hashedPassword = await _argon2.default.hash(options.password);
        try {
            const createdUser = await prisma.user.create({
                data: _objectSpread({}, options, {
                    experience: "Beginner",
                    password: hashedPassword
                })
            });
            await prisma.account.create({
                data: {
                    userId: createdUser.id,
                    type: "credentials",
                    provider: "Credentials",
                    providerAccountId: createdUser.id
                }
            });
            (0, _setToken).setToken(createdUser, res);
            console.log("user: ", createdUser);
            return {
                user: createdUser
            };
        } catch (err) {
            if (err instanceof _runtime.PrismaClientKnownRequestError && err.code === "P2002") {
                return new _exisitingUserError.ExistingUserError();
            } else {
                throw err;
            }
        }
    }
    async signin(usernameOrEmail, password, { prisma , res , req  }) {
        const user = await prisma.user.findUnique({
            where: {
                email: usernameOrEmail
            }
        });
        if (!user) return new _nonUserExists.NonExistingUserError();
        const authenticated = await _argon2.default.verify(user.password, password);
        if (!authenticated) return new _badCredentialsError.BadCredentialsError();
        (0, _setToken).setToken(user, res);
        req.session.userId = user.id;
        return Object.assign(new _user.User(), user);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, _typeGraphql).Query(()=>String
    ),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [])
], UserResolver.prototype, "helloworld", null);
__decorate([
    (0, _typeGraphql).Query(()=>[
            _user.User
        ]
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, _typeGraphql).Query(()=>[
            _user.User
        ]
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>CreateUserResult
    ),
    __param(0, (0, _typeGraphql).Arg("options")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof UsernamePasswordInput === "undefined" ? Object : UsernamePasswordInput,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "signup", null);
__decorate([
    (0, _typeGraphql).Mutation((_type)=>AuthResult
    ),
    __param(0, (0, _typeGraphql).Arg("usernameOrEmail")),
    __param(1, (0, _typeGraphql).Arg("password")),
    __param(2, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
        String,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "signin", null);
exports.UserResolver = UserResolver = __decorate([
    (0, _typeGraphql).Resolver()
], UserResolver);

//# sourceMappingURL=user.js.map