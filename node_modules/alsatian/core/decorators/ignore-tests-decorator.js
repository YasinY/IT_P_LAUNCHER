"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
function IgnoreTests(reason) {
    return function (constructor) {
        // mark test class as ignored
        Reflect.defineMetadata(_metadata_keys_1.IGNORE, true, constructor);
        Reflect.defineMetadata(_metadata_keys_1.IGNORE_REASON, reason, constructor);
    };
}
exports.IgnoreTests = IgnoreTests;
//# sourceMappingURL=ignore-tests-decorator.js.map