import { FunctionSpy } from "../spying";
import { FunctionSpyMatcher } from "./";
import { Matcher } from "./matcher";
/**
 * Checks whether functions have performed as expected
 */
export declare class FunctionMatcher extends Matcher<FunctionSpy | any> {
    /**
     * Checks that a function throws an error when executed
     */
    toThrow(): void;
    toThrowAsync(): Promise<void>;
    /**
     * Checks that a function throws a specific error
     * @param errorType - the type of error that should be thrown
     * @param errorMessage - the message that the error should have
     */
    toThrowError(errorType: new (...args: Array<any>) => Error, errorMessage: string): void;
    /**
     * Checks that a function throws a specific error asynchronously
     * @param errorType - the type of error that should be thrown
     * @param errorMessage - the message that the error should have
     */
    toThrowErrorAsync(errorType: new (...args: Array<any>) => Error, errorMessage: string): Promise<void>;
    /**
     * Checks that a spy has been called
     */
    toHaveBeenCalled(): FunctionSpyMatcher;
    /**
     * Checks that a spy has been called with the specified arguments
     * @param expectedArguments - a list of arguments that the spy should have been called with
     */
    toHaveBeenCalledWith(...expectedArguments: Array<any>): FunctionSpyMatcher;
    private _callArgumentsMatch;
    private _isFunctionSpyOrSpiedOnFunction;
}
