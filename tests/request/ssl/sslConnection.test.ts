import {Request} from "../../../src/net/request/Request";
import {RequestDestination} from "../../../src/net/request/RequestDestination";

// @ts-ignore
let https = require("https");

let testRequest: TestRequest = null;


export class TestRequest extends Request {

    constructor(requestDirection: RequestDestination, method: string) {
        super(requestDirection, method);
    }

    protected callBack(res: any): void {

    }

    public getOptions(): Object {
        return {...super.getOptions(), exampleRequest: 'test'};
    }
}

describe.each([
    [null, 0],
    ["", null],
    ['localhost', -2],
    ['', 3030],
    ['yay', 30],
])('Expecting url "%s" with port "%i" to be saved in request destination instance', (url: string, port: number) => {
    let testRequest: TestRequest = null;
    beforeAll(() => {
        testRequest = new TestRequest(new RequestDestination(url, port), "GET");
    })
    if (url == null) {
        test("Promise returns reject when url is null", () => {
            let promise = testRequest.prepareRequest();
            expect(promise).rejects.toEqual(Error("Request destination url should not be null."))
        })
    }
    if (port == null) {
        test("Promise returns reject when port is null", () => {
            let promise = testRequest.prepareRequest();
            expect(promise).rejects.toEqual(Error("Request destination port should not be null."))
        })
    }
    if (url != null && port != null) {
        if (url.length == 0) {
            test("Promise rejects when url has length of 0", () => {
                let promise = testRequest.prepareRequest();
                expect(promise).rejects.toEqual(Error("Request destination url is not set."))
            })
        }
        if (port < 0) {
            test("Promise rejects when port is 0", () => {
                let promise = testRequest.prepareRequest();
                expect(promise).rejects.toEqual(Error("Request destination port is not set."))
            })
        }
    }
    if (port >= 0 && url != null && url != "") {
        test("Expecting the promise to not reject", () => {
            if (testRequest.requestDestination.url.length != 0 && !(testRequest.requestDestination.port < 0)) {
                let promise = testRequest.prepareRequest();
                expect(promise).resolves.toBeCalled();
            }
        });
    }
})

test("Options should have set hostname, port, http method, a https agent and defined options", () => {
    let destination: string = "localhost";
    let port: number = 900;
    let method: string = "GET";
    testRequest = new TestRequest(new RequestDestination(destination, port), method);
    expect(JSON.stringify(testRequest.getAllOptions())).toStrictEqual(JSON.stringify({
        hostname: destination,
        port: port,
        method: method,
        agent: new https.Agent({maxCachedSessions: 0}),
        exampleRequest: 'test'
    }));
});

test("Server fingerprint is initialised and correct on constructing instance", () => {
    testRequest = new TestRequest(new RequestDestination("localhost", 900), "GET");
    expect(testRequest.serverFingerprint).toBe("62:84:D5:13:10:9A:15:F0:D7:8E:61:BE:68:92:86:97:74:25:19:44")
})

test("getOptions should return nothing else but <K,V> <exampleRequest, 'test'> (assuming Request getOptions() is empty!)", () => {
    testRequest = new TestRequest(new RequestDestination("localhost", 900), "GET");
    expect(testRequest.getOptions()).toEqual({exampleRequest: 'test'})
})