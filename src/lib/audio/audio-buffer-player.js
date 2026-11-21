import SharedAudioContext from './shared-audio-context.js';

class AudioBufferPlayer {
    constructor (mainLeftSamples, rightSamples, sampleRate, focusChannel) {
        this.startTime = null;
        this.updateCallback = null;
        this.trimStart = null;
        this.trimEnd = null;
        this.mutedChannel = null;
        
        this.mainLeftSamples = mainLeftSamples;
        this.rightSamples = rightSamples;

        this.audioContext = new SharedAudioContext();
        this.buffer = this.audioContext.createBuffer(
            2,
            Math.max(this.mainLeftSamples.length, this.rightSamples.length),
            sampleRate
        );

        this.muteChannel(focusChannel);

        this.source = null;
    }

    play (trimStart, trimEnd, onUpdate, onEnded) {
        this.updateCallback = onUpdate;
        this.trimStart = trimStart;
        this.trimEnd = trimEnd;
        this.startTime = Date.now();

        const trimStartTime = this.buffer.duration * trimStart;
        const trimmedDuration = (this.buffer.duration * trimEnd) - trimStartTime;

        this.source = this.audioContext.createBufferSource();
        this.source.onended = onEnded;
        this.source.buffer = this.buffer;
        this.source.connect(this.audioContext.destination);
        this.source.start(0, trimStartTime, trimmedDuration);

        this.update();
    }

    update () {
        const timeSinceStart = (Date.now() - this.startTime) / 1000;
        const percentage = timeSinceStart / this.buffer.duration;
        if (percentage + this.trimStart < this.trimEnd && this.source.onended) {
            requestAnimationFrame(this.update.bind(this));
            this.updateCallback(percentage + this.trimStart);
        } else {
            this.updateCallback = null;
        }
    }

    stop () {
        if (this.source) {
            this.source.onended = null; // Do not call onEnded callback if manually stopped
            try {
                this.source.stop();
            } catch (e) {
                // This is probably Safari, which dies when you call stop more than once
                // which the spec says is allowed: https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode
                console.log('Caught error while stopping buffer source node.'); // eslint-disable-line no-console
            }
        }
    }

    muteChannel(channelId) {
        this.mutedChannel = channelId;

        const leftChannel = this.buffer.getChannelData(0);
        const rightChannel = this.buffer.getChannelData(1);

        leftChannel.fill(0);
        rightChannel.fill(0);

        if (this.mutedChannel === -1) {
            leftChannel.set(this.mainLeftSamples);
            rightChannel.set(this.rightSamples);
        } else if (this.mutedChannel === 1) {
            // Left channel muted.
            rightChannel.set(this.rightSamples);
        } else if (this.mutedChannel === 0) {
            // Right channel muted.
            leftChannel.set(this.mainLeftSamples);
        }
    }
}

export default AudioBufferPlayer;
