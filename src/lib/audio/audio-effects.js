import EchoEffect from './effects/echo-effect.js';
import RobotEffect from './effects/robot-effect.js';
import VolumeEffect from './effects/volume-effect.js';
import FadeEffect from './effects/fade-effect.js';
import MuteEffect from './effects/mute-effect.js';
import LowPassEffect from './effects/lowpass-effect.js';
import HighPassEffect from './effects/highpass-effect.js';

const effectTypes = {
    ROBOT: 'robot',
    REVERSE: 'reverse',
    LOUDER: 'higher',
    SOFTER: 'lower',
    FASTER: 'faster',
    SLOWER: 'slower',
    ECHO: 'echo',
    FADEIN: 'fade in',
    FADEOUT: 'fade out',
    MUTE: 'mute',
    LOWPASS: 'low pass',
    HIGHPASS: 'high pass',
    MODIFY: 'modify',
    SAMPLE_RATE: 'sample rate'
};

const pitchRatio = Math.pow(2, 4 / 12); // A major third

class AudioEffects {
    static get effectTypes () {
        return effectTypes;
    }
    constructor (buffer, name, trimStart, trimEnd, targetChannel, manualData) {
        this.trimStartSeconds = (trimStart * buffer.length) / buffer.sampleRate;
        this.trimEndSeconds = (trimEnd * buffer.length) / buffer.sampleRate;
        this.adjustedTrimStartSeconds = this.trimStartSeconds;
        this.adjustedTrimEndSeconds = this.trimEndSeconds;
        this.targetChannel = targetChannel;
        this.manualData = manualData;

        // Some effects will modify the playback rate and/or number of samples.
        // Need to precompute those values to create the offline audio context.
        let sampleRate = buffer.sampleRate;
        let sampleCount = buffer.length;
        const affectedSampleCount = Math.floor((this.trimEndSeconds - this.trimStartSeconds) * sampleRate);
        let adjustedAffectedSampleCount = affectedSampleCount;
        const unaffectedSampleCount = sampleCount - affectedSampleCount;

        this.playbackRate = 1;
        switch (name) {
        case effectTypes.ECHO:
            sampleCount = Math.max(sampleCount,
                Math.floor((this.trimEndSeconds + EchoEffect.TAIL_SECONDS) * sampleRate));
            break;
        case effectTypes.FASTER:
            this.playbackRate = pitchRatio;
            adjustedAffectedSampleCount = Math.floor(affectedSampleCount / this.playbackRate);
            sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;
            break;
        case effectTypes.SLOWER:
            this.playbackRate = 1 / pitchRatio;
            adjustedAffectedSampleCount = Math.floor(affectedSampleCount / this.playbackRate);
            sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;
            break;
        case effectTypes.MODIFY:
            this.playbackRate = Math.pow(2, this.manualData.pitch / 12);
            adjustedAffectedSampleCount =
                Math.floor(affectedSampleCount / this.playbackRate);
            sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;
            break;
        }

        const durationSeconds = sampleCount / sampleRate;
        this.adjustedTrimEndSeconds = this.trimStartSeconds +
            (adjustedAffectedSampleCount / sampleRate);
        this.adjustedTrimStart = this.adjustedTrimStartSeconds / durationSeconds;
        this.adjustedTrimEnd = this.adjustedTrimEndSeconds / durationSeconds;

        if (name === effectTypes.SAMPLE_RATE && trimStart !== 0 && trimEnd !== 1) {
            sampleRate = this.manualData.rate;
            sampleCount = Math.floor((sampleCount / buffer.sampleRate) * this.manualData.rate);
        }

        const channelCount = this.targetChannel === -1 ? buffer.numberOfChannels : 1;
        if (window.OfflineAudioContext) {
            this.audioContext = new window.OfflineAudioContext(channelCount, sampleCount, sampleRate);
        } else {
            // Need to use webkitOfflineAudioContext, which doesn't support all sample rates.
            // Resample by adjusting sample count to make room and set offline context to desired sample rate.
            const sampleScale = 44100 / sampleRate;
            this.audioContext = new window.webkitOfflineAudioContext(channelCount, sampleScale * sampleCount, 44100);
        }

        // For the reverse effect we need to manually reverse the data into a new audio buffer
        // to prevent overwriting the original, so that the undo stack works correctly.
        // Doing buffer.reverse() would mutate the original data.
        if (name === effectTypes.REVERSE) {
            const numberOfChannels = buffer.numberOfChannels;
            const newBuffer = this.audioContext.createBuffer(
                numberOfChannels,
                buffer.length,
                sampleRate
            );

            const bufferLength = buffer.length;
            const startSamples = Math.floor(this.trimStartSeconds * sampleRate);
            const endSamples = Math.floor(this.trimEndSeconds * sampleRate);

            for (let channel = 0; channel < numberOfChannels; channel++) {
                const originalBufferData = buffer.getChannelData(channel);
                const newBufferData = newBuffer.getChannelData(channel);

                let counter = 0;
                for (let i = 0; i < bufferLength; i++) {
                    if (i >= startSamples && i < endSamples) {
                        newBufferData[i] = originalBufferData[endSamples - counter - 1];
                        counter++;
                    } else {
                        newBufferData[i] = originalBufferData[i];
                    }
                }
            }

            this.buffer = newBuffer;
        } else if (name === effectTypes.SAMPLE_RATE) {
            // For the sample rate effect we need to manually copy and transform
            // The buffer to tie it to a specified sample rate.
            const newBuffer = this.audioContext.createBuffer(2, buffer.length, buffer.sampleRate);

            // Our clone from earlier also needs to keep the original buffer's sample rate, so we need to make yet another buffer.
            const sampleRateBuffer = this.makeSampleRateBuffer(buffer, durationSeconds, this.manualData.rate);

            const startSamples = Math.floor(this.trimStartSeconds * buffer.sampleRate);
            const endSamples = Math.floor(this.trimEndSeconds * buffer.sampleRate);

            const transformChannel = (ogData, newData, sampleData) => {
                for (let i = 0; i < buffer.length; i++) {
                    if (i >= startSamples && i < endSamples) {
                        // We need to convert sampleRate back to the current buffer's sampleRate
                        const sampleRateModifiedIndex = i * (sampleRateBuffer.sampleRate / buffer.sampleRate);
                        const lowerIndex = Math.floor(sampleRateModifiedIndex);
                        const upperIndex = Math.min(lowerIndex + 1, sampleRateBuffer.length - 1);
                        const interpolation = sampleRateModifiedIndex - lowerIndex;

                        const sample =
                            sampleData[lowerIndex] * (1 - interpolation) +
                            sampleData[upperIndex] * interpolation;
                        // This works without Number.isFinite but it breaks the waveform preview SVG because sample can be NaN
                        newData[i] = Number.isFinite(sample) ? sample : 0;
                    } else {
                        newData[i] = ogData[i];
                    }
                }
            };

            for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
                const ogBufferChannelData = buffer.getChannelData(channel);
                const newBufferChannelData = newBuffer.getChannelData(channel);
                const sampleRateBufferChannelData = sampleRateBuffer.getChannelData(channel);

                transformChannel(
                    ogBufferChannelData,
                    newBufferChannelData,
                    sampleRateBufferChannelData
                );
            }

            this.buffer = newBuffer;
        } else {
            // All other effects use the original buffer because it is not modified.
            this.buffer = buffer;
        }

        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.name = name;
    }
    makeSampleRateBuffer(buffer, durationSeconds, newSampleRate) {
        const newBufferLength = Math.floor(durationSeconds * newSampleRate);
        const newBuffer = this.audioContext.createBuffer(2, newBufferLength, newSampleRate);
        const bufferLength = buffer.length;

        // This does work with just bufferLength, but causes cut-off when newSampleRate is
        // larger than the current sample rate.
        const sampleChannel = (ogData, newData) => {
            for (let i = 0; i < newBufferLength; i++) {
                const originalIndex = i * (buffer.sampleRate / newSampleRate);
                const lowerIndex = Math.floor(originalIndex);
                const upperIndex = Math.min(lowerIndex + 1, bufferLength - 1);
                const interpolation = originalIndex - lowerIndex;

                const sample =
                    ogData[lowerIndex] * (1 - interpolation) +
                    ogData[upperIndex] * interpolation;
                newData[i] = sample;
            }
        };

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const ogBufferChannelData = buffer.getChannelData(channel);
            const newBufferChannelData = newBuffer.getChannelData(channel);

            sampleChannel(ogBufferChannelData, newBufferChannelData);
        }

        return newBuffer;
    }
    process (done) {
        // Some effects need to use more nodes and must expose an input and output
        let input;
        let output;
        switch (this.name) {
        case effectTypes.FASTER:
        case effectTypes.SLOWER:
            this.source.playbackRate.setValueAtTime(this.playbackRate, this.adjustedTrimStartSeconds);
            this.source.playbackRate.setValueAtTime(1.0, this.adjustedTrimEndSeconds);
            break;
        case effectTypes.LOUDER:
            ({input, output} = new VolumeEffect(this.audioContext, 1.25,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.SOFTER:
            ({input, output} = new VolumeEffect(this.audioContext, 0.75,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.ECHO:
            ({input, output} = new EchoEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.ROBOT:
            ({input, output} = new RobotEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.LOWPASS:
            ({input, output} = new LowPassEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.HIGHPASS:
            ({input, output} = new HighPassEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.FADEIN:
            ({input, output} = new FadeEffect(this.audioContext, true,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.FADEOUT:
            ({input, output} = new FadeEffect(this.audioContext, false,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.MUTE:
            ({input, output} = new MuteEffect(this.audioContext,
                this.adjustedTrimStartSeconds, this.adjustedTrimEndSeconds));
            break;
        case effectTypes.MODIFY:
            this.source.playbackRate.setValueAtTime(this.playbackRate, this.adjustedTrimStartSeconds);
            this.source.playbackRate.setValueAtTime(1.0, this.adjustedTrimEndSeconds);
            ({input, output} = new VolumeEffect(
                this.audioContext,
                this.manualData.volume,
                this.adjustedTrimStartSeconds,
                this.adjustedTrimEndSeconds
            ));
            break;
        }

        if (input && output) {
            this.source.connect(input);
            output.connect(this.audioContext.destination);
        } else {
            // No effects nodes are needed, wire directly to the output
            this.source.connect(this.audioContext.destination);
        }

        this.source.start();

        this.audioContext.startRendering();
        this.audioContext.oncomplete = ({renderedBuffer}) => {
            done(renderedBuffer, this.adjustedTrimStart, this.adjustedTrimEnd);
        };
    }
}

export default AudioEffects;
