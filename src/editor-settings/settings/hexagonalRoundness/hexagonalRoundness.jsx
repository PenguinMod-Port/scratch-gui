import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 0
    max = 200

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Hexagonal Curvature"
            id="pm.editorSettings.hexagonalRoundness.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Makes the hexagonal and indented shapes more rounded."
            id="pm.editorSettings.hexagonalRoundness.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        console.log(ScratchBlocks);
        
        ScratchBlocks.BlockSvg.HEXAGONAL_SHAPE_ROUNDNESS = ScratchBlocks.BlockSvg.GRID_UNIT * value / 100;
        refreshWorkspace(ScratchBlocks);
    }
});