/**
 * Gives functionality to ensure the outcome of a test is as expected
 */
export declare class Matcher<T> {
    private _actualValue;
    protected readonly actualValue: T;
    private _shouldMatch;
    protected readonly shouldMatch: boolean;
    constructor(actualValue: T);
    /**
     * Any subsequent matcher function will be looking for the opposite criteria
     */
    readonly not: this;
    /**
     * Checks that a value is identical to another
     * @param expectedValue - the value that will be used to match
     */
    toBe(expectedValue: T): void;
    /**
     * Checks that a value is equal to another (for objects the function will check for deep equality)
     * @param expectedValue - the value that will be used to match
     */
    toEqual(expectedValue: any): void;
    /**
     * Checks that a value is not undefined
     */
    toBeDefined(): void;
    /**
     * Checks that a value is null
     */
    toBeNull(): void;
    /**
     * Checks that a value is equivalent to boolean true
     */
    toBeTruthy(): void;
    private _checkBuffersAreEqual;
    private _checkObjectsAreDeepEqual;
    private _isBufferable;
}
