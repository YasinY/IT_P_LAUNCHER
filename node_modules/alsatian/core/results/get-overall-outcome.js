"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_outcome_1 = require("./test-outcome");
function getOverallOutcome(results) {
    var outcomes = results.map(function (result) { return result.outcome; });
    if (outcomesContains(outcomes, test_outcome_1.TestOutcome.Error)) {
        return test_outcome_1.TestOutcome.Error;
    }
    if (outcomesContains(outcomes, test_outcome_1.TestOutcome.Fail)) {
        return test_outcome_1.TestOutcome.Fail;
    }
    if (outcomesContains(outcomes, test_outcome_1.TestOutcome.Pass)) {
        return test_outcome_1.TestOutcome.Pass;
    }
    return test_outcome_1.TestOutcome.Skip;
}
exports.getOverallOutcome = getOverallOutcome;
function outcomesContains(outcomes, outcome) {
    return outcomes.some(function (o) { return o === outcome; });
}
//# sourceMappingURL=get-overall-outcome.js.map