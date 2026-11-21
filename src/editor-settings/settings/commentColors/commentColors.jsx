import PaletteSetting from "../../components/palette-setting/palette-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends PaletteSetting {
    defaultValue() {
        return {
            background: "#fef49c",
            text: "#000000"
        }
    }
    getNames() {
        return {
            background: (<FormattedMessage
                defaultMessage="Background"
                id="pm.editorSettings.commentColors.background"
            />),
            text: (<FormattedMessage
                defaultMessage="Text"
                id="pm.editorSettings.commentColors.text"
            />)
        }
    }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Default Comment Colors"
            id="pm.editorSettings.commentColors.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Choose what colors you want for new comments."
            id="pm.editorSettings.commentColors.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.ScratchBubble.DEFAULT_COMMENT_COLOR = this.state.value["background"];
        ScratchBlocks.ScratchBubble.DEFAULT_COMMENT_TEXT_COLOR = this.state.value["text"];

        refreshWorkspace(ScratchBlocks);
    }
});