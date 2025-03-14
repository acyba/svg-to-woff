import fs from 'fs/promises';

// Configuration

export const generateCSS = async(metadata, fontName, outputFolder) => {
    const classPrefix = `${fontName}-`;
    const outputCSSFile = `${outputFolder}/${fontName}.css`;
    const outputFontFileWoffUrl = `${fontName}.woff`;
    const outputFontFileWoff2Url = `${fontName}.woff2`;
    const randomString = Math.random().toString(36).substring(7);

    try {
        let cssContent = `
/* Icons font: ${fontName} */
@font-face {
    font-family: '${fontName}';
    src: url('${outputFontFileWoff2Url}?${randomString}') format('woff2'), url('${outputFontFileWoffUrl}?${randomString}') format('woff');
}

#acym_wrapper [class^="${classPrefix}"], #acym_wrapper [class*=" ${classPrefix}"], [class^="${classPrefix}"], [class*=" ${classPrefix}"]  {
    font-family: '${fontName}';
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`;

        metadata.forEach(({
                              name,
                              unicode
                          }) => {
            const escapedUnicode = unicode.codePointAt(0).toString(16);
            cssContent += `
.${classPrefix}${name}::before {
    content: "\\${escapedUnicode}";
}
`;
        });

        await fs.writeFile(outputCSSFile, cssContent);
        console.log(`File generated: ${outputCSSFile}`);
    } catch (err) {
        console.error('Error while generating CSS file:', err);
    }
};
