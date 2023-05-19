# insert-css-js-into-html
This is a short script that will insert the contents of style sheets and js content into html pages for 1 file.
## it requires node runtime
## it takes 2 arguments
- input filename (an html file i.e. index.html)
- output filename (an html file i.e. singleFile.html)
## if the second file is omitted
- it will add 'WithCSSAndScripts.html', i.e. indexWithCSSAndScripts.html

## Examples of use:
- from command line in the present directory
- `node insertCSSAndJSIntoHTML.js index.html newFile.html` -> creates a new combined file named `newFile.html`
- `node insertCSSAndJSIntoHTML.js index.html` -> creates a new combined file named `indexWithCSSAndScripts.html`

## Notes:
In the html file, you must have the link to the css and scripts in the following formats:
- `<link rel="stylesheet" href="style.css">`
- `<script src='./js/someJavascript.js'></script>` or `<script src='javascriptLocal.js'></script>` are acceptible formats.
	
The point is not to split the script tags on different lines and to make sure the link to the stylesheet is 
in that order and format.  It is a rudimentary script but still highly useful.

