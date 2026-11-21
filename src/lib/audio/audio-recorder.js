import 'get-float-time-domain-data';
import getUserMedia from 'get-user-media-promise';
import SharedAudioContext from './shared-audio-context.js';
import {computeRMS, computeChunkedRMS} from './audio-util.js';

class AudioRecorder {
    constructor () {
        this.audioContext = new SharedAudioContext();
        this.bufferLength = 8192;

        this.userMediaStream = null;
        this.mediaStreamSource = null;
        this.sourceNode = null;
        this.scriptProcessorNode = null;

        this.recordedSamples = 0;
        this.recording = false;
        this.started = false;
        this.buffersMainLeft = [];
        this.buffersRight = [];

        this.disposed = false;
    }

    startListening (onStarted, onUpdate, onError) {
        try {
            getUserMedia({audio: true})
                .then(userMediaStream => {
                    if (!this.disposed) {
                        this.started = true;
                        onStarted();
                        this.attachUserMediaStream(userMediaStream, onUpdate);
                    }
                })
                .catch(e => {
                    if (!this.disposed) {
                        onError(e);
                    }
                });
        } catch (e) {
            if (!this.disposed) {
                onError(e);
            }
        }
    }

    startRecording () {
        this.recording = true;
    }

    attachUserMediaStream (userMediaStream, onUpdate) {
        this.userMediaStream = userMediaStream;
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(userMediaStream);
        this.sourceNode = this.audioContext.createGain();
        this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.bufferLength, 1, 1);

        this.scriptProcessorNode.onaudioprocess = processEvent => {
            if (this.recording && !this.disposed) {
                this.buffersMainLeft.push(new Float32Array(processEvent.inputBuffer.getChannelData(0)));
                this.buffersRight.push(new Float32Array(processEvent.inputBuffer.getChannelData(
                    processEvent.inputBuffer.numberOfChannels === 1 ? 0 : 1
                )));
            }
        };

        this.analyserNode = this.audioContext.createAnalyser();

        this.analyserNode.fftSize = 2048;

        const bufferLength = this.analyserNode.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        const update = () => {
            if (this.disposed) return;
            this.analyserNode.getFloatTimeDomainData(dataArray);
            onUpdate(computeRMS(dataArray));
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);

        // Wire everything together, ending in the destination
        this.mediaStreamSource.connect(this.sourceNode);
        this.sourceNode.connect(this.analyserNode);
        this.analyserNode.connect(this.scriptProcessorNode);
        this.scriptProcessorNode.connect(this.audioContext.destination);
    }

    stop () {
        const bufferMainLeft = new Float32Array(this.buffersMainLeft.length * this.bufferLength);
        const bufferRight = new Float32Array(this.buffersRight.length * this.bufferLength);

        let offset = 0;
        for (let i = 0; i < this.buffersMainLeft.length; i++) {
            const bufferChunkMainLeft = this.buffersMainLeft[i];
            const bufferChunkRight = this.buffersRight[i];

            bufferMainLeft.set(bufferChunkMainLeft, offset);
            bufferRight.set(bufferChunkRight, offset);
            offset += bufferChunkMainLeft.length;
        }

        const chunkLevelsMainLeft = computeChunkedRMS(bufferMainLeft);
        const chunkLevelsRight = computeChunkedRMS(bufferRight);

        const maxRMS = Math.max.apply(null, chunkLevelsMainLeft);
        const threshold = maxRMS / 8;

        let firstChunkAboveThreshold = null;
        let lastChunkAboveThreshold = null;
        for (let i = 0; i < chunkLevelsMainLeft.length; i++) {
            if (chunkLevelsMainLeft[i] > threshold) {
                if (firstChunkAboveThreshold === null) firstChunkAboveThreshold = i + 1;
                lastChunkAboveThreshold = i + 1;
            }
        }

        let trimStart = Math.max(2, firstChunkAboveThreshold - 2) / this.buffersMainLeft.length;
        let trimEnd = Math.min(this.buffersMainLeft.length - 2, lastChunkAboveThreshold + 2) / this.buffersMainLeft.length;

        // With very few samples, the automatic trimming can produce invalid values
        if (trimStart >= trimEnd) {
            trimStart = 0;
            trimEnd = 1;
        }

        return {
            mainLeftSampleLevels: bufferMainLeft,
            rightSampleLevels: bufferRight,
            sampleRate: this.audioContext.sampleRate,
            mainLeftChunkLevels: chunkLevelsMainLeft,
            rightChunkLevels: chunkLevelsRight,
            trimStart: trimStart,
            trimEnd: trimEnd
        };
    }

    dispose () {
        if (this.started) {
            this.scriptProcessorNode.onaudioprocess = null;
            this.scriptProcessorNode.disconnect();
            this.analyserNode.disconnect();
            this.sourceNode.disconnect();
            this.mediaStreamSource.disconnect();
            this.userMediaStream.getAudioTracks()[0].stop();
        }
        this.disposed = true;
    }
}

export default AudioRecorder;
