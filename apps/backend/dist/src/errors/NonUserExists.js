"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonExistingUserError = void 0;
const type_graphql_1 = require("type-graphql");
const IError_1 = require("./IError");
let NonExistingUserError = class NonExistingUserError {
    constructor() {
        this.message = "user doesn't exist";
    }
};
NonExistingUserError = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IError_1.IError })
], NonExistingUserError);
exports.NonExistingUserError = NonExistingUserError;
//# sourceMappingURL=NonUserExists.js.map