import { SpyCallCountType } from "../matchers";
import { FunctionSpy } from "../spying";
import { MatchError } from "./match-error";
export declare class FunctionCallCountMatchError extends MatchError {
    private static _bulidMessage;
    private static _buildExpectedValue;
    private static _buildActualValue;
    constructor(actualValue: FunctionSpy, shouldMatch: boolean, expectedCallCount: number, countType: SpyCallCountType, args?: Array<any>);
}
