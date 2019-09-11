/// <reference types="node" />
import { Readable as ReadableStream } from "stream";
import { ITestFixture } from "./_interfaces";
import { TestCaseResult } from "./results";
export declare class TestOutputStream extends ReadableStream {
    _read(): void;
    end(): void;
    emitVersion(): void;
    emitPlan(testCount: number): void;
    emitFixture(fixture: ITestFixture): void;
    emitResult(testId: number, result: TestCaseResult): void;
    private _writeOut;
    private _emitPass;
    private _emitSkip;
    private _emitFail;
    private _getTestDescription;
    private _writeMatchErrorOutput;
    private _writeUnhandledErrorOutput;
    private _writeFailure;
}
