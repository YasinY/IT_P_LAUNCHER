import { ContainerMatcher } from "./container-matcher";
/**
 * Compares strings
 */
export declare class StringMatcher extends ContainerMatcher<string, string> {
    /**
     * Checks that a value conforms to a regular expression
     * @param regex - the regular expression that the actual value should match
     */
    toMatch(regex: RegExp): void;
}
