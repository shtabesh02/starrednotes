import { useEffect, useState } from 'react'
import './LessonDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { loadlessonsfromDB } from '../../store/lessons';
import { useParams } from 'react-router-dom';

const LessonDetails = () => {
    const dispatch = useDispatch();
    const {course_id} = useParams();

    const lessons = useSelector(state => state.lessonReducer.lessons);

    console.log('course_id from lesson details: ', course_id)
    const [displayedLesson, setDisplayedLesson] = useState();
    const handleDisplayedLesson = (lesson_id) => {

    }

    useEffect(()=> {
        dispatch(loadlessonsfromDB(course_id))
    },[dispatch, course_id])
  return (
    <div className="lessonDetails_container">
        <h1>Introduction to Sequelize.js</h1>
        <div className="lesson_contents">
        <div className="lessoncontent">
            Sequelize is a useful orm.
        </div>
        <div className="table_of_contents">
            <ul>

            {lessons.length > 0 && lessons.map(lesson => (
                <li key={lesson.id} onClick={() => handleDisplayedLesson(lesson.id)}>{lesson.title}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
  )
}

export default LessonDetails