import IntegerSetting from "../../components/integer-setting/integer-setting.jsx";
import { FormattedMessage } from 'react-intl';
import React from 'react';
import LazyScratchBlocks from "../../../lib/tw-lazy-scratch-blocks.js";
import refreshWorkspace from "../../util/refreshWorkspace.js";

export default (class extends IntegerSetting {
    defaultValue() { return 100 }
    min = 0
    max = 300

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Corner Radius"
            id="pm.editorSettings.cornerRadius.primary"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Changes how rounded command blocks and square reporters are."
            id="pm.editorSettings.cornerRadius.help"
        />)
    }

    async setValue(value) {
        await LazyScratchBlocks.load();
        let ScratchBlocks = LazyScratchBlocks.get();

        ScratchBlocks.BlockSvg.CORNER_RADIUS = ScratchBlocks.BlockSvg.GRID_UNIT * value / 100;

        // copied from block_render_svg.js
        ScratchBlocks.BlockSvg.TOP_LEFT_CORNER_START =
            'm 0,' + ScratchBlocks.BlockSvg.CORNER_RADIUS;
        ScratchBlocks.BlockSvg.TOP_LEFT_CORNER =
            'A ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',0';
        ScratchBlocks.BlockSvg.TOP_RIGHT_CORNER =
            'a ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS;
        ScratchBlocks.BlockSvg.BOTTOM_RIGHT_CORNER =
            ' a ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS;
        ScratchBlocks.BlockSvg.BOTTOM_LEFT_CORNER =
            'a ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',-' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS;
        ScratchBlocks.BlockSvg.INNER_TOP_LEFT_CORNER =
            ' a ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS;
        ScratchBlocks.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
            'a ' + ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS + ',' +
            ScratchBlocks.BlockSvg.CORNER_RADIUS;

        refreshWorkspace(ScratchBlocks);
    }
});