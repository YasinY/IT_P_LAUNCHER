import BrowserWindow = Electron.BrowserWindow;

export abstract class EmitListener {

    protected readonly currentWindow: BrowserWindow;


    public constructor(currentWindow: BrowserWindow) {
        this.currentWindow = currentWindow;
    }

    public abstract getEmitTrigger(): string;

    public abstract onEmit(): Function;


    getCurrentWindow(): BrowserWindow {
        return this.currentWindow;
    }
}
