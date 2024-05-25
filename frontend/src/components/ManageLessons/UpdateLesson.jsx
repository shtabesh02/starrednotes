import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadlessonsfromDB, updatethislessontoDB } from '../../store/lessons';

import './UpdateLesson.css'

const UpdateLesson = () => {

    const { course_id, lesson_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = useSelector(state => state.session.user.id)
    const alllessons = useSelector(state => Object.values(state.lessonReducer?.lessons));
    const updatinglesson = alllessons.filter(lesson => lesson.id == lesson_id);
    // const updatinglesson = useSelector(state => state.lessonReducer.lessons[lesson_id])
    // console.log('updatinglesson: ', updatinglesson)
    const [title, setTitle] = useState(updatinglesson[0]?.title);
    const [content, setContent] = useState(updatinglesson[0]?.content);

    const [errors, setErrors] = useState({});

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
        // if(updatesuccess){
        //     navigate(`/courses/${course_id}/managelessons`);
        // }else{
        //     console.log('failed to update...')
        // }
    }
    useEffect(() => {
        dispatch(loadlessonsfromDB(course_id))
    }, [dispatch, course_id]);
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
                            <input type="text" value={updatinglesson[0]?.title} onChange={e => setTitle(e.target.value)} />
                            {errors.title && <p className='errorcss'>{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <textarea value={updatinglesson[0]?.content} onChange={e => setContent(e.target.value)} name="lessoncontent" id="lessoncontent" cols="30" rows="10">Content</textarea>
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