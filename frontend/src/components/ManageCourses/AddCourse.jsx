import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addcoursetoDB } from "../../store/courses";
import { useNavigate } from "react-router-dom";
import './AddCourse.css';

const AddCourse = () => {
    const user_id = useSelector(state => state.session.user.id);
    const [title, setTitle] = useState('');
    const [instructor, setInstructor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addthiscourse = (e) => {
        e.preventDefault();
        const mynewcourse = {
            user_id,
            title,
            instructor,
            category,
            description
        }
        dispatch(addcoursetoDB(mynewcourse))
        .then(()=> {            
            navigate(`/managecourses`)
        })
        .catch(async (res) => {
            const data = await res.json();
            if(data?.errors){
                setErrors(data.errors);
            }
        })
    }
  return (
    <div>
        <h1>AddCourse</h1>
        <form onSubmit={addthiscourse}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                {errors.title && <p className="errorcss">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="instructor">Instructor</label>
                <input type="text" value={instructor} onChange={(e)=> setInstructor(e.target.value)}/>
                {errors.instructor && <p className="errorcss">{errors.instructor}</p>}
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)}/>
                {errors.category && <p className="errorcss">{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                {errors.description && <p className="errorcss">{errors.description}</p>}
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddCourse