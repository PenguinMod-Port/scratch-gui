import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import WavEncoder from 'wav-encoder';
import VM from 'scratch-vm';
import SettingsStore from '../editor-settings/settings-store-singleton';

import {connect} from 'react-redux';

import {
    computeChunkedRMS,
    encodeAndAddSoundToVM,
    downsampleIfNeeded,
    dropEveryOtherSample
} from '../lib/audio/audio-util.js';
import AudioEffects from '../lib/audio/audio-effects.js';
import SoundEditorComponent from '../components/sound-editor/sound-editor.jsx';
import AudioBufferPlayer from '../lib/audio/audio-buffer-player.js';
import log from '../lib/log.js';

const UNDO_STACK_SIZE = 99;

const MAX_RMS = 1.2;

class SoundEditor extends React.Component {
    static EDITOR_SETTINGS_LISTENER_ATTACHED = false;
    static EDITOR_SETTING_CALLBACK = null;

    static listenToEditorSettings () {
        if (SoundEditor.EDITOR_SETTINGS_LISTENER_ATTACHED) return;

        // Force bind this editor setting to the GUI by attaching a 'set' listener.
        const originalDescriptor = Object.getOwnPropertyDescriptor(SettingsStore.store, 'soundDisplayDetail');
        let soundDisplayDetail = SettingsStore.store.soundDisplayDetail;
        Object.defineProperty(SettingsStore.store, 'soundDisplayDetail', {
            configurable: true,
            enumerable: originalDescriptor?.enumerable ?? true,
            get() {
                return soundDisplayDetail;
            },
            set(value) {
                soundDisplayDetail = value;
                if (SoundEditor.EDITOR_SETTING_CALLBACK) {
                    SoundEditor.EDITOR_SETTING_CALLBACK();
                }
            }
        });

        SoundEditor.EDITOR_SETTINGS_LISTENER_ATTACHED = true;
    }

    constructor (props) {
        super(props);
        bindAll(this, [
            'copy',
            'copyCurrentBuffer',
            'handleCopyToNew',
            'handleStoppedPlaying',
            'handleChangeName',
            'handlePlay',
            'handleStopPlaying',
            'handleUpdatePlayhead',
            'handleDelete',
            'handleUpdateTrim',
            'handleEffect',
            'handleUndo',
            'handleRedo',
            'handleSettingsChange',
            'submitNewSamples',
            'handleCopy',
            'handlePaste',
            'paste',
            'handleKeyPress',
            'handleContainerClick',
            'handleChannelFocus',
            'handleToggleFormat',
            'handleWaveformDetail',
            'getNormalizedWaveformDetail',
            'setRef',
            'resampleBufferToRate'
        ]);
        this.state = {
            copyBuffer: null,
            mainLeftChunkLevels: computeChunkedRMS(this.props.mainLeftSamples),
            rightChunkLevels: computeChunkedRMS(this.props.rightSamples),
            playhead: null, // null is not playing, [0 -> 1] is playing percent
            trimStart: null,
            trimEnd: null,
            focusedChannel: -1, // Edit both channels by default
            waveformDetail: 1024,
        };

        this.redoStack = [];
        this.undoStack = [];

        this.ref = null;

        SoundEditor.listenToEditorSettings();
        SoundEditor.EDITOR_SETTING_CALLBACK = this.handleSettingsChange;
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(
            this.props.mainLeftSamples,
            this.props.rightSamples,
            this.props.sampleRate
        );

        document.addEventListener('keydown', this.handleKeyPress);

        this.handleSettingsChange();
    }
    componentWillReceiveProps (newProps) {
        if (newProps.soundId !== this.props.soundId) { // A different sound has been selected
            this.redoStack = [];
            this.undoStack = [];
            this.resetState(
                newProps.mainLeftSamples,
                newProps.rightSamples,
                newProps.sampleRate
            );
            this.setState({
                trimStart: null,
                trimEnd: null
            });
        }
    }
    componentWillUnmount () {
        this.audioBufferPlayer.stop();

        document.removeEventListener('keydown', this.handleKeyPress);
    }
    handleKeyPress (event) {
        if (event.target instanceof HTMLInputElement) {
            // Ignore keyboard shortcuts if a text input field is focused
            return;
        }
        if (this.props.isFullScreen) {
            // Ignore keyboard shortcuts if the stage is fullscreen mode
            return;
        }
        if (event.key === ' ') {
            event.preventDefault();
            if (this.state.playhead) {
                this.handleStopPlaying();
            } else {
                this.handlePlay();
            }
        }
        if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
            if (event.shiftKey) {
                this.handleDeleteInverse();
            } else {
                this.handleDelete();
            }
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            this.handleUpdateTrim(null, null);
        }
        if (event.metaKey || event.ctrlKey) {
            if (event.shiftKey && event.key.toLowerCase() === 'z') {
                event.preventDefault();
                if (this.redoStack.length > 0) {
                    this.handleRedo();
                }
            } else if (event.key === 'z') {
                if (this.undoStack.length > 0) {
                    event.preventDefault();
                    this.handleUndo();
                }
            } else if (event.key === 'c') {
                event.preventDefault();
                this.handleCopy();
            } else if (event.key === 'v') {
                event.preventDefault();
                this.handlePaste();
            } else if (event.key === 'a') {
                event.preventDefault();
                this.handleUpdateTrim(0, 1);
            }
        }
    }
    resetState (mainLeftSamples, rightSamples, sampleRate) {
        this.audioBufferPlayer.stop();
        this.audioBufferPlayer = new AudioBufferPlayer(
            mainLeftSamples,
            rightSamples,
            sampleRate
        );
        this.setState({
            mainLeftChunkLevels: computeChunkedRMS(mainLeftSamples, this.state.waveformDetail),
            rightChunkLevels: computeChunkedRMS(rightSamples, this.state.waveformDetail),
            playhead: null
        });
    }
    submitNewSamples (newChannelSamples, sampleRate, skipUndo, forceMono) {
        const soundBuffer = {
            mainLeftSamples: newChannelSamples[0],
            rightSamples: newChannelSamples[1],
            sampleRate
        };
        return downsampleIfNeeded(soundBuffer, this.resampleBufferToRate)
            .then((downsampledBuffer) =>
                WavEncoder.encode({
                    sampleRate: downsampledBuffer.sampleRate,
                    channelData: forceMono ? [downsampledBuffer.channelSamples[0]] : downsampledBuffer.channelSamples
                }).then(wavBuffer => {
                    if (!skipUndo) {
                        this.redoStack = [];
                        if (this.undoStack.length >= UNDO_STACK_SIZE) {
                            this.undoStack.shift(); // Drop the first element off the array
                        }

                        this.undoStack.push(this.getUndoItem());
                    }

                    this.resetState(
                        downsampledBuffer.channelSamples[0],
                        downsampledBuffer.channelSamples[1],
                        downsampledBuffer.sampleRate
                    );
                    this.props.vm.updateSoundBuffer(
                        this.props.soundIndex,
                        this.audioBufferPlayer.buffer,
                        new Uint8Array(wavBuffer),
                        forceMono
                    );
                    return true; // Edit was successful
                })
            )
            .catch(e => {
                // Encoding failed, or the sound was too large to save so edit is rejected
                log.error(`Encountered error while trying to encode sound update: ${e.message}`);
                return false; // Edit was not applied
            });
    }
    handlePlay () {
        this.audioBufferPlayer.stop();
        this.audioBufferPlayer.play(
            this.state.trimStart || 0,
            this.state.trimEnd || 1,
            this.handleUpdatePlayhead,
            this.handleStoppedPlaying);
    }
    handleStopPlaying () {
        this.audioBufferPlayer.stop();
        this.handleStoppedPlaying();
    }
    handleStoppedPlaying () {
        this.setState({playhead: null});
    }
    handleUpdatePlayhead (playhead) {
        this.setState({playhead});
    }
    handleChangeName (name) {
        this.props.vm.renameSound(this.props.soundIndex, name);
    }
    handleDelete () {
        const {mainLeftSamples, rightSamples, sampleRate} = this.copyCurrentBuffer();

        const deleteInChannel = (samples) => {
            const sampleCount = samples.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);
            const firstPart = samples.slice(0, startIndex);
            const secondPart = samples.slice(endIndex, sampleCount);
            const newLength = firstPart.length + secondPart.length;

            let newSamples;
            if (newLength === 0) {
                newSamples = new Float32Array(1);
            } else {
                newSamples = new Float32Array(newLength);
                newSamples.set(firstPart, 0);
                newSamples.set(secondPart, firstPart.length);
            }

            return newSamples;
        };

        const newChannelSamples = [];
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 0) {
            newChannelSamples.push(deleteInChannel(mainLeftSamples));
        }
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 1) {
            newChannelSamples.push(deleteInChannel(rightSamples));
        }
        if (newChannelSamples.length === 1) {
            newChannelSamples.push(newChannelSamples[0]);
        }

        this.submitNewSamples(newChannelSamples, sampleRate).then(() => {
            this.setState({
                trimStart: null,
                trimEnd: null
            });
        });
    }
    handleDeleteInverse () {
        // Delete everything outside of the trimmers
        const {mainLeftSamples, rightSamples, sampleRate} = this.copyCurrentBuffer();

        const deleteInChannel = (samples) => {
            const sampleCount = samples.length;
            const startIndex = Math.floor(this.state.trimStart * sampleCount);
            const endIndex = Math.floor(this.state.trimEnd * sampleCount);

            let clippedSamples = samples.slice(startIndex, endIndex);
            if (clippedSamples.length === 0) {
                clippedSamples = new Float32Array(1);
            }

            return clippedSamples;
        };

        const newChannelSamples = [];
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 0) {
            newChannelSamples.push(deleteInChannel(mainLeftSamples));
        }
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 1) {
            newChannelSamples.push(deleteInChannel(rightSamples));
        }
        if (newChannelSamples.length === 1) {
            newChannelSamples.push(newChannelSamples[0]);
        }

        this.submitNewSamples(newChannelSamples, sampleRate).then(success => {
            if (success) {
                this.setState({
                    trimStart: null,
                    trimEnd: null
                });
            }
        });
    }
    handleUpdateTrim (trimStart, trimEnd) {
        this.setState({trimStart, trimEnd});
        this.handleStopPlaying();
    }
    effectFactory (name) {
        return () => this.handleEffect(name);
    }
    copyCurrentBuffer () {
        // Cannot reliably use props.samples because it gets detached by Firefox.
        const buffer = this.audioBufferPlayer.buffer;
        return {
            mainLeftSamples: buffer.getChannelData(0),
            rightSamples: buffer.getChannelData(buffer.numberOfChannels === 1 ? 0 : 1),
            sampleRate: buffer.sampleRate
        };
    }
    handleEffect (name) {
        const trimStart = this.state.trimStart === null ? 0.0 : this.state.trimStart;
        const trimEnd = this.state.trimEnd === null ? 1.0 : this.state.trimEnd;

        // Offline audio context needs at least 2 samples
        if (this.audioBufferPlayer.buffer.length < 2) {
            return;
        }

        const originalBuffer = this.audioBufferPlayer.buffer;
        const targetChannel = this.state.focusedChannel;

        let buffer;

        if (targetChannel === -1) {
            // Apply the effect to both channels.
            buffer = originalBuffer;
        } else {
            // Apply the effect only to the selected channel.
            const sourceChannelIndex = originalBuffer.numberOfChannels === 1 ? 0 : targetChannel;
            const channelData = originalBuffer.getChannelData(sourceChannelIndex);

            buffer = this.audioBufferPlayer.audioContext.createBuffer(
                1,
                originalBuffer.length,
                originalBuffer.sampleRate
            );
            buffer.getChannelData(0).set(channelData);
        }

        const effects = new AudioEffects(
            buffer,
            name,
            trimStart,
            trimEnd,
            targetChannel
        );
        effects.process((renderedBuffer, adjustedTrimStart, adjustedTrimEnd) => {
            let mainLeftSamples;
            let rightSamples;

            if (targetChannel === -1) {
                // Both channels were processed.
                mainLeftSamples = renderedBuffer.getChannelData(0);
                rightSamples = renderedBuffer.getChannelData(renderedBuffer.numberOfChannels === 1 ? 0 : 1);
            } else {
                // One channel was processed. Preserve the other channel.
                const renderedSamples = renderedBuffer.getChannelData(0);

                const untouchedChannel = originalBuffer.numberOfChannels === 1 ?
                    originalBuffer.getChannelData(0) :
                    originalBuffer.getChannelData(targetChannel === 0 ? 1 : 0);

                const newLength = renderedBuffer.length;
                const preservedSamples = new Float32Array(newLength);

                // Preserve the unaffected channel for the new duration.
                preservedSamples.set(untouchedChannel.slice(0, newLength));

                if (targetChannel === 0) {
                    mainLeftSamples = renderedSamples;
                    rightSamples = preservedSamples;
                } else {
                    mainLeftSamples = preservedSamples;
                    rightSamples = renderedSamples;
                }
            }

            const sampleRate = renderedBuffer.sampleRate;
            this.submitNewSamples(
                [mainLeftSamples, rightSamples],
                sampleRate
            ).then(success => {
                if (success) {
                    if (this.state.trimStart === null) {
                        this.handlePlay();
                    } else {
                        this.setState({
                            trimStart: adjustedTrimStart,
                            trimEnd: adjustedTrimEnd
                        }, this.handlePlay);
                    }
                }
            });
        });
    }
    tooLoud () {
        const checkChannel = (channel) => {
            const numChunks = channel.length;
            const startIndex = this.state.trimStart === null ?
                0 : Math.floor(this.state.trimStart * numChunks);
            const endIndex = this.state.trimEnd === null ?
                numChunks - 1 : Math.ceil(this.state.trimEnd * numChunks);
            const trimChunks = channel.slice(startIndex, endIndex);
            let max = 0;
            for (const i of trimChunks) {
                if (i > max) max = i;
            }

            return max > MAX_RMS;
        };

        return checkChannel(this.state.mainLeftChunkLevels) ||
               checkChannel(this.state.rightChunkLevels);
    }
    getUndoItem () {
        return {
            ...this.copyCurrentBuffer(),
            trimStart: this.state.trimStart,
            trimEnd: this.state.trimEnd
        };
    }
    handleUndo () {
        this.redoStack.push(this.getUndoItem());
        const {
            mainLeftSamples,
            rightSamples,
            sampleRate,
            trimStart,
            trimEnd
        } = this.undoStack.pop();
        if (mainLeftSamples && rightSamples) {
            return this.submitNewSamples([mainLeftSamples, rightSamples], sampleRate, true).then(success => {
                if (success) {
                    this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
                }
            });
        }
    }
    handleRedo () {
        const {
            mainLeftSamples,
            rightSamples,
            sampleRate,
            trimStart,
            trimEnd
        } = this.redoStack.pop();
        if (mainLeftSamples && rightSamples) {
            this.undoStack.push(this.getUndoItem());
            return this.submitNewSamples([mainLeftSamples, rightSamples], sampleRate, true).then(success => {
                if (success) {
                    this.setState({trimStart: trimStart, trimEnd: trimEnd}, this.handlePlay);
                }
            });
        }
    }
    handleSettingsChange () {
        const newDetail = SettingsStore.store.soundDisplayDetail;
        if (newDetail !== this.getNormalizedWaveformDetail()) {
            this.handleWaveformDetail(newDetail);
        }
    }
    handleCopy () {
        this.copy();
    }
    copy (callback) {
        const trimStart = this.state.trimStart === null ? 0.0 : this.state.trimStart;
        const trimEnd = this.state.trimEnd === null ? 1.0 : this.state.trimEnd;

        const newCopyBuffer = this.copyCurrentBuffer();
        const trimStartLeft = trimStart * newCopyBuffer.mainLeftSamples.length;
        const trimEndLeft = trimEnd * newCopyBuffer.mainLeftSamples.length;
        const trimStartRight = trimStart * newCopyBuffer.mainLeftSamples.length;
        const trimEndRight = trimEnd * newCopyBuffer.mainLeftSamples.length;

        newCopyBuffer.mainLeftSamples = newCopyBuffer.mainLeftSamples.slice(trimStartLeft, trimEndLeft);
        newCopyBuffer.rightSamples = newCopyBuffer.rightSamples.slice(trimStartRight, trimEndRight);

        this.setState({
            copyBuffer: newCopyBuffer
        }, callback);
    }
    handleCopyToNew () {
        this.copy(() => {
            encodeAndAddSoundToVM(
                this.props.vm,
                this.state.copyBuffer,
                this.props.name
            );
        });
    }
    resampleBufferToRate (buffer, newRate) {
        return new Promise((resolve, reject) => {
            console.log("TEST", buffer);
            const sampleRateRatio = newRate / buffer.sampleRate;
            const newLeftLength = sampleRateRatio * buffer.mainLeftSamples.length;
            const newRightLength = sampleRateRatio * buffer.rightSamples.length;
            const newLength = Math.max(newLeftLength, newRightLength);
            let offlineContext;
 
            // Try to use either OfflineAudioContext or webkitOfflineAudioContext to resample
            // The constructors will throw if trying to resample at an unsupported rate
            // (e.g. Safari/webkitOAC does not support lower than 44khz).
            try {
                if (window.OfflineAudioContext) {
                    offlineContext = new window.OfflineAudioContext(1, newLength, newRate);
                } else if (window.webkitOfflineAudioContext) {
                    offlineContext = new window.webkitOfflineAudioContext(1, newLength, newRate);
                }
            } catch {
                // If no OAC available and downsampling by 2, downsample by dropping every other sample.
                if (newRate === buffer.sampleRate / 2) {
                    return resolve(dropEveryOtherSample(buffer));
                }
                return reject(new Error('Could not resample'));
            }

            const source = offlineContext.createBufferSource();
            const audioBuffer = offlineContext.createBuffer(
                2,
                Math.max(buffer.mainLeftSamples.length, buffer.rightSamples.length),
                buffer.sampleRate
            );
            audioBuffer.getChannelData(0).set(buffer.mainLeftSamples);
            audioBuffer.getChannelData(1).set(buffer.rightSamples);
            source.buffer = audioBuffer;
            source.connect(offlineContext.destination);

            source.start();
            offlineContext.startRendering();
            offlineContext.oncomplete = ({renderedBuffer}) => {
                resolve({
                    mainLeftSamples: renderedBuffer.getChannelData(0),
                    rightSamples: renderedBuffer.getChannelData(1),
                    sampleRate: newRate
                });
            };
        });
    }
    paste () {
        // If there's no selection, paste at the end of the sound
        const {mainLeftSamples, rightSamples} = this.copyCurrentBuffer();
        const isPastingFullSound = this.state.trimStart === null;

        const pasteInChannel = (samples, stateSamples) => {
            let newSamples;

            if (isPastingFullSound) {
                const newLength = samples.length + stateSamples.length;
                newSamples = new Float32Array(newLength);
                newSamples.set(samples, 0);
                newSamples.set(stateSamples, samples.length);

                return { samples: newSamples, onPostSubmit: null };
            } else {
                // else replace the selection with the pasted sound
                const trimStartSamples = this.state.trimStart * samples.length;
                const trimEndSamples = this.state.trimEnd * samples.length;
                const firstPart = samples.slice(0, trimStartSamples);
                const lastPart = samples.slice(trimEndSamples);
                const newLength = firstPart.length + stateSamples.length + lastPart.length;

                newSamples = new Float32Array(newLength);
                newSamples.set(firstPart, 0);
                newSamples.set(stateSamples, firstPart.length);
                newSamples.set(lastPart, firstPart.length + stateSamples.length);

                const trimStartSeconds = trimStartSamples / this.props.sampleRate;
                const trimEndSeconds = trimStartSeconds + (stateSamples.length / this.state.copyBuffer.sampleRate);
                const newDurationSeconds = newSamples.length / this.state.copyBuffer.sampleRate;

                const adjustedTrimStart = trimStartSeconds / newDurationSeconds;
                const adjustedTrimEnd = trimEndSeconds / newDurationSeconds;

                return {
                    samples: newSamples,
                    onPostSubmit: () => {
                        this.setState({
                            trimStart: adjustedTrimStart,
                            trimEnd: adjustedTrimEnd
                        }, this.handlePlay);
                    },
                };
            }
        };

        const copyBuffer = this.state.copyBuffer;
        const newChannelSamples = [];
        let channelResult;
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 0) {
            channelResult = pasteInChannel(mainLeftSamples, copyBuffer.mainLeftSamples);
            newChannelSamples.push(channelResult.samples);
        }
        if (this.state.focusedChannel === -1 || this.state.focusedChannel === 1) {
            channelResult = pasteInChannel(rightSamples, copyBuffer.rightSamples);
            newChannelSamples.push(channelResult.samples);
        }
        if (newChannelSamples.length === 1) {
            newChannelSamples.push(newChannelSamples[0]);
        }

        if (isPastingFullSound) {
            this.submitNewSamples(newChannelSamples, this.props.sampleRate, false).then(success => {
                if (success) this.handlePlay();
            });
        } else {
            this.submitNewSamples(newChannelSamples, this.props.sampleRate, false).then(success => {
                if (success && channelResult.onPostSubmit) {
                    // No need to stack post submit callbacks as the only applicable thing
                    // is trim points, which would be the same across channels.
                    channelResult.onPostSubmit();
                }
            });
        }
    }
    handlePaste () {
        if (!this.state.copyBuffer) return;
        if (this.state.copyBuffer.sampleRate === this.props.sampleRate) {
            this.paste();
        } else {
            this.resampleBufferToRate(this.state.copyBuffer, this.props.sampleRate).then(buffer => {
                this.setState({
                    copyBuffer: buffer
                }, this.paste);
            });
        }
    }
    setRef (element) {
        this.ref = element;
    }
    handleContainerClick (e) {
        // If the click is on the sound editor's div (and not any other element), delesect
        if (e.target === this.ref && this.state.trimStart !== null) {
            this.handleUpdateTrim(null, null);
        }
    }
    handleChannelFocus(channelId) {
        this.setState({
            focusedChannel: channelId
        });
    }
    handleWaveformDetail(detail) {
        const LOWEST_DETAIL = 1024 * 10;
        detail = Math.max(0, Math.min(200, Number(detail)));
        detail = Math.round(LOWEST_DETAIL - detail * ((LOWEST_DETAIL - 1) / 200));

        const buffer = this.copyCurrentBuffer();
        this.setState({
            waveformDetail: detail,
            mainLeftChunkLevels: computeChunkedRMS(buffer.mainLeftSamples, detail),
            rightChunkLevels: computeChunkedRMS(buffer.rightSamples, detail)
        });
    }
    handleToggleFormat(isStereo) {
        const buffer = this.audioBufferPlayer.buffer;

        let mainLeftSamples;
        let rightSamples;
        if (isStereo) {
            // Mono -> Stereo
            mainLeftSamples = buffer.getChannelData(0);
            rightSamples = new Float32Array(mainLeftSamples);
        } else {
            // Stereo -> Mono
            const left = buffer.getChannelData(0);
            const right = buffer.getChannelData(1);

            const mono = new Float32Array(buffer.length);
            for (let i = 0; i < buffer.length; i++) {
                mono[i] = (left[i] + right[i]) / 2;
            }

            mainLeftSamples = mono;
            rightSamples = mono;
        }

        this.submitNewSamples(
            [mainLeftSamples, rightSamples],
            buffer.sampleRate,
            undefined,
            !isStereo
        ).then(() => {
            this.setState({
                trimStart: null,
                trimEnd: null
            });
        });
    }
    getNormalizedWaveformDetail() {
        const LOWEST_DETAIL = 1024 * 10;

        let detail = this.state.waveformDetail;
        detail = Math.max(1, Math.min(LOWEST_DETAIL, detail));
        detail = Math.round(
            (LOWEST_DETAIL - detail) * (200 / (LOWEST_DETAIL - 1))
        );

        return detail;
    }
    render () {
        const {effectTypes} = AudioEffects;
        return (
            <SoundEditorComponent
                isStereo={this.props.isStereo}
                duration={this.props.duration}
                size={this.props.size}
                canPaste={this.state.copyBuffer !== null}
                canRedo={this.redoStack.length > 0}
                canUndo={this.undoStack.length > 0}
                waveformDetail={this.getNormalizedWaveformDetail()}
                focusedChannel={this.state.focusedChannel}
                mainLeftChunkLevels={this.state.mainLeftChunkLevels}
                rightChunkLevels={this.state.rightChunkLevels}
                name={this.props.name}
                playhead={this.state.playhead}
                setRef={this.setRef}
                tooLoud={this.tooLoud()}
                trimEnd={this.state.trimEnd}
                trimStart={this.state.trimStart}
                onChangeName={this.handleChangeName}
                onContainerClick={this.handleContainerClick}
                onChannelFocusChange={this.handleChannelFocus}
                onToggleFormat={this.handleToggleFormat}
                onCopy={this.handleCopy}
                onCopyToNew={this.handleCopyToNew}
                onDelete={this.handleDelete}
                onEcho={this.effectFactory(effectTypes.ECHO)}
                onFadeIn={this.effectFactory(effectTypes.FADEIN)}
                onFadeOut={this.effectFactory(effectTypes.FADEOUT)}
                onFaster={this.effectFactory(effectTypes.FASTER)}
                onLouder={this.effectFactory(effectTypes.LOUDER)}
                onMute={this.effectFactory(effectTypes.MUTE)}
                onPaste={this.handlePaste}
                onPlay={this.handlePlay}
                onRedo={this.handleRedo}
                onReverse={this.effectFactory(effectTypes.REVERSE)}
                onRobot={this.effectFactory(effectTypes.ROBOT)}
                onSetTrim={this.handleUpdateTrim}
                onSlower={this.effectFactory(effectTypes.SLOWER)}
                onSofter={this.effectFactory(effectTypes.SOFTER)}
                onStop={this.handleStopPlaying}
                onUndo={this.handleUndo}
            />
        );
    }
}

SoundEditor.propTypes = {
    isStereo: PropTypes.bool,
    duration: PropTypes.number,
    size: PropTypes.number,
    isFullScreen: PropTypes.bool,
    name: PropTypes.string.isRequired,
    sampleRate: PropTypes.number,
    mainLeftSamples: PropTypes.instanceOf(Float32Array),
    rightSamples: PropTypes.instanceOf(Float32Array),
    soundId: PropTypes.string,
    soundIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = (state, {soundIndex}) => {
    const sprite = state.scratchGui.vm.editingTarget.sprite;
    // Make sure the sound index doesn't go out of range.
    const index = soundIndex < sprite.sounds.length ? soundIndex : sprite.sounds.length - 1;
    const sound = state.scratchGui.vm.editingTarget.sprite.sounds[index];
    const audioBuffer = state.scratchGui.vm.getSoundBuffer(index);

    return {
        channels: audioBuffer.numberOfChannels,
        isStereo: audioBuffer.numberOfChannels !== 1,
        duration: sound.sampleCount / sound.rate,
        size: sound.asset ? sound.asset.data.byteLength : 0,
        soundId: sound.soundId,
        sampleRate: audioBuffer.sampleRate,
        mainLeftSamples: audioBuffer.getChannelData(0),
        rightSamples: audioBuffer.getChannelData(audioBuffer.numberOfChannels === 1 ? 0 : 1),
        isFullScreen: state.scratchGui.mode.isFullScreen,
        name: sound.name,
        vm: state.scratchGui.vm
    };
};

export default connect(
    mapStateToProps
)(SoundEditor);
