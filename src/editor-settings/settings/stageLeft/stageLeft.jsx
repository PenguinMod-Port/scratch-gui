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
        // temp until i find a different solution

        const flexWrapper = document.querySelector('.gui_flex-wrapper_2AgdD');
        if (!flexWrapper) return;

        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        flexWrapper.classList[value ? 'add' : 'remove']('gui_stage-left_1LDW1');

        queueMicrotask(() => ScratchBlocks.svgResize(ScratchBlocks.mainWorkspace));
    }
});