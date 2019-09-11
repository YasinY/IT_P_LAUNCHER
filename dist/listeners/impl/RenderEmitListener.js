"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmitListener_1 = require("../EmitListener");
var fs = require("fs");
var RenderEmitListener = /** @class */ (function (_super) {
    __extends(RenderEmitListener, _super);
    function RenderEmitListener(currentWindow) {
        return _super.call(this, currentWindow) || this;
    }
    RenderEmitListener.prototype.getEmitTrigger = function () {
        return "render";
    };
    //TODO error logging!!!
    RenderEmitListener.prototype.onEmit = function () {
        return function (event, viewName) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var path = global.relativePaths.templates + viewName + ".ejs";
            if (!fs.existsSync(path)) {
                console.log("Couldnt find view on path " + path);
                return;
            }
            //console.log("Displaying content: " + templateHtml);
        };
    };
    RenderEmitListener.prototype.getDefaultArguments = function () {
        return {};
    };
    return RenderEmitListener;
}(EmitListener_1.EmitListener));
exports.RenderEmitListener = RenderEmitListener;
//# sourceMappingURL=RenderEmitListener.js.map