import handleBar = require("handlebars");
import fs = require("fs");


class RenderEmitListener implements IEmitListener {

    getEmitTrigger(): string {
        return "render";
    }

    //TODO error logging!!!
    onEmit(currentWindow: Electron.BrowserWindow): Function {
        return (event: any, viewName: string, ... args: object[]) => {
            let charset = "UTF-8";
            let path = global.relativePaths.templates + viewName + ".html";
            if (!fs.existsSync(path)) {
                alert("Couldn't find view on path " + path);
                return;
            }
            let viewContent = fs.readFileSync(path, charset);
            let template = handleBar.compile(viewContent);

            //currentWindow.exec(path)
        };
    }

}
