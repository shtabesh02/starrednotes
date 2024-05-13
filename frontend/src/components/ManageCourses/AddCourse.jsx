import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addcoursetoDB } from "../../store/courses";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
    const user_id = useSelector(state => state.session.user.id);
    const [title, setTitle] = useState('');
    const [instructor, setInstructor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addthiscourse = async (e) => {
        e.preventDefault();
        const mynewcourse = {
            user_id,
            title,
            instructor,
            category,
            description
        }
        const submitsuccess = await dispatch(addcoursetoDB(mynewcourse))
        if(submitsuccess){
            navigate('/managecourses')
        }


    }
  return (
    <div>
        <h1>AddCourse</h1>
        <form onSubmit={addthiscourse}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="instructor">Instructor</label>
                <input type="text" value={instructor} onChange={(e)=> setInstructor(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddCourse