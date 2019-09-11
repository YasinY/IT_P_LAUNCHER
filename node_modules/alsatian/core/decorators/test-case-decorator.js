"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
var mark_property_as_test_1 = require("./mark-property-as-test");
function TestCase() {
    var testCaseArguments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testCaseArguments[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        unused_1.Unused(descriptor);
        mark_property_as_test_1.markPropertyAsTest(propertyKey, target);
        // check if there are test cases already associated with this test
        var testCases = Reflect.getMetadata(_metadata_keys_1.TEST_CASES, target, propertyKey);
        // if not create an empty array
        if (!testCases) {
            testCases = [];
        }
        // add the test case to the list
        testCases.unshift({
            caseArguments: testCaseArguments
        });
        // update the list of test cases
        Reflect.defineMetadata(_metadata_keys_1.TEST_CASES, testCases, target, propertyKey);
    };
}
exports.TestCase = TestCase;
//# sourceMappingURL=test-case-decorator.js.map