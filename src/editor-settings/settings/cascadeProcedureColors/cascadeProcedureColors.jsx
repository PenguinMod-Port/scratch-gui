import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Disable custom block color cascading"
            id="pm.editorSettings.cascadeProcedureColors.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Disables custom block colors from cascading down the define block stack. If disabled, only the block inside the define block keeps its color."
            id="pm.editorSettings.cascadeProcedureColors.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.Procedures.COLOR_EXTENSION_ENABLED = !value;
        refreshWorkspace(ScratchBlocks);
    }
});
