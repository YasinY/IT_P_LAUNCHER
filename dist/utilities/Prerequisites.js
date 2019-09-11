"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//after class initialized these classes should stay global instead of getting required each time the method is being called
var electron_1 = require("electron");
var fileSystem = require("fs");
var path = require("path");
var Prerequisite = /** @class */ (function () {
    function Prerequisite(callerName) {
        this.initialise(path.basename(callerName).replace(".html", ""));
    }
    Prerequisite.prototype.initialise = function (baseName) {
        this.defineHead(baseName, electron_1.remote.getGlobal("animated"));
    };
    Prerequisite.prototype.defineHead = function (baseName, animatedArray) {
        if (baseName.indexOf(".html") === -1) { //if successfully replaced..
            var paths_1 = electron_1.remote.getGlobal("relativePaths");
            var potentialStylesheet = paths_1.stylesheets + baseName + ".css";
            var potentialRenderer = paths_1.renderings + baseName + "_renderer.js";
            var linkElement = document.createElement("link");
            //TODO separate meta data
            //TODO figure out why it didnt work with jquery..
            var bootstrap = document.createElement("link");
            bootstrap.rel = "stylesheet";
            bootstrap.href = paths_1.stylesheets + "bootstrap.css";
            bootstrap.type = "text/css";
            document.head.append(bootstrap);
            var header = document.createElement("link");
            header.rel = "stylesheet";
            header.href = paths_1.stylesheets + "header.css";
            header.type = "text/css";
            document.head.append(header);
            if (fileSystem.existsSync(potentialStylesheet)) {
                var stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = potentialStylesheet;
                stylesheet.type = "text/css";
                document.head.append(stylesheet);
            }
            if (fileSystem.existsSync(potentialRenderer)) {
                console.log("Renderer exists!");
                var renderer = document.createElement("script");
                renderer.type = 'text/javascript';
                renderer.src = potentialRenderer;
                document.head.append(renderer);
                //let renderer = $.getScript(potentialRenderer, () => console.log("Loaded renderer."));
            }
            if (animatedArray.some(function (element) { return element.site === baseName; })) { //if contains
                var animation = linkElement;
                animation.rel = "stylesheet";
                animation.type = "text/css";
                animation.href = paths_1.stylesheets + "keyframes.css";
                document.head.append(animation);
            }
            this.defineBody(baseName, animatedArray);
        }
    };
    Prerequisite.prototype.defineBody = function (baseName, animatedArray) {
        var baseBody = Prerequisite.getHeader();
        if (animatedArray != null) { //if exists
            var potentialAnimation = animatedArray.find(function (element) { return element.site === baseName; }); //grab
            if (potentialAnimation !== undefined) {
                var animationType = potentialAnimation.type;
                document.body.insertAdjacentHTML('afterbegin', "<div class='" + animationType + "-container'>");
                document.body.insertAdjacentHTML('beforeend', "</div>");
            }
        }
        baseBody.forEach(function (element) { return document.body.prepend(element); });
    };
    Prerequisite.getHeader = function () {
        var header = document.createElement("header");
        var closeButton = document.createElement("button");
        closeButton.innerHTML = "&#10005;";
        closeButton.type = "button";
        closeButton.id = "window-close";
        var minimizeButton = document.createElement("button");
        minimizeButton.id = "window-minimize";
        minimizeButton.type = "button";
        minimizeButton.innerHTML = "&minus;";
        header.appendChild(closeButton);
        header.appendChild(minimizeButton);
        return [header];
    };
    return Prerequisite;
}());
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("window-close").onclick = function () {
        electron_1.remote.getCurrentWindow().close();
    };
    document.getElementById("window-minimize").onclick = function () {
        electron_1.remote.getCurrentWindow().minimize();
    };
});
module.exports = function (callerName) {
    return new Prerequisite(callerName);
};
//# sourceMappingURL=Prerequisites.js.map