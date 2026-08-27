import SettingsStore from './settings-store';
const settingStore = new SettingsStore();
/* debug */ window.editorSettings = settingStore;
export default settingStore;
