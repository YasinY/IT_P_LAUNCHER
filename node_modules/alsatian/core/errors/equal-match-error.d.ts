import { MatchError } from "./match-error";
export declare class EqualMatchError extends MatchError {
    constructor(actualValue: any, expectedValue: any, shouldMatch: boolean);
}
