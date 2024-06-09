import { useEffect, useState } from 'react'
import './LessonDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { loadlessonsfromDB } from '../../store/lessons';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { loadCoursefromDB } from '../../store/courses';
import DOMPurify from 'dompurify';

const LessonDetails = () => {
    const dispatch = useDispatch();
    const { course_id, lesson_id } = useParams();

    const navigate = useNavigate();
    const course = useSelector(state => state.courseReducer.courseDetails);
    const lessons = useSelector(state => Object.values(state.lessonReducer.lessons));
    let activelesson = lessons.filter(lesson => lesson.id == lesson_id);

    let activeindex = lessons.findIndex(lesson => lesson.id == lesson_id)

    let normalizedLessons = {};
    lessons.forEach(lesson => {
        normalizedLessons[lesson.id] = lesson;
    })

    const [nextdisabled, setNextdisabled] = useState(false);
    const [prevdisabled, setPrevdisabled] = useState(false);
    // next
    const handlenext = () => {
        // console.log('lesson_id: ', lesson_id)
        if (activeindex == lessons.length - 1) {
            setNextdisabled(true);
            return
        } else if (activeindex < lessons.length - 1) {
            // activeindex = lessons.findIndex(lesson => lesson.id == lesson_id);            
            setNextdisabled(false)
            navigate(`/courses/${course_id}/lessons/${lessons[activeindex + 1]?.id}`);
        }
    }
    useEffect(() => {
        if (activeindex == lessons.length - 1) {
            setNextdisabled(true);
        } else {
            setNextdisabled(false)
        }
    }, [activeindex, lessons.length]);

    // pref
    const handleprev = () => {
        if (activeindex == 0) {
            return
        } else if (activeindex > 0) {
            navigate(`/courses/${course_id}/lessons/${lessons[activeindex - 1]?.id}`);
        }
    }
    useEffect(() => {
        if (activeindex == 0) {
            setPrevdisabled(true)
        } else {
            setPrevdisabled(false)
        }
    }, [activeindex]);

    useEffect(() => {
        dispatch(loadlessonsfromDB(course_id));
    }, [dispatch, course_id]);
     
    useEffect(() => {
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);


    return (
        <>
            <div className="lessonDetails_container">
                <div className="back2courseDetails">
                    <button onClick={() => navigate(`/courses/${course_id}`)}>Back</button>
                </div>
                <h1>{course.title}</h1>
                <h2>{activelesson[0]?.title}</h2>
                <div className="lesson_contents">
                    <div className="lessoncontent">
                        {activelesson ? (
                            // {displayedLesson ? (
                            <>
                                <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(activelesson[0]?.content.replace(/\n/g, '<br>')),
                        }}>
                                    {/* {activelesson[0]?.content} */}
                                    
                                </div>
                                <div className="next_prev">
                                    <button className={`prevbtn ${prevdisabled ? 'disabled' : false}`} onClick={() => handleprev()}>Previous</button>
                                    <button className={`nextbtn ${nextdisabled ? 'disabled' : false}`} onClick={() => handlenext()}>Next</button>
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
                                    <button className={`prevbtn ${prevdisabled ? 'disabled' : false}`} onClick={() => handleprev()}>Previous</button>
                                    <button className={`nextbtn ${nextdisabled ? 'disabled' : false}`} onClick={() => handlenext()}>Next</button>
                                    {/* <button className='nextbtn' onClick={() => navigate(`/courses/${course_id}/lessons/${lesson.id}`)}>Next</button> */}
                                </div>
                            </>
                        )
                        }
                    </div>
                    <div className="table_of_contents">
                        <h3>Table of contents</h3>
                        <ul className='toc'>
                            {lessons.length > 0 && lessons.map((lesson) => (
                                // <li key={lesson.id} onClick={() => handleDisplayedLesson(index)}>{lesson.title}</li> index is a parameter of map
                                // <li key={lesson.id} onClick={() => navigate(`/courses/${course_id}/lessons/${lesson.id}`)}>{lesson.title}</li>
                                <li key={lesson.id}>
                                    <NavLink to={`/courses/${course_id}/lessons/${lesson.id}`} style={{ textDecoration: "none" }}>
                                        {lesson.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonDetails