"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var INITIAL_STATE = {
    test: 123,
};
exports.default = (function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case constants_1.GET_LAZY:
            return __assign({}, state, { test: 456 });
        default:
            return state;
    }
});
//# sourceMappingURL=reducer.js.map