import {EmitListener} from "../EmitListener";
import BrowserWindow = Electron.BrowserWindow;

export class RenderEmitListener extends EmitListener {

    constructor(currentWindow: BrowserWindow) {
        super(currentWindow);
    }

    getEmitTrigger(): string {
        return "render";
    }

    //TODO error logging!!!
    onEmit(): Function {
        return (event: any, viewName: string, ...args: object[]) => {
            console.log("Displaying content ...");
        };
    }

    getDefaultArguments(): {} {
        return {};
    }

}
