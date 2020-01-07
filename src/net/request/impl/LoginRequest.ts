import {RequestDestination} from "../RequestDestination";
import {Request} from "../Request";
import * as http from "http";
import {LoginResponse} from "../../response/LoginResponse";

const {ipcMain} = require('electron')

export class LoginRequest extends Request {


    private response: LoginResponse;

    constructor() {
        super(RequestDestination.LOGIN_SERVER, "GET");
    }

    getOptions(): Object {
        return {
            path: '/login',
            requestCert: true,
        };
    }

    protected callBack(res: http.IncomingMessage): void {

        let completeData = "";
        console.log(res.statusCode)

        res.on('error', (error) => {
            console.log(error);
        })
        res.on('data', (data) => {
            completeData = completeData.concat(data);
            console.log("Data: " + completeData)

        });
        res.on('end', () => {
            let foo: LoginResponse = Object.assign(new LoginResponse(), JSON.parse(completeData));
            ipcMain.emit('login', foo)
            // console.log("data: " + this.reply);
            console.log("Data stopped streaming, json: " + foo.getJwtToken())
        })
    }

    public perform(): void {
        let request: Promise<http.ClientRequest> = this.prepareRequest();
        request.then((request) => {
            console.log("Connected!")
        }).catch((error) => {
            console.log("Got error :[ " + error)
        })
    }


}

