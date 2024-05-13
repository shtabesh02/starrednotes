import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addnewlesson } from "../../store/lessons";
import { loadCoursefromDB } from "../../store/courses";

const AddLesson = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState('');
    const user_id = useSelector(state => state.session.user.id);
    const course_title = useSelector(state => state.courseReducer.courseDetails.title);
    const {course_id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addlesson = async (e) => {
        e.preventDefault();
        const newlesson = {
            course_id,
            user_id,
            title,
            content
        }
        const addsuccess = await dispatch(addnewlesson(newlesson, course_id))
        if(addsuccess){
            navigate(`/courses/${course_id}/managelessons`);
        }
    }

    useEffect(()=> {
        dispatch(loadCoursefromDB(course_id))
    }, [dispatch, course_id]);
  return (
    <div>
        <h1>Add a new lesson to {course_title} course</h1>
        <form onSubmit={addlesson}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} name="lessoncontent" id="lessoncontent" cols="30" rows="10">Content</textarea>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddLesson