import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Hide Expandables"
            id="pm.editorSettings.disableExpandables.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Removes the buttons for expandable blocks, instead replacing them with buttons in the context menu."
            id="pm.editorSettings.disableExpandables.help"
        />)
    }
    
    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        ScratchBlocks.BlockSvg.HIDE_EXPANDABLES = value;
        refreshWorkspace(ScratchBlocks);
    }
});