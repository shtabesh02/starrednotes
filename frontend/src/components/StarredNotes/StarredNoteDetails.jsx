import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { deleteanote, loadthenote } from "../../store/starrednotes";
import './StarredNoteDetails.css'

const StarredNoteDetails = () => {
    const { starrednote_id } = useParams();
    const currentuser = useSelector(state => state.session.user.id);
    console.log('starrednote_id: ', starrednote_id)
    const notedetails = useSelector(state => state.starrednotesReducer?.StarredNoteDetails[0]);
    console.log('notedetails: ', notedetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(loadthenote(starrednote_id))
    }, [dispatch, starrednote_id]);

    // handle deleting a note
    const deletethisnote = () => {
        dispatch(deleteanote(starrednote_id))
        .then(() => {
            alert('The note successfully deleted.')
            navigate('/starrednotes')
        })
    }
    return (
        <div className="notedetailscontainer">
            <h1>{notedetails?.title}</h1>
            {
                notedetails &&
                <div className="starrednotedetails">
                    <div className="noteinfo">
                        <span className='user-icon'><i className="fa-solid fa-user fa-lg"></i></span>
                        <span>{notedetails.User.firstName + ' ' + notedetails.User.lastName}</span>
                        <span>{notedetails.createdAt}</span>
                    </div>
                    <div>
                        {notedetails.content}
                    </div>
                    {notedetails.user_id == currentuser && <div className="notebtn">
                        <span><button onClick={() => navigate(`/starrednotes/${notedetails.id}/update`)}>Update</button></span><span><button onClick={() => deletethisnote()}>Delete</button></span>
                    </div>}
                </div>
            }
        </div>
    )
}

export default StarredNoteDetails