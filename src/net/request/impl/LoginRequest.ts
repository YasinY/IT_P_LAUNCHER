import {RequestDestination} from "../RequestDestination";
import {Request} from "../Request";
import * as http from "http";
import {once} from "cluster";
import {Paths} from "../../../Paths";

let fs = require("fs");

export class LoginRequest extends Request {

    constructor() {
        super(RequestDestination.LOGIN_SERVER, "GET");
    }

    getOptions(): Object {
        return {
            path: '/',
            //ca: fs.readFileSync(global.relativePaths.config + 'rootCA.crt'),
            cert: fs.readFileSync(Paths.CONFIGS + 'client.crt'),
            key: fs.readFileSync(Paths.CONFIGS + 'clientprivate.key'),
            passphrase: 'pEkEkE',
            rejectUnauthorized: false,
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
        let request = this.performRequest();
        request.then((request) => {
            console.log("Connected!")
            request.end();
        }).catch((error) => {
            console.log("Got error :[ " + error)
        })
    }


}

