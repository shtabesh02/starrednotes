import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editcomment, loadcommentsfromDB } from "../../store/comments";

import './UpdateComment.css'

const UpdateComment = () => {
    const comments = useSelector(state => Object.values(state.commentReducer?.comments))
    const user_id = useSelector(state => state.session.user.id)
    const { course_id, comment_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const thetargetcomment = comments.filter(comment => comment.id == comment_id);

    const [comment, setComment] = useState(thetargetcomment[0]?.comment);


    const [errors, setErrors] = useState({});

    const updatethiscomment = async (e) => {
        e.preventDefault();
        const updatedcomment = {
            comment,
            comment_id,
            user_id
        };
        await dispatch(editcomment(updatedcomment, comment_id))
        .then(()=> {
            navigate(`/courses/${course_id}`)
        })
        .catch(async (res) => {
            const err = await res.json();
            if(err?.errors){
                setErrors(err.errors)
            }
        })
        // if(updatesuccess){
        //     navigate(`/courses/${course_id}`)
        // }
    }

    useEffect(() => {
        dispatch(loadcommentsfromDB(course_id))
    }, [dispatch, course_id]);
    return (
        <>
             <div className="back2course">
                <button onClick={() => navigate(`/courses/${course_id}`)}>Back</button>
            </div>
        <div className="commentcontainer">
            <div className="updatingcomment">
            <h1>Edit your comment here:</h1>
            <form onSubmit={updatethiscomment} className="commentform">
                <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                    {errors.comment && <p className="errorcss">{errors.comment}</p>}
                </div>
                <div className="sbmtbtn">

                <button>Update</button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}

export default UpdateComment