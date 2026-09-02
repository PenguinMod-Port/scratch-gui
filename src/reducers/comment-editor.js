const ACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_COLOR_EDITOR';
const ACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_FONT_EDITOR';
const DEACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_COLOR_EDITOR';
const DEACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_FONT_EDITOR';

const initialState = {
    mode: null,
    active: false,
    data: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_COMMENT_COLOR_EDITOR:
        return Object.assign({}, state, {
            mode: 'color',
            active: true,
            data: action.data
        });
    case ACTIVATE_COMMENT_FONT_EDITOR:
        return Object.assign({}, state, {
            mode: 'font',
            active: true,
            data: action.data
        });
    case DEACTIVATE_COMMENT_COLOR_EDITOR:
    case DEACTIVATE_COMMENT_FONT_EDITOR:
        return Object.assign({}, state, {
            mode: null,
            active: false,
            data: null
        });
    default:
        return state;
    }
};

/**
 * Action creator to open the comment editor modal.
 * @param {!Object} data The visual data for the comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const activateCommentColor = data => ({
    type: ACTIVATE_COMMENT_COLOR_EDITOR,
    data: data
});

/**
 * Action creator to open the comment editor modal.
 * @param {!Object} data The visual data for the comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_FONT_EDITOR.
 */
const activateCommentFont = data => ({
    type: ACTIVATE_COMMENT_FONT_EDITOR,
    data: data
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Object} data The visual data for the comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const deactivateCommentColor = data => ({
    type: DEACTIVATE_COMMENT_COLOR_EDITOR,
    data: data
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Object} data The visual data for the comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_FONT_EDITOR.
 */
const deactivateCommentFont = data => ({
    type: DEACTIVATE_COMMENT_FONT_EDITOR,
    data: data
});

export {
    reducer as default,
    initialState as commentEditorInitialState,
    activateCommentColor,
    activateCommentFont,
    deactivateCommentColor,
    deactivateCommentFont
};