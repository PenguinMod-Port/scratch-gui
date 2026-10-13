import {hex2hsl, hsl2hex} from '../../tw-color-utils';

const blockColors = {

};

const extensions = {};

const colourModifier = function(colour) {
  const contrast = (c, amt) => {
    const hsl = hex2hsl(c);
    hsl[2] /= amt;

    // stupid thing that makes pink colors not bad
    hsl[1] /= (1 - Math.max(30 - Math.abs(330 - hsl[0]), 0) / 30) * (amt - 1) * 2 + 1;

    return hsl2hex(hsl);
  };

  return [
    colour,
    contrast(colour, 1.1),
    colour,
    contrast(colour, 1.1)
  ];
}

const textColourModifier = function(colour) {
  return colour;
}

export {
    blockColors,
    extensions,
    colourModifier,
    textColourModifier
};
