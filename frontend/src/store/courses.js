import { csrfFetch } from "./csrf";

const LOADCOURSES = 'LOADCOURSES';
// const AddCOURSE = 'AddCourse';
const LOADCOURSE = 'LOADCOURSE'


// regular action to load courses
const loadCourses = (courses) => {
    return {
        type: LOADCOURSES,
        courses
    }
}
// thunk action to load courses from db
export const loadCoursesfromDB = () => async (dispatch) => {
    const response = await fetch('api/courses');
    if(response.ok){
        const data = await response.json();
        console.log('data: ', data)
        dispatch(loadCourses(data))
    }
}

// regular action to load a course by id
const loadCourse = (course) => {
    return {
        type: LOADCOURSE,
        course
    }
}
// thunk action to load a course from db by id
export const loadCoursefromDB = (course_id) => async (dispatch) => {
    // const response = await fetch(`/api/courses/${course_id}`);
    const response = await csrfFetch(`/api/courses/${course_id}`)
    console.log('course response: ', response);
    if(response.ok){
        const data = await response.json();
        console.log('course data: ', data)
        dispatch(loadCourse(data))
    }
}


// course reducer
const initialState = {
    courses: {},
    courseDetails: {}
};
const courseReducer = (state = initialState, action) => {
    const newState = {...state};
    switch(action.type){
        case LOADCOURSES: {
            // return {...state, ...action.courses}
            return {...state, courses: action.courses}
        }
        case LOADCOURSE: {
            // return newState[action.course.id] = {...newState[action.course.id], ...action.course}
            // return {...state, courseDetails: action.course} // it worked
            return {...state, courseDetails: action.course}
        }
        default:
            return state
    }
}

export default courseReducer