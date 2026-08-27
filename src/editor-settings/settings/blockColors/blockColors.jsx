import PaletteSetting from "../../components/palette-setting/palette-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";
import defaultBlockColors from "../../../lib/default-block-colors.js";

export default (class extends PaletteSetting {
    defaultValue() {
        return defaultBlockColors;
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

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        for (let colour in this.state.value) {
            ScratchBlocks.Colours[colour] = this.state.value[colour];
        }

        refreshWorkspace(ScratchBlocks);
    }
});