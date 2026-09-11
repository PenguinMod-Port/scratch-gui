import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

const NAMESPACE = "PM_BLOCK-PINS";

// Remove the old namespace. No point in compatibility since the stored
// values has changed immensely.
try {
    localStorage.removeItem("ADDONS_BLOCK-PINS");
} catch {};

export default (class extends BooleanSetting {
    defaultValue() { return false }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Block Pinning"
            id="pm.editorSettings.blockPinning.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Enables the option to pin blocks when right-clicked in the toolbox."
            id="pm.editorSettings.blockPinning.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.BlockSvg.PINS_ENABLED = value;

        let storedPins = [];
        if (value) {
            // If we have pins in storage, apply it.
            try {
                const stored = localStorage.getItem(NAMESPACE);

                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === "object" && Array.isArray(parsed)) {
                    storedPins = parsed;
                }
            } catch {}
        } else {
            try {
                localStorage.removeItem(NAMESPACE);
            } catch {}
        }

        ScratchBlocks.BlockSvg.PINS = storedPins;
        console.log(this);
        ScratchBlocks.BlockSvg.pinCallback();
    }
});
