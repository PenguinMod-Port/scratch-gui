import GenericSetting, {Setting} from "../generic-setting/generic-setting.jsx";
import bindAll from 'lodash.bindall';
import React from 'react';
import styles from './palette-setting.css';

class PaletteSeting extends GenericSetting {
    defaultValue() { return {}; }
    getNames() { return {}; }

    constructor(props) {
        super(props);
        bindAll(this, [
            'getColor',
            'setColor'
        ]);
    }

    getColor(name) {
        console.log(this.state.value)
        return this.state.value[name] ?? this.defaultValue()[name];
    }

    setColor(name, color) {
        console.log(name, color)
        this._setValue({...this.state.value, [name]: color});
    }

    render() {
        return <Setting
            active={this.state.active}
            primary={
                <label className={styles.label}>{this.getPrimary()}</label>
            }
            help={this.getHelp()}
            secondary={
                <div className={styles.palette}>
                    {Object.keys(this.defaultValue()).map(name => (
                        <div className={styles.color}>
                            <input type="color"
                                value={this.getColor(name)}
                                onChange={e => this.setState({value: {...this.state.value, [name]: e.target.value.toUpperCase()}})}
                                onBlur={e => this.setColor(name, e.target.value.toUpperCase())}
                            />
                            <span>{this.getNames()[name]}</span>
                        </div>
                    ))}
                </div>
            }
        />
    }
}

export default PaletteSeting