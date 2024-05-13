import { csrfFetch } from "./csrf";

const LOADCOURSES = 'LOADCOURSES';
const AddCOURSE = 'AddNewCourse';
const LOADCOURSE = 'LOADCOURSE';
const LOADMYCOURSES = 'loadmycourses';
const UPDATETHISCOURSE = 'updatethiscourse';
const DELETETHISCOURSE = 'deletethiscourse';


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
        dispatch(loadCourses(data))
    }
}

// const regular action to load my courses
const loadmycourses = (my_courses) => {
    return {
        type: LOADMYCOURSES,
        my_courses
    }
}
// thunk action to load only my courses from db
export const loadmycoursesfromDB = (my_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/instructor/${my_id}`);
    if(response.ok){
        const data = await response.json();
        dispatch(loadmycourses(data));
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
    // console.log('course response: ', response);
    if(response.ok){
        const data = await response.json();
        // console.log('course data: ', data)
        dispatch(loadCourse(data))
    }
}

// regular action to a add a new course
const addcourse = (newcourse) => {
    return {
        type: AddCOURSE,
        newcourse
    }
}
// thunk action to add a new course
export const addcoursetoDB = (newcourse) => async (dispatch) => {
    const response = await csrfFetch('/api/courses/newcourse', {
        method: 'POST',
        headers: {'Content-Type':'Application/json'},
        body: JSON.stringify(newcourse)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(addcourse(data))
        return true;
    }
}

// regular action to update a course
const updatethiscourse = (updaedcourse) => {
    return {
        type: UPDATETHISCOURSE,
        updaedcourse
    }
}
// thunk action to update a course
export const updatecoursetoDB = (updatedcourse, course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}/update`, {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(updatedcourse)
    });
    console.log('response: ', response)
    if(response.ok){
        const data = await response.json()
        dispatch(updatethiscourse(data));
        return true;
    }
}

// regular action to delete a course
const deletecourse = (course_id) => {
    return{
        type: DELETETHISCOURSE,
        course_id
    }
}
// thunk action to delete a course
export const deletemycourse = (course_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/courses/${course_id}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(deletecourse(course_id));
        return true;
    }
}

// course reducer
const initialState = {
    courses: {},
    courseDetails: {}
};
const courseReducer = (state = initialState, action) => {
    // const newState = {...state};
    switch(action.type){
        case LOADCOURSES: {
            // return {...state, ...action.courses}
            // return {...state, courses: action.courses}
            const _mycourses = {};
            action.courses.forEach(course => _mycourses[course.id] = course);
            return {...state, courses: {...state.courses, ..._mycourses}}
        }
        case LOADCOURSE: {
            // return newState[action.course.id] = {...newState[action.course.id], ...action.course}
            // return {...state, courseDetails: action.course} // it worked
            return {...state, courseDetails: action.course}
        }
        case LOADMYCOURSES: {
            const _mycourses = {};
            action.my_courses.forEach(course => _mycourses[course.id] = course);
            return {...state, courses: {...state.courses, ..._mycourses}}
        }
        case AddCOURSE: {
            return {...state, courses: {...state.courses, [action.newcourse.id]: action.newcourse}}
        }
        case UPDATETHISCOURSE: {
            return {...state, courses: {...state.courses, [action.updaedcourse.id]: action.updaedcourse}}
        }
        case DELETETHISCOURSE: {
            const newState = {...state};
            delete newState.courses[action.course_id];
            return newState;
        }
        default:
            return state
    }
}

export default courseReducer