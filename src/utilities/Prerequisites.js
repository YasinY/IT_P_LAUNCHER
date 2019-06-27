//after class initialized these classes should stay global instead of getting required each time the method is being called
const remote = require("electron").remote
const fileSystem = require("fs");
const path = require("path")

class Prerequisite {

    constructor(callerName) {
        this.initialise(path.basename(callerName).replace(".html", ""))
    }

    initialise(baseName) {
        this.defineHead(baseName, remote.getGlobal("animated"))
    }

    defineHead(baseName, animatedArray) {
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            const paths = remote.getGlobal("paths")
            const potentialStylesheet = paths.stylesheets + baseName + ".css"
            const potentialRenderer = paths.logic + baseName + "_renderer.js"
            let baseHead = Prerequisite.getMetaData();
            if (fileSystem.existsSync(potentialStylesheet)) {
                let stylesheet = document.createElement("link")
                stylesheet.rel = "stylesheet"
                stylesheet.href = potentialStylesheet
                stylesheet.type = "text/css"
                baseHead.push(stylesheet)
            }
            window.$ = window.jQuery = require('jquery') //its safe to say, after this line jquery can easily be used
            if (fileSystem.existsSync(potentialRenderer)) {
                console.log("Renderer exists!")
                let renderer = $(document.createElement("script")).attr({
                    type: 'text/javascript',
                    src: potentialRenderer
                })
                baseHead.push(renderer)
            }
            if(animatedArray.some(element => element.site === baseName)) { //if contains
                let keyframes = $(document.createElement("link")).attr({ //invoke the keyframes css
                    rel: "stylesheet",
                    type: "text/css",
                    href: paths.stylesheets + "keyframes.css"
                })
                baseHead.push(keyframes)
            }
            baseHead.forEach(element => $(document.head).append(element))
            this.defineBody(baseName, $("link[href='"+ paths.stylesheets + "keyframes.css']").length)
        }
    }

    defineBody(baseName, animatedArray = false) {
        let baseBody = Prerequisite.getHeader()
        if (animatedArray) { //if exists
            const potentialAnimation = remote.getGlobal("animated").find(element => element.site === baseName); //grab
            if (potentialAnimation !== undefined) {
                let animationType = potentialAnimation.type;
                $(document.body).wrapInner("<div class='" + animationType + "-container'></div>")
            }
        }
        baseBody.forEach(element => $(document.body).prepend(element))
    }

    //TODO maybe create ur own "create element" with options l
    static getMetaData() {
        let meta = document.createElement("meta")
        meta.charset = "UTF-8"
        let link = document.createElement("link")
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = remote.getGlobal("paths").baseDirectory + "node_modules/bootstrap/dist/css/bootstrap.css"
        let headerSheet = document.createElement("link")
        headerSheet.rel = "stylesheet"
        headerSheet.type = "text/css"
        headerSheet.href = remote.getGlobal("paths").stylesheets + "header.css"
        return [meta, link, headerSheet];
    }


    static getHeader() {
        let header = document.createElement("header")
        let closeButton = document.createElement("button")
        closeButton.innerHTML = "&#10005;"
        closeButton.type = "button"
        closeButton.id = "window-close"
        let minimizeButton = document.createElement("button")
        minimizeButton.id = "window-minimize"
        minimizeButton.type = "button"
        minimizeButton.innerHTML = "&minus;"
        header.appendChild(closeButton)
        header.appendChild(minimizeButton)
        return [header]
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("window-close").onclick = function () {
        remote.getCurrentWindow().close();
    }
    document.getElementById("window-minimize").onclick = function () {
        remote.getCurrentWindow().minimize();
    }
})


module.exports = (callerName) => {
    return new Prerequisite(callerName)
}