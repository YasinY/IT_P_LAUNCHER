export declare class AlsatianCliOptions {
    private _fileGlobs;
    readonly fileGlobs: Array<string>;
    private _timeout;
    readonly timeout: number | null;
    private _tap;
    readonly tap: boolean;
    private _versionRequested;
    readonly versionRequested: boolean;
    private _helpRequested;
    readonly helpRequested: boolean;
    constructor(args: Array<string>);
    private _extractFileGlobs;
    private _isInvalidTimeoutValue;
    private _extractTimeout;
    private _extractTap;
    private _extractVersionRequested;
    private _extractHelpRequested;
    private _getArgumentIndexFromArgumentList;
    private _getArgumentValueFromArgumentList;
}
