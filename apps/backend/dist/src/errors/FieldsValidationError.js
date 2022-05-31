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
var FieldsValidationError_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationError = void 0;
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("./FieldError");
const IError_1 = require("./IError");
let FieldsValidationError = FieldsValidationError_1 = class FieldsValidationError {
    constructor(data) {
        Object.assign(this, data);
    }
    static from(validationErrors) {
        return new FieldsValidationError_1({
            fieldErrors: validationErrors.map(FieldError_1.FieldError.from),
            message: "some fields are invalid",
        });
    }
};
__decorate([
    (0, type_graphql_1.Field)((t) => [FieldError_1.FieldError]),
    __metadata("design:type", Array)
], FieldsValidationError.prototype, "fieldErrors", void 0);
FieldsValidationError = FieldsValidationError_1 = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IError_1.IError }),
    __metadata("design:paramtypes", [FieldsValidationError])
], FieldsValidationError);
exports.FieldsValidationError = FieldsValidationError;
//# sourceMappingURL=FieldsValidationError.js.map