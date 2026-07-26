import musicIcon from './high-contrast-media/extensions/musicIcon.svg';
import penIcon from './high-contrast-media/extensions/penIcon.svg';
import text2speechIcon from './high-contrast-media/extensions/text2speechIcon.svg';
import translateIcon from './high-contrast-media/extensions/translateIcon.svg';
import videoSensingIcon from './high-contrast-media/extensions/videoSensingIcon.svg';
import {hex2rgb, rgb2hex, hex2hsl, hsl2hex} from '../../tw-color-utils';

const blockColors = {
    text: '#000000',
    textFieldText: '#000000', // Text inside of inputs e.g. 90 in [point in direction (90)]
    toolboxText: '#000000', // Toolbox text, color picker text (used to be #575E75)
    blackText: '#000000',
    // The color that the category menu label (e.g. 'motion', 'looks', etc.) changes to on hover
    toolboxHover: '#3373CC',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dragShadowOpacity: 0.6,
    menuHover: 'rgba(255, 255, 255, 0.3)',
    checkboxFieldBackground: '#5dff5d'
};

const extensions = {
    music: {
        blockIconURI: musicIcon
    },
    pen: {
        blockIconURI: penIcon
    },
    text2speech: {
        blockIconURI: text2speechIcon
    },
    translate: {
        blockIconURI: translateIcon
    },
    videoSensing: {
        blockIconURI: videoSensingIcon
    }
};

const colourModifier = function(colour) {
  const contrast = (c, amt) => {
    const hsl = hex2hsl(c)
    hsl[2] /= amt;

    // stupid purple color fixes
    const diff = Math.max(30 - Math.abs(240 - hsl[0]), 0) / 30;
    hsl[1] /= 1 + diff * amt;

    return hsl2hex(hsl);
  };
  const lighten = (c, amt) => {
    const rgb = hex2rgb(c);
    return rgb2hex([
      Math.round(rgb[0] * (1 - amt) + 255 * amt),
      Math.round(rgb[1] * (1 - amt) + 255 * amt),
      Math.round(rgb[2] * (1 - amt) + 255 * amt)
    ]);
  };

  return [
    lighten(colour, 0.4),
    lighten(colour, 0.6),
    lighten(contrast(colour, 1.2), 0.2),
    lighten(colour, 0.8),
  ];
}

const textColourModifier = function(colour) {
  return "#000000";
}

export {
    blockColors,
    extensions,
    colourModifier,
    textColourModifier,
};
