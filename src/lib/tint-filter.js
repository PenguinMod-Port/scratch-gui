import { hex2rgb } from "./tw-color-utils";

const tintFilter = (hex) => {
    if (!hex) return 'none';
    let rgb = hex2rgb(hex);

    return 'url("data:image/svg+xml,' +
        '<svg xmlns=\'http://www.w3.org/2000/svg\'>' +
            '<filter id=\'recolor\'>' +
                '<feColorMatrix color-interpolation-filters=\'sRGB\' values=\'' +
                '0 0 0 0 ' + (rgb[0] / 255) +
                ' 0 0 0 0 ' + (rgb[1] / 255) +
                ' 0 0 0 0 ' + (rgb[2] / 255) +
                ' 0 0 0 1 0' +
                '\'/>' +
            '</filter>' +
        '</svg>#recolor' +
    '")';
};

export default tintFilter;