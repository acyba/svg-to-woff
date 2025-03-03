import fixPathDirections from 'fix-path-directions';
import fs from 'fs/promises';
import path from 'path';
import SVGFixer from 'oslllo-svg-fixer';

const {getFixedPathDataString} = fixPathDirections;
const pathRegex = /<path[^>]*d="([^"]*)"/;

// For SVGs that have stroke instead of fill attribute
export const fixSvg = async(svgFolderPath) => {
    console.log('Fixing SVGs...');
    const options = {
        showProgressBar: false,
        throwIfDestinationDoesNotExist: false
    };

    await SVGFixer(svgFolderPath, svgFolderPath, options).fix(); // Returns instance
};

// We remove the fill-rule="evenodd" attribute from the SVGs
export const optimizeSvgs = async(svgFolderPath) => {
    try {
        console.log('Optimizing SVGs...');
        const files = await fs.readdir(svgFolderPath);
        for (const file of files) {
            if (path.extname(file).toLowerCase() !== '.svg') {
                continue;
            }

            const filePath = path.join(svgFolderPath, file);
            const data = await fs.readFile(filePath, 'utf8');

            if (!data.includes('fill-rule="evenodd"')) {
                continue;
            }

            const svgPath = data.match(pathRegex);
            if (!svgPath) {
                continue;
            }

            const pathData = svgPath[1];
            const pathDataFixed = getFixedPathDataString(svgPath[1]);

            let dataFixed = data.replace(pathData, pathDataFixed);
            dataFixed = dataFixed.replace('fill-rule="evenodd"', '');

            await fs.writeFile(filePath, dataFixed);
        }
    } catch (err) {
        console.error('Error while optimizing SVGs:', err);
    }
};
