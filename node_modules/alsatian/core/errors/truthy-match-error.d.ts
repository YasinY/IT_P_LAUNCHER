import { MatchError } from "./match-error";
export declare class TruthyMatchError extends MatchError {
    constructor(actualValue: any, shouldMatch: boolean);
}
