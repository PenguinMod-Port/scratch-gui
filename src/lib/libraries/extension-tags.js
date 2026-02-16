import messages from './tag-messages.js';
export default [
    {tag: 'scratch', intlLabel: 'Scratch'},
    {tag: 'pm', intlLabel: 'PenguinMod'},
    {tag: 'tw', intlLabel: 'TurboWarp'},

    {type: 'divider'},

    {tag: 'graphics', intlLabel: messages.graphics},
    {tag: 'sound', intlLabel: messages.sound},
    {tag: 'math', intlLabel: messages.math},
    {tag: 'data', intlLabel: messages.data},
    {tag: 'hardware', intlLabel: messages.hardware},

    {type: 'divider'},

    {tag: 'expansion', intlLabel: messages.expansion},
    {tag: 'type', intlLabel: messages.type},
    {tag: 'language', intlLabel: messages.language},

    {type: 'divider'},

    {tag: 'library', intlLabel: messages.library},

    {type: 'divider'},

    {type: 'title', intlLabel: 'Actions'},
    {type: 'custom', intlLabel: messages.customextension, func: (library) => {
        library.select('custom_extension');
    } },
];