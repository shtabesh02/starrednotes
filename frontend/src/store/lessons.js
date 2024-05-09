import { csrfFetch } from "./csrf";

const LOADLESSONS = 'LOADLESSONS';

// regular action to load lessons
const loadlessons = (lessons) => {
    return {
        type: LOADLESSONS,
        lessons
    }
}
// thunk action to lead lessons from DB
export const loadlessonsfromDB = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/lessons`);
    console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        console.log('date: ', data)
        dispatch(loadlessons(data));
    }
}


// lessons reducer
const initialState = {
    lessons: {},
    lessonDetails: {}
}
const lessonReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADLESSONS: {
            return {...state, lessons: action.lessons}
        }
        default:
            return state;
    }
}
export default lessonReducer;