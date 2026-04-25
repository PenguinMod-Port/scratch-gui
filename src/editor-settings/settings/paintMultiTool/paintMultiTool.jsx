import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Group Tools"
            id="pm.editorSettings.paintMultiTool.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Similar tools in the paint editor are grouped together."
            id="pm.editorSettings.paintMultiTool.help"
        />)
    }
});