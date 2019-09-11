import ExtendoError from "extendo-error";
export declare class MatchError extends ExtendoError {
    protected _actual: any;
    readonly actual: any;
    protected _expected: any;
    readonly expected: any;
    constructor(message?: string, expectedValue?: any, actualValue?: any);
}
