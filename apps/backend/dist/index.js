"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prisma = void 0;
require("reflect-metadata");
var _constants = require("./constants");
var _typeGraphql = require("type-graphql");
var _client = require("@prisma/client");
var _user = require("./resolvers/user");
var _campaign = require("./resolvers/campaign");
var _review = require("./resolvers/review");
var _express = _interopRequireDefault(require("express"));
var _ioredis = _interopRequireDefault(require("ioredis"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectRedis = _interopRequireDefault(require("connect-redis"));
var _apolloServerExpress = require("apollo-server-express");
var _apolloServerCore = require("apollo-server-core");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const prisma = new _client.PrismaClient({
    log: [
        "query"
    ]
});
exports.prisma = prisma;
const startServer = async ()=>{
    const PORT = 4000;
    const app = module.exports = (0, _express).default();
    const RedisStore = (0, _connectRedis).default(_expressSession.default);
    const redis = new _ioredis.default({
        host: "redis-13673.c56.east-us.azure.cloud.redislabs.com",
        port: 13673,
        password: "QUVqyaYtox5FMjk5bbXLUrqwUm4es2ux"
    });
    app.use((0, _cors).default({
        origin: [
            "http://localhost:3000",
            "https://the-inn-graphql.vercel.app/",
            "https://the-inn-server.herokuapp.com/",
            "https://the-inn.herokuapp.com/", 
        ],
        credentials: true
    }));
    const sessionMiddleware = (0, _expressSession).default({
        name: _constants.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: _constants.__prod__
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false
    });
    app.use(sessionMiddleware);
    const apolloServer = new _apolloServerExpress.ApolloServer({
        schema: await (0, _typeGraphql).buildSchema({
            resolvers: [
                _user.UserResolver,
                _campaign.CampaignResolver,
                _review.ReviewResolver
            ],
            validate: false
        }),
        context: async ({ req , res  })=>{
            return {
                prisma,
                req,
                res
            };
        },
        plugins: [
            (0, _apolloServerCore).ApolloServerPluginLandingPageGraphQLPlayground()
        ],
        introspection: true
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.listen(PORT, ()=>{
        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
startServer().catch((err)=>{
    console.error(err);
});

//# sourceMappingURL=index.js.map