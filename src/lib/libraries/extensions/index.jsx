import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import faceSensingIconURL from './faceSensing/face-sensing.svg';
import faceSensingInsetIconURL from './faceSensing/face-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

import twIcon from './tw/tw.svg';
import customExtensionIcon from './custom/custom.svg';
import returnIcon from './custom/return.svg';
import galleryIcon from './gallery/gallery.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        tags: ['scratch', 'sound'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        tags: ['scratch', 'graphics'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        tags: ['scratch', 'graphics'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Face Sensing"
                description="Name for the 'Face Sensing' extension"
                id="tw.extension.faceSensing.name"
            />
        ),
        extensionId: 'faceSensing',
        extensionURL: 'https://extensions.turbowarp.org/lab/face-sensing.js',
        iconURL: faceSensingIconURL,
        insetIconURL: faceSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense faces with the camera."
                description="Description for the 'Face Sensing' extension"
                id="tw.extension.faceSensing.description"
            />
        ),
        tags: ['scratch', 'graphics'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        tags: ['scratch'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        tags: ['scratch'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        collaborator: 'micro:bit',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        collaborator: 'LEGO',
        iconURL: ev3IconURL,
        insetIconURL: ev3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: ev3ConnectionIconURL,
        connectionSmallIconURL: ev3ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO BOOST',
        extensionId: 'boost',
        collaborator: 'LEGO',
        iconURL: boostIconURL,
        insetIconURL: boostInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: boostConnectionIconURL,
        connectionSmallIconURL: boostConnectionSmallIconURL,
        connectionTipIconURL: boostConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their BOOST."
                id="gui.extension.boost.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/boost'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        extensionId: 'wedo2',
        collaborator: 'LEGO',
        iconURL: wedo2IconURL,
        insetIconURL: wedo2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: wedo2ConnectionIconURL,
        connectionSmallIconURL: wedo2ConnectionSmallIconURL,
        connectionTipIconURL: wedo2ConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    },
    {
        name: 'Go Direct Force & Acceleration',
        extensionId: 'gdxfor',
        collaborator: 'Vernier',
        iconURL: gdxforIconURL,
        insetIconURL: gdxforInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense push, pull, motion, and spin."
                description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
                id="gui.extension.gdxfor.description"
            />
        ),
        tags: ['scratch', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/vernier'
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Custom Extension"
                description="Name of library item to load a custom extension from a remote source"
                id="tw.customExtension.name"
            />
        ),
        extensionId: 'custom_extension',
        iconURL: customExtensionIcon,
        description: (
            <FormattedMessage
                defaultMessage="Load custom extensions from URLs, files, or JavaScript source code."
                description="Description of library item to load a custom extension from a custom source"
                id="tw.customExtension.description"
            />
        ),
        tags: [],
        featured: true
    }
];

export const galleryLoading = {
    name: (
        <FormattedMessage
            defaultMessage="TurboWarp Extension Gallery"
            description="Name of extensions.turbowarp.org in extension library"
            id="tw.extensionGallery.name"
        />
    ),
    href: 'https://extensions.turbowarp.org/',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Loading extension gallery..."
            description="Appears while loading extension list from the custom extension gallery"
            id="tw.extensionGallery.loading"
        />
    ),
    tags: ['tw', 'library'],
    featured: true
};

export const galleryMore = {
    name: (
        <FormattedMessage
            defaultMessage="TurboWarp Extension Gallery"
            description="Name of extensions.turbowarp.org in extension library"
            id="tw.extensionGallery.name"
        />
    ),
    href: 'https://extensions.turbowarp.org/',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Learn more about extensions at extensions.turbowarp.org."
            description="Appears after the extension list from the gallery was loaded successfully"
            id="tw.extensionGallery.more"
        />
    ),
    tags: ['tw', 'library'],
    featured: true
};

export const galleryError = {
    name: (
        <FormattedMessage
            defaultMessage="TurboWarp Extension Gallery"
            description="Name of extensions.turbowarp.org in extension library"
            id="tw.extensionGallery.name"
        />
    ),
    href: 'https://extensions.turbowarp.org/',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Error loading extension gallery. Visit extensions.turbowarp.org to find more extensions."
            description="Appears when an error occurred loading extension list from the custom extension gallery"
            id="tw.extensionGallery.error"
        />
    ),
    tags: ['tw', 'library'],
    featured: true
};

export const penguinmodGallery = [
    {
        name: (
            <FormattedMessage
                defaultMessage="Controls Expansion"
                description="Name for the pmControlsExpansion extension"
                id="pm.gui.extension.pmControlsExpansion.name"
            />
        ),
        extensionId: 'pmControlsExpansion',
        iconURL: require('../extensions/penguinmod/pmControlsExpansion.svg'),
        description: (
            <FormattedMessage
                defaultMessage="More control blocks for animations, complex systems or cleaner one-time use blocks."
                description="Description for the pmControlsExpansion extension"
                id="pm.gui.extension.pmControlsExpansion.description"
            />
        ),
        tags: ['pm', 'expansion']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Operators Expansion"
                description="Name for the pmOperatorsExpansion extension"
                id="pm.gui.extension.pmOperatorsExpansion.name"
            />
        ),
        extensionId: 'pmOperatorsExpansion',
        iconURL: require('../extensions/penguinmod/pmOperatorsExpansion.svg'),
        description: (
            <FormattedMessage
                defaultMessage="More operators like nand, nor, character code to character, reading multiple lined text line by line, etc."
                description="Description for the pmOperatorsExpansion extension"
                id="pm.gui.extension.pmOperatorsExpansion.description"
            />
        ),
        tags: ['pm', 'expansion']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Arrays"
                description="Name for the jwArray extension"
                id="pm.gui.extension.jwArray.name"
            />
        ),
        extensionId: 'jwArray',
        iconURL: require('../extensions/penguinmod/jwArray.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Store data efficiently in multi-purpose arrays."
                description="Description for the jwArray extension"
                id="pm.gui.extension.jwArray.description"
            />
        ),
        tags: ['pm', 'data', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Integers"
                description="Name for the jwInt extension"
                id="pm.gui.extension.jwInt.name"
            />
        ),
        extensionId: 'jwInt',
        iconURL: require('../extensions/penguinmod/jwInt.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Large integers with zero precision loss."
                description="Description for the jwInt extension"
                id="pm.gui.extension.jwInt.description"
            />
        ),
        tags: ['pm', 'math', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Objects"
                description="Name for the dogeiscutObject extension"
                id="pm.gui.extension.dogeiscutObject.name"
            />
        ),
        credits: ['DogeisCut'],
        extensionId: 'https://extensions.penguinmod.com/extensions/DogeisCut/dogeiscutObject.js',
        iconURL: require('../extensions/penguinmod/dogeiscutObject.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Store data efficiently in multi-purpose objects."
                description="Description for the dogeiscutObject extension"
                id="pm.gui.extension.dogeiscutObject.description"
            />
        ),
        tags: ['pm', 'data', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="XML"
                description="Name for the jwXML extension"
                id="pm.gui.extension.jwXML.name"
            />
        ),
        extensionId: 'jwXML',
        iconURL: require('../extensions/penguinmod/jwXML.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Creating, parsing and modifying XML data."
                description="Description for the jwXML extension"
                id="pm.gui.extension.jwXML.description"
            />
        ),
        tags: ['pm', 'data', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Infinity"
                description="Name for the jwNum extension"
                id="pm.gui.extension.jwNum.name"
            />
        ),
        extensionId: 'jwNum',
        iconURL: require('../extensions/penguinmod/jwNum.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Advanced number type capable of massive numbers."
                description="Description for the jwNum extension"
                id="pm.gui.extension.jwNum.description"
            />
        ),
        tags: ['pm', 'math', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Storage"
                description="Name for the jgStorage extension"
                id="pm.gui.extension.jgStorage.name"
            />
        ),
        extensionId: 'jgStorage',
        iconURL: require('../extensions/penguinmod/jgStorage.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Store data after PenguinMod has already been closed out. Basic Server Storage is also included."
                description="Description for the jgStorage extension"
                id="pm.gui.extension.jgStorage.description"
            />
        ),
        tags: ['pm', 'data'],
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Vector"
                description="Name for the jwVector extension"
                id="pm.gui.extension.jwVector.name"
            />
        ),
        extensionId: 'jwVector',
        iconURL: require('../extensions/penguinmod/jwVector.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Math with direction and magnitude."
                description="Description for the jwVector extension"
                id="pm.gui.extension.jwVector.description"
            />
        ),
        tags: ['pm', 'math', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Scope"
                description="Name for the jwScope extension"
                id="pm.gui.extension.jwScope.name"
            />
        ),
        extensionId: 'jwScope',
        iconURL: require('../extensions/penguinmod/jwScope.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Temporary variables based on block stack. (extra blocks if used with Array extension)"
                description="Description for the jwScope extension"
                id="pm.gui.extension.jwScope.description"
            />
        ),
        tags: ['pm']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Targets"
                description="Name for the jwTargets extension"
                id="pm.gui.extension.jwTargets.name"
            />
        ),
        extensionId: 'jwTargets',
        iconURL: require('../extensions/penguinmod/jwTargets.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Direct access to sprites and their clones."
                description="Description for the jwTargets extension"
                id="pm.gui.extension.jwTargets.description"
            />
        ),
        tags: ['pm', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pointers"
                description="Name for the jwPointer extension"
                id="pm.gui.extension.jwPointer.name"
            />
        ),
        extensionId: 'jwPointer',
        iconURL: require('../extensions/penguinmod/jwPointer.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Define references to values. (extra blocks if used with Array extension)"
                description="Description for the jwPointer extension"
                id="pm.gui.extension.jwPointer.description"
            />
        ),
        tags: ['pm', 'data', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Color"
                description="Name for the jwColor extension"
                id="pm.gui.extension.jwColor.name"
            />
        ),
        extensionId: 'jwColor',
        iconURL: require('../extensions/penguinmod/jwColor.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Utilities for anything involving colors."
                description="Description for the jwColor extension"
                id="pm.gui.extension.jwColor.description"
            />
        ),
        tags: ['pm', 'graphics', 'type']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Lambda"
                description="Name for the jwLambda extension"
                id="pm.gui.extension.jwLambda.name"
            />
        ),
        extensionId: 'jwLambda',
        iconURL: require('../extensions/penguinmod/jwLambda.svg'),
        description: (
            <FormattedMessage
                defaultMessage="Create and execute anonymous functions."
                description="Description for the jwLambda extension"
                id="pm.gui.extension.jwLambda.description"
            />
        ),
        tags: ['pm', 'type']
    },
]