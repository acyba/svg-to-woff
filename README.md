# SVG to woff

## Install

```bash
npm install @acymailing/svg-to-woff
```

## Generate a new font

The library will generate CSS, Woff and Woff2 files.

To use your new font, you can use the class `[fontName]-[icon-name]` to display an icon.

You can check the icon-list.html in the output folder to see a list of all the icons.

### Using the CLI

If you want to use the cli command you can either install it globally this way:

```shell
npm install -g @acymailing/svg-to-woff
```

```shell
generate-icon-font icon "/path/to/icons.zip" "/path/to/output"
```

Or you can use `npx` if you install it locally:
```shell
npx generate-icon-font icon "/path/to/icons.zip" "/path/to/output"
```

### Using the code API

Use the function `generateIconFont(fontName, zipFilePath)` to generate a new font from a zip file containing all the icons in SVG format.

```javascript
import {generateIconFont} from '@acymailing/svg-to-woff';

await generateIconFont('icon', '/path/to/icons.zip', '/path/to/output');

// CSS, Woff, Woff2 files are in the output folder
// You also have the icon-list.html file to see all the icons
```

## Font name examples

- `icon` => `<i class="icon-trash"></i>`
- `my-projet` => `<i class="my-projet-trash"></i>`
- `"this is a test"` => `<i class="thisisatest-trash"></i>`

## License

This library is released under the MIT license. You are free to use, modify, and distribute it as you see fit. See the LICENSE file for more information.
