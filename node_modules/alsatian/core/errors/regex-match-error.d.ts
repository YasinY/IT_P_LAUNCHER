import { MatchError } from "./match-error";
export declare class RegexMatchError extends MatchError {
    constructor(actualValue: any, expectedRegex: RegExp, shouldMatch: boolean);
}
