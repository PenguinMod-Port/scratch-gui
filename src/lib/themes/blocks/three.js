import {hex2hsl, hsl2hex} from '../../tw-color-utils';

const blockColors = {
    motion: "#4C97FF",
    looks: "#9966FF",
    sounds: "#CF63CF",
    control: "#FFAB19",
    event: "#FFBF00",
    sensing: "#5CB1D6",
    pen: "#0FBD8C",
    operators: "#59C059",
    data: "#FF8C1A",
    data_lists: "#FF661A",
    more: "#FF6680",
    addons: "#29BEB8",

    text: '#FFFFFF',
    workspace: '#F9F9F9',
    toolboxHover: '#4C97FF',
    toolboxSelected: '#E9EEF2',
    toolboxText: '#575E75',
    toolbox: '#FFFFFF',
    blackText: '#575E75',
    flyout: '#F9F9F9',
    scrollbar: '#CECDCE',
    scrollbarHover: '#CECDCE',
    textField: '#FFFFFF',
    textFieldText: '#575E75',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    dragShadowOpacity: 0.6,
    stackGlow: '#FFF200',
    stackGlowSize: 4,
    stackGlowOpacity: 1,
    replacementGlow: '#FFFFFF',
    replacementGlowSize: 2,
    replacementGlowOpacity: 1,
    colourPickerStroke: '#FFFFFF',
    // CSS colours: support RGBA
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dropDownShadow: 'rgba(0, 0, 0, .3)',
    numPadBackground: '#547AB2',
    numPadBorder: '#435F91',
    numPadActiveBackground: '#435F91',
    numPadText: 'white', // Do not use hex here, it cannot be inlined with data-uri SVG
    valueReportBackground: '#FFFFFF',
    valueReportBorder: '#AAAAAA',
    valueReportForeground: '#000000',
    errorReportBackground: '#ffeeee',
    errorReportBorder: '#ff4444',
    errorReportForeground: '#441111',
    menuHover: 'rgba(0, 0, 0, 0.2)',
    contextMenuBackground: '#ffffff',
    contextMenuBorder: '#cccccc',
    contextMenuForeground: '#000000',
    contextMenuActiveBackground: '#d6e9f8',
    contextMenuDisabledForeground: '#cccccc',
    flyoutLabelColor: '#575E75',
    checkboxInactiveBackground: '#ffffff',
    checkboxInactiveBorder: '#c8c8c8',
    checkboxActiveBackground: '#4C97FF',
    checkboxActiveBorder: '#3373CC',
    checkboxCheck: '#ffffff',
    buttonBorder: '#c6c6c6',
    buttonActiveBackground: '#ffffff',
    buttonForeground: '#575E75',
    zoomIconFilter: 'none',
    gridColor: '#dddddd',
    checkboxFieldBackground: '#33D833'
};

const extensions = {};

const colourModifier = function(colour) {
  const contrast = (c, amt) => {
    const hsl = hex2hsl(c);
    console.log(hsl);
    hsl[2] /= amt;

    // stupid purple color fixes
    const diff = Math.max(30 - Math.abs(240 - hsl[0]), 0) / 30;
    console.log(diff);
    hsl[1] /= 1 + diff * amt;

    return hsl2hex(hsl);
  };

  return [
    colour,
    contrast(colour, 1.1),
    contrast(colour, 1.2),
    contrast(colour, 1.2)
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
