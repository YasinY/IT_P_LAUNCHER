"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
function FocusTest(target, propertyKey, descriptor) {
    unused_1.Unused(descriptor);
    // mark test method as focussed
    Reflect.defineMetadata(_metadata_keys_1.FOCUS, true, target, propertyKey);
}
exports.FocusTest = FocusTest;
//# sourceMappingURL=focus-test-decorator.js.map