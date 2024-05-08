import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadCoursefromDB } from "../../store/courses";
import { useParams } from "react-router-dom";

const CourseDetails = () => {

  const course = useSelector(state => state.courseReducer);
  console.log('course from details jsx: ', course)
  const dispatch = useDispatch();

  const { course_id } = useParams();
  console.log('course id from details jsx: ', course_id)
  useEffect(()=> {
    dispatch(loadCoursefromDB(course_id))
  }, [dispatch, course_id])

  const [selectedTab, setSelectedTab] = useState('course_content')
  return (
    <div>
      <h1>{course.title}</h1>
      <div className="tabs">
        <h3 onClick={() => setSelectedTab('course_content')}>Corse contents</h3>
        <h3 onClick={() => setSelectedTab('comments')}>Comments</h3>
      </div>
      {selectedTab === 'course_content' && 
      <ul>
        <li>lesson 1</li>
      </ul>
      }
      {
        selectedTab === 'comments' &&
        <ul>
          <li>This is the best course available on planet earth.</li>
        </ul>
      }
    </div>
  )
}

export default CourseDetails