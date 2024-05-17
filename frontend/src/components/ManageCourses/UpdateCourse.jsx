import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatecoursetoDB } from '../../store/courses'

import './UpdateCourse.css';

const UpdateCourse = () => {
    const {course_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatingcourse = useSelector(state => state.courseReducer.courses[course_id])
    const user_id = useSelector(state => state.session.user.id);
    const [title, setTitle] = useState(updatingcourse.title);
    const [instructor, setInstructor] = useState(updatingcourse.instructor);
    const [category, setCategory] = useState(updatingcourse.category);
    const [description, setDescription] = useState(updatingcourse.description);

    const [erros, setErrors] = useState({});

    const updatethiscourse = (e) => {
        e.preventDefault();
        const updatedcourse = {
            user_id,
            title,
            instructor,
            category,
            description
        }
        dispatch(updatecoursetoDB(updatedcourse, course_id))
        .then(()=> {
                navigate('/managecourses')

        })
        .catch(async (res) => {
            const data = await res.json();
            setErrors(data?.errors)
        })
        // if(updatesuccess){
        // }
    }
  return (
    <div>
        <h1>UpdateCourse</h1>
        <form onSubmit={updatethiscourse}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                {erros.title  && <p className='errorcss'>{erros.title}</p>}
            </div>
            <div>
                <label htmlFor="instructor">Instructor</label>
                <input type="text" value={instructor} onChange={(e)=> setInstructor(e.target.value)}/>
                {erros.instructor  && <p className='errorcss'>{erros.instructor}</p>}
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)}/>
                {erros.category  && <p className='errorcss'>{erros.category}</p>}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                {erros.description  && <p className='errorcss'>{erros.description}</p>}
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateCourse