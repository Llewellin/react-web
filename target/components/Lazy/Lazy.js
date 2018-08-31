"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        return _super.call(this, props) || this;
    }
    default_1.prototype.componentDidMount = function () {
        console.log('this.props', this.props);
        this.props.getLazy();
    };
    default_1.prototype.render = function () {
        return React.createElement("div", null, "Lazy component");
    };
    return default_1;
}(React.Component));
exports.default = default_1;
//# sourceMappingURL=Lazy.js.map