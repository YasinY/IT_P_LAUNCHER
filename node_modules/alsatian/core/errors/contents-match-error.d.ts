import { MatchError } from "./match-error";
export declare class ContentsMatchError extends MatchError {
    constructor(actualValue: any, expectedContent: any, shouldMatch: boolean);
}
