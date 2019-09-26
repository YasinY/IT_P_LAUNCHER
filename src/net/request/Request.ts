export namespace Requests {
    export abstract class Request {
        readonly requestDestination: RequestDestination;

        readonly method: string;

        constructor(requestDestination: RequestDestination, method: string) {
            this.requestDestination = requestDestination;
            this.method = method;

        }

        private getAllOptions(): Object {
            return {
                hostname: RequestDestination.urlify(this.requestDestination),
                method: this.method,
                ...this.getOptions()
            }
        }

        getOptions(): Object {
            return {};
        };

        abstract prepareCall(): void;

    }
}
