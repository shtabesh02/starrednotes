import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadCoursefromDB } from "../../store/courses";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { loadlessonsfromDB } from "../../store/lessons";
import { deletecomment, loadcommentsfromDB } from "../../store/comments";
import DOMPurify from "dompurify";

import './CourseDetails.css'
import AddComment from "../Comments/AddComment";
const CourseDetails = () => {
  const { course_id } = useParams();

  const course = useSelector(state => state.courseReducer?.courseDetails);
  const lessons = useSelector(state => state.lessonReducer?.lessons);
  // console.log('lessons: ', lessons)
  const comments = useSelector(state => Object.values(state.commentReducer?.comments));
  const current_user = useSelector(state => state.session.user?.id);
  // const currentcoursecomments = comments.filter(comment => comment.course_id == course_id)
  const current_user_comment = comments.filter(comment => comment?.user_id == current_user) || '';
  // console.log('current user comment: ', current_user_comment)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('course_content')

  useEffect(() => {
    dispatch(loadCoursefromDB(course_id));
    dispatch(loadlessonsfromDB(course_id));
    dispatch(loadcommentsfromDB(course_id))
  }, [dispatch, course_id])

  // delete a comment
  const deleteacomment = async (comment_id) => {
    const deleteSuceeeded = await dispatch(deletecomment(comment_id));
    if (deleteSuceeeded) {
      await dispatch(loadcommentsfromDB(course_id));
      alert('Comment deleted successfully.');
      navigate(`/courses/${course_id}`);
    } else {
      alert('Failed to delete...')
    }
  }

  // edit a comment
  const editcomment = (comment_id) => {
    navigate(`/courses/${course_id}/comment/${comment_id}`)
  }
  return (
    <div>
      <h1>{course.title}</h1>
      <div className="tabs">
        <h3 onClick={() => setSelectedTab('course_content')}>Course contents</h3>
        <h3 onClick={() => setSelectedTab('comments')}>Comments</h3>
      </div>
      {selectedTab === 'course_content' &&
        <ol className="lessoncart">
          {lessons.length > 0 ? (
            lessons.map(lesson => (
              <li key={lesson.id} className="thelesson">
                <NavLink to={`/courses/${course_id}/lessons/${lesson.id}`}
                  style={{ textDecoration: 'none' }}>
                  <span>{lesson.title}</span>
                </NavLink>
              </li>
            ))
          ) : (
            <p>No lesson found.</p>
          )

          }
        </ol>
      }
      {
        selectedTab === 'comments' &&
        <ul className="comments_container">
          {
            comments.length > 0 ? (
              comments.map(comment => (

                <li key={comment.id}>
                  <div className="comments">
                    <p>{comment.User.firstName + ' ' + comment.User.lastName}</p>
                    <p>{new Date(comment.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
                    <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(comment.comment.replace(/\n/g, '<br>')),
                        }}>
                      {/* {comment.comment} */}
                    </div>
                    {comment.user_id === current_user && (
                      <p>
                        <button onClick={() => deleteacomment(comment.id)}>Delete</button>
                        <button onClick={() => editcomment(comment.id)}>Edit</button>
                      </p>
                    )}
                    <hr />
                  </div>
                </li>

              ))
            ) : (
              <p>No comments yet.</p>
            )
          }
          {
            current_user && current_user_comment.length == 0 && (<AddComment setSelectedTab={setSelectedTab} />) 
          }
        </ul>
      }
    </div>
  )
}

export default CourseDetails