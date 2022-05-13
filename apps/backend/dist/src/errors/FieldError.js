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
var FieldError_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldError = void 0;
const type_graphql_1 = require("type-graphql");
const IError_1 = require("./IError");
let FieldError = FieldError_1 = class FieldError {
    constructor(data) {
        Object.assign(this, data);
    }
    static from(validationError) {
        return new FieldError_1({
            path: validationError.property,
            message: Object.values(validationError.constraints)[0],
        });
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "path", void 0);
FieldError = FieldError_1 = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IError_1.IError }),
    __metadata("design:paramtypes", [FieldError])
], FieldError);
exports.FieldError = FieldError;
//# sourceMappingURL=FieldError.js.map