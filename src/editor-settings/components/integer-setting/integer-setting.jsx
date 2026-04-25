import GenericSetting, {Setting} from "../generic-setting/generic-setting.jsx";
import FancyCheckbox from '../../../components/tw-fancy-checkbox/checkbox.jsx';
import Input from '../../../components/forms/input.jsx';
import BufferedInputHOC from '../../../components/forms/buffered-input-hoc.jsx';
import React from 'react';
import styles from './integer-setting.css';

const BufferedInput = BufferedInputHOC(Input);

class IntegerSetting extends GenericSetting {
    defaultValue() { return 0; }
    min = Number.MIN_VALUE
    max = Number.MAX_VALUE

    _setValue(value) {
        value = Math.min(Math.max(this.min, value), this.max);
        super._setValue(value);
    }

    render() {
        return <Setting
            active={this.state.active}
            primary={
                <label className={styles.label}>
                    {this.getPrimary()}:
                    <span className={styles.space}></span>
                    <BufferedInput
                        value={this.state.value}
                        onSubmit={v => this._setValue(v)}
                        type="number"
                        step="1"
                        min={this.min}
                        max={this.max}
                    />
                </label>
            }
            help={this.getHelp()}
            secondary={this.getSecondary()}
        />
    }
}

export default IntegerSetting