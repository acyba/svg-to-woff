import {generateFonts} from './src/generate-svg.js';
import {generateCSS} from './src/generate-css.js';
import {fixSvg, optimizeSvgs} from './src/optimize-svg.js';
import {generateHtml} from './src/generate-html.js';
import fs from 'fs/promises';

const temporaryFolder = './temp';

export const generateIconFont = async(fontName, svgFolderPath, outputFolder = './output') => {
    await copySvg(svgFolderPath);
    await fixSvg(temporaryFolder);
    await optimizeSvgs(temporaryFolder);
    const glyphMetadata = await generateFonts(fontName, temporaryFolder, outputFolder);
    await generateCSS(glyphMetadata, fontName, outputFolder);
    await generateHtml(glyphMetadata, fontName, outputFolder);
    await fs.rm(temporaryFolder, {recursive: true});

    return glyphMetadata;
};

const copySvg = async(svgFolderPath) => {
    // Copy the contents of the folder into a temporary folder
    await fs.mkdir(temporaryFolder, {recursive: true});
    const files = await fs.readdir(svgFolderPath);
    for (const file of files) {
        await fs.copyFile(`${svgFolderPath}/${file}`, `${temporaryFolder}/${file}`);
    }
}
