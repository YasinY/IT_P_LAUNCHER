//after class initialized these classes should stay global instead of getting required each time the method is being called
import {remote} from "electron";
import * as fileSystem from "fs"
import * as path from "path"

class Prerequisite {

    constructor(callerName: string) {
        this.initialise(path.basename(callerName).replace(".html", ""))
    }

    initialise(baseName: string) {
        this.defineHead(baseName, remote.getGlobal("animated"))
    }

    defineHead(baseName: string, animatedArray: Array<any>) {
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            const paths = remote.getGlobal("relativePaths")
            const potentialStylesheet = paths.stylesheets + baseName + ".css"
            const potentialRenderer = paths.renderings + baseName + "_renderer.js"
            let linkElement = document.createElement("link");
            //TODO separate meta data
            //TODO figure out why it didnt work with jquery..
            let bootstrap = document.createElement("link")
            bootstrap.rel = "stylesheet"
            bootstrap.href = paths.stylesheets + "bootstrap.css"
            bootstrap.type = "text/css"
            document.head.append(bootstrap)
            let header = document.createElement("link")
            header.rel = "stylesheet"
            header.href = paths.stylesheets + "header.css"
            header.type = "text/css"
            document.head.append(header)
            if (fileSystem.existsSync(potentialStylesheet)) {
                let stylesheet = document.createElement("link")
                stylesheet.rel = "stylesheet"
                stylesheet.href = potentialStylesheet
                stylesheet.type = "text/css"
                document.head.append(stylesheet)
            }
            if (fileSystem.existsSync(potentialRenderer)) {
                console.log("Renderer exists!")
                let renderer = document.createElement("script")
                renderer.type = 'text/javascript'
                renderer.src = potentialRenderer
                document.head.append(renderer);
               //let renderer = $.getScript(potentialRenderer, () => console.log("Loaded renderer."));
            }
            if (animatedArray.some(element => element.site === baseName)) { //if contains
                let animation = linkElement
                animation.rel = "stylesheet"
                animation.type = "text/css"
                animation.href = paths.stylesheets + "keyframes.css"
                document.head.append(animation)
            }
            this.defineBody(baseName, animatedArray)
        }
    }

    defineBody(baseName: string, animatedArray?: Array<any>) {
        let baseBody = Prerequisite.getHeader()
        if (animatedArray != null) { //if exists
            const potentialAnimation = animatedArray.find(element => element.site === baseName); //grab
            if (potentialAnimation !== undefined) {
                let animationType = potentialAnimation.type;
                document.body.insertAdjacentHTML('afterbegin', "<div class='" + animationType + "-container'>")
                document.body.insertAdjacentHTML('beforeend', "</div>")
            }
        }
        baseBody.forEach(element => document.body.prepend(element))
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


module.exports = (callerName: string) => {
    return new Prerequisite(callerName)
}
