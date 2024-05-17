import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deltethelesson, loadlessonsfromDB } from "../../store/lessons";
import { useNavigate, useParams } from "react-router-dom";
import { loadCoursefromDB } from "../../store/courses";

const ManageLessons = () => {
    const dispatch = useDispatch();
    const { course_id } = useParams();
    const navigate = useNavigate();
    const course_title = useSelector(state => state.courseReducer.courseDetails?.title)
    const lessons = useSelector(state => Object.values(state.lessonReducer?.lessons));
    const thiscourse = lessons.filter(lesson => lesson.course_id == course_id)

    useEffect(() => {
        dispatch(loadlessonsfromDB(course_id))
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);

    // handel delete
    const deletelesson = async (lession_id) => {
       const deletesuccess = await dispatch(deltethelesson(lession_id))
       if(deletesuccess){
        alert('Lesson deleted successfuly...')
        navigate(`/courses/${course_id}/managelessons`);
       }
    }
    return (
        <div>
            <div className="back2managecourses">
                <button onClick={() => navigate('/managecourses')}>Back to course management</button>
            </div>
            <h1>Manage {course_title} Lessons</h1>
            <div>
                <button onClick={()=> navigate(`/courses/${course_id}/addlesson`)}>Add a new lesson</button>
            </div>
            <ol>
                {thiscourse.length > 0 ? (
                    thiscourse.map(lesson => (
                        <div key={lesson.id}>
                            <li>{lesson.title}</li>
                            <button onClick={() => deletelesson(lesson.id)}>Delete</button>
                            <button onClick={() => navigate(`/courses/${course_id}/updatelesson/${lesson.id}`)}>Update</button>
                        </div>
                    ))
                ):(
                    <div>
                        <p>No lessons found for this course.</p>
                    </div>
                )
                }
            </ol>
        </div>
    )
}

export default ManageLessons