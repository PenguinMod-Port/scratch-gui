import GenericSetting, {Setting} from "../generic-setting/generic-setting.jsx";
import FancyCheckbox from '../../../components/tw-fancy-checkbox/checkbox.jsx';
import React from 'react';
import styles from './boolean-setting.css';

class BooleanSetting extends GenericSetting {
    defaultValue() { return false; }

    render() {
        return <Setting
            active={this.state.active}
            primary={
                <label className={styles.label}>
                    <FancyCheckbox
                        className={styles.checkbox}
                        checked={!!this.state.value}
                        onChange={e => this._setValue(e.target.checked)}
                    />
                    {this.getPrimary()}
                </label>
            }
            help={this.getHelp()}
            secondary={this.getSecondary()}
        />
    }
}

export default BooleanSetting