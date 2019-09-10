import {EmitListener} from "../EmitListener";

import fs = require("fs");
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
        return (event: any, viewName: string, ... args: object[]) => {
            let path = global.relativePaths.templates + viewName + ".ejs";
            if (!fs.existsSync(path)) {
                console.log("Couldnt find view on path " + path);
                return;
            }
            //console.log("Displaying content: " + templateHtml);
        };
    }

    getDefaultArguments(): {} {
        return {};
    }

}
