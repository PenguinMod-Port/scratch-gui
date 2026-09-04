const msg = {
    title: 'Change Sample Rate',
    warning: 'Choosing a higher sample rate than the current rate will not make the existing audio higher quality.',
    sampleRate: 'Sample Rate:',
    apply: 'Apply',
    cancel: 'Cancel'
};

const styles = {
    label: 'font-weight: 500;font-size: 14px;margin-bottom: 5px;',
    warning: 'font-size:13px;opacity:0.5;',
    select: '' //'border-radius: 5px;text-align: center;margin-left: 10px;width: 50%;'
};

const sampleRates = [
    3000, 4000, 8000, 11025, 16000, 22050, 32000, 44100,
    48000, 88200, 96000, 176400, 192000, 352800, 384000
];

const genTitle = function (text) {
    const label = document.createElement("div");
    label.style = styles.label;
    const inner = document.createElement("span");
    inner.textContent = text;

    label.appendChild(inner);
    return label;
};

const sampleRatePrompt = async function () {
    console.log(this);
    let selectedSampleRate = this.props.sampleRate;

    // Open modal prompt
    const modal = await this.props.vm.customPrompt(
        { title: msg.title },
        { content: { width: '350px', height: 'auto' } },
        [
            { name: msg.apply, role: 'ok', callback: () => {
                this.handleEffect('sample rate', { rate: selectedSampleRate });
            }},
            { name: msg.cancel, role: 'close', callback: () => {} },
        ],
    );

    const initModal = () => {
        modal.style.marginBottom = '15px';
        const rateTitle = genTitle(msg.sampleRate);

        const rateSelector = document.createElement('select');
        rateSelector.style = styles.select;
        for (const rate of sampleRates) {
            const option = document.createElement('option');
            option.value = rate;
            option.textContent = rate;
            rateSelector.append(option);
        }

        rateSelector.selectedIndex = sampleRates.indexOf(this.props.sampleRate);
        rateSelector.onchange = () => {
            selectedSampleRate = rateSelector.value;
        };
        rateTitle.appendChild(rateSelector);

        const warningDiv = document.createElement('div');
        warningDiv.style.marginBottom = '15px';
        const warning = document.createElement('i');
        warning.textContent = msg.warning;
        warning.style = styles.warning;
        warningDiv.appendChild(warning);

        modal.append(rateTitle, warningDiv);
    };

    initModal();
};

export { sampleRatePrompt };