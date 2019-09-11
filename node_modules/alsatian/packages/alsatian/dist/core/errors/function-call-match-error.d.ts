import { FunctionSpy } from "../spying";
import { MatchError } from "./match-error";
export declare class FunctionCallMatchError extends MatchError {
    constructor(actualValue: FunctionSpy, shouldMatch: boolean, args?: Array<any>);
}
