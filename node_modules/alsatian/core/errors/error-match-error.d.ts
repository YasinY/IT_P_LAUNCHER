import { MatchError } from "./match-error";
export declare class ErrorMatchError extends MatchError {
    constructor(actualError: Error | null, shouldMatch: boolean, expectedErrorType?: new (...args: Array<any>) => Error, expectedErrorMessage?: string);
    private _setErrorMessage;
    private _setWrongSpecificErrorMessage;
    private _setWrongMessageMessage;
    private _setWrongMessageAndTypeMessage;
    private _setWrongTypeMessage;
}
