import { csrfFetch } from "./csrf";

const LOADCOMMENTS = 'loaddallcomments';
const ADDANEWCOMMENT = 'addanewcomment';
const DELETEACOMMENT = 'deleteacomment';
const UPDATETHISCOMMENT = 'updatethiscomment';

// regular action to load comments
const loadcomments = (comments) => {
    return {
        type: LOADCOMMENTS,
        comments
    }
}
// thunk action to load comments from db
export const loadcommentsfromDB = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/comments`);
    if (response.ok) {
        const data = await response.json();
        // NOTE: the data is array of objects. So when designing the state be aware of that.
        // You may create an object of objects as the state.
        dispatch(loadcomments(data));
    }
}

// regular action while adding new comment and updating the state
const addnewcomment = (comment) => {
    return {
        type: ADDANEWCOMMENT,
        comment
    }
}
// thunk action to add new comment
export const addnewcommenttoDB = (new_comment, course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/comment`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_comment)
    });
    const data = await response.json();
    // The new comment is sent to the reducer as an object
    dispatch(addnewcomment(data))
    return response;
    // if(response.ok){
    //     const data = await response.json();
    //     // The new comment is sent to the reducer as an object
    //     dispatch(addnewcomment(data))
    // }
}

// regular action to delete a comment
const dcomment = (comment_id) => {
    return {
        type: DELETEACOMMENT,
        comment_id
    }
}
// thunk action to delete a comment
export const deletecomment = (comment_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/comments/${comment_id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        // Just send the comment_id to the reducer to delete that from the state
        dispatch(dcomment(comment_id))
        return true;
    }
}

// regular action to update a comment
const editacomment = (updatedcomment) => {
    return {
        type: UPDATETHISCOMMENT,
        updatedcomment
    }
}
// thunk action to update a comment
export const editcomment = (updatedcomment, comment_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/comments/${comment_id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedcomment)
    });
    const data = await response.json();
        // The updated comment is sent to the reducer as an object
        dispatch(editacomment(data))
        return response;

    // if (response.ok) {
    //     const data = await response.json();
    //     // The updated comment is sent to the reducer as an object
    //     dispatch(editacomment(data))
    //     return true;
    // }
}


// comments reducer
const initialState = { comments: {} };
const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOADCOMMENTS: {
            // return {...state, comments: action.comments} // it works fine
            // Comments are loaded as an array of object. so you can manipulate as bellow:


            // const _comments = action.comments;
            // const _commentsobj = {};
            // _comments.forEach(comment => _commentsobj[comment.id] = comment);
            // return { ...state, comments: { ...state.comments, ..._commentsobj } }

            return {...state, comments: action.comments}
        }
        case ADDANEWCOMMENT: {
            // The new comment comes as an object
            return { ...state, comments: { ...state.comments, [action.comment.id]: action.comment } }
        }
        case DELETEACOMMENT: {
            // We only need to get the id of the deleted comment and delte it from the state
            newState = { ...state }
            delete newState.comments[action.comment_id]
            return newState
        }
        case UPDATETHISCOMMENT: {
            // The updated comment comes as an object, so similar to ADDing a comment to the state, add this to the state.
            return { ...state, comments: { ...state.comments, [action.updatedcomment.id]: action.updatedcomment } }
        }
        default:
            return state
    }
}

export default commentReducer;