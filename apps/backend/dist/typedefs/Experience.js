"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Experience = void 0;
var _typeGraphql = require("type-graphql");
var Experience;
exports.Experience = Experience;
(function(Experience) {
    Experience["Beginner"] = "Beginner";
    Experience["Advanced"] = "Advanced";
    Experience["All"] = "All";
})(Experience || (exports.Experience = Experience = {}));
(0, _typeGraphql).registerEnumType(Experience, {
    name: 'Experience'
});

//# sourceMappingURL=Experience.js.map