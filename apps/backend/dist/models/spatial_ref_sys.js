"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.spatial_ref_sys = void 0;
var _typeGraphql = require("type-graphql");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let spatial_ref_sys = class spatial_ref_sys {
};
exports.spatial_ref_sys = spatial_ref_sys;
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    ),
    __metadata("design:type", Number)
], spatial_ref_sys.prototype, "srid", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], spatial_ref_sys.prototype, "auth_name", void 0);
__decorate([
    (0, _typeGraphql).Field((_type)=>_typeGraphql.Int
    , {
        nullable: true
    }),
    __metadata("design:type", Number)
], spatial_ref_sys.prototype, "auth_srid", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], spatial_ref_sys.prototype, "srtext", void 0);
__decorate([
    (0, _typeGraphql).Field({
        nullable: true
    }),
    __metadata("design:type", String)
], spatial_ref_sys.prototype, "proj4text", void 0);
exports.spatial_ref_sys = spatial_ref_sys = __decorate([
    (0, _typeGraphql).ObjectType()
], spatial_ref_sys);

//# sourceMappingURL=spatial_ref_sys.js.map