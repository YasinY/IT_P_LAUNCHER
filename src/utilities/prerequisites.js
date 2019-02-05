//after class initialized these classes should stay global instead of getting required each time the method is being called
const remote = require("electron").remote
const fileSystem = require("fs");
const path = require("path")

class Prerequisite {

    constructor(callerName) {
        this.prepare(callerName)
    }

    //order is important
    //TODO eventually rework this to use arrays? then loop?
    //First the stylesheet appended, then the script
    prepare(callerName) {
        this.initialise(callerName);
    }

    initialise(callerName) {
        this.defineHead(callerName)
        this.defineBody()
    }

    defineHead(callerName) {
        const baseName = path.basename(callerName).replace(".html", "")
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            const paths = remote.getGlobal("paths")
            const potentialStylesheet = paths.stylesheets + baseName + ".css"
            const potentialRenderer = paths.logic + baseName + "_renderer.js"
            let baseHead = this.getMetaData();
            if (fileSystem.existsSync(potentialStylesheet)) {
                let stylesheet = document.createElement("link")
                stylesheet.rel = "stylesheet"
                stylesheet.href = potentialStylesheet
                stylesheet.type = "text/css"
                baseHead.push(stylesheet)
            }
            window.$ = window.jQuery = require('jquery') //essential//then load jquery, use it
            if (fileSystem.existsSync(potentialRenderer)) {
                console.log("Renderer exists!")
                let renderer = $(document.createElement("script")).attr({
                    type: 'text/javascript',
                    src: potentialRenderer
                })
                baseHead.push(renderer)
            }
            baseHead.forEach(element => $(document.head).append(element))
        }
    }

    defineBody() {
        let baseBody = this.getHeader()
        baseBody.forEach(element => $(document.body).prepend(element))
    }

    //TODO maybe create ur own "create element" with options l
    //TODO fix unicode for macOS

    getTitleBar() {
        let header = this.getHeader();
        return header;
    }

    getMetaData() {
        let meta = document.createElement("meta")
        meta.charset = "UTF-8"
        let link = document.createElement("link")
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = remote.getGlobal("paths").baseDirectory + "node_modules/bootstrap/dist/css/bootstrap.css"
        return [meta, link];
    }


    getHeader() {
        let headerSheet = document.createElement("link")
        headerSheet.rel = "stylesheet"
        headerSheet.type = "text/css"
        headerSheet.href = remote.getGlobal("paths").stylesheets + "header.css"
        let header = document.createElement("header")
        let closeButton = document.createElement("button")
        closeButton.innerHTML = "&#xE8BB;"
        closeButton.type = "button"
        closeButton.id = "window-close"
        let minimizeButton = document.createElement("button")
        minimizeButton.id = "window-minimize"
        minimizeButton.type = "button"
        minimizeButton.innerHTML = "&#xE921;"
        header.appendChild(closeButton) //TODO check for multidimensional param method
        header.appendChild(minimizeButton)
        return [headerSheet, header]
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("window-close").onclick = function () {
        console.log("clicked")
        remote.getCurrentWindow().close();
    }
    document.getElementById("window-minimize").onclick = function () {
        console.log("clicked")
        remote.getCurrentWindow().minimize();
    }
})


module.exports = (callerName) => {
    return new Prerequisite(callerName)
}