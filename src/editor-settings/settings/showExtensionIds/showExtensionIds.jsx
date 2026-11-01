import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Show Extension IDs"
            id="pm.editorSettings.showExtensionIds.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Makes extension IDs visible inside the extension gallery."
            id="pm.editorSettings.showExtensionIds.help"
        />)
    }
});