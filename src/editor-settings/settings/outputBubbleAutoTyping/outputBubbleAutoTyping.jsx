import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Disable type-based colors for block output bubbles"
            id="pm.editorSettings.outputBubbleAutoTyping.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Disables colors that represent data types inside block output bubbles."
            id="pm.editorSettings.outputBubbleAutoTyping.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.WorkspaceSvg.VALUE_REPORT_COLORS = !value;
        refreshWorkspace(ScratchBlocks);
    }
});
