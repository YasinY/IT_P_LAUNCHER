import BrowserWindow = Electron.BrowserWindow;
import {Constructor} from "alsatian/core/_interfaces";

export abstract class EmitListener {

    public abstract getEmitTrigger() : string;
    public abstract onEmit(currentWindow : BrowserWindow): Function;
}
