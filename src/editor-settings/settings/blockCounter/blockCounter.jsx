import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    defaultValue() { return true }

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
        refreshWorkspace(ScratchBlocks);
    }
});
