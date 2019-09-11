import { MatchError } from "./match-error";
export declare class LessThanMatchError extends MatchError {
    constructor(actualValue: number, upperLimit: number, shouldMatch: boolean);
}
