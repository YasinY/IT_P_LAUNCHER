import { MatchError } from "./match-error";
export declare class PropertySetMatchError extends MatchError {
    constructor(actualValue: any, shouldMatch: boolean, value?: any);
    private _stringifyArguments;
}
