import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { loadCoursesfromDB } from '../../store/courses';
import './CoursesRibbon.css'
const CoursesRibbon = () => {
    const courses = useSelector(state => Object.values(state.courseReducer?.courses));
    // getting the unique categories:
    const coursesCategory = [];
    const myset = new Set();

    courses.forEach(course => {
        if(!myset.has(course.category)){
            myset.add(course.category);
            coursesCategory.push(course.category)
        }
    })

    console.log('unique category: ', coursesCategory)


    // console.log('course type: ', typeof (courses))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCoursesfromDB());
    }, [dispatch]);

    return (
        <div className='courses-ribbon'>
            <ul className="courses_title">
                {coursesCategory.length > 0 ? (
                    coursesCategory.map(course => (
                    <li key={course.id}>
                        <NavLink to={'/'} style={{textDecoration: 'none'}}>
                            {course}
                        </NavLink>
                        </li>
                    ))
                ) : (null)}
            </ul>
        </div>
    )
}

export default CoursesRibbon