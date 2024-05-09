import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadCoursefromDB } from "../../store/courses";
import { NavLink, useParams } from "react-router-dom";
import { loadlessonsfromDB } from "../../store/lessons";
import { loadcommentsfromDB } from "../../store/comments";

import './CourseDetails.css'
const CourseDetails = () => {

  const course = useSelector(state => state.courseReducer.courseDetails);
  const lessons = useSelector(state => state.lessonReducer.lessons);
  const comments = useSelector(state => state.commentReducer.comments)
  const current_user = useSelector(state => state.session.user?.id);
  const { course_id } = useParams();

  const dispatch = useDispatch();

  // console.log('course_id: ', course_id)

  useEffect(() => {
    dispatch(loadCoursefromDB(course_id));
    dispatch(loadlessonsfromDB(course_id));
    dispatch(loadcommentsfromDB(course_id))
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
          {lessons.length > 0 && lessons.map(lesson => (
            <NavLink to={`/courses/${course_id}/lessons/${lesson.id}`} key={lesson.id} style={{ textDecoration: 'none' }}><li>{lesson.title}</li></NavLink>
          ))
          }
        </ol>
      }
      {
        selectedTab === 'comments' &&
        <ul className="comments_container">
          {comments.length > 0 && comments.map(comment => (
            <li key={comment.id}>
              <div className="comments">
                <p>{comment.user_id}</p>
                <p>{comment.createdAt}</p>
                <p>{comment.comment}</p>
                {comment.user_id === current_user && (
                  <p><button>Delete</button><button>Edit</button></p>
                )}
                <hr />
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default CourseDetails