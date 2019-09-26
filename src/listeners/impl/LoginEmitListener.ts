import {EmitListener} from "../EmitListener";

let https = require("https");
let fs = require("fs");

export class LoginEmitListener extends EmitListener {

    getEmitTrigger(): string {
        return "login";
    }

    onEmit(): Function {

        return (event: any, username: string, password: string) => { //TODO figure out why event cant have a type other than any
            console.log("Received " + username + " and " + password);
            //https.event.sender.send('login',)

            //this.currentWindow.loadFile(global.relativePaths.views + "loading.html")

        };
    }
}
