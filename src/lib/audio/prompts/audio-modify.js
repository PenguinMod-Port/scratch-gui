import playIcon from '../../../components/sound-editor/icon--play.svg';
import stopIcon from '../../../components/sound-editor/icon--stop.svg';

const msg = {
    title: 'Modify Sound',
    pitch: 'Pitch',
    volume: 'Volume',
    apply: 'Apply',
    cancel: 'Cancel'
};

const styles = {
    modal: 'margin-bottom: 15px;display: flex;justify-content: center;flex-direction: row;align-items: center;',
    sliderDiv: 'margin: 0 10px;display: flex;flex-direction: column;align-items: center;',
    label: 'text-align: center;width: 100%;font-size: 1rem;font-weight: bold;',
    slider: 'writing-mode: vertical-lr;direction: rtl;height: 135px;margin: 15px 35%;',
    scalar: 'text-align: center;width: 60px;border: solid 1px var(--ui-black-transparent);color: var(--text-primary);background-color: var(--input-background);padding: 5px 2px;border-radius: 6px;font-size: x-small;',
    preview: 'border-radius: 100%;padding: 5px;width: 45px;height: 45px;border: none;display: flex;justify-content: center;align-items: center;background: var(--ui-modal-header-background-default);',
};

const generateSliderUI = function (title, params, scalar) {
    const div = document.createElement('div');
    div.style = styles.sliderDiv;

    const label = document.createElement('div');
    label.style = styles.label;
    label.textContent = title;

    const slider = document.createElement('input');
    slider.style = styles.slider;
    slider.type = 'range';
    slider.min = params.min;
    slider.max = params.max;
    slider.step = params.step;
    slider.value = params.value;

    const input = document.createElement('input');
    input.style = styles.scalar;
    input.type = 'number';
    input.min = params.min * scalar;
    input.max = params.max * scalar;
    input.step = params.step * scalar;
    input.value = params.value * scalar;

    div.append(label, slider, input);
    return div;
};

const setupUISlider = function (slider, numberInput, scaleFactor, callback) {
    const updateControls = (value, updateNumberInput) => {
        const numValue = Number(value) || 0;
    
        // Sync the counterpart element
        if (updateNumberInput) {
            numberInput.value = numValue * scaleFactor;
        } else {
            slider.value = numValue / scaleFactor;
        }

        callback(numValue);
    };

    // Slider events
    slider.oninput = () => updateControls(slider.value, true);
    slider.onchange = slider.oninput;

    // Number events
    numberInput.oninput = () => updateControls(numberInput.value, false);
    numberInput.onchange = numberInput.oninput;
};

/**
 * @this components/sound-editor.jsx
 */
const audioModifyPrompt = async function () {
    const bufferSelection = this.getSelectionBuffer();
    const audio = new AudioContext();

    const gainNode = audio.createGain();
    gainNode.gain.value = 1;
    gainNode.connect(audio.destination);

    const pitchDiv = generateSliderUI(msg.pitch, {
        min: -24, max: 24, step: 1, value: 0
    }, 0);
    const volumeDiv = generateSliderUI(msg.volume, {
        min: 0, max: 2, step: 0.01, value: 1 
    }, 100);

    const pitchParts = pitchDiv.children;
    const volumeParts = volumeDiv.children;

    // Open modal prompt
    const modal = await this.props.vm.customPrompt(
        { title: msg.title },
        { content: { width: '290px', height: 'auto' } },
        [
            { name: msg.apply, role: 'ok', callback: () => {
                audio.close();
                this.handleEffect('modify', {
                    pitch: Number(pitchParts[1].value) || 0,
                    volume: Number(volumeParts[1].value) || 0,
                });
            }},
            { name: msg.cancel, role: 'close', callback: () => audio.close() },
        ],
    );

    const initModal = () => {
        const previewButton = document.createElement('button');
        previewButton.style = styles.preview;
        previewButton.innerHTML = `<img draggable="false" style="max-width: 65%;max-height: 65%;" src="${playIcon}">`;

        modal.setAttribute('style', styles.modal);
        modal.append(pitchDiv, volumeDiv, previewButton);

        /* Preview functionality */
        const sourceBuffer = audio.createBuffer(
            2,
            Math.max(bufferSelection.mainLeftSamples.length, bufferSelection.rightSamples.length),
            bufferSelection.sampleRate
        );
        sourceBuffer.getChannelData(0).set(bufferSelection.mainLeftSamples);
        sourceBuffer.getChannelData(1).set(bufferSelection.rightSamples);

        let bufferSource = null;
        let audioPlaying = false;

        const play = function () {
            bufferSource = audio.createBufferSource();
            bufferSource.connect(gainNode);
            bufferSource.buffer = sourceBuffer;
            bufferSource.start(0);
            bufferSource.detune.value = Number(pitchParts[1].value) * 100; // Must be re-applied
 
            previewButton.firstChild.src = stopIcon;
            audioPlaying = true;
            bufferSource.onended = () => {
                previewButton.firstChild.src = playIcon;
                audioPlaying = false;
            }
        };
        const stop = function () {
            bufferSource.stop();
            audioPlaying = false;
        };

        previewButton.onclick = () => {
            if (audioPlaying) stop();
            else play();
        }

        // Modification value updates
        setupUISlider(pitchParts[1], pitchParts[2], 1, (value) => {
            if (bufferSource) {
                bufferSource.detune.value = Number(value) * 100;
            }
        });
        setupUISlider(volumeParts[1], volumeParts[2], 100, (value) => {
            gainNode.gain.value = value;
        });
    };

    initModal();
};

export { audioModifyPrompt };