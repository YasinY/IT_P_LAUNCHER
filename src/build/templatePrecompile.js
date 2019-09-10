let fs = require("fs");
let path = require("path");

console.log("Precompiling templates..")
traverseDir("./resources/templates")

//TODO figure out a way to precompile EJS files.
function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            let fileContent = fs.readFileSync(fullPath);

            //let precompiledTemplate = Handlebars.precompile(`${fileContent}`);
            let pathSeparator = path.sep;
            let assetDirectory = `.${pathSeparator}assets${pathSeparator}`;
            let outputPath = assetDirectory + fullPath.substr(fullPath.indexOf(`templates${pathSeparator}`)).replace(".hbs", ".js")
            let templatePath = outputPath.substring(0, fullPath.lastIndexOf(`${pathSeparator}`))
           // fs.promises.mkdir(templatePath, { recursive: true }).then(() => {
                //fs.writeFileSync(outputPath, `module.exports = ${precompiledTemplate}`, {flag: 'w'})
            //}).catch(console.error);
        }
    });
}

console.log("Successfully precompiled templates.")
