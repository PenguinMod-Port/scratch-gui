class VolumeEffect {
    constructor(audioContext, volume, startSeconds, endSeconds) {
        this.audioContext = audioContext;

        this.input = this.audioContext.createGain();
        this.output = this.audioContext.createGain();

        this.gain = this.audioContext.createGain();

        if (!Number.isFinite(volume)) volume = 1;
        if (!Number.isFinite(startSeconds)) startSeconds = 0;
        if (!Number.isFinite(endSeconds)) endSeconds = startSeconds;

        volume = Math.max(0, volume);
        startSeconds = Math.max(0, startSeconds);
        endSeconds = Math.max(startSeconds, endSeconds);

        this.rampLength = 0.01;

        const rampStart = Math.max(0, startSeconds - this.rampLength);
        const rampEnd = endSeconds + this.rampLength;

        this.gain.gain.setValueAtTime(1.0, rampStart);

        if (volume === 0) {
            this.gain.gain.linearRampToValueAtTime(0, startSeconds);
            this.gain.gain.setValueAtTime(0, endSeconds);
        } else {
            // Smoothly ramp the gain up before the start time, and down after the end time.
            this.gain.gain.exponentialRampToValueAtTime(
                volume,
                startSeconds
            );
            this.gain.gain.setValueAtTime(volume, endSeconds);
        }

        this.gain.gain.exponentialRampToValueAtTime(1.0, rampEnd);

        this.input.connect(this.gain);
        this.gain.connect(this.output);
    }
}

export default VolumeEffect;