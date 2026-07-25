import musicIcon from './high-contrast-media/extensions/musicIcon.svg';
import penIcon from './high-contrast-media/extensions/penIcon.svg';
import text2speechIcon from './high-contrast-media/extensions/text2speechIcon.svg';
import translateIcon from './high-contrast-media/extensions/translateIcon.svg';
import videoSensingIcon from './high-contrast-media/extensions/videoSensingIcon.svg';
import {hex2hsv, hsv2hex} from '../../tw-color-utils';

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
    menuHover: 'rgba(255, 255, 255, 0.3)'
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

export {
    blockColors,
    extensions
};
