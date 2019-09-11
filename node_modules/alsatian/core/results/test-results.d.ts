import { ITest } from "../_interfaces/test.i";
import { TestCaseResult } from "./test-case-result";
import { TestOutcome } from "./test-outcome";
import { IResultWithOutcome } from "./result-with-outcome.i";
export declare class TestResults implements IResultWithOutcome {
    private _test;
    private _testCaseResults;
    constructor(_test: ITest);
    readonly test: ITest;
    readonly outcome: TestOutcome;
    addTestCaseResult(args: Array<any>, error?: Error | null): TestCaseResult;
}
