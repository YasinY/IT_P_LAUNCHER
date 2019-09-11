"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
function FocusTests(constructor) {
    // mark test class as focussed
    Reflect.defineMetadata(_metadata_keys_1.FOCUS, true, constructor);
}
exports.FocusTests = FocusTests;
//# sourceMappingURL=focus-tests-decorator.js.map