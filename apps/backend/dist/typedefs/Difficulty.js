"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Difficulty = void 0;
var _typeGraphql = require("type-graphql");
var Difficulty;
exports.Difficulty = Difficulty;
(function(Difficulty) {
    Difficulty["Low"] = "Low";
    Difficulty["Medium"] = "Medium";
    Difficulty["High"] = "High";
    Difficulty["Any"] = "Any";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
(0, _typeGraphql).registerEnumType(Difficulty, {
    name: 'Difficulty'
});

//# sourceMappingURL=Difficulty.js.map