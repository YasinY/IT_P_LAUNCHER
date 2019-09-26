export class RequestDestination {
    public static readonly LOGIN_SERVER = new RequestDestination('localhost', 8443);
    public static readonly FILE_SERVER = new RequestDestination('localhost', 8444);
    public static readonly STATISTICS_SERVER = new RequestDestination('localhost', 8445);

    public constructor(private readonly urlIdentifier: string, private readonly portIdentifier: number) {
        this.urlIdentifier = urlIdentifier;
        this.portIdentifier = portIdentifier;
    }

    public get url(): string {
        return this.urlIdentifier;
    }

    public get port(): number {
        return this.portIdentifier;
    }

}

