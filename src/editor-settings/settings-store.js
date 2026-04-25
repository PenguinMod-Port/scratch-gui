import EventTargetShim from './event-target';
import settings from './settings';

const SETTINGS_KEY = 'pm:editor-settings';
const VERSION = 1;

const migrateSettings = settings => {
    const oldVersion = settings._;
    if (oldVersion === VERSION || !oldVersion) {
        return settings;
    }

    // doi doi doi

    return settings;
};

/**
 * @template T
 * @param {T|T[]} v A value
 * @returns {T[]} The value if it is a list, otherwise a 1 item list
 */
const asArray = v => {
    if (Array.isArray(v)) {
        return v;
    }
    return [v];
};

class SettingsStore extends EventTargetShim {
    constructor () {
        super();
        this.store = this.createEmptyStore();
        this.remote = false;
    }

    /**
     * @private
     */
    createEmptyStore () {
        const result = {};
        for (const id of Object.keys(settings)) {
            result[id] = undefined;
            let the = this;
            settings[id].prototype._setStorage = function(v) {
                the.store[id] = v;
                the.saveToLocalStorage();
            };
            settings[id].prototype._readStorage = function(v) {
                return the.store[id];
            }
        }
        return result;
    }

    readLocalStorage () {
        const base = this.store;
        try {
            const local = localStorage.getItem(SETTINGS_KEY);
            if (local) {
                let result = JSON.parse(local);
                if (result && typeof result === 'object') {
                    result = migrateSettings(result);
                    for (const key of Object.keys(result)) {
                        if (Object.prototype.hasOwnProperty.call(base, key)) {
                            const value = result[key];
                            if (typeof value !== undefined) {
                                base[key] = value;
                                let temp = new settings[key];
                                temp._setValue(value);
                            }
                        }
                    }
                }
            }
        } catch (e) {
            // ignore
        }
        this.store = base;
    }

    /**
     * @private
     */
    saveToLocalStorage () {
        if (this.remote) {
            return;
        }
        try {
            const result = {
                _: VERSION,
                ...this.store
            };
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(result));
        } catch (e) {
            // ignore
        }
    }
}

export default SettingsStore;