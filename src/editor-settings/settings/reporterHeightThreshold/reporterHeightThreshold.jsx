import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import { FormattedMessage } from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 25
    max = 300

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Reporter Height Threshold"
            id="pm.editorSettings.reporterHeightThreshold.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Percentage of the maximum height a reporter can grow before its sides stretch or expand."
            id="pm.editorSettings.reporterHeightThreshold.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.BlockSvg.REPORTER_HEIGHT_THRESHOLD = value / 100;

        refreshWorkspace(ScratchBlocks);
    }
});