"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_spy_1 = require("./function-spy");
var expose_spy_functions_1 = require("./expose-spy-functions");
function createFunctionSpy() {
    var functionSpy = new function_spy_1.FunctionSpy();
    var spiedFunction = functionSpy.call.bind(functionSpy);
    expose_spy_functions_1.exposeSpyFunctions(spiedFunction, functionSpy);
    return spiedFunction;
}
exports.createFunctionSpy = createFunctionSpy;
//# sourceMappingURL=create-function-spy.js.map