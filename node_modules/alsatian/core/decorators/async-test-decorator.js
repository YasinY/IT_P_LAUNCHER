"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
var mark_property_as_test_1 = require("./mark-property-as-test");
function AsyncTest(description) {
    return function (target, propertyKey, descriptor) {
        unused_1.Unused(descriptor);
        // check if this has been registered as a test already
        mark_property_as_test_1.markPropertyAsTest(propertyKey, target);
        // get tests
        var tests = Reflect.getMetadata(_metadata_keys_1.TESTS, target);
        // mark it as async and add the description
        var testDefinition = tests.filter(function (test) { return test.key === propertyKey; })[0];
        testDefinition.isAsync = true;
        testDefinition.description = description;
        // update the register
        Reflect.defineMetadata(_metadata_keys_1.TESTS, tests, target);
    };
}
exports.AsyncTest = AsyncTest;
//# sourceMappingURL=async-test-decorator.js.map