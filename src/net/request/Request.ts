import {RequestDestination} from "./RequestDestination";
import * as https from "https";
import {RequestOptions} from "https";
import * as http from "http";
import {TLSSocket} from "tls";
import * as fs from "fs";
import {Paths} from "../../Paths";
import {ApplicationEnvironment} from "../../application/ApplicationEnvironment";

export abstract class Request {


    readonly CERT_PATH: string = Paths.CONFIGS + 'client.crt';
    readonly KEY_PATH: string = Paths.CONFIGS + 'clientprivate.key';
    readonly PASS_PHRASE: string = 'pEkEkE';

    readonly serverFingerprint: string;
    readonly requestDestination: RequestDestination;
    readonly method: string;

    public constructor(requestDestination: RequestDestination, method: string) {
        this.requestDestination = requestDestination;
        this.method = method;
        this.serverFingerprint = "62:84:D5:13:10:9A:15:F0:D7:8E:61:BE:68:92:86:97:74:25:19:44";
    }

    protected abstract callBack(res: http.IncomingMessage): void;

    public getOptions(): Object {
        return {};
    };

    public getAllOptions(): RequestOptions {
        return {
            hostname: this.requestDestination.url,
            port: this.requestDestination.port,
            method: this.method,
            agent: new https.Agent({
                maxCachedSessions: 0
            }),
            cert: fs.readFileSync(this.CERT_PATH),
            key: fs.readFileSync(this.KEY_PATH),
            passphrase: this.PASS_PHRASE,
            rejectUnauthorized: false,
            ...this.getOptions()
        }
    }


    public prepareRequest(): Promise<http.ClientRequest> {
        return new Promise((resolve, reject) => {
            if (this.requestDestination.url === null) {
                reject(new Error("Request destination url should not be null."))
                return;
            }
            if (this.requestDestination.port === null) {
                reject(new Error("Request destination port should not be null."))
                return;
            }
            if (this.requestDestination.url.length === 0) {
                reject(new Error("Request destination url is not set."));
                return;
            }
            if (this.requestDestination.port < 0) {
                reject(new Error("Request destination port is not set."));
                return;
            }
            let request = this.initialiseRequest();
            this.establishRequest(request);
            resolve();
        })
    }

    private establishRequest(request: http.ClientRequest): void{
            request.on('socket', (socket: TLSSocket) => {
                socket.on('secureConnect', () => {
                    let fingerPrint = socket.getPeerCertificate().fingerprint;
                    if (ApplicationEnvironment.isNotDev()) {
                        if (!socket.authorized) {
                            console.error("Socket is not authorized. Ignore this message if this happens on dev.")

                            return;
                        }
                        if (fingerPrint.localeCompare(this.serverFingerprint) !== 0) {
                            throw new Error("Server is not verifiable! " + fingerPrint + " -> " + this.serverFingerprint)
                        }
                    }
                    request.end();
                })
            });
            request.once('error', (error: Error) => {
                throw error;
            })
    }

    initialiseRequest(): http.ClientRequest {
        return https.request(this.getAllOptions(), this.callBack);
    }


    public perform(): void {
        throw new Error("You can not use perform on the parent");
    }

}
