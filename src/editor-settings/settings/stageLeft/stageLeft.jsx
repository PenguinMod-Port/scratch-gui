import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Display Stage on Left"
            id="pm.editorSettings.stageLeft.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Positions the stage on the left instead of the right."
            id="pm.editorSettings.stageLeft.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        queueMicrotask(() => ScratchBlocks.svgResize(ScratchBlocks.mainWorkspace));
    }
});