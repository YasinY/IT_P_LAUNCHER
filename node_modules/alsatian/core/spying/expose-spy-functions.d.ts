import { FunctionSpy } from "./function-spy";
import { ISpiedFunction } from "./spied-function.i";
export declare function exposeSpyFunctions<ArgumentType, ReturnType>(spiedFunction: ISpiedFunction<ArgumentType, ReturnType>, functionSpy: FunctionSpy): void;
