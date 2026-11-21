import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends BooleanSetting {
    defaultValue() { return false }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Project Block Counter"
            id="pm.editorSettings.projectBlockCounter.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Shows a block count for all blocks in the project."
            id="pm.editorSettings.projectBlockCounter.help"
        />)
    }

    async setValue(value) {
        window.vm.emit("PROJECT_CHANGED");
    }
});
