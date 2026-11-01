import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";

export default (class extends BooleanSetting {
    defaultValue() { return true; }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="PenguinMod Extra Gallery"
            id="pm.editorSettings.pmGallery.primary"
        />);
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Embeds a list of extensions from extensions.penguinmod.com"
            id="pm.editorSettings.pmGallery.help"
        />);
    }
});