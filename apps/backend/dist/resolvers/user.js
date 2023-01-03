"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserResolver = exports.UserConnection = exports.UserEdge = exports.UsernamePasswordInput = exports.UpdatePasswordArgs = exports.UpdateProfileArgs = exports.PaginationArgs = exports.CreateUserResult = exports.AuthResult = void 0;
var _typeGraphql = require("type-graphql");
var _argon2 = _interopRequireDefault(require("argon2"));
var _user = require("../models/User");
var _myContext = require("../typedefs/MyContext");
var _classValidator = require("class-validator");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _setToken = require("../utils/setToken");
var _exisitingUserError = require("../errors/ExisitingUserError");
var _fieldsValidationError = require("../errors/FieldsValidationError");
var _badCredentialsError = require("../errors/BadCredentialsError");
var _nonUserExists = require("../errors/NonUserExists");
var _runtime = require("@prisma/client/runtime");
var _sendEmailUtils = require("../utils/sendEmailUtils");
var _prismaRelayCursorConnection = require("@devoxa/prisma-relay-cursor-connection");
var _typegraphqlRelayConnections = require("typegraphql-relay-connections");
var _pageInfo = require("../typedefs/relay/PageInfo");
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
let PaginationArgs = class PaginationArgs {
};
exports.PaginationArgs = PaginationArgs;
__decorate([
    (0, _typeGraphql).Field((type)=>_typeGraphql.Int
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "skip", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], PaginationArgs.prototype, "after", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], PaginationArgs.prototype, "before", void 0);
__decorate([
    (0, _typeGraphql).Field((type)=>_typeGraphql.Int
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "first", void 0);
__decorate([
    (0, _typeGraphql).Field((type)=>_typeGraphql.Int
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], PaginationArgs.prototype, "last", void 0);
exports.PaginationArgs = PaginationArgs = __decorate([
    (0, _typeGraphql).ArgsType()
], PaginationArgs);
let UpdateProfileArgs = class UpdateProfileArgs {
};
exports.UpdateProfileArgs = UpdateProfileArgs;
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "firstName", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "lastName", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "imageUrl", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "email", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "aboutMe", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "htmlAboutMe", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "playStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "htmlPlayStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "gmStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "htmlGmStyle", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "facebook", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "discord", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "twitch", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "twitter", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdateProfileArgs.prototype, "youtube", void 0);
__decorate([
    (0, _typeGraphql).Field(()=>[
            String
        ]
    , {
        nullable: true
    }),
    __metadata("design:type", Array)
], UpdateProfileArgs.prototype, "tags", void 0);
exports.UpdateProfileArgs = UpdateProfileArgs = __decorate([
    (0, _typeGraphql).InputType()
], UpdateProfileArgs);
let UpdatePasswordArgs = class UpdatePasswordArgs {
};
exports.UpdatePasswordArgs = UpdatePasswordArgs;
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdatePasswordArgs.prototype, "oldPassword", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], UpdatePasswordArgs.prototype, "newPassword", void 0);
exports.UpdatePasswordArgs = UpdatePasswordArgs = __decorate([
    (0, _typeGraphql).InputType()
], UpdatePasswordArgs);
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
let UserEdge = class UserEdge extends (0, _typegraphqlRelayConnections).EdgeType(_user.User) {
};
exports.UserEdge = UserEdge;
exports.UserEdge = UserEdge = __decorate([
    (0, _typeGraphql).ObjectType()
], UserEdge);
let UserConnection = class UserConnection {
};
exports.UserConnection = UserConnection;
__decorate([
    (0, _typeGraphql).Field((type)=>[
            UserEdge
        ]
    ),
    __metadata("design:type", Array)
], UserConnection.prototype, "edges", void 0);
__decorate([
    (0, _typeGraphql).Field((type)=>_pageInfo.PageInfo
    ),
    __metadata("design:type", typeof _pageInfo.PageInfo === "undefined" ? Object : _pageInfo.PageInfo)
], UserConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, _typeGraphql).Field((type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], UserConnection.prototype, "totalCount", void 0);
exports.UserConnection = UserConnection = __decorate([
    (0, _typeGraphql).ObjectType()
], UserConnection);
let UserResolver = class UserResolver {
    async helloworld({ prisma , req , res , pusher  }) {
        pusher.trigger("my-channel", "my-event", {
            message: "hello world"
        });
        const userInfo = await prisma.user.findUnique({
            where: {
                id: req.session.userId
            }
        });
        const user = {
            id: req.session.userId,
            user_info: _objectSpread({}, userInfo),
            watchlist: [
                "another_id_1",
                "another_id_2"
            ]
        };
        const authResponse = pusher.authenticateUser(req.session.userId, user);
        return `hello world ${authResponse}`;
    }
    async me({ req  }) {
        return req.session.userId;
    }
    async getUsers({ prisma  }, { skip , after , before , first , last  }) {
        const result = await (0, _prismaRelayCursorConnection).findManyCursorConnection((args)=>prisma.user.findMany(_objectSpread({}, args, {
                include: {
                    hosted: true,
                    memberships: true,
                    reviews: true
                }
            }))
        , ()=>prisma.user.count()
        , {
            first,
            after
        });
        return result;
    }
    async getOnlineUsers({ prisma , pusher  }, username, message) {
        pusher.trigger("presence-awesome", "message_sent", {
            username,
            message
        });
        return prisma.user.findMany({});
    }
    async subscription(ctx) {
        return "something";
    }
    async getUsersById(playerIds, { prisma , res  }) {
        return prisma.user.findMany({
            where: {
                id: {
                    in: playerIds
                }
            }
        });
    }
    async getUser(id, { prisma , res  }) {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async signup(options, { prisma , res , req  }) {
        const errors = await (0, _classValidator).validate(options);
        if (errors.length > 0) return _fieldsValidationError.FieldsValidationError.from(errors);
        const hashedPassword = await _argon2.default.hash(options.password);
        try {
            const user = await prisma.user.create({
                data: _objectSpread({}, options, {
                    experience: "Beginner",
                    password: hashedPassword
                })
            });
            await prisma.account.create({
                data: {
                    userId: user.id,
                    type: "credentials",
                    provider: "Credentials",
                    providerAccountId: user.id
                }
            });
            const token = await (0, _sendEmailUtils).issueToken(user.id, prisma);
            await (0, _sendEmailUtils).sendConfirmationEmail(user.email, token);
            (0, _setToken).setToken(user, res);
            req.session.userId = user.id;
            return Object.assign(new _user.User(), user);
        } catch (err) {
            console.log("err: ", err);
            if (err instanceof _runtime.PrismaClientKnownRequestError && err.code === "P2002") {
                return new _exisitingUserError.ExistingUserError();
            } else {
                throw err;
            }
        }
    }
    async signin(usernameOrEmail, password, { prisma , res , req  }) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: usernameOrEmail
                },
                include: {
                    accounts: true
                }
            });
            const refreshToken = (0, _setToken).createRefreshToken(user);
            const decoded = _jsonwebtoken.default.verify(refreshToken, process.env.JWT_SECRET_KEY);
            await prisma.account.upsert({
                where: {
                    provider_providerAccountId_userId: {
                        userId: user.id,
                        provider: "Credentials",
                        providerAccountId: user.id
                    }
                },
                create: {
                    userId: user.id,
                    type: "credentials",
                    provider: "Credentials",
                    providerAccountId: user.id
                },
                update: {
                    refreshToken,
                    expiresAt: decoded.accessTokenExpires
                }
            });
            if (!user) return new _nonUserExists.NonExistingUserError();
            const authenticated = await _argon2.default.verify(user.password, password);
            if (!authenticated) return new _badCredentialsError.BadCredentialsError();
            (0, _setToken).setToken(user, res);
            req.session.userId = await user.id;
            return Object.assign(new _user.User(), user);
        } catch (err) {
            console.log("err: ", err);
        }
    }
    signout({ req , res  }) {
        return new Promise((resolve)=>req.session.destroy((err)=>{
                res.clearCookie(process.env.JWT_COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }
    async updateUserProfile(updateProfileArgs, { prisma , req  }) {
        const userId = req.session.userId;
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: _objectSpread({}, updateProfileArgs)
        });
    }
    async updateUserPassword(updatePasswordArgs, { prisma , req  }) {
        const userId = req.session.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (updatePasswordArgs.oldPassword) {
            const verifyOldPassword = await _argon2.default.verify(user.password, updatePasswordArgs.oldPassword);
            if (verifyOldPassword) {
                return await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        password: updatePasswordArgs.newPassword
                    }
                });
            } else {
                throw "Old password is wrong";
            }
        }
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, _typeGraphql).Query(()=>String
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "helloworld", null);
__decorate([
    (0, _typeGraphql).Query(()=>String
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "me", null);
__decorate([
    (0, _typeGraphql).Query(()=>UserConnection
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __param(1, (0, _typeGraphql).Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext,
        typeof PaginationArgs === "undefined" ? Object : PaginationArgs
    ])
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, _typeGraphql).Query(()=>[
            _user.User
        ]
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __param(1, (0, _typeGraphql).Arg("username")),
    __param(2, (0, _typeGraphql).Arg("message")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext,
        String,
        String
    ])
], UserResolver.prototype, "getOnlineUsers", null);
__decorate([
    (0, _typeGraphql).Subscription(()=>String
    , {
        topics: "MESSAGES"
    }),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        Object
    ])
], UserResolver.prototype, "subscription", null);
__decorate([
    (0, _typeGraphql).Query(()=>[
            _user.User
        ]
    ),
    __param(0, (0, _typeGraphql).Arg("playerIds", ()=>[
            String
        ]
    )),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        Array,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "getUsersById", null);
__decorate([
    (0, _typeGraphql).Query(()=>_user.User
    ),
    __param(0, (0, _typeGraphql).Arg("id")),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        String,
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
__decorate([
    (0, _typeGraphql).Mutation(()=>Boolean
    ),
    __param(0, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "signout", null);
__decorate([
    (0, _typeGraphql).Mutation(()=>_user.User
    ),
    __param(0, (0, _typeGraphql).Arg("updateProfileArgs", {
        nullable: true
    })),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof UpdateProfileArgs === "undefined" ? Object : UpdateProfileArgs,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "updateUserProfile", null);
__decorate([
    (0, _typeGraphql).Mutation(()=>_user.User
    ),
    __param(0, (0, _typeGraphql).Arg("updatePasswordArgs", {
        nullable: true
    })),
    __param(1, (0, _typeGraphql).Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        typeof UpdatePasswordArgs === "undefined" ? Object : UpdatePasswordArgs,
        typeof _myContext.MyContext === "undefined" ? Object : _myContext.MyContext
    ])
], UserResolver.prototype, "updateUserPassword", null);
exports.UserResolver = UserResolver = __decorate([
    (0, _typeGraphql).Resolver()
], UserResolver);

//# sourceMappingURL=user.js.map