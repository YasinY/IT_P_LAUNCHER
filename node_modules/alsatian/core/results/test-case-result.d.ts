import { ITest } from "../_interfaces/test.i";
import { TestOutcome } from "./test-outcome";
import { IResultWithOutcome } from "./result-with-outcome.i";
export declare class TestCaseResult implements IResultWithOutcome {
    private _test;
    private _arguments;
    private _error;
    constructor(test: ITest, testCaseArguments: Array<any>, error?: Error | null);
    readonly outcome: TestOutcome;
    readonly test: ITest;
    readonly arguments: any[];
    readonly error: Error | null;
}
