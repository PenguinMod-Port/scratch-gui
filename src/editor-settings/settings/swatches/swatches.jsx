import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Swatches"
            id="pm.editorSettings.swatches.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Adds options to the block context menu to switch a block with another similar block."
            id="pm.editorSettings.swatches.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        ScratchBlocks.BlockSvg.SWATCHES = value;
    }
});