import { ITestFixture } from "../_interfaces/test-fixture.i";
import { ITest } from "../_interfaces/test.i";
import { TestOutcome } from "./test-outcome";
import { TestResults } from "./test-results";
import { IResultWithOutcome } from "./result-with-outcome.i";
export declare class TestFixtureResults implements IResultWithOutcome {
    private _testFixture;
    private _testResults;
    readonly testResults: TestResults[];
    constructor(_testFixture: ITestFixture);
    readonly fixture: ITestFixture;
    readonly outcome: TestOutcome;
    addTestResult(test: ITest): TestResults;
}
