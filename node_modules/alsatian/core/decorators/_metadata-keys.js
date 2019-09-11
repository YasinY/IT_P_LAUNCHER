"use strict";
// currently typing these values to string as literal causes
// backwards compatibility issues consider replacing when support
// for TypeScript < 2.1 is dropped
// see:  https://github.com/alsatian-test/alsatian/issues/251
// also: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes
//       #literal-types-are-inferred-by-default-for-const-variables-and-readonly-properties
Object.defineProperty(exports, "__esModule", { value: true });
var TEST_FIXTURE = "alsatian:test-fixture";
exports.TEST_FIXTURE = TEST_FIXTURE;
var TESTS = "alsatian:tests";
exports.TESTS = TESTS;
var FOCUS = "alsatian:focus";
exports.FOCUS = FOCUS;
var IGNORE = "alsatian:ignore";
exports.IGNORE = IGNORE;
var IGNORE_REASON = "alsatian:ignore-reason";
exports.IGNORE_REASON = IGNORE_REASON;
var SETUP = "alsatian:setup";
exports.SETUP = SETUP;
var SETUP_FIXTURE = "alsatian:setup-fixture";
exports.SETUP_FIXTURE = SETUP_FIXTURE;
var TEARDOWN = "alsatian:teardown";
exports.TEARDOWN = TEARDOWN;
var TEARDOWN_FIXTURE = "alsatian:teardown-fixture";
exports.TEARDOWN_FIXTURE = TEARDOWN_FIXTURE;
var TEST_CASES = "alsatian:testcases";
exports.TEST_CASES = TEST_CASES;
var TIMEOUT = "alsatian:timeout";
exports.TIMEOUT = TIMEOUT;
//# sourceMappingURL=_metadata-keys.js.map