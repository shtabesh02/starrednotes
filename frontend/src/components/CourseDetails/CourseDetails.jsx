import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadCoursefromDB } from "../../store/courses";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { loadlessonsfromDB } from "../../store/lessons";
import { deletecomment, loadcommentsfromDB } from "../../store/comments";

import './CourseDetails.css'
const CourseDetails = () => {

  const course = useSelector(state => state.courseReducer.courseDetails);
  const lessons = useSelector(state => state.lessonReducer.lessons);
  const comments = useSelector(state => Object.values(state.commentReducer?.comments));
  const current_user = useSelector(state => state.session.user?.id);
  const { course_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('course_content')

  useEffect(() => {
    dispatch(loadCoursefromDB(course_id));
    dispatch(loadlessonsfromDB(course_id));
    dispatch(loadcommentsfromDB(course_id))
  }, [dispatch, course_id])

  // checking to see if the logged in user has already commented
  const [alreadyCommented, setAlreadyCommented] = useState(false)
  useEffect(()=> {
    if(alreadyCommented){
      return
    }else if(current_user && comments){
      comments.forEach(comment => {
        if(comment.user_id == current_user){
          setAlreadyCommented(true)
        }
      })
    }
  }, [comments, current_user, alreadyCommented]);

  // navigate to add comment page
  const addcomment = () => {
    navigate(`/courses/${course_id}/comment`)
  }
  
  // delete a comment
  const deleteacomment = async (comment_id) => {
    const deleteSuceeeded = await dispatch(deletecomment(comment_id));
    if(deleteSuceeeded){
      alert('Comment deleted successfully.');
      navigate(`/courses/${course_id}`);
    }else{
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
                {!alreadyCommented && <p><button onClick={()=> addcomment()}>Add your comment</button></p>}
                <p>{comment.user_id}</p>
                <p>{comment.createdAt}</p>
                <p>{comment.comment}</p>
                {comment.user_id === current_user && (
                  <p>
                    <button onClick={() => deleteacomment(comment.id)}>Delete</button>
                  <button onClick={() => editcomment(comment.id)}>Edit</button>
                  </p>
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