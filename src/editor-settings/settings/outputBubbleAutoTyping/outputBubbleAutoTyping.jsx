import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Typed Output Displays"
            id="pm.editorSettings.outputBubbleAutoTyping.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="When enabled, types are coloured differently to help differentiate between them."
            id="pm.editorSettings.outputBubbleAutoTyping.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.WorkspaceSvg.VALUE_REPORT_COLORS = value;
    }
});
