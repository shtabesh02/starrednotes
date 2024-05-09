import { csrfFetch } from "./csrf";

const LOADCOMMENTS = 'loaddallcomments';

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
    if(response.ok){
        const data = await response.json();
        dispatch(loadcomments(data));
    }
}


// comments reducer
const initialState = {comments: {}};
const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADCOMMENTS: {
            return {...state, comments: action.comments}
        }
        default:
            return state
    }
}

export default commentReducer;