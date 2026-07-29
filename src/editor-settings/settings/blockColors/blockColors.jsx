import PaletteSetting from "../../components/palette-setting/palette-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';

export default (class extends PaletteSetting {
    defaultValue() {
        return {
            motion: "#4C97FF",
            looks: "#9966FF",
            sounds: "#CF63CF",
            control: "#FFAB19",
            event: "#FFBF00",
            sensing: "#5CB1D6",
            operators: "#59C059",
            data: "#FF8C1A",
            data_lists: "#FF661A",
            more: "#FF6680",
        };
    }
    getNames() {
        return {
            motion: (<FormattedMessage
                defaultMessage="Motion"
                id="pm.editorSettings.blockColors.motion"
            />),
            looks: (<FormattedMessage
                defaultMessage="Looks"
                id="pm.editorSettings.blockColors.looks"
            />),
            sounds: (<FormattedMessage
                defaultMessage="Sound"
                id="pm.editorSettings.blockColors.sounds"
            />),
            control: (<FormattedMessage
                defaultMessage="Control"
                id="pm.editorSettings.blockColors.control"
            />),
            event: (<FormattedMessage
                defaultMessage="Events"
                id="pm.editorSettings.blockColors.event"
            />),
            sensing: (<FormattedMessage
                defaultMessage="Sensing"
                id="pm.editorSettings.blockColors.sensing"
            />),
            operators: (<FormattedMessage
                defaultMessage="Operators"
                id="pm.editorSettings.blockColors.operators"
            />),
            data: (<FormattedMessage
                defaultMessage="Variables"
                id="pm.editorSettings.blockColors.data"
            />),
            data_lists: (<FormattedMessage
                defaultMessage="Lists"
                id="pm.editorSettings.blockColors.data_lists"
            />),
            more: (<FormattedMessage
                defaultMessage="My Blocks"
                id="pm.editorSettings.blockColors.more"
            />)
        }
    }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Category Colors"
            id="pm.editorSettings.blockColors.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="poopy"
            id="pm.editorSettings.blockColors.help"
        />)
    }
});