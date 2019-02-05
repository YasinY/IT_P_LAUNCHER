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
        this.defineHead(callerName);
    }

    defineHead(callerName) {
        const baseName = path.basename(callerName).replace(".html", "")
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            const paths = remote.getGlobal("paths")
            const potentialStylesheet = paths.stylesheets + baseName + ".css"
            const potentialRenderer = paths.logic + baseName + "_renderer.js"
            let baseHead = this.getHead();
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
                let renderer = $(document.createElement("script")).attr({type: 'text/javascript', src: potentialRenderer})
                baseHead.push(renderer)
            }
            baseHead.forEach(element => $(document.head).append(element))
        }
    }

    //TODO maybe create ur own "create element" with options l
    //TODO fix unicode for macOS
    getHead() {
        let metaData = this.getMetaData();
        let header = this.getHeader();
        return metaData.concat(header); //merge arrays
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
        closeButton.click(function() {
            remote.getCurrentWindow().close()
        })
        closeButton.innerHTML = "&#xE8BB;"
        let minimizeButton = document.createElement("button")
        minimizeButton.click(function() {
            remote.getCurrentWindow().minimize()
        })
        minimizeButton.innerHTML = "&#xE921;"
        header.appendChild(closeButton) //TODO check for multidimensional param method
        header.appendChild(minimizeButton)
        return [headerSheet, header]
    }
}


module.exports = (callerName) => {
    return new Prerequisite(callerName)
}