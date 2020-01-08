export class RequestResponse {

    private readonly body: string;

    constructor(body: string) {
        this.body = body;
    }


    public getBody(): string {
        return this.body;
    }
}
