import EventTargetShim from './event-target';

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
        /**for (const addonId of Object.keys(addons)) {
            result[addonId] = {};
        }*/
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
                            if (value && typeof value === 'object') {
                                base[key] = value;
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
                _: VERSION
            };
            /**for (const addonId of Object.keys(addons)) {
                const data = this.getAddonStorage(addonId);
                if (Object.keys(data).length > 0) {
                    result[addonId] = data;
                }
            }*/
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(result));
        } catch (e) {
            // ignore
        }
    }
}

export default SettingsStore;