import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import log from '../lib/log';
import twLibraryMixin from '../lib/libraries/tw-library-mixin';

import extensionLibraryContent, {
    galleryError,
    galleryLoading,
    galleryMore,
    penguinmodGallery,
    penguinmodGalleryExtra
} from '../lib/libraries/extensions/index.jsx';
import { isTrustedExtension } from "./tw-security-manager.jsx";
import extensionTags from '../lib/libraries/extension-tags';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';
import extensions from '../lib/libraries/extensions/index.jsx';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    header: {
        defaultMessage: 'Extensions',
        description: 'Header for extension library',
        id: 'pm.gui.extensionLibrary.header'
    }
});

const toLibraryItem = extension => {
    if (typeof extension === 'object') {
        return ({
            rawURL: extension.iconURL || extensionIcon,
            featured: true,
            ...extension
        });
    }
    return extension;
};

const translateGalleryItem = (extension, locale) => ({
    ...extension,
    name: extension.nameTranslations[locale] || extension.name,
    description: extension.descriptionTranslations[locale] || extension.description
});

let cachedGallery = null;
let cachedPmGallery = null;
let externalGalleryListenerAttached = false;

const fetchLibrary = async () => {
    const res = await fetch('https://extensions.turbowarp.org/generated-metadata/extensions-v0.json');
    if (!res.ok) {
        throw new Error(`HTTP status ${res.status}`);
    }
    const data = await res.json();
    return data.extensions.map(extension => ({
        name: extension.name,
        nameTranslations: extension.nameTranslations || {},
        description: extension.description,
        descriptionTranslations: extension.descriptionTranslations || {},
        extensionId: extension.id,
        extensionURL: `https://extensions.turbowarp.org/${extension.slug}.js`,
        iconURL: `https://extensions.turbowarp.org/${extension.image || 'images/unknown.svg'}`,
        tags: [],
        credits: [
            ...(extension.original || []),
            ...(extension.by || [])
        ],
        docsURI: extension.docs ? `https://extensions.turbowarp.org/${extension.slug}` : null,
        samples: extension.samples ? extension.samples.map(sample => ({
            href: `${process.env.ROOT}editor?project_url=https://extensions.turbowarp.org/samples/${encodeURIComponent(sample)}.sb3`,
            text: sample
        })) : null,
        incompatibleWithScratch: !extension.scratchCompatible,
        featured: true
    }))
        .map(extension => twLibraryMixin[extension.extensionId] ?
            {...extension, ...twLibraryMixin[extension.extensionId]} :
            (console.debug(`no mixin for ${extension.extensionId}`) || extension)
        )
        .map(extension => ({...extension, tags: [...extension.tags, "tw"]}))
        .filter(extension => !extension.hide);
};

const fetchPenguinmodLibrary = async () => {
    const res = await fetch('https://extensions.penguinmod.com/extensions.json');
    if (!res.ok) {
        throw new Error(`HTTP status ${res.status}`);
    }
    const data = await res.json();
    return data.map(extension => ({
        name: extension.name,
        description: extension.description,
        extensionId: '', // not provided
        extensionURL: `https://extensions.penguinmod.com/extensions/${extension.code}`,
        iconURL: `https://extensions.penguinmod.com/images/${extension.banner}`,
        credits: [extension.creatorAlias ?? extension.creator],
        tags: ['pm', ...(extension.tags ?? [])]
    }))
};

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'wrapperEventHandler',
        ]);
        this.pendingExtensions = new Set();
        this.state = {
            gallery: cachedGallery,
            galleryError: null,
            galleryTimedOut: false,

            pmGallery: cachedPmGallery
        };
    }
    componentDidMount () {
        if (!externalGalleryListenerAttached) {
            window.addEventListener('message', this.wrapperEventHandler);
        }
        if (!this.state.gallery) {
            const timeout = setTimeout(() => {
                this.setState({
                    galleryTimedOut: true
                });
            }, 750);

            fetchLibrary()
                .then(gallery => {
                    cachedGallery = gallery;
                    this.setState({
                        gallery
                    });
                    clearTimeout(timeout);
                })
                .catch(error => {
                    log.error(error);
                    this.setState({
                        galleryError: error
                    });
                    clearTimeout(timeout);
                });
        }
        if (!this.state.pmGallery) {
            fetchPenguinmodLibrary()
                .then(gallery => {
                    cachedPmGallery = gallery;
                    this.setState({
                        pmGallery: gallery
                    });
                });
        }
    }
    handleItemSelect (item) {
        if (item.href) {
            return;
        }

        const extensionId = item.extensionId;
        if (extensionId === 'custom_extension') {
            this.props.onOpenCustomExtensionModal();
            return;
        }

        const url = item.extensionURL ? item.extensionURL : extensionId;
        if (!item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(extensionId)) {
                this.props.onCategorySelected(extensionId);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url)
                    .then(() => {
                        this.props.onCategorySelected(extensionId);
                    })
                    .catch(err => {
                        log.error(err);
                        // eslint-disable-next-line no-alert
                        alert(err);
                    });
            }
        }
    }
    async wrapperEventHandler(e) {
        /**
         * External gallery support.
         * 
         * Supports galleries outside the editor to automatically load extensions without
         * having to manually input the extension code.
         */
        // Don't recursively try to run this event.
        if (e.origin === window.origin) return;

        // 'isTrustedExtension' checks the extension url.
        if (!isTrustedExtension(e.origin)) {
            e.source.postMessage({
                p4: {
                    type: 'error',
                    error: 'not_trusted'
                }
            }, e.origin);
            return;
        }

        const extensionSource = e.data.loadExt;
        if (!extensionSource || typeof extensionSource !== 'string') {
            e.source.postMessage({
                p4: {
                    type: 'error',
                    error: 'no_extension_source_string'
                }
            }, e.origin);
            return;
        }

        // Load the extension like any other custom extension url (this means sandboxing for some urls)
        if (
            this.props.vm.extensionManager.isExtensionLoaded(extensionSource) ||
            this.props.vm.extensionManager.workerURLs.includes(extensionSource)
        ) {
            this.props.onCategorySelected(extensionSource);
            e.source.postMessage({
                p4: {
                    type: 'success'
                }
            }, e.origin);
        } else {
            if (this.pendingExtensions.has(extensionSource)) {
                // Prevent dual loading.
                return;
            }

            this.pendingExtensions.add(extensionSource);
            this.props.vm.extensionManager.loadExtensionURL(extensionSource)
                .then(() => {
                    this.pendingExtensions.delete(extensionSource);
                    this.props.onCategorySelected(extensionSource);
                    e.source.postMessage({
                        p4: {
                            type: 'success'
                        }
                    }, e.origin);
                })
                .catch(err => {
                    log.error(err);
                    // The source website is expected to display the error
                    e.source.postMessage({
                        p4: {
                            type: 'error',
                            error: 'couldnt_load',
                            pmerror: String(err.stack ? err.stack : err)
                        }
                    }, e.origin);
                });
        }
    }
    render () {
        let library = null;
        library = extensionLibraryContent.map(toLibraryItem);
        library.push('---');
        library.push(...penguinmodGallery.map(toLibraryItem));
        library.push('---');
        library.push(...penguinmodGalleryExtra.map(toLibraryItem));
        if (this.state.pmGallery) {
            library.push(...this.state.pmGallery.map(toLibraryItem));
        }
        library.push('---');
        if (this.state.gallery) {
            library.push(toLibraryItem(galleryMore));
            const locale = this.props.intl.locale;
            library.push(
                ...this.state.gallery
                    .map(i => translateGalleryItem(i, locale))
                    .map(toLibraryItem)
            );
        } else if (this.state.galleryError) {
            library.push(toLibraryItem(galleryError));
        } else {
            library.push(toLibraryItem(galleryLoading));
        }

        return (
            <LibraryComponent
                data={library}
                filterable
                persistableKey="extensionId"
                id="extensionLibrary"
                tags={extensionTags}
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                header={this.props.intl.formatMessage(messages.header)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    intl: intlShape.isRequired,
    onCategorySelected: PropTypes.func,
    onEnableProcedureReturns: PropTypes.func,
    onOpenCustomExtensionModal: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(ExtensionLibrary);
