import { FunctionSpy } from "../spying";
import { FunctionSpyCallCountMatcher } from "./";
export declare class FunctionSpyMatcher {
    private _spy;
    private _expectedArguments;
    constructor(spy: FunctionSpy, expectedArguments?: Array<any>);
    exactly(expectedCallCount: number): FunctionSpyCallCountMatcher;
    anythingBut(unexpectedCallCount: number): FunctionSpyCallCountMatcher;
    greaterThan(minimumCallCount: number): FunctionSpyCallCountMatcher;
    lessThan(maximumCallCount: number): FunctionSpyCallCountMatcher;
    private _validateCallCount;
    private _matchingCallsCount;
    private _matchingArguments;
    private _throwCallCountError;
}
