import {Request} from "../Request";
import * as http from "http";
import * as https from "https";

let fs = require("fs");
export class FingerprintRequest extends Request {

    getOptions(): Object {
        return {

        };
    }

    callBack(res: http.IncomingMessage): void {

    }

}
