const ACTIVATE_COMMENT_EDITOR = 'scratch-gui/comment-editor/ACTIVATE_COMMENT_EDITOR';
const DEACTIVATE_COMMENT_EDITOR = 'scratch-gui/comment-editor/DEACTIVATE_COMMENT_EDITOR';

const initialState = {
    active: false,
    comment: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_COMMENT_EDITOR:
        return Object.assign({}, state, {
            active: true,
            comment: action.comment
        });
    case DEACTIVATE_COMMENT_EDITOR:
        return Object.assign({}, state, {
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
 * @returns {object} An action object with type ACTIVATE_COMMENT_EDITOR.
 */
const activateCommentEditor = comment => ({
    type: ACTIVATE_COMMENT_EDITOR,
    comment: comment
});

/**
 * Action creator to close the comment editor modal.
 * @param {?Object} comment The blockly comment.
 * @returns {object} An action object with type DEACTIVATE_COMMENT_EDITOR.
 */
const deactivateCommentEditor = comment => ({
    type: DEACTIVATE_COMMENT_EDITOR,
    comment: comment
});

export {
    reducer as default,
    initialState as commentEditorInitialState,
    activateCommentEditor,
    deactivateCommentEditor
};