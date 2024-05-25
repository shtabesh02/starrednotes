import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadmycoursesfromDB, updatecoursetoDB } from '../../store/courses'

import './UpdateCourse.css';

const UpdateCourse = () => {
    const { course_id } = useParams();
    console.log('course_id from UpdateCourse.jsx: ', course_id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatingcourse = useSelector(state => state.courseReducer?.courses[course_id]);
    // console.log('updatingcourse: ', updatingcourse);
    // console.log('updatingcourse.id: ', updatingcourse?.id);
    // console.log('updatingcourse.title: ', updatingcourse?.title)
    const user_id = useSelector(state => state.session.user.id);
    // const current_user = useSelector(state => state.session.user?.id);

    const [title, setTitle] = useState(updatingcourse?.title);
    const [instructor, setInstructor] = useState(updatingcourse?.instructor);
    // const [instructor, setInstructor] = useState(allcourses[course_id].instructor);
    const [category, setCategory] = useState(updatingcourse?.category);
    const [description, setDescription] = useState(updatingcourse?.description);
    
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
            .then(() => {
                navigate('/managecourses')

            })
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data?.errors)
            })
        // if(updatesuccess){
        // }
    }
    useEffect(() => {
        dispatch(loadmycoursesfromDB(user_id))
        .then(()=> console.log('my courses loaded'))
        .catch(async (res) => {
            const data = await res.json();
            console.log('data as errors: ', data)
        })
        // .catch(() => async (res) => {
        //   const _authmsg = await res.json();
        //   console.log('_authmsg: ')
        // })
      }, [dispatch, user_id]);

    return (
        <>
            <div className="updatecoursecontainer">
            <div className="back2mycourses">
                <button onClick={() => navigate('/managecourses')}>Back</button>
            </div>
                <div className="updatethecourse">

                
                    <h1>Update Course</h1>
                    <form onSubmit={updatethiscourse} className='courseform'>
                        <div>
                            <label htmlFor="title">Title</label>
                            {updatingcourse?.title && 
                            <input type="text" value={updatingcourse.title} onChange={(e) => setTitle(e.target.value)} />
                            }
                            
                            {erros.title && <p className='errorcss'>{erros.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="instructor">Instructor</label>
                            <input type="text" value={updatingcourse?.instructor} onChange={(e) => setInstructor(e.target.value)} />
                            {erros.instructor && <p className='errorcss'>{erros.instructor}</p>}
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input type="text" value={updatingcourse?.category} onChange={(e) => setCategory(e.target.value)} />
                            {erros.category && <p className='errorcss'>{erros.category}</p>}
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" value={updatingcourse?.description} onChange={(e) => setDescription(e.target.value)} />
                            {erros.description && <p className='errorcss'>{erros.description}</p>}
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

export default UpdateCourse