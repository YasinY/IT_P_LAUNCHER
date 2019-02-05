const app = require("electron").remote

document.getElementsByClassName("btn btn-primary btn-lg").item(0).addEventListener('click', () => {
    //app.getCurrentWindow().loadFile()
    app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "logged_in.html")
    console.log("Logging in")
})

$("logo").attr("src", "./assets/logo.png")


