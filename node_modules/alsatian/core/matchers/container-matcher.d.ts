import { EmptyMatcher } from "./empty-matcher";
/**
 * Compares container types e.g. string and Array
 */
export declare class ContainerMatcher<ContainerType, ContentType> extends EmptyMatcher<ContainerType> {
    /**
     * Checks that a string contains another string or an array contains a specific item
     * @param expectedContent - the string or array item that the value should contain
     */
    toContain(expectedContent: ContentType): void;
    private _isValidContainer;
}
