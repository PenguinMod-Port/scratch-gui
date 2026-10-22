import ScratchStorage from "scratch-storage";

import defaultProject from "./default-project";

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor() {
        super();
        this.cacheDefaultProject();
    }
    addOfficialScratchWebStores() {
        const die = () => {
            throw new Error("We do not support saving in the editor");
        };

        this.addWebStore(
            [this.AssetType.Project],
            this.getProjectGetConfig.bind(this),
            die,
            die,
        );
        this.addWebStore(
            [
                this.AssetType.ImageVector,
                this.AssetType.ImageBitmap,
                this.AssetType.Sound,
                this.AssetType.Font,
            ],
            this.getAssetGetConfig.bind(this),
            die,
            die,
        );
        this.addWebStore(
            [
                this.AssetType.ImageVector,
                this.AssetType.ImageBitmap,
                this.AssetType.Sound,
                this.AssetType.Font,
            ],
            this.getScratchAssetGetConfig.bind(this),
            die,
            die,
        );
    }
    setProjectHost(projectHost) {
        this.projectHost = projectHost;
    }
    setProjectID(projectID) {
        this.projectID = projectID;
    }
    getProjectGetConfig(projectAsset) {
        // projectHost ends in projectID query param
        return `${this.projectHost}=${projectAsset.assetId}`;
    }
    getProjectCreateConfig() {
        return {
            url: `${this.projectHost}/`,
            withCredentials: true,
        };
    }
    setAssetHost(assetHost) {
        this.assetHost = assetHost;
    }
    getAssetGetConfig(asset) {
        if (!this.projectID || this.projectID == "0") {
            // we might be fetching one of the dumb assets scratch stores
            // because for some reason the editor will fetch random assets
            // from the scratch cdn
            return this.getScratchAssetGetConfig(asset);
        }

        return `${this.assetHost}/${this.projectID}_${asset.assetId}.${asset.dataFormat}`;
    }
    getScratchAssetGetConfig(asset) {
        return `https://assets.scratch.mit.edu/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
    }
    setTranslatorFunction(translator) {
        this.translator = translator;
        this.cacheDefaultProject();
    }
    cacheDefaultProject() {
        const defaultProjectAssets = defaultProject(this.translator);
        defaultProjectAssets.forEach((asset) =>
            this.builtinHelper._store(
                this.AssetType[asset.assetType],
                this.DataFormat[asset.dataFormat],
                asset.data,
                asset.id,
            ),
        );
    }
}

const storage = new Storage();

export default storage;
