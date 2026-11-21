import {BLOCKS_THREE} from '.';

const getBlockIconURI = extensionIcons => {
    if (!extensionIcons) return null;

    return extensionIcons.blockIconURI || extensionIcons.menuIconURI;
};

const getCategoryIconURI = extensionIcons => {
    if (!extensionIcons) return null;

    return extensionIcons.menuIconURI || extensionIcons.blockIconURI;
};

// scratch-blocks colours has a pen property that scratch-gui uses for all extensions
const getExtensionColors = theme => theme.getBlockColors().pen;

const injectBlockIcons = (blockInfoJson, theme) => {
    // Block icons are the first element of `args0`
    if (!blockInfoJson.args0 || blockInfoJson.args0.length < 1 ||
        blockInfoJson.args0[0].type !== 'field_image') return blockInfoJson;

    const extensionIcons = theme.getExtensions();
    const extensionId = blockInfoJson.type.substring(0, blockInfoJson.type.indexOf('_'));
    const blockIconURI = getBlockIconURI(extensionIcons[extensionId]);

    if (!blockIconURI) return blockInfoJson;

    return {
        ...blockInfoJson,
        args0: blockInfoJson.args0.map((value, index) => {
            if (index !== 0) return value;

            return {
                ...value,
                src: blockIconURI
            };
        })
    };
};

/**
 * Applies extension color theme to static block json.
 * No changes are applied if called with the default theme, allowing extensions to provide their own colors.
 * @param {object} blockInfoJson - Static block json
 * @param {Theme} theme - Theme name
 * @returns {object} Block info json with updated colors. The original blockInfoJson is not modified.
 */
const injectExtensionBlockTheme = (blockInfoJson, theme) => {
    // Minor optimization -- don't do anything at all for the default theme.
    if (theme.blocks === BLOCKS_THREE || !blockInfoJson.extensions?.includes('default_extension_colors')) return blockInfoJson;

    const extensionColors = getExtensionColors(theme);

    return {
        ...injectBlockIcons(blockInfoJson, theme),
        colour: extensionColors
    };
};

export {
    injectExtensionBlockTheme
};
