import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadmylesson, updatethislessontoDB } from '../../store/lessons';

import './UpdateLesson.css'

const UpdateLesson = () => {

    const { course_id, lesson_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = useSelector(state => state.session.user.id)
    // const alllessons = useSelector(state => Object.values(state.lessonReducer?.lessons));
    // const updatinglesson = alllessons.filter(lesson => lesson.id == lesson_id);
    const updatinglesson = useSelector(state => state.lessonReducer.my_lesson[lesson_id]);

    // const updatinglesson = useSelector(state => state.lessonReducer.lessons[lesson_id])
    // console.log('updatinglesson: ', updatinglesson)
    const [title, setTitle] = useState(updatinglesson?.title || '');
    const [content, setContent] = useState(updatinglesson?.content || '');

    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(loadmylesson(course_id, lesson_id));
        // dispatch(loadlessonsfromDB(course_id))
    }, [dispatch, course_id, lesson_id]);
    
    // update this lesson
    const updatethelesson = async (e) => {
        e.preventDefault();
        const updatedlesson = {
            course_id,
            user_id,
            title,
            content
        }
        dispatch(updatethislessontoDB(updatedlesson, lesson_id))
            .then(() => {
                navigate(`/courses/${course_id}/managelessons`);
            })
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data?.errors)
            })
    }

    useEffect(() => {
        if(updatinglesson){
            setTitle(updatinglesson?.title || '');
            setContent(updatinglesson?.content || '');
        }
    }, [updatinglesson]);
    return (
        <>
            <div className="back2managelesson">
                <button onClick={() => navigate(`/courses/${course_id}/managelessons`)}>Back</button>
            </div>
            <div className='updatelessoncontainer'>
                <div className='updatelesson'>
                    <h1>Update Lesson</h1>               
                    <form onSubmit={updatethelesson} className='updatelessonform'>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input id='title' name='title' type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            {errors.title && <p className='errorcss'>{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <textarea id="content" name='content' value={content} onChange={e => setContent(e.target.value)} cols="30" rows="10">Content</textarea>
                            {errors.content && <p className='errorcss'>{errors.content}</p>}
                        </div>
                        <div className='sbmtbtn'>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateLesson