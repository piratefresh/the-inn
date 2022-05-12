"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IError = void 0;
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
let IError = class IError {
};
exports.IError = IError;
__decorate([
    (0, _typeGraphql).Field(),
    __metadata("design:type", String)
], IError.prototype, "message", void 0);
exports.IError = IError = __decorate([
    (0, _typeGraphql).InterfaceType()
], IError);

//# sourceMappingURL=IError.js.map