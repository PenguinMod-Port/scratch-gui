import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Hide Lists"
            id="pm.editorSettings.hideLists.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Removes the lists category from the toolbox."
            id="pm.editorSettings.hideLists.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        refreshWorkspace(ScratchBlocks);
    }
});
