#!/usr/bin/env node

const fs = require('fs');
const postcss = require('./modules/postcss-extended.js');

if (!process.argv[2] || process.argv[2] == 'help') {
    console.error('\n\
Usage: \n\
\n\
css-split <path to CSS file>\n\
Takes any rules with multiple selectors and splits \n\
them into individual rules. \n\
\n\
css-split help \n\
Show this help message.\n\
');
    process.exit()
}

const cssFile = process.argv[2];

if (!fs.existsSync(cssFile)) {
    console.error(cssFile + ' does not exist. Is the path correct?')
    process.exit()
}

const css = fs.readFileSync(cssFile)

const root = postcss.parse(css)
root.nodes = postcss.splitSelectors(root.nodes)

let newCssStr = '';
postcss.stringify(root, result => {
    newCssStr += result;
});
console.log(newCssStr)