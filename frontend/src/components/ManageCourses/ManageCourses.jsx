import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deletemycourse, loadmycoursesfromDB } from '../../store/courses';
import './ManageCourses.css'
import { NavLink, useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const current_user = useSelector(state => state.session.user?.id);
  // const [authmsg, setAuthmsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _courses = useSelector(state => Object.values(state.courseReducer.courses));
  const courses = _courses.filter(course => course.user_id == current_user);

  useEffect(() => {
    dispatch(loadmycoursesfromDB(current_user))
    // .catch(() => async (res) => {
    //   const _authmsg = await res.json();
    //   console.log('_authmsg: ')
    // })
  }, [dispatch, current_user]);

  // Handle Delete a course
  const deletecourse = async (course_id) => {
    const successdelete = await dispatch(deletemycourse(course_id))
    if (successdelete) {
      navigate('/managecourses');
    }
  }

  if (!current_user) {
    return (
      <div>
        <h1>Mange Courses</h1>
        <p>You must be logged-in to manage courses.</p>
      </div>
    )
  }
  return (
    <>
      <div className='managecoursecontainer'>
        <div className='createcourse'>
          <button onClick={() => navigate('/managecourses/addcourse')}>Create a new course</button>
        </div>
        <h1>Manage Courses</h1>
        <ul className='coursecarts'>
          {courses.length > 0 && courses.map(course => (
            <li key={course.id} className='thecourse'>
              {course.user_id == current_user &&
                <NavLink to={`/courses/${course.id}/managelessons`} style={{ textDecoration: "none" }}>
                  {course.title}
                </NavLink>
              }
              <p className='btns'>
                <button onClick={() => deletecourse(course.id)}>Delete</button>
                <button onClick={() => navigate(`/managecourses/updatecourse/${course.id}`)}>Update</button>
              </p>
            </li>
          )
          )}
        </ul>
      </div>
    </>
  )
}

export default ManageCourses