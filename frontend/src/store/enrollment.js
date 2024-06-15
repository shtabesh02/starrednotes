import { csrfFetch } from "./csrf";

const LOADENROLLMENT = 'loadallthecoursesthatimenrolledin';
const ENROLLNOW = 'getenrolledinyourcoursenow';

// regular action to add enrolled courses to the state
const loadenrolledcourses = (enrolledcourses) => {
    return {
        type: LOADENROLLMENT,
        enrolledcourses
    }
}
// thunk action to load all enrolled courses from db
export const loadEnrollment = (user_id) => async (dispatch) => {
    console.log('user_id : ', user_id)
    const response = await csrfFetch(`/api/enrollment/${user_id}`);
    console.log('response: ', response)
    if(response.ok){
        const data = await response.json();
        dispatch(loadenrolledcourses(data));
    }else{
        const errors = await response.json();
        return errors;
    }
}


// regular action to add enrollment to the state
const enroll = (enrollment) => {
    return {
        type: ENROLLNOW,
        enrollment
    }
}
// thunk action to enroll
export const getenrolled = (enrollment) => async(dispatch) => {
    const response = await csrfFetch(`/api/enrollment/enrollnow`, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(enrollment)
    });
    if(response.ok){
        const data = await response.json();
        console.log('data from thunk: ', data)
        dispatch(enroll(data));
    }
}

// enrollment reducer
const initialState = {
    enrolled: {}
}

const enrollmentReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADENROLLMENT: {
            return {...state, enrolled: action.enrolledcourses}
        }
        case ENROLLNOW: {
            return {...state, enrolled: action.enrollment}
        }
        default:
            return state
    }
}

export default enrollmentReducer;