import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadCoursefromDB } from "../../store/courses";
import { NavLink, useParams } from "react-router-dom";
import { loadlessonsfromDB } from "../../store/lessons";

const CourseDetails = () => {

  const course = useSelector(state => state.courseReducer.courseDetails);
  const lessons = useSelector(state => state.lessonReducer.lessons)

  const dispatch = useDispatch();

  const { course_id } = useParams();
  // console.log('course_id: ', course_id)

  useEffect(()=> {
    dispatch(loadCoursefromDB(course_id));
    dispatch(loadlessonsfromDB(course_id));
  }, [dispatch, course_id])

  const [selectedTab, setSelectedTab] = useState('course_content')
  return (
    <div>
      <h1>{course.title}</h1>
      <div className="tabs">
        <h3 onClick={() => setSelectedTab('course_content')}>Course contents</h3>
        <h3 onClick={() => setSelectedTab('comments')}>Comments</h3>
      </div>
      {selectedTab === 'course_content' && 
      <ol>
        {lessons.length>0 && lessons.map(lesson => (
          <NavLink key={lesson.id} style={{textDecoration: 'none'}}><li>{lesson.title}</li></NavLink>
        ))
        }
      </ol>
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