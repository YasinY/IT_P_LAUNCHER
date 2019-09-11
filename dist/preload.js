var app = require("electron");
var remote = app.remote;
var paths = remote.getGlobal("relativePaths");
var animated = remote.getGlobal("animated");
console.log(paths);
var fs = require("fs");
var EVENT_TRIGGER_DOM_LOADED = "DOMContentLoaded";
var CSS_EXTENSION = ".css";
var RENDERER_EXTENSION = ".js";
var HTML_EXTENSION = ".html";
var BOOTSTRAP_ELEMENT = "bootstrap";
var HEADER_ELEMENT = "header";
var HEADER_ELEMENT_MAC_OS = HEADER_ELEMENT + "_macOs";
var LINK_ELEMENT = "link";
var KEYFRAMES_STYLESHEET_NAME = "keyframes";
var RENDERER_TRAIT = "_renderer";
var STYLESHEET_RELATION = "stylesheet";
var CSS_TYPE = "text/css";
var URL_SEPARATOR = "/";
var EMPTY_STRING_REPLACEMENT = "";
function defineEssentialStyleesheets() {
}
window.addEventListener(EVENT_TRIGGER_DOM_LOADED, function () {
    var isMac = remote.process.platform === "darwin";
    var fileName = getFileName();
    var bootstrapPath = getStylesheetPath(BOOTSTRAP_ELEMENT);
    if (!fileExists(bootstrapPath)) {
        console.error("Couldn't find stylesheet for bootstrap.");
    }
    var bootstrapStylesheet = getStylesheetElement(bootstrapPath);
    var headerPath = getStylesheetPath(isMac ? HEADER_ELEMENT_MAC_OS : HEADER_ELEMENT);
    if (!fileExists(headerPath)) {
        console.error("Couldn't find stylesheet for header.");
    }
    var headerStylesheet = getStylesheetElement(headerPath);
    document.head.append(bootstrapStylesheet, headerStylesheet);
    var stylesheetPath = getStylesheetPath(fileName);
    if (fileExists(stylesheetPath)) {
        var styleSheetElement = getStylesheetElement(stylesheetPath);
        document.head.append(styleSheetElement);
    }
    var titleBar = document.createElement("header");
    if (remote.process.platform === "win32") { //only windows gets buttons
        titleBar = addFrameButtons(titleBar);
    }
    document.body.prepend(titleBar);
    var rendererPath = getRendererPath(fileName);
    if (fileExists(rendererPath)) {
        var rendererElement = getRendererElement(rendererPath);
        document.head.append(rendererElement);
    }
    var animation = animated.find(function (element) { return element.site === fileName; });
    if (animation != undefined) {
        var animationsPath = getStylesheetPath(KEYFRAMES_STYLESHEET_NAME);
        if (fileExists(animationsPath)) {
            // document.body.insertAdjacentHTML('afterbegin', "<div class='" + animation.type + "-container'>")
        }
    }
});
function fileExists(path) {
    return fs.existsSync(path);
}
function addFrameButtons(titleBar) {
    //if windows, frame gets disabled so this is our custom impl
    var closeButton = getButtonElement("&#10005;", "window-close");
    var minimizeButton = getButtonElement("&minus;", "window-minimize");
    var maximizeButton = getButtonElement("&#128470;", "window-maximize");
    registerButtonFunctions(closeButton, minimizeButton);
    titleBar.append(closeButton, minimizeButton, maximizeButton);
    return titleBar;
}
function registerButtonFunctions(closeButton, minimizeButton) {
    closeButton.onclick = function () {
        remote.getCurrentWindow().close();
    };
    minimizeButton.onclick = function () {
        remote.getCurrentWindow().minimize();
    };
}
function getFileName() {
    var fileName = location.pathname.split(URL_SEPARATOR).slice(-1)[0];
    if (!fileName.includes(HTML_EXTENSION)) {
        console.error("Preload executed on a non-html file.");
        return;
    }
    return fileName.replace(HTML_EXTENSION, EMPTY_STRING_REPLACEMENT);
}
function getStylesheetElement(path) {
    var linkElement = getLinkElement();
    linkElement.rel = STYLESHEET_RELATION;
    linkElement.type = CSS_TYPE;
    if (name != null) {
        linkElement.href = path;
    }
    return linkElement;
}
function getRendererElement(rendererPath) {
    var scriptElement = getScriptElement();
    scriptElement.type = 'text/javascript';
    scriptElement.src = rendererPath;
    return scriptElement;
}
function getButtonElement(innerHTML, id) {
    var buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.innerHTML = innerHTML;
    buttonElement.id = id;
    return buttonElement;
}
function getLinkElement() {
    return document.createElement(LINK_ELEMENT);
}
function getScriptElement() {
    return document.createElement("script");
}
function getRendererPath(fileName) {
    return paths.renderings + fileName + RENDERER_TRAIT + RENDERER_EXTENSION;
}
function getStylesheetPath(fileName) {
    return paths.stylesheets + fileName + CSS_EXTENSION;
}
//# sourceMappingURL=preload.js.map