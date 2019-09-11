import { MixedMatcher } from "../matchers";
import { IExpect } from "./expect.i";
export declare type MatcherConstructor = new (actualValue: any) => MixedMatcher;
export declare type MatcherFunction = (actualValue: any) => MixedMatcher;
export declare function buildExpect<ExpectType extends IExpect>(expectFunction: MatcherFunction | MatcherConstructor): ExpectType;
