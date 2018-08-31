"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.getLazy = function () {
    return axios_1.default.get('https://httpbin.org/get');
};
//# sourceMappingURL=api.js.map