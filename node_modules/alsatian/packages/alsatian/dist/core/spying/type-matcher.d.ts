export declare class TypeMatcher<ExpectedType extends object> {
    private _testers;
    private _type;
    readonly type: new (...args: any[]) => ExpectedType;
    constructor(type: new (...args: Array<any>) => ExpectedType);
    test(value: any): boolean;
    stringify(): string;
    thatMatches(key: string, value: any): this;
    thatMatches(properties: object): this;
    thatMatches(delegate: (argument: ExpectedType) => boolean): this;
    private _matchesKeyAndValue;
    private _matchesDelegate;
    private _matchesObjectLiteral;
}
