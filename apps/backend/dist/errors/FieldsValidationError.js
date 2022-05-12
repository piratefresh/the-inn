"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FieldsValidationError = void 0;
var _typeGraphql = require("type-graphql");
var _fieldError = require("./FieldError");
var _ierror = require("./IError");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let FieldsValidationError = class FieldsValidationError {
    static from(validationErrors) {
        return new FieldsValidationError({
            fieldErrors: validationErrors.map(_fieldError.FieldError.from),
            message: "some fields are invalid"
        });
    }
    constructor(data){
        Object.assign(this, data);
    }
};
exports.FieldsValidationError = FieldsValidationError;
__decorate([
    (0, _typeGraphql).Field((t)=>[
            _fieldError.FieldError
        ]
    ),
    __metadata("design:type", Array)
], FieldsValidationError.prototype, "fieldErrors", void 0);
exports.FieldsValidationError = FieldsValidationError = __decorate([
    (0, _typeGraphql).ObjectType({
        implements: _ierror.IError
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        Object
    ])
], FieldsValidationError);

//# sourceMappingURL=FieldsValidationError.js.map