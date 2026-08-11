import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 0
    max = 1000

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Bumpscosity"
            id="pm.editorSettings.test.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Changes the level of bumpscosity."
            id="pm.editorSettings.test.help"
        />)
    }
});