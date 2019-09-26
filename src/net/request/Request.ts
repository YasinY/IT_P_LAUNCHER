import {RequestDestination} from "./RequestDestination";
import * as https from "https";
import {RequestOptions} from "https";
import * as http from "http";
import {TLSSocket} from "tls";
import {Paths} from "../../Paths";

export abstract class Request {

    readonly serverFingerprint: string;
    readonly requestDestination: RequestDestination;

    readonly method: string;

    public constructor(requestDestination: RequestDestination, method: string) {
        this.requestDestination = requestDestination;
        this.method = method;
        this.serverFingerprint = "62:84:D5:13:10:9A:15:F0:D7:8E:61:BE:68:92:86:97:74:25:19:44";
    }

    protected abstract callBack(res: http.IncomingMessage): void;

    protected getOptions(): Object {
        return {};
    };

    protected getAllOptions(): RequestOptions {
        return {
            hostname: this.requestDestination.url,
            port: this.requestDestination.port,
            method: this.method,
            agent: new https.Agent({
                maxCachedSessions: 0
            }),
            ...this.getOptions()
        }
    }


    public performRequest(): Promise<http.ClientRequest> {
        return new Promise((resolve, reject) => {
            if (this.requestDestination === null) {
                reject(new Error("Request destination is null."));
                return;
            }
            if (this.requestDestination.url.length === 0) {
                reject(new Error("Request destination url is not set"));
                return;
            }
            if (this.requestDestination.port < 0) {
                reject(new Error("Request destination port is not set."));
                return;
            }
            console.log("Doing request..")
            let request = https.request(this.getAllOptions(), this.callBack);
            request.on('socket', (socket: TLSSocket) => {
                socket.on('secureConnect', () => {
                    let fingerPrint = socket.getPeerCertificate().fingerprint;
                    console.log("Fingerprint of server: " + fingerPrint);
                    if (!socket.authorized) {
                        console.error("Socket is not authorized. Please make sure you're on " + process.env.toString())
                        //reject(socket.authorizationError)
                    }
                    if(fingerPrint.localeCompare(this.serverFingerprint) !== 0) {
                        reject(new Error("Server is not verifiable! " + fingerPrint + " -> " + this.serverFingerprint));
                    }
                    console.log("Secure connect completed!");
                    resolve(request);
                })
            });
            request.once('error', (error: Error) => {
                reject(error)
            })
        })
        // return https.request(this.getAllOptions(), this.callBack());
    }

    public perform(): void {
        throw new Error("You can not use perform on the parent");
    }

}
