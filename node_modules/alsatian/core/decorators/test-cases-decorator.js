"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
var mark_property_as_test_1 = require("./mark-property-as-test");
function GetTestCases(caseArguments) {
    if (null === caseArguments || undefined === caseArguments) {
        return [];
    }
    if (caseArguments instanceof Function) {
        return GetTestCases(caseArguments());
    }
    if (caseArguments instanceof Array) {
        return caseArguments.slice();
    }
    else {
        return Array.from(caseArguments);
    }
}
function TestCases(caseArguments) {
    return function (target, propertyKey, descriptor) {
        unused_1.Unused(descriptor);
        mark_property_as_test_1.markPropertyAsTest(propertyKey, target);
        var testCases = GetTestCases(caseArguments).reduce(function (acc, val) {
            // add the test case to the list
            return acc.concat([
                {
                    caseArguments: val
                }
            ]);
        }, Reflect.getMetadata(_metadata_keys_1.TEST_CASES, target, propertyKey) || []);
        // update the list of test cases
        Reflect.defineMetadata(_metadata_keys_1.TEST_CASES, testCases, target, propertyKey);
    };
}
exports.TestCases = TestCases;
//# sourceMappingURL=test-cases-decorator.js.map