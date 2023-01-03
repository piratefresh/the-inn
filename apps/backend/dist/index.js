"use strict";
require("reflect-metadata");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _typeGraphql = require("type-graphql");
var _http = require("http");
var _client = require("@prisma/client");
var _user = require("./resolvers/user");
var _campaign = require("./resolvers/campaign");
var _review = require("./resolvers/review");
var _counter = require("./resolvers/counter");
var _privateMessage = require("./resolvers/privateMessage");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _server = require("@apollo/server");
var _schema = require("@graphql-tools/schema");
var _ws = _interopRequireWildcard(require("ws"));
var _ws1 = require("graphql-ws/lib/use/ws");
var _drainHttpServer = require("@apollo/server/plugin/drainHttpServer");
var _default = require("@apollo/server/plugin/landingPage/default");
var _express4 = require("@apollo/server/express4");
var _bodyParser = _interopRequireWildcard(require("body-parser"));
var _ablyPubsub = _interopRequireDefault(require("ablyPubsub"));
var _notification = require("./resolvers/notification");
var _redis = require("services/redis");
var _sessionConfig = require("middlewares/sessionConfig");
var _algoliasearch = _interopRequireDefault(require("algoliasearch"));
var _application = require("./resolvers/application");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
_dotenv.default.config();
const prisma = new _client.PrismaClient();
const algoliaClient = (0, _algoliasearch).default(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const theInnIndex = algoliaClient.initIndex("dev_campaigns");
const pubsub = new _ablyPubsub.default({
    key: process.env.ABLY_API_KEY
});
const startServer = async ()=>{
    const PORT = 4000;
    const app = (0, _express).default();
    const { typeDefs , resolvers  } = await (0, _typeGraphql).buildTypeDefsAndResolvers({
        resolvers: [
            _user.UserResolver,
            _campaign.CampaignResolver,
            _review.ReviewResolver,
            _counter.CounterResolver,
            _privateMessage.PrivateMessageResolver,
            _notification.NotificationResolver,
            _application.ApplicationResolver, 
        ],
        pubSub: pubsub
    });
    const schema = (0, _schema).makeExecutableSchema({
        typeDefs,
        resolvers
    });
    app.set("trust proxy", 1);
    app.use((0, _cors).default({
        origin: [
            "http://localhost:3001",
            "http://localhost:4000",
            "http://localhost:4000/graphql",
            "https://the-inn-graphql.vercel.app/",
            "https://the-inn-server.herokuapp.com/",
            "https://the-inn.herokuapp.com/", 
        ],
        credentials: true
    }));
    app.use(_sessionConfig.sessionMiddleware);
    app.set("port", 3000);
    const httpServer = (0, _http).createServer(app);
    const WebSocketServer = _ws.default.Server || _ws.WebSocketServer;
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql"
    });
    const serverCleanup = (0, _ws1).useServer({
        schema,
        context: ({ extra  })=>({
                req: extra.request,
                prisma,
                theInnIndex
            })
        ,
        onConnect: ({ extra  })=>{
            (0, _sessionConfig).sessionMiddleware(extra.request, {}, ()=>{});
        }
    }, wsServer);
    const server = new _server.ApolloServer({
        schema,
        introspection: true,
        csrfPrevention: true,
        plugins: [
            (0, _default).ApolloServerPluginLandingPageLocalDefault({
                includeCookies: true
            }),
            (0, _drainHttpServer).ApolloServerPluginDrainHttpServer({
                httpServer
            }),
            {
                async serverWillStart () {
                    return {
                        async drainServer () {
                            await serverCleanup.dispose();
                        }
                    };
                }
            }, 
        ]
    });
    await server.start();
    app.use("/graphql", (0, _cors).default({
        origin: [
            "http://localhost:3001",
            "http://localhost:4000",
            "http://localhost:4000/graphql",
            "https://the-inn-graphql.vercel.app/",
            "https://the-inn-server.herokuapp.com/",
            "https://the-inn.herokuapp.com/", 
        ],
        credentials: true
    }), _bodyParser.default.json(), (0, _bodyParser).urlencoded({
        extended: false
    }), (0, _express4).expressMiddleware(server, {
        context: async ({ req , res  })=>{
            return {
                prisma,
                req,
                res,
                redis: _redis.redis,
                theInnIndex
            };
        }
    }));
    httpServer.listen(PORT, ()=>{
        console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
    });
    _redis.redis.on("error", function(err) {
        console.log("Could not establish a connection with redis. " + err);
    });
    _redis.redis.on("connect", function(err) {
        console.log("Connected to redis successfully");
    });
};
startServer().catch((err)=>{
    console.error(err);
});

//# sourceMappingURL=index.js.map