import bindAll from 'lodash.bindall';
import defaultsDeep from 'lodash.defaultsdeep';
import PropTypes from 'prop-types';
import React from 'react';
import CustomProceduresComponent from '../components/custom-procedures/custom-procedures.jsx';
import LazyScratchBlocks from '../lib/tw-lazy-scratch-blocks';
import {connect} from 'react-redux';

class CustomProcedures extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAddLabel',
            'handleAddBoolean',
            'handleAddCommand',
            'handleAddArgument',
            'handleToggleWarp',
            'handleToggleTerminal',
            'handleForceOutput',
            'handleSetProcColor',
            'handleCustomColorChange',
            'handleCancel',
            'handleOk',
            'setBlocks'
        ]);
        this.state = {
            rtlOffset: 0,
            warp: false,
            terminal: false,
            forceOutput: 0,
            color: '#000000'
        };
    }
    componentWillUnmount () {
        if (this.workspace) {
            this.workspace.dispose();
        }
    }
    setBlocks (blocksRef) {
        if (!blocksRef) return;
        this.blocks = blocksRef;
        const workspaceConfig = defaultsDeep({},
            CustomProcedures.defaultOptions,
            this.props.options,
            {rtl: this.props.isRtl}
        );

        const ScratchBlocks = LazyScratchBlocks.get();
        // @todo This is a hack to make there be no toolbox.
        const oldDefaultToolbox = ScratchBlocks.Blocks.defaultToolbox;
        ScratchBlocks.Blocks.defaultToolbox = null;
        this.workspace = ScratchBlocks.inject(this.blocks, workspaceConfig);
        ScratchBlocks.Blocks.defaultToolbox = oldDefaultToolbox;

        this.blockly = ScratchBlocks;

        // Create the procedure declaration block for editing the mutation.
        this.mutationRoot = this.workspace.newBlock('procedures_declaration');
        // Make the declaration immovable, undeletable and have no context menu
        this.mutationRoot.setMovable(false);
        this.mutationRoot.setDeletable(false);
        this.mutationRoot.contextMenu = false;

        this.workspace.addChangeListener(() => {
            this.mutationRoot.onChangeFn();
            // Keep the block centered on the workspace
            const metrics = this.workspace.getMetrics();
            const {x, y} = this.mutationRoot.getRelativeToSurfaceXY();
            const dy = (metrics.viewHeight / 2) - (this.mutationRoot.height / 2) - y;
            let dx;
            if (this.props.isRtl) {
                // // TODO: https://github.com/LLK/scratch-gui/issues/2838
                // This is temporary until we can figure out what's going on width
                // block positioning on the workspace for RTL.
                // Workspace is always origin top-left, with x increasing to the right
                // Calculate initial starting offset and save it, every other move
                // has to take the original offset into account.
                // Calculate a new left postion based on new width
                // Convert current x position into LTR (mirror) x position (uses original offset)
                // Use the difference between ltrX and mirrorX as the amount to move
                const ltrX = ((metrics.viewWidth / 2) - (this.mutationRoot.width / 2) + 25);
                const mirrorX = x - ((x - this.state.rtlOffset) * 2);
                if (mirrorX === ltrX) {
                    return;
                }
                dx = mirrorX - ltrX;
                const midPoint = metrics.viewWidth / 2;
                if (x === 0) {
                    // if it's the first time positioning, it should always move right
                    if (this.mutationRoot.width < midPoint) {
                        dx = ltrX;
                    } else if (this.mutationRoot.width < metrics.viewWidth) {
                        dx = midPoint - ((metrics.viewWidth - this.mutationRoot.width) / 2);
                    } else {
                        dx = midPoint + (this.mutationRoot.width - metrics.viewWidth);
                    }
                    this.mutationRoot.moveBy(dx, dy);
                    this.setState({rtlOffset: this.mutationRoot.getRelativeToSurfaceXY().x});
                    return;
                }
                if (this.mutationRoot.width > metrics.viewWidth) {
                    dx = dx + this.mutationRoot.width - metrics.viewWidth;
                }
            } else {
                dx = (metrics.viewWidth / 2) - (this.mutationRoot.width / 2) - x;
                // If the procedure declaration is wider than the view width,
                // keep the right-hand side of the procedure in view.
                if (this.mutationRoot.width > metrics.viewWidth) {
                    dx = metrics.viewWidth - this.mutationRoot.width - x;
                }
            }
            this.mutationRoot.moveBy(dx, dy);
        });
        this.mutationRoot.domToMutation(this.props.mutator);
        this.mutationRoot.initSvg();
        this.mutationRoot.render();
        this.setState({
            warp: this.mutationRoot.getWarp(),
            forceOutput: this.mutationRoot.getForceOutput(),
            terminal: this.mutationRoot.isTerminal_,
            color: this.mutationRoot.procColour_.startsWith("#") ? this.mutationRoot.procColour_ : "#000000"
        });

        // Allow the initial events to run to position this block, then focus.
        setTimeout(() => {
            this.mutationRoot.focusLastEditor_();

            if (this.state.forceOutput === 0) {
                this.mutationRoot.setNextStatement(!this.state.terminal);
            } else {
                this.mutationRoot.setOutputShape(this.state.forceOutput);
                this.mutationRoot.setOutput(true);
                this.mutationRoot.setNextStatement(false);
                this.mutationRoot.setPreviousStatement(false);
            }
        });
    }
    handleCancel () {
        this.props.onRequestClose();
    }
    handleOk () {
        const newMutation = this.mutationRoot ? this.mutationRoot.mutationToDom(true) : null;
        this.props.onRequestClose(newMutation);
    }
    handleAddLabel () {
        if (this.mutationRoot) {
            this.mutationRoot.addLabelExternal();
        }
    }
    handleAddBoolean () {
        if (this.mutationRoot) {
            this.mutationRoot.addBooleanExternal();
        }
    }
    handleAddCommand () {
        if (this.mutationRoot) {
            this.mutationRoot.addCommandExternal();
        }
    }
    handleAddArgument (type) {
        if (this.mutationRoot) {
            this.mutationRoot.addArgumentExternal(type);
        }
    }
    handleToggleWarp () {
        if (this.mutationRoot) {
            const newWarp = !this.mutationRoot.getWarp();
            this.mutationRoot.setWarp(newWarp);
            this.setState({warp: newWarp});
        }
    }
    handleToggleTerminal () {
        if (this.mutationRoot) {
            const isReporter = this.mutationRoot.getForceOutput() == 0;
            const newTerminal = !this.mutationRoot.isTerminal_;

            this.mutationRoot.isTerminal_ = newTerminal;
            if (isReporter) {
                this.mutationRoot.setNextStatement(!newTerminal)
            }
            this.mutationRoot.updateDisplay_();
            this.setState({terminal: newTerminal});
        }
    } 
    handleForceOutput (value) {
        if (this.mutationRoot) {
            this.mutationRoot.setForceOutput(value);

            this.mutationRoot.setOutputShape(value == 0 ? 3 : Number(value));
            this.mutationRoot.setOutput(value != 0);
            this.mutationRoot.setPreviousStatement(value == 0);
            this.mutationRoot.setNextStatement(value == 0
                ? !this.state.terminal
                : false
            );

            // If we are currently editing a argument/label name,
            // calling this will fix any incorrect positioning on the screen.
            this.blockly.WidgetDiv.repositionForWindowResize();

            this.setState({forceOutput: value});
        }
    }
    handleSetProcColor (value) {
        if (this.mutationRoot) {
            this.mutationRoot.procColour_ = value;
            this.mutationRoot.updateDisplay_();
            this.mutationRoot.updateDisplay_(); // Call a second time to fix shadow outlines
            this.setState({color: value.startsWith("#") ? value : "#000000"});
        }
    }
    handleCustomColorChange (e) {
        this.handleSetProcColor(e.target.value);
    }
    render () {
        // TODO
        return (
            <CustomProceduresComponent
                componentRef={this.setBlocks}
                warp={this.state.warp}
                terminal={this.state.terminal}
                forceOutput={this.state.forceOutput}
                onAddBoolean={this.handleAddBoolean}
                onAddCommand={this.handleAddCommand}
                onAddLabel={this.handleAddLabel}
                onAddTextNumber={this.handleAddArgument}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                onToggleWarp={this.handleToggleWarp}
                onToggleTerminal={this.handleToggleTerminal}
                onForceOutput={this.handleForceOutput}
                setProcColor={this.handleSetProcColor}
                onCustomColorChange={this.handleCustomColorChange}
                currentColor={this.state.color}
            />
        );
    }
}

CustomProcedures.propTypes = {
    isRtl: PropTypes.bool,
    mutator: PropTypes.instanceOf(Element),
    onRequestClose: PropTypes.func.isRequired,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        comments: PropTypes.bool,
        collapse: PropTypes.bool
    })
};

CustomProcedures.defaultOptions = {
    zoom: {
        controls: false,
        wheel: false,
        startScale: 0.9
    },
    comments: false,
    collapse: false,
    scrollbars: true
};

CustomProcedures.defaultProps = {
    options: CustomProcedures.defaultOptions
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl,
    mutator: state.scratchGui.customProcedures.mutator
});

export default connect(
    mapStateToProps
)(CustomProcedures);
