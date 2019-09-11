"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
function IgnoreTest(reason) {
    return function (target, propertyKey, descriptor) {
        unused_1.Unused(descriptor);
        // mark test method as ignored
        Reflect.defineMetadata(_metadata_keys_1.IGNORE, true, target, propertyKey);
        // add the reason
        Reflect.defineMetadata(_metadata_keys_1.IGNORE_REASON, reason, target, propertyKey);
    };
}
exports.IgnoreTest = IgnoreTest;
//# sourceMappingURL=ignore-test-decorator.js.map