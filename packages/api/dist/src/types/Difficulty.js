"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Difficulty = void 0;
const type_graphql_1 = require("type-graphql");
var Difficulty;
(function (Difficulty) {
    Difficulty["Low"] = "Low";
    Difficulty["Medium"] = "Medium";
    Difficulty["High"] = "High";
    Difficulty["Any"] = "Any";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
(0, type_graphql_1.registerEnumType)(Difficulty, {
    name: 'Difficulty',
});
//# sourceMappingURL=Difficulty.js.map