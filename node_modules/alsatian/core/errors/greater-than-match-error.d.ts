import { MatchError } from "./match-error";
export declare class GreaterThanMatchError extends MatchError {
    constructor(actualValue: number, lowerLimit: number, shouldMatch: boolean);
}
