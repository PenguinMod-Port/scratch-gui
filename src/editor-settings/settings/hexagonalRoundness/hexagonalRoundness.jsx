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
            defaultMessage="Shape Curvature"
            id="pm.editorSettings.hexagonalRoundness.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Makes shapes with pointy edges (hexagonal, indented, slanted) more rounded."
            id="pm.editorSettings.hexagonalRoundness.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();
        
        ScratchBlocks.BlockSvg.HEXAGONAL_SHAPE_ROUNDNESS = ScratchBlocks.BlockSvg.GRID_UNIT * value / 100;
        refreshWorkspace(ScratchBlocks);
    }
});