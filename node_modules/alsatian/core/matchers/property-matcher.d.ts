import { PropertySpy } from "../spying";
import { Matcher } from "./matcher";
/**
 * Checks whether properties have performed as expected
 */
export declare class PropertyMatcher<PropertyType> extends Matcher<PropertySpy<PropertyType>> {
    /**
     * Checks that a property spy has been set
     */
    toHaveBeenSet(): void;
    /**
     * Checks that a property spy has been set to a specific value
     * @param value - a value to which the property should be set to
     */
    toHaveBeenSetTo(value: any): void;
}
