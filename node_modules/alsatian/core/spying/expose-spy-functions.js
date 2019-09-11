"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exposeSpyFunctions(spiedFunction, functionSpy) {
    // expose spy's calls on function
    spiedFunction.calls = functionSpy.calls;
    // expose spy's callsWithArguments on function
    spiedFunction.callsWithArguments = functionSpy.callsWithArguments;
    // expose spy's andReturn on function
    spiedFunction.andReturn = functionSpy.andReturn.bind(functionSpy);
    // expose spy's andCall on function
    spiedFunction.andCall = functionSpy.andCall.bind(functionSpy);
}
exports.exposeSpyFunctions = exposeSpyFunctions;
//# sourceMappingURL=expose-spy-functions.js.map