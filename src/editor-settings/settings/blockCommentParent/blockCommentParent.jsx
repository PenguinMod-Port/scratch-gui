import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends BooleanSetting {
    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Inherited Comment Colors"
            id="pm.editorSettings.blockCommentParent.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Makes any comment attached to a block inherit its color."
            id="pm.editorSettings.blockCommentParent.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.ScratchBubble.COMMENT_USE_PARENT = value;
        refreshWorkspace(ScratchBlocks);
    }
});