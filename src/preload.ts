let remote = require("electron").remote;

let paths = remote.getGlobal("relativePaths");
let animated = remote.getGlobal("animated");

console.log(paths)
let fs = require("fs");

const EVENT_TRIGGER_DOM_LOADED = "DOMContentLoaded";

const CSS_EXTENSION = ".css";
const RENDERER_EXTENSION = ".js";
const HTML_EXTENSION = ".html";
const BOOTSTRAP_ELEMENT = "bootstrap"
const HEADER_ELEMENT = "header"
const LINK_ELEMENT = "link"


const KEYFRAMES_STYLESHEET_NAME = "keyframes"
const RENDERER_TRAIT = "_renderer";

const STYLESHEET_RELATION = "stylesheet";
const CSS_TYPE = "text/css";

const URL_SEPARATOR = "/"
const EMPTY_STRING_REPLACEMENT = ""

window.addEventListener(EVENT_TRIGGER_DOM_LOADED, () => {
    let fileName = getFileName();

    let bootstrapPath = getStylesheetPath(BOOTSTRAP_ELEMENT)
    let bootstrap = getStylesheetElement(bootstrapPath)

    let headerPath = getStylesheetPath(HEADER_ELEMENT)
    let header = getStylesheetElement(headerPath)

    document.head.append(bootstrap, header)

    let stylesheetPath = getStylesheetPath(fileName);
    if (fs.existsSync(stylesheetPath)) {
        let styleSheetElement = getStylesheetElement(stylesheetPath)
        document.head.append(styleSheetElement)
    }

    let rendererPath = getRendererPath(fileName);
    if (fs.existsSync(rendererPath)) {
        let rendererElement = getRendererElement(rendererPath);
        document.head.append(rendererElement)
    }

    let animation = animated.find((element: any) => element.site === fileName);
    if (animation != undefined) {
        let animationsPath = getStylesheetPath(KEYFRAMES_STYLESHEET_NAME);
        if (fs.existsSync(animationsPath)) {
           // document.body.insertAdjacentHTML('afterbegin', "<div class='" + animation.type + "-container'>")
        }
    }
    console.log(fileName)
})


function getFileName(): string {
    let fileName = location.pathname.split(URL_SEPARATOR).slice(-1)[0];
    if (!fileName.includes(HTML_EXTENSION)) {
        console.error("Preload executed on a non-html file.")
        return;
    }

    return fileName.replace(HTML_EXTENSION, EMPTY_STRING_REPLACEMENT);
}


function getStylesheetElement(path: string): HTMLLinkElement {
    let linkElement = getLinkElement();
    linkElement.rel = STYLESHEET_RELATION;
    linkElement.type = CSS_TYPE;
    if (name != null) {

        linkElement.href = path;
    }
    return linkElement;
}

function getRendererElement(rendererPath: string): HTMLScriptElement {
    let scriptElement = getScriptElement();
    scriptElement.type = 'text/javascript'
    scriptElement.src = rendererPath
    return scriptElement;
}

function getLinkElement(): HTMLLinkElement {
    return document.createElement(LINK_ELEMENT)
}

function getScriptElement(): HTMLScriptElement {
    return document.createElement("script");
}

function getRendererPath(fileName: string): string {

    return paths.renderings + fileName + RENDERER_TRAIT + RENDERER_EXTENSION;
}

function getStylesheetPath(fileName: string): string {
    return paths.stylesheets + fileName + CSS_EXTENSION;
}
