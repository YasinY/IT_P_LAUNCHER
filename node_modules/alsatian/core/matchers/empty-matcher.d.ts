import { Matcher } from "./matcher";
/**
 * Compares types that can be empty e.g. string, object and Array
 */
export declare class EmptyMatcher<T> extends Matcher<T> {
    /**
     * Checks that an array is empty, a string is empty, or an object literal has no properties
     */
    toBeEmpty(): void;
}
