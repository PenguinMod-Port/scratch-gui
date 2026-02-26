import SettingsStore from './settings-store';

const settingStore = new SettingsStore();
settingStore.readLocalStorage();

/* debug */ window.editorSettings = settingStore;

export default settingStore;
