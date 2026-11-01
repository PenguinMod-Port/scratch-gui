const XML_TYPE_REGEX = /type="([^"]+)"/g;
const XML_BUILTIN_EXT = /pin-builtin="([^"]+)"/g;
const XML_CUSTOM_EXT = /pin-custom="([^"]+)"/g;

/**
 * Saves extension dependencies into a given pin list.
 * @param {Array<String>} pinList Array of pinned blocks as xml strings.
 * @param {VM} vm Virtual machine instance.
 * @returns {Array<String>} Pin list containing the extension dependency sources.
 */
const saveExtensionPinDependencies = function (pinList, vm) {
    const manager = vm.extensionManager;
    const loadedExtensions = manager._loadedExtensions;

    for (let i = 0; i < pinList.length; i++) {
        let xml = pinList[i];
        const typeMatches = [...xml.matchAll(XML_TYPE_REGEX)];

        for (const match of typeMatches) {
            const type = match[1];
            const categoryId = type.split("_")[0];
            if (!loadedExtensions.has(categoryId)) continue;

            const extensionMetaData = loadedExtensions.get(categoryId);
            let extSrcTag;

            if (extensionMetaData.startsWith("extension_")) {
                // Built-in extension
                extSrcTag = ` pin-builtin="${categoryId}"`;
            } else {
                // Custom extension
                const srcCodeIndex = Number(extensionMetaData.split(".")[1]);
                const srcCode = manager.workerURLs[srcCodeIndex];
                extSrcTag = ` pin-custom="${srcCode}"`;
            }

            // Find the opening tag containing this specific type attribute.
            const tagStart = xml.lastIndexOf("<", match.index);
            const tagEnd = xml.indexOf(">", match.index);
            if (tagStart === -1 || tagEnd === -1) continue;

            const openingTag = xml.slice(tagStart, tagEnd);

            // Don't add the same dependency twice to this tag.
            if (openingTag.includes(extSrcTag)) continue;

            xml = xml.slice(0, tagEnd) + extSrcTag + xml.slice(tagEnd);
        }

        pinList[i] = xml;
    }

    return pinList;
};

/**
 * Loads extension dependencies from a pin list.
 * @param {Array<String>} pinList Array of pinned blocks as xml strings.
 * @param {VM} vm Virtual machine instance.
 */
const loadExtensionPinDependencies = function (pinList, vm) {
    const manager = vm.extensionManager;
    const loadedExtensions = manager._loadedExtensions;

    const builtInExts = new Set();
    const customExts = new Set();

    // Collect all extensions that need loading.
    for (let i = 0; i < pinList.length; i++) {
        const xml = pinList[i];

        for (const match of xml.matchAll(XML_BUILTIN_EXT)) {
            builtInExts.add(match[1]);
        }
        for (const match of xml.matchAll(XML_CUSTOM_EXT)) {
            customExts.add(match[1]);
        }
    }

    // Load the extensions.
    for (const ext of builtInExts) {
        if (!manager.isExtensionLoaded(ext)) {
            manager.loadExtensionIdSync(ext);
        }
    }
    for (const ext of customExts) {
        if (!manager.workerURLs.includes(ext)) {
            manager.securityManager.canLoadExtensionFromProject(ext).then(() => {
                manager.loadExtensionURL(ext);
            });
        }
    }
};

export {
    saveExtensionPinDependencies,
    loadExtensionPinDependencies
};