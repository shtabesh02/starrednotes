import { useEffect, useState } from 'react'
import './LessonDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { loadlessonsfromDB } from '../../store/lessons';
import { useParams } from 'react-router-dom';

const LessonDetails = () => {
    const dispatch = useDispatch();
    const { course_id } = useParams();

    const { lesson_id } = useParams();

    const lessons = useSelector(state => Object.values(state.lessonReducer.lessons));

    // normalizing lessons, to find the index of default lesson and use in the bellow useState 
    let normalizedLessons = {};
    lessons.forEach(lesson => {
        normalizedLessons[lesson.id] = lesson;
    })
    const defaultindex = lessons.indexOf(normalizedLessons[lesson_id])

    // Table of contents
    const [displayedLesson, setDisplayedLesson] = useState('');
    const [currentLessonIndex, setCurrentLessonIndex] = useState(defaultindex);

    // display lessons from the table of content / sidebar
    const handleDisplayedLesson = (lesson_index) => {
        setDisplayedLesson(lessons[lesson_index])
        setCurrentLessonIndex(lesson_index)
    }

    // next
    const handlenext = () => {
        if(currentLessonIndex == lessons.length-1){
            return
        }else if(currentLessonIndex < lessons.length-1){
            setDisplayedLesson(lessons[currentLessonIndex + 1])
            setCurrentLessonIndex(currentLessonIndex + 1)
        }
    }

    // pref
    const handleprev = () => {
        if(currentLessonIndex == 0){
            return
        }else if(currentLessonIndex > 0){
            setDisplayedLesson(lessons[currentLessonIndex - 1])
            setCurrentLessonIndex(currentLessonIndex - 1)
        }
    }

    useEffect(() => {
        dispatch(loadlessonsfromDB(course_id))
    }, [dispatch, course_id])

    return (
        <div className="lessonDetails_container">
            <h1>Introduction to Sequelize.js</h1>
            <div className="lesson_contents">
                <div className="lessoncontent">
                    {displayedLesson ? (
                        <>
                            <p>{displayedLesson.content}</p>
                            <div className="next_prev">
                                <button className='previusbtn' onClick={() => handleprev()}>Previous</button>
                                <button className='nextbtn' onClick={() => handlenext()}>Next</button>
                                </div>
                        </>
                    ) : (
                        <>
                            {lessons.length > 0 && lessons.map((lesson) => (
                                <>
                                    {lesson?.id === parseInt(lesson_id) && <p>{lesson.content}</p>}
                                </>
                            ))
                            }
                            <div className="next_prev">
                                <button className='previusbtn' onClick={() => handleprev()}>Previous</button>
                                <button className='nextbtn' onClick={() => handlenext()}>Next</button>
                                </div>
                        </>
                    )
                    }
                </div>
                <div className="table_of_contents">
                    <h3>Table of contents</h3>
                    <ul>
                        {lessons.length > 0 && lessons.map((lesson, index) => (
                            <li key={lesson.id} onClick={() => handleDisplayedLesson(index)}>{lesson.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LessonDetails