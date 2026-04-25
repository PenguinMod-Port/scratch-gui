import {FormattedMessage, defineMessages, intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './generic-setting.css';
import helpIcon from './help-icon.svg';

const messages = defineMessages({
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in settings',
        id: 'tw.settingsModal.help'
    }
});

class UnwrappedSetting extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.active && !prevProps.active) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp () {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render () {
        return (
            <div
                className={classNames(styles.setting, {
                    [styles.active]: this.props.active
                })}
            >
                <div className={styles.label}>
                    {this.props.primary}
                    <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    >
                        <img
                            src={helpIcon}
                            draggable={false}
                        />
                    </button>
                </div>
                {this.state.helpVisible && (
                    <div>
                        {this.props.help}
                    </div>
                )}
                {this.props.secondary}
            </div>
        );
    }
}
UnwrappedSetting.propTypes = {
    intl: intlShape,
    active: PropTypes.bool,
    help: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    slug: PropTypes.string
};
export const Setting = injectIntl(UnwrappedSetting);

class GenericSetting extends React.Component {
    defaultValue() { return ""; }

    constructor (props) {
        super(props);
        bindAll(this, [
            '_setValue',
            '_setStorage',
            'setValue',
            'isActive',
            'getPrimary',
            'getHelp',
            'getSecondary'
        ]);

        this.state = {
            value: this._readStorage() ?? this.defaultValue(),
            active: false
        };

        if (this.isActive(this.state.value)) this.state.active = true;
    }

    _setValue(value) {
        this.setState({
            value,
            active: this.isActive(value)
        });
        this._setStorage(value);
        this.setValue(value);
    }

    _setStorage(value) {

    }

    _readStorage(value) {

    }

    setValue(value) {

    }

    isActive(value) {
        return this.defaultValue() !== value;
    }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Placeholder"
            id="pm.gui.placeholder"
        />)
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Placeholder"
            id="pm.gui.placeholder"
        />)
    }

    getSecondary() {
        return null;
    }

    render () {
        return <Setting
            active={this.state.active}
            primary={this.getPrimary()}
            help={this.getHelp()}
            secondary={this.getSecondary()}
        />
    }
}

export default GenericSetting;