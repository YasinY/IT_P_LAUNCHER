import { MatchError } from "./match-error";
export declare class EmptyMatchError extends MatchError {
    constructor(actualValue: any, shouldMatch: boolean);
}
