import { TypeMatcher } from "../spying";
export declare function Any<ExpectedType extends object>(type: new (...args: Array<any>) => ExpectedType): TypeMatcher<ExpectedType>;
