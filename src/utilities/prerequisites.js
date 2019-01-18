//after class initialized these classes should stay global instead of getting required each time the method is being called
const remote = require("electron").remote
const fileSystem = require("fs");
const path = require("path")

class Prerequisite {

    constructor(callerName) {
        console.log("Called!")
        this.prepare(callerName)
    }

    //order is important
    //TODO eventually rework this to use arrays? then loop?
    //First the stylesheet appended, then the script
    prepare(callerName) {
        this.defineHead(callerName);
    }

    defineHead(callerName) {
        const baseName = path.basename(callerName).replace(".html", "")
        console.log(baseName)
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            const paths = remote.getGlobal("paths")
            const potentialStylesheet = paths.stylesheets + baseName + ".css"
            const potentialRenderer = paths.logic + baseName + "_renderer.js"
            let baseHead = Prerequisite.getBaseHead();
            if (fileSystem.existsSync(potentialStylesheet)) {
                let stylesheet = document.createElement("link")
                stylesheet.rel = "stylesheet"
                stylesheet.href = potentialStylesheet
                stylesheet.type = "text/css"
                //baseHead += "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + potentialStylesheet +"\">";
                baseHead.push(stylesheet)
            }
            window.$ = window.jQuery = require('jquery') //essential//then load jquery, use it
            if (fileSystem.existsSync(potentialRenderer)) {
                console.log("Renderer exists!")
                let renderer = document.createElement("script")
                renderer.type = "text/javascript"
                renderer.src = potentialRenderer
                baseHead.push(renderer)
            }
            baseHead.forEach(element => document.head.appendChild(element))
        }
    }


    getBaseBody() {

    }
    //TODO maybe create ur own "create element" with options l
    static getBaseHead() {
        let meta = document.createElement("meta")
        meta.charset = "UTF-8"
        let link = document.createElement("link")
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = remote.getGlobal("paths").baseDirectory + "node_modules/bootstrap/dist/css/bootstrap.css"
        return [meta, link];
    }
}

module.exports = (callerName) => {
    return new Prerequisite(callerName)
}