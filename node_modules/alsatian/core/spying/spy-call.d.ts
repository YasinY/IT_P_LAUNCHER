import { ISpyCall } from "../_interfaces";
export declare class SpyCall implements ISpyCall {
    readonly args: any[];
    private _args;
    constructor(args: Array<any>);
    allArgumentsMatch(...expectedArguments: Array<any>): boolean;
    private _argumentIsAsExpected;
}
