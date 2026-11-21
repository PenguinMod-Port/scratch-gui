import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Two-column Categories"
            id="pm.editorSettings.twoColumnCategories.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Formats category list similar to Scratch 2.0."
            id="pm.editorSettings.twoColumnCategories.help"
        />)
    }
    
    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        ScratchBlocks.Toolbox.TWO_COLUMNS = value;

        let toolboxDiv = ScratchBlocks.mainWorkspace.getToolbox().HtmlDiv;
        if (value) {
            toolboxDiv.classList.add('blocklyToolboxDivColumns');
        } else {
            toolboxDiv.classList.remove('blocklyToolboxDivColumns');
        }
        ScratchBlocks.mainWorkspace.getToolbox().categoryMenu_.populate(ScratchBlocks.mainWorkspace.options.languageTree);
        ScratchBlocks.mainWorkspace.getToolbox().position()
    }
});