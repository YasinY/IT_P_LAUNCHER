import { Matcher } from "./matcher";
/**
 * Compares numbers
 */
export declare class NumberMatcher extends Matcher<number> {
    /**
     * Checks that a number is less than a given limit
     * @param upperLimit - the number that the number under test should be less than
     */
    toBeLessThan(upperLimit: number): void;
    /**
     * Checks that a number is greater than a given limit
     * @param lowerLimit - the number that the number under test should be greater than
     */
    toBeGreaterThan(lowerLimit: number): void;
    private _validateValues;
}
