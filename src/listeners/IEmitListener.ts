import BrowserWindow = Electron.BrowserWindow;

interface IEmitListener {
    getEmitTrigger(): string;

    onEmit(currentWindow: BrowserWindow): Function;
}
