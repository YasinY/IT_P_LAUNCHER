let app = require("electron");
let remote = app.remote;
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
const HEADER_ELEMENT_MAC_OS = HEADER_ELEMENT + "_macOs";
const LINK_ELEMENT = "link"


const KEYFRAMES_STYLESHEET_NAME = "keyframes"
const RENDERER_TRAIT = "_renderer";

const STYLESHEET_RELATION = "stylesheet";
const CSS_TYPE = "text/css";

const URL_SEPARATOR = "/"
const EMPTY_STRING_REPLACEMENT = ""

function defineEssentialStylesheets(): void {
    let isMac = remote.process.platform === "darwin";
    let bootstrapPath = getStylesheetPath(BOOTSTRAP_ELEMENT)
    if(!fileExists(bootstrapPath)) {
        console.error("Couldn't find stylesheet for bootstrap.")
    }
    let bootstrapStylesheet = getStylesheetElement(bootstrapPath)
    let headerPath = getStylesheetPath(isMac ? HEADER_ELEMENT_MAC_OS : HEADER_ELEMENT)
    if(!fileExists(headerPath)) {
        console.error("Couldn't find stylesheet for header.")
    }
    let headerStylesheet = getStylesheetElement(headerPath)


    document.head.append(bootstrapStylesheet, headerStylesheet)
}
function defineKeyframes(fileName : string): void {
    let animation = animated.find((element: any) => element.site === fileName);
    if (animation != undefined) {
        let animationsPath = getStylesheetPath(KEYFRAMES_STYLESHEET_NAME);
        let animationElement = getStylesheetElement(animationsPath);
        document.head.append(animationElement)
        if (fileExists(animationsPath)) {
            let animationWrapper = document.createElement("div")
            animationWrapper.className =  animation.type + "-container";
            wrapInner(document.body, animationWrapper)
        }
    }
}
window.addEventListener(EVENT_TRIGGER_DOM_LOADED, () => {
    defineEssentialStylesheets();
    let fileName = getFileName();
    defineKeyframes(fileName);
    let stylesheetPath = getStylesheetPath(fileName);
    if (fileExists(stylesheetPath)) {
        let styleSheetElement = getStylesheetElement(stylesheetPath)
        document.head.append(styleSheetElement)
    }
    let titleBar = document.createElement("header");
    if (remote.process.platform === "win32") { //only windows gets buttons
        titleBar = addFrameButtons(titleBar);
    }
    document.body.prepend(titleBar)
    let rendererPath = getRendererPath(fileName);
    if (fileExists(rendererPath)) {
        let rendererElement = getRendererElement(rendererPath);
        document.head.append(rendererElement)
    }

}, false)

function wrapInner(parent: Node, wrapper : Node) {
    if (typeof wrapper === "string")
        wrapper = document.createElement(wrapper);

    var div = parent.appendChild(wrapper);

    while(parent.firstChild !== wrapper)
        wrapper.appendChild(parent.firstChild);
}
function fileExists(path: string) : boolean {
    return fs.existsSync(path);
}
function addFrameButtons(titleBar: HTMLHeadElement) {
    //if windows, frame gets disabled so this is our custom impl
    let closeButton = getButtonElement("&#10005;", "window-close");
    let minimizeButton = getButtonElement("&minus;", "window-minimize");
    let maximizeButton = getButtonElement("&#128470;", "window-maximize");
    registerButtonFunctions(closeButton, minimizeButton)
    titleBar.append(closeButton, minimizeButton, maximizeButton)
    return titleBar;
}

function registerButtonFunctions(closeButton : HTMLButtonElement, minimizeButton : HTMLButtonElement) {
    closeButton.onclick = function () {
        remote.getCurrentWindow().close();
    }
    minimizeButton.onclick = function () {
        remote.getCurrentWindow().minimize();
    }
}

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
    scriptElement.type = 'text/javascript';
    scriptElement.src = rendererPath;
    return scriptElement;
}

function getButtonElement(innerHTML: string, id: string): HTMLButtonElement {
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.innerHTML = innerHTML;
    buttonElement.id = id;
    return buttonElement;
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

function getKeyframesPath() {
    return paths.stylesheets + 'keyframes' + CSS_EXTENSION
}
