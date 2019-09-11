import { MatchError } from "./match-error";
export declare class ExactMatchError extends MatchError {
    constructor(actualValue: any, expectedValue: any, shouldMatch: boolean);
}
