// frontend/src/components/Lessons/AddLesson.jsx
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addnewlesson } from "../../store/lessons";
import { loadCoursefromDB } from "../../store/courses";

const AddLesson = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const user_id = useSelector(state => state.session.user.id);
    const course_title = useSelector(state => state.courseReducer.courseDetails.title);
    const { course_id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addlesson = (e) => {
        e.preventDefault();
        const newlesson = {
            course_id,
            user_id,
            title,
            content
        }
        dispatch(addnewlesson(newlesson, course_id))
        .then(() => {
            navigate(`/courses/${course_id}/managelessons`)
        })
        .catch( async (res) => {
            const data = await res.json();
            if(data?.errors){
                setErrors(data.errors);
            }
        })
    }

    useEffect(() => {
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);
    return (
        <div>
            <h1>Add a new lesson to {course_title} course</h1>
            <form onSubmit={addlesson}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    {errors.title && <p className="errorcss">{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} name="lessoncontent" id="lessoncontent" cols="30" rows="10">Content</textarea>
                    {errors.content && <p className="errorcss">{errors.content}</p>}
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddLesson