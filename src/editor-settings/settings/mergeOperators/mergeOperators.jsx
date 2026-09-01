import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Merge Operators & Strings"
            id="pm.editorSettings.mergeOperators.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Merges the strings category into the operators category."
            id="pm.editorSettings.mergeOperators.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        refreshWorkspace(ScratchBlocks);
    }
});