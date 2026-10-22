import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Category Reordering"
            id="pm.editorSettings.categoryReordering.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Allows categories to be reordered. Changes are saved to your project."
            id="pm.editorSettings.categoryReordering.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        ScratchBlocks.Toolbox.CATEGORY_DRAG_ENABLED = value;
    }
});