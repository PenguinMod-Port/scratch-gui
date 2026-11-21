import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Custom Block Color Cascading"
            id="pm.editorSettings.cascadeProcedureColors.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="When enabled, 'My Blocks' category blocks will match the colour of the custom block it is inside of."
            id="pm.editorSettings.cascadeProcedureColors.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.Procedures.COLOR_EXTENSION_ENABLED = value;
        refreshWorkspace(ScratchBlocks);
    }
});
