import WavEncoder from 'wav-encoder';

export const SOUND_BYTE_LIMIT = 10 * 1000 * 1000; // 10mb

const _computeRMS = function (samples, start, end, scaling = 0.55) {
    const length = end - start;
    if (length === 0) return 0;
    // Calculate RMS, adapted from https://github.com/Tonejs/Tone.js/blob/master/Tone/component/Meter.js#L88
    let sum = 0;
    for (let i = start; i < end; i++) {
        const sample = samples[i];
        sum += sample ** 2;
    }
    const rms = Math.sqrt(sum / length);
    const val = rms / scaling;
    return Math.sqrt(val);
};

const computeRMS = (samples, scaling) => _computeRMS(samples, 0, samples.length, scaling);

const computeChunkedRMS = function (samples, chunkSize = 1024) {
    const sampleCount = samples.length;
    const chunkLevels = [];
    for (let i = 0; i < sampleCount; i += chunkSize) {
        const maxIndex = Math.min(sampleCount, i + chunkSize);
        chunkLevels.push(_computeRMS(samples, i, maxIndex));
    }
    return chunkLevels;
};

/**
 @typedef SoundBuffer
 @type {Object}
 @property {Float32Array} mainLeftSamples Array of main (or left) channel audio samples
 @property {Float32Array} rightSamples Array of main (or right) channel audio samples
 @property {number} sampleRate Audio sample rate
 */

const encodeAndAddSoundToVM = function (vm, sampleBuffer, name, callback) {
    WavEncoder.encode({
        sampleRate: sampleBuffer.sampleRate,
        channelData: [sampleBuffer.mainLeftSamples, sampleBuffer.rightSamples]
    }).then(wavBuffer => {
        const vmSound = {
            format: '',
            dataFormat: 'wav',
            rate: sampleBuffer.sampleRate,
            sampleCount: Math.max(sampleBuffer.mainLeftSamples.length, sampleBuffer.rightSamples.length)
        };

        // Create an asset from the encoded .wav and get resulting md5
        const storage = vm.runtime.storage;
        vmSound.asset = storage.createAsset(
            storage.AssetType.Sound,
            storage.DataFormat.WAV,
            new Uint8Array(wavBuffer),
            null,
            true // generate md5
        );
        vmSound.assetId = vmSound.asset.assetId;

        // update vmSound object with md5 property
        vmSound.md5 = `${vmSound.assetId}.${vmSound.dataFormat}`;
        // The VM will update the sound name to a fresh name
        vmSound.name = name;

        vm.addSound(vmSound).then(() => {
            if (callback) callback();
        });
    });
};

/**
 * Downsample the given buffer to try to reduce file size below SOUND_BYTE_LIMIT
 * @param {SoundBuffer} buffer - Buffer to resample
 * @param {function(SoundBuffer):Promise<SoundBuffer>} resampler - resampler function
 * @returns {SoundBuffer} Downsampled buffer with half the sample rate
 */
const downsampleIfNeeded = (buffer, resampler) => {
    let {
        mainLeftSamples,
        rightSamples,
        sampleRate
    } = buffer;

    /* bitDepth 16 bit */
    const encodedLeftByteLength = mainLeftSamples.length * 2;
    const encodedRightByteLength = rightSamples.length * 2;

    // Resolve immediately if already within byte limit
    if (
        encodedLeftByteLength < SOUND_BYTE_LIMIT &&
        encodedRightByteLength < SOUND_BYTE_LIMIT 
    ) {
        return Promise.resolve({
            channelSamples: [mainLeftSamples, rightSamples],
            sampleRate
        });
    }

    // TW: Don't check if the sound will still fit at this reduced sample rate.
    // Instead the GUI will show a warning if it's too large.
    const resampled = resampler({
        channelSamples: [mainLeftSamples, rightSamples],
        sampleRate
    }, 22050);

    return {
        channelSamples: [resampled.mainLeftSamples, resampled.rightSamples],
        sampleRate: resampled.sampleRate
    };
};

/**
 * Drop every other sample of an audio buffer as a last-resort way of downsampling.
 * @param {SoundBuffer} buffer - Buffer to resample
 * @returns {SoundBuffer} Downsampled buffer with half the sample rate
 */
const dropEveryOtherSample = (buffer) => {
    const newLeftLength = Math.floor(buffer.mainLeftSamples.length / 2);
    const newRightLength = Math.floor(buffer.rightSamples.length / 2);

    const newLeftSamples = new Float32Array(newLeftLength);
    for (let i = 0; i < newLeftLength; i++) {
        newLeftSamples[i] = buffer.mainLeftSamples[i * 2];
    }

    const newRightSamples = new Float32Array(newRightLength);
    for (let i = 0; i < newRightLength; i++) {
        newRightSamples[i] = buffer.rightSamples[i * 2];
    }

    return {
        mainLeftSamples: newLeftSamples,
        rightSamples: newRightSamples,
        sampleRate: buffer.sampleRate / 2
    };
};

export {
    computeRMS,
    computeChunkedRMS,
    encodeAndAddSoundToVM,
    downsampleIfNeeded,
    dropEveryOtherSample
};
