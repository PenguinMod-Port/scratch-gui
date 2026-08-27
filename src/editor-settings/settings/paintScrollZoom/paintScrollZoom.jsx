import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 50
    max = 200

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Scroll Zoom Amount"
            id="pm.editorSettings.paintScrollZoom.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Determines how much you zoom in/out by using the scroll wheel."
            id="pm.editorSettings.paintScrollZoom.help"
        />)
    }
});