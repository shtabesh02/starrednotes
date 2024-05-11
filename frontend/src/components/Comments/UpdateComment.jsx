import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editcomment } from "../../store/comments";

const UpdateComment = () => {
    const comments = useSelector(state => Object.values(state.commentReducer?.comments))
    const user_id = useSelector(state => state.session.user.id)
    const { course_id, comment_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const thetargetcomment = comments.filter(comment => comment.id == comment_id);

    const [comment, setComment] = useState(thetargetcomment[0].comment);

    const updatethiscomment = async (e) => {
        e.preventDefault();
        const updatedcomment = {
            comment,
            comment_id,
            user_id
        };
        const updatesuccess = await dispatch(editcomment(updatedcomment, comment_id));
        if(updatesuccess){
            navigate(`/courses/${course_id}`)
        }
    }
    return (
        <div>
            <h1>Edit your comment here:</h1>
            <form onSubmit={updatethiscomment}>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateComment