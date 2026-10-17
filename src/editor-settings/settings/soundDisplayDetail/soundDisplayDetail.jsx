import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 180 }
    min = 0
    max = 200

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Sound Display Detail"
            id="pm.editorSettings.soundDisplayDetail.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Changes the level of detail for sound waves within the sound editor."
            id="pm.editorSettings.soundDisplayDetail.help"
        />)
    }
});