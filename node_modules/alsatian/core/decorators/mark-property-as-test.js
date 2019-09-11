"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
function markPropertyAsTest(propertyKey, target) {
    // check if this has been registered as a test already
    var tests = Reflect.getMetadata(_metadata_keys_1.TESTS, target);
    // if there are no tests registered yet then register it
    if (!tests) {
        tests = [
            {
                key: propertyKey
            }
        ];
        Reflect.defineMetadata(_metadata_keys_1.TESTS, tests, target);
    }
    else if (tests.filter(function (test) { return test.key === propertyKey; }).length === 0) {
        // otherwise add it to the register
        tests.push({
            key: propertyKey
        });
        Reflect.defineMetadata(_metadata_keys_1.TESTS, tests, target);
    }
}
exports.markPropertyAsTest = markPropertyAsTest;
//# sourceMappingURL=mark-property-as-test.js.map