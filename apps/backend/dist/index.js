"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("reflect-metadata");
const constants_1 = require("./constants");
const http_1 = require("http");
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const user_1 = require("./resolvers/user");
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
exports.prisma = new client_1.PrismaClient({
    log: ["query"],
});
const startServer = async () => {
    const PORT = 4000;
    const app = (module.exports = (0, express_1.default)());
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default({
        host: "theinn.redis.cache.windows.net",
        port: 6380,
        password: "xpkqdr9nlXOUBVCXkrMbHihzDvVitpQaJAzCaIve6YY=",
        tls: true,
    });
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://the-inn-graphql.vercel.app/"],
        credentials: true,
    }));
    const sessionMiddleware = (0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
    });
    app.use(sessionMiddleware);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: false,
        }),
        context: async ({ req, res }) => {
            return {
                prisma: exports.prisma,
                req,
                res,
            };
        },
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
startServer().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map