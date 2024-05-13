import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatethislessontoDB } from '../../store/lessons';

const UpdateLesson = () => {

    const {course_id, lesson_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = useSelector(state => state.session.user.id)
    const updatinglesson = useSelector(state => state.lessonReducer.lessons[lesson_id])
    const [title, setTitle] = useState(updatinglesson.title);
    const [content, setContent] = useState(updatinglesson.content);

    // update this lesson
    const updatethelesson = async (e) => {
        e.preventDefault();
        const updatedlesson = {
            course_id,
            user_id,
            title,
            content
        }
        const updatesuccess = await dispatch(updatethislessontoDB(updatedlesson, lesson_id));
        if(updatesuccess){
            navigate(`/courses/${course_id}/managelessons`);
        }else{
            console.log('failed to update...')
        }
    }
    return (
        <div>
            <h1>Update Lesson</h1>
            <form onSubmit={updatethelesson}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
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

export default UpdateLesson