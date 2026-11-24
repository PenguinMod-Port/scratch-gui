import SettingsStore from '../editor-settings/settings-store-singleton';

const UPDATE_SETTINGS_STORE = 'scratch-gui/editor-settings/UPDATE_SETTINGS_STORE';
const initialState = undefined; // a lie

const reducer = function (state, action) {
    if (state === undefined) state = {...SettingsStore.store};
    switch (action.type) {
    case UPDATE_SETTINGS_STORE:
        return {...SettingsStore.store};
    default:
        return state;
    }
};

// Action creators ==================================
const updateSettingsStore = () => ({
    type: UPDATE_SETTINGS_STORE
});

export {
    reducer as default,
    initialState as editorSettingsInitialState,
    updateSettingsStore
};
