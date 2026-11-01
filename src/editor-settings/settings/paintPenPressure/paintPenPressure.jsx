import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    defaultValue() { return true }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Pen Pressure"
            id="pm.editorSettings.paintPenPressure.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="When using a stylus pen, how hard you press affects the size of the brush."
            id="pm.editorSettings.paintPenPressure.help"
        />)
    }
});