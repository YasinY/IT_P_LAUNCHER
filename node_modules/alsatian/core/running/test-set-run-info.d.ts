import { TestSetResults } from "../alsatian-core";
import { TestItem } from "./test-item";
import { TestPlan } from "./test-plan";
export declare class TestSetRunInfo {
    private _testPlan;
    private _testSetResults;
    private _timeout;
    readonly timeout: number;
    readonly testPlan: TestPlan;
    readonly testSetResults: TestSetResults;
    private _testPlanItem;
    testPlanItem: TestItem;
    constructor(_testPlan: TestPlan, _testSetResults: TestSetResults, _timeout: number);
}
