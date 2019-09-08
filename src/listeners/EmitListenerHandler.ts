import BrowserWindow = Electron.BrowserWindow;
import IpcMain = Electron.IpcMain;
import {LoginEmitListener} from "./impl/LoginEmitListener";


export class EmitListenerHandler {

    registeredListeners: Array<IEmitListener>;

    ipcMain: IpcMain;
    currentWindow: BrowserWindow;

    constructor(ipcMain: IpcMain, currentWindow : BrowserWindow) {
        this.registeredListeners = new Array<IEmitListener>();
        this.ipcMain = ipcMain;
        this.currentWindow = currentWindow;
    }

    //TODO use this with type decorators, it didnt work before..
    initialise() {
        this.registeredListeners.push(new LoginEmitListener())

         this.registeredListeners.forEach(listener => {
            this.ipcMain.on(listener.getEmitTrigger(), listener.onEmit(this.currentWindow))
         })
    }
}

