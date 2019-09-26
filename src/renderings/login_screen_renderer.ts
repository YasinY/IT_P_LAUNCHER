import {ipcRenderer} from "electron";

const button = document
    .getElementsByClassName("btn btn-primary btn-lg")
    .item(0);
console.log("test")

button.addEventListener('click', () => {
    const username = (document.querySelector('input[type=text]') as HTMLInputElement).value;
    let md5Hash = require('crypto').createHash('md5');
    const password = md5Hash.update((document.querySelector('input[type=password]') as HTMLInputElement).value).setEncoding('hex');
    alert("sent: " + username + ", " + password)
    ipcRenderer.send('login', username, password)
    /// app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "loading.html")
})

ipcRenderer.once('login', (event:any, successful: boolean) => {
    console.log("Logged in? " + successful);
})
//$("logo").attr("src", "./assets/logo.png")

