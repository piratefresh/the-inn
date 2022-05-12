"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExistingUserError = void 0;
var _typeGraphql = require("type-graphql");
var _ierror = require("./IError");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ExistingUserError = class ExistingUserError {
    constructor(){
        this.message = "user already exists";
    }
};
exports.ExistingUserError = ExistingUserError;
exports.ExistingUserError = ExistingUserError = __decorate([
    (0, _typeGraphql).ObjectType({
        implements: _ierror.IError
    })
], ExistingUserError);

//# sourceMappingURL=ExisitingUserError.js.map