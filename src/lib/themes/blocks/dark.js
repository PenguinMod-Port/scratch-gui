import {hex2rgb, rgb2hex, hex2hsl, hsl2hex} from '../../tw-color-utils';

const blockColors = {
    text: '#FFFFFFCC',
    textFieldText: '#E5E5E5',
    textField: '#4C4C4C',
    menuHover: 'rgba(255, 255, 255, 0.3)'
};

const extensions = {};

const colourModifier = function(colour) {
  const contrast = (c, amt) => {
    const hsl = hex2hsl(c)
    hsl[2] /= amt;

    // stupid thing that makes pink colors not bad
    hsl[1] /= (1 - Math.max(30 - Math.abs(330 - hsl[0]), 0) / 30) * (amt - 1) * 2 + 1;

    return hsl2hex(hsl);
  };
  const darken = (c, amt) => {
    const rgb = hex2rgb(c);
    return rgb2hex([
      Math.round(rgb[0] * (1 - amt)),
      Math.round(rgb[1] * (1 - amt)),
      Math.round(rgb[2] * (1 - amt))
    ]);
  };

  return [
    darken(colour, 0.8),
    "#4C4C4C",
    darken(contrast(colour, 1.2), 0.2),
    darken(contrast(colour, 1.2), 0.5)
  ];
}

const textColourModifier = function(colour) {
  return "#ffffffcc";
}

export {
    blockColors,
    extensions,
    colourModifier,
    textColourModifier
};
