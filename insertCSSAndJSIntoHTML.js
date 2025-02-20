const fs = require('fs');
let help = "Use insertCSSAndJSIntoHTML.js [inputfile.html] [outputfile.html]\nNote: outputfile.html is optional\n\nExamples:\nnode insertCSSAndJSIntoHTML.js index.html newFile.html -> creates a new combined file named newFile.html \nnode insertCSSAndJSIntoHTML.js index.html              -> creates a new combined file named indexWithCSSAndScripts.html";

if (process.argv[2] === undefined) {
    console.log("Syntax Error:");
}

if ((process.argv[2] === undefined) || (process.argv[2].toLowerCase().trim() === "-h") || process.argv[2].toLowerCase().trim() === "-help") {
    console.log(help);
    return 1;
}

console.log(process.argv[2]);
console.log(process.argv[3]);
let contents = fs.readFileSync(process.argv[2], "utf8");
let saveFilename = process.argv[2].replace(".html", "") + "WithCSSAndScripts.html";
if (process.argv[3] !== undefined) {
    saveFilename = process.argv[3];
}
let lines = contents.split("\n");
let newContents = "";
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let squishedLine = lines[i].replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").trim();
    let filename = "";
    if (squishedLine.indexOf("<linkrel=stylesheet") !== -1) {
        filename = squishedLine.replace("<linkrel=stylesheethref=", "").replace(">", "").trim();
        console.log("Attempting to insert " + filename + "into document.");
        let styleContents = fs.readFileSync(filename, "utf8");
        newContents += "<style>\n" + styleContents + "\n</style>\n";
    }
    else if (squishedLine.indexOf("<scriptsrc=") !== -1) {
        filename = squishedLine.replace("<scriptsrc=", "").replace("></script>", "").trim();
        console.log("Attempting to insert " + filename + "into document.");
        let scriptContents = fs.readFileSync(filename, "utf8");
        newContents += "<script>\n" + scriptContents + "\n</script>\n";
    }
    else {
        newContents += line + "\n";
    }
}
let addCounter = false;
if (saveFilename.indexOf(".php") !== -1) {
    addCounter = true;
}
if (addCounter) {
    let regex = /\<\/body\>\n*\s*\n*\<\/html>/g
    newContents = newContents.replace(regex, "<!--//////////////Page counter////////////////////-->\n <div id=\"visit-counter\" style=\"margin:auto;width:100%;text-align:center\"></div>\n    <?php\n$pageName=basename(__FILE__,\".php\");\n$countFileName=$pageName.\"-count.txt\";\n$int=0;\n$contents=file_get_contents($countFileName);\n$int = (int)$contents;\n$int=$int+1;\nfile_put_contents($countFileName,(string)($int));\n//require_once($pageName.\".html\");\necho (\"<script>document.getElementById('visit-counter').innerHTML='\".$int.\" visits.'</script>\");\n////////////////////////////////////////////////\n?>\n<!--//////////////Page counter////////////////////-->\n</body>\n</html>");
}


fs.writeFileSync(saveFilename, newContents, "utf8");
