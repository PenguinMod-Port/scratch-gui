import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Splash Screen"
            id="pm.editorSettings.splashModal.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Shows a modal when launching the editor with easy options on what to do."
            id="pm.editorSettings.splashModal.help"
        />)
    }
});