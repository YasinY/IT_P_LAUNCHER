import { ITest, ITestCase, ITestFixture } from "../_interfaces";
export declare class TestItem {
    private _testCase;
    readonly testCase: ITestCase;
    private _test;
    readonly test: ITest;
    private _testFixture;
    readonly testFixture: ITestFixture;
    constructor(testFixture: ITestFixture, test: ITest, testCase: ITestCase);
    run(timeout: number): Promise<void>;
    private _runTest;
    private _execute;
    private _setup;
    private _teardown;
    private _runFunctionsByMetaDataKey;
    private _runFunctionFromMetadata;
}
