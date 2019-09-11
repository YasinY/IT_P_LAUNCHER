import "reflect-metadata";
import { TestOutputStream, TestSet } from "../alsatian-core";
import { IOnTestCompleteCBFunction } from "../events";
export declare class TestRunner {
    private _onTestCompleteCBs;
    private _outputStream;
    readonly outputStream: TestOutputStream;
    constructor(outputStream?: TestOutputStream);
    run(testSet: TestSet, timeout?: number | null): Promise<void>;
    /**
     * Defined the call back function to be called when the test is completed
     */
    onTestComplete(testCompleteCB: IOnTestCompleteCBFunction): void;
    private _runTests;
    private _getTestFixtures;
    private _getTestItemResult;
    private _setupFixture;
    private _teardownFixture;
    private _runFixtureFunctions;
}
