import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import { FormattedMessage } from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 0 }
    min = 0
    max = 150

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Notch Spacing"
            id="pm.editorSettings.notchSpacing.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Adds space between block notches."
            id="pm.editorSettings.notchSpacing.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.BlockSvg.NOTCH_SPACING = 5 * ScratchBlocks.BlockSvg.GRID_UNIT * value / 100;

        refreshWorkspace(ScratchBlocks);
    }
});