import { ITest, ITestFixture } from "./_interfaces";
export declare class TestFixture implements ITestFixture {
    fixture: {
        [id: string]: (...args: Array<any>) => any;
    };
    ignored: boolean;
    ignoreReason: string;
    focussed: boolean;
    description: string;
    private _tests;
    readonly tests: ITest[];
    constructor(description: string);
    addTest(test: ITest): void;
}
