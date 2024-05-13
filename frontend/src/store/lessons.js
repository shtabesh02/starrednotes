import { csrfFetch } from "./csrf";

const LOADLESSONS = 'LOADLESSONS';
const ADDANEWLESSON = 'addanewlesson';
const UPDATETHISLESSON = 'updatethislessondb';
const DELETEALESSON = 'deletealesson';

// regular action to load lessons
const loadlessons = (lessons) => {
    return {
        type: LOADLESSONS,
        lessons
    }
}
// thunk action to lead lessons from DB by course id
export const loadlessonsfromDB = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/lessons`);
    console.log('response: ', response)
    if (response.ok) {
        console.log('response.ok: ', response)
        const data = await response.json();
        console.log('data response: ', data)
        dispatch(loadlessons(data));
    }
}

// regular action to add new lesson to state
const addlesson = (newlesson) => {
    return {
        type: ADDANEWLESSON,
        newlesson
    }
}
// thunk action to add a new lesson to DB
export const addnewlesson = (newlesson, course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/newlesson`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newlesson)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addlesson(data));
        return true;
    }
}

// regular action to update a lesson
const updatelesson = (updatedlesson) => {
    return {
        type: UPDATETHISLESSON,
        updatedlesson
    }
}
// thunk action to update a lesson
export const updatethislessontoDB = (updatedlesson, lesson_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/lessons/${lesson_id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedlesson)
    })
    console.log('response: ', response)
    if (response.ok) {
        const data = await response.json();
        console.log('data: ', data)
        dispatch(updatelesson(data));
        return true;
    }
}

// regular action to delete the lesson
const deletethislesson = (lesson_id) => {
    return {
        type: DELETEALESSON,
        lesson_id
    }
}
// thunk action to delete a lesson based on its id
export const deltethelesson = (lesson_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/lessons/${lesson_id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deletethislesson(lesson_id));
        return true;
    }
}

// lessons reducer
const initialState = {
    lessons: {},
    lessonDetails: {}
}
const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADLESSONS: {
            const _lessons = {};
            action.lessons.forEach(lesson => _lessons[lesson.id] = lesson);
            return { ...state, lessons: { ...state.lessons, ..._lessons } }
        }
        case ADDANEWLESSON: {
            return { ...state, lessons: { ...state.lessons, [action.newlesson.id]: action.newlesson } }
        }
        case UPDATETHISLESSON: {
            return {...state, lessons: {...state.lessons, [action.updatedlesson.id]: action.updatedlesson}}
        }
        case DELETEALESSON: {
            const newState = {...state};
            delete newState.lessons[action.lesson_id]
            return newState
        }
        default:
            return state;
    }
}
export default lessonReducer;