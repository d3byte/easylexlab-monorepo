"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var helper = {};

// Generate an array of random indexes
// taking length of passed array accounted

helper.randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

exports.default = helper;
//# sourceMappingURL=helperFunctions.js.map