import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import {encodeAndAddSoundToVM} from '../lib/audio/audio-util.js';

import RecordModalComponent from '../components/record-modal/record-modal.jsx';

import {
    closeSoundRecorder
} from '../reducers/modals';

class RecordModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleRecord',
            'handleStopRecording',
            'handlePlay',
            'handleStopPlaying',
            'handleBack',
            'handleSubmit',
            'handleCancel',
            'handleSetPlayhead',
            'handleSetTrimStart',
            'handleSetTrimEnd'
        ]);

        this.state = {
            mainLeftChunkLevels: null,
            rightChunkLevels: null,
            encoding: false,
            mainLeftSampleLevels: null,
            rightSampleLevels: null,
            playhead: null,
            playing: false,
            recording: false,
            sampleRate: null,
            trimStart: 0,
            trimEnd: 1
        };
    }
    handleRecord () {
        this.setState({recording: true});
    }
    handleStopRecording (mainLeftSampleLevels, rightSampleLevels, sampleRate, mainLeftChunkLevels, rightChunkLevels, trimStart, trimEnd) {
        if (mainLeftSampleLevels.length > 0) {
            this.setState({
                mainLeftSampleLevels,
                rightSampleLevels,
                sampleRate,
                mainLeftChunkLevels,
                rightChunkLevels,
                trimStart, trimEnd,
                recording: false
            });
        }
    }
    handlePlay () {
        this.setState({playing: true});
    }
    handleStopPlaying () {
        this.setState({playing: false, playhead: null});
    }
    handleBack () {
        this.setState({playing: false, mainLeftSampleLevels: null, rightSampleLevels: null});
    }
    handleSetTrimEnd (trimEnd) {
        this.setState({trimEnd});
    }
    handleSetTrimStart (trimStart) {
        this.setState({trimStart});
    }
    handleSetPlayhead (playhead) {
        this.setState({playhead});
    }
    handleSubmit () {
        this.setState({encoding: true}, () => {
            const sampleCount = this.state.mainLeftSampleLevels.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);
            const clippedSamples = this.state.mainLeftSampleLevels.slice(startIndex, endIndex);
            const buffer = {
                mainLeftSamples: this.state.mainLeftSampleLevels.slice(startIndex, endIndex),
                rightSamples: this.state.rightSampleLevels.slice(startIndex, endIndex),
                sampleRate: this.state.sampleRate
            };

            encodeAndAddSoundToVM(this.props.vm, buffer, 'recording1',
                () => {
                    this.props.onClose();
                    this.props.onNewSound();
                });
        });
    }
    handleCancel () {
        this.props.onClose();
    }
    render () {
        return (
            <RecordModalComponent
                encoding={this.state.encoding}
                mainLeftChunkLevels={this.state.mainLeftChunkLevels}
                rightChunkLevels={this.state.rightChunkLevels}
                playhead={this.state.playhead}
                playing={this.state.playing}
                recording={this.state.recording}
                sampleRate={this.state.sampleRate}
                mainLeftSampleLevels={this.state.mainLeftSampleLevels}
                rightSampleLevels={this.state.rightSampleLevels}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onBack={this.handleBack}
                onCancel={this.handleCancel}
                onPlay={this.handlePlay}
                onRecord={this.handleRecord}
                onSetPlayhead={this.handleSetPlayhead}
                onSetTrimEnd={this.handleSetTrimEnd}
                onSetTrimStart={this.handleSetTrimStart}
                onStopPlaying={this.handleStopPlaying}
                onStopRecording={this.handleStopRecording}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

RecordModal.propTypes = {
    onClose: PropTypes.func,
    onNewSound: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeSoundRecorder());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordModal);
