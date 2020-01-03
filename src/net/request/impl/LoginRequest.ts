import {RequestDestination} from "../RequestDestination";
import {Request} from "../Request";
import * as http from "http";
import {Paths} from "../../../Paths";

let fs = require("fs");

export class LoginRequest extends Request {

    readonly CERT_PATH : string = Paths.CONFIGS + 'client.crt';
    readonly KEY_PATH : string = Paths.CONFIGS + 'clientprivate.key';
    readonly PASS_PHRASE : string = 'pEkEkE';

    constructor() {
        super(RequestDestination.LOGIN_SERVER, "GET");
    }

    getOptions(): Object {
        return {
            path: '/hello',
            //ca: fs.readFileSync(global.relativePaths.config + 'rootCA.crt'),
            cert: fs.readFileSync(this.CERT_PATH),
            key: fs.readFileSync(this.KEY_PATH),
            passphrase: this.PASS_PHRASE,
            rejectUnauthorized: true,
            requestCert: true,
        };
    }

    protected callBack(res: http.IncomingMessage): void {
        console.log(res.statusCode)
        res.on('error', (error) => {
            console.log(error);
        })
        res.on('data', (data) => {
            console.log("Data: " + data)
            return data;
        });
    }

    public perform(): void {
        let request : Promise<http.ClientRequest> = this.performRequest();
        request.then((request) => {
            console.log("Connected!")
            request.write("nice", "UTF-8", () => {
                console.error("I love this!");
            })
        }).catch((error) => {
            console.log("Got error :[ " + error)
        })
    }


}

