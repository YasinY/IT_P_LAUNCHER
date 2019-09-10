import BrowserWindow = Electron.BrowserWindow;
import IpcMain = Electron.IpcMain;
import {LoginEmitListener} from "./impl/LoginEmitListener";
import {RenderEmitListener} from "./impl/RenderEmitListener";
import {EmitListener} from "./EmitListener";


export class EmitListenerHandler {

    private readonly registeredListeners: Array<EmitListener>;

    private ipcMain: IpcMain;
    private readonly currentWindow: BrowserWindow;

    constructor(ipcMain: IpcMain, currentWindow : BrowserWindow) {
        this.registeredListeners = new Array<EmitListener>();
        this.ipcMain = ipcMain;
        this.currentWindow = currentWindow;
    }

    //TODO use this with type decorators, it didnt work before..
    initialise(): void {
        this.registeredListeners.push(new LoginEmitListener(this.currentWindow), new RenderEmitListener(this.currentWindow))
         this.registeredListeners.forEach(listener => {
            this.ipcMain.on(listener.getEmitTrigger(), listener.onEmit())
         })
    }

    getRegisteredListener(trigger : string) : EmitListener {
        return this.registeredListeners.find((element) => element.getEmitTrigger().toLowerCase() === trigger.toLowerCase())
    }

    getRegisteredListeners(): Array<EmitListener> {
        return this.registeredListeners;
    }
}

