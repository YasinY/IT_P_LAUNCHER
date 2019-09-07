import BrowserWindow = Electron.BrowserWindow;
import IpcMain = Electron.IpcMain;
import {EmitListener} from "./EmitListener";

export class EmitListenerHandler {

    registeredListeners: Array<EmitListener> = [];
    ipcMain: IpcMain;
    currentWindow: BrowserWindow;

    //TODO null check
    constructor(ipcMain: IpcMain, currentWindow : BrowserWindow) {
        console.log("Starting!")
        this.ipcMain = ipcMain;
        this.currentWindow = currentWindow;
    }

    initialise() {
        this.registeredListeners.forEach(listener => {
           console.log("Got one listener, yeh!! " + listener)
           this.ipcMain.on(listener.getEmitTrigger(), listener.onEmit(this.currentWindow))
        })
    }

    getRegisteredListeners(): Array<EmitListener> {
        return this.registeredListeners;
    }

}
export namespace EmitListenerHandler {
    type Constructor<T> = {
        new(...args: any[]): T;
        readonly prototype: T;
    }

    export function register<T extends Constructor<EmitListener>>(registeringClass: T) {
        this.registeredListeners.push(registeringClass);
        return registeringClass;
    }
}
