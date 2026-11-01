import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import { FormattedMessage } from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 0
    max = 150

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Notch Height"
            id="pm.editorSettings.notchHeight.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Changes how big block notches are."
            id="pm.editorSettings.notchHeight.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.BlockSvg.NOTCH_HEIGHT = 2 * ScratchBlocks.BlockSvg.GRID_UNIT * value / 100;

        refreshWorkspace(ScratchBlocks);
    }
});