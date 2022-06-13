"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = void 0;
var _typeGraphql = require("type-graphql");
var _campaign = require("./Campaign");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.ID
    ),
    __metadata("design:type", String)
], Item.prototype, "id", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            String
        ]
    ),
    __metadata("design:type", Array)
], Item.prototype, "stats", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Item.prototype, "sell_price", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Float
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], Item.prototype, "buy_price", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>[
            _campaign.Campaign
        ]
    ),
    __metadata("design:type", Array)
], Item.prototype, "Campaign", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], Item.prototype, "campaignId", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Item.prototype, "createdAt", void 0);
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Item.prototype, "updatedAt", void 0);
exports.Item = Item = __decorate([
    (0, _typeGraphql).ObjectType()
], Item);

//# sourceMappingURL=Item.js.map