import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Debug Mode"
            id="pm.editorSettings.vmDebug.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Outputs debug information about compiled code to the browser's developer tools."
            id="pm.editorSettings.vmDebug.help"
        />)
    }

    setValue(value) {
        if (value === true) vm.runtime.resetAllCaches();
        vm.runtime.debug = value;
    }
});