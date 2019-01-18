const remote = require("electron").remote

class Renderer {

    constructor(name) {
        load(name)
    }

    load(name) {
        const correspondingRenderer = require("path").basename(name).replace(".html", "_renderer.js")
        const filePath = remote.getGlobal("paths").logic + correspondingRenderer;
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = filePath
        $("head").append(script)
    }
}