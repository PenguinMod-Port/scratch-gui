import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    defaultValue() { return false }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Block counter"
            id="pm.editorSettings.blockCounter.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Shows a block count display under each category."
            id="pm.editorSettings.blockCounter.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.Toolbox.Category.SHOW_BLOCK_COUNT = value;

        // Manually update toolbox categories
        const toolbox = ScratchBlocks.getMainWorkspace().getToolbox();
        const categories = toolbox.categoryMenu_.categories_;
        if (value) {
            for (const category of categories) category.createCounter(true);
        } else {
            for (const category of categories) category.removeCounter();
        }

        refreshWorkspace(ScratchBlocks);
    }
});
