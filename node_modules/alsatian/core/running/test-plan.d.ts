import { TestSet } from "../test-set";
import { TestItem } from "./test-item";
export declare class TestPlan {
    private _testItems;
    readonly testItems: TestItem[];
    constructor(testSet: TestSet);
}
