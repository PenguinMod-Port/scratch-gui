const ACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_COLOR_EDITOR';
const ACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_FONT_EDITOR';
const DEACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_COLOR_EDITOR';
const DEACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_FONT_EDITOR';

const initialState = {
    mode: null,
    active: false,
    comment: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_COMMENT_COLOR_EDITOR:
        return Object.assign({}, state, {
            mode: 'color',
            active: true,
            comment: action.comment
        });
    case ACTIVATE_COMMENT_FONT_EDITOR:
        return Object.assign({}, state, {
            mode: 'font',
            active: true,
            comment: action.comment
        });
    case DEACTIVATE_COMMENT_COLOR_EDITOR:
    case DEACTIVATE_COMMENT_FONT_EDITOR:
        return Object.assign({}, state, {
            mode: null,
            active: false,
            comment: null
        });
    default:
        return state;
    }
};

/**
 * Action creator to open the comment editor modal.
 * @param {!Object} comment The blockly comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const activateCommentColor = comment => ({
    type: ACTIVATE_COMMENT_COLOR_EDITOR,
    comment: comment
});

/**
 * Action creator to open the comment editor modal.
 * @param {!Object} comment The blockly comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_FONT_EDITOR.
 */
const activateCommentFont = comment => ({
    type: ACTIVATE_COMMENT_FONT_EDITOR,
    comment: comment
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Object} comment The blockly comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const deactivateCommentColor = comment => ({
    type: DEACTIVATE_COMMENT_COLOR_EDITOR,
    comment: comment
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Object} comment The blockly comment.
 * @returns {object} An action object with type ACTIVATE_COMMENT_FONT_EDITOR.
 */
const deactivateCommentFont = comment => ({
    type: DEACTIVATE_COMMENT_FONT_EDITOR,
    comment: comment
});

export {
    reducer as default,
    initialState as commentEditorInitialState,
    activateCommentColor,
    activateCommentFont,
    deactivateCommentColor,
    deactivateCommentFont
};