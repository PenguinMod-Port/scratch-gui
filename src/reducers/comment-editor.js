const ACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_COLOR_EDITOR';
const ACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_FONT_EDITOR';
const DEACTIVATE_COMMENT_COLOR_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_COLOR_EDITOR';
const DEACTIVATE_COMMENT_FONT_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_FONT_EDITOR';
const SET_CALLBACK = 'scratch-gui/comment-editor/SET_CALLBACK';

const initialState = {
    active: false,
    data: null,
    callback: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_COMMENT_COLOR_EDITOR:
    case ACTIVATE_COMMENT_FONT_EDITOR:
        return Object.assign({}, state, {
            active: true,
            data: action.data,
            callback: action.callback
        });
    case DEACTIVATE_COMMENT_COLOR_EDITOR:
    case DEACTIVATE_COMMENT_FONT_EDITOR:
        // Can be called without data to deactivate without saving
        // i.e. when clicking on the modal background
        if (action.data) {
            state.callback(action.data);
        }
        return Object.assign({}, state, {
            active: false,
            data: null,
            callback: null
        });
    case SET_CALLBACK:
        return Object.assign({}, state, {callback: action.callback});
    default:
        return state;
    }
};

/**
 * Action creator to open the comment editor modal.
 * @param {!Element} data The visual data for the comment.
 * @param {!function(!Element)} callback The function to call when done editing procedure.
 *     Expect the callback to be a function that takes a new XML mutator node.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const activateCommentColor = (data, callback) => ({
    type: ACTIVATE_COMMENT_COLOR_EDITOR,
    data: data,
    callback: callback
});

/**
 * Action creator to open the comment editor modal.
 * @param {!Element} data The visual data for the comment.
 * @param {!function(!Element)} callback The function to call when done editing procedure.
 *     Expect the callback to be a function that takes a new XML mutator node.
 * @returns {object} An action object with type ACTIVATE_COMMENT_FONT_EDITOR.
 */
const activateCommentFont = (data, callback) => ({
    type: ACTIVATE_COMMENT_FONT_EDITOR,
    data: data,
    callback: callback
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Element} data The visual data for the comment, or null if the callback should not be called.
 * @returns {object} An action object with type ACTIVATE_COMMENT_COLOR_EDITOR.
 */
const deactivateCommentColor = data => ({
    type: DEACTIVATE_COMMENT_COLOR_EDITOR,
    data: data
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Element} data The visual data for the comment, or null if the callback should not be called.
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