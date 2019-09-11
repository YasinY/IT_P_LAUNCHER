"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var __1 = require("../");
var _metadata_keys_1 = require("./_metadata-keys");
function TestFixture(description) {
    return function (constructor) {
        // create data about the test fixture
        // with the description either being the
        // given string or the class name
        var testFixtureMetadata = new __1.TestFixture(description || constructor.name);
        // attach meta data to the class
        Reflect.defineMetadata(_metadata_keys_1.TEST_FIXTURE, testFixtureMetadata, constructor);
    };
}
exports.TestFixture = TestFixture;
//# sourceMappingURL=test-fixture-decorator.js.map