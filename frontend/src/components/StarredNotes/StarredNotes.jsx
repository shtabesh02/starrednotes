import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import './StarredNotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { insertnewnote, loadStarredNotes } from '../../store/starrednotes';
// import OpenModalButton from '../OpenModalButton';
// import StarredNoteModal from '../StarredNoteModal';

const StarredNotes = () => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.session.user?.id);
  const starrednotes = useSelector(state => Object.values(state.starrednotesReducer.StarredNotes));
  const [formModal, setFormModal] = useState(false);
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');


  // displaying 300 character states
  const [expandedNotes, setExpandedNotes] = useState({});
  const togleExpand = (starrednote_id) => {
    setExpandedNotes(currentState => ({
      ...currentState, [starrednote_id]: !currentState[starrednote_id]
    }))
  }

  // console.log('formModal: ', formModal);
  useEffect(() => {
    dispatch(loadStarredNotes());
  }, [dispatch]);

  // Adding new note
  const addnewnote = (e) => {
    e.preventDefault();
    const newnote = {
      user_id,
      title,
      note
    }
    dispatch(insertnewnote(newnote))
  }
  return (
    <div className='starrednotes-container'>
      <ul className='notes'>
        <li className='one-note'>
          {user_id &&
            <div className='one-note-container'>
              <form className='noteform' onSubmit={addnewnote}>
                <div>
                  <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='title' />
                  <textarea onChange={(e) => setNote(e.target.value)} value={note} onFocus={() => setFormModal(true)} className='addnote' placeholder='Share your note here now, use it later and anytime...' />
                  {formModal &&
                    <div className='addnotebtn'>
                      <input type="file" />
                      <button>Add this note</button>
                    </div>
                  }
                </div>
              </form>
            </div>
          }
        </li>
        <hr />
        {
          starrednotes && starrednotes.map(note => (
            <li className='one-note' key={note.id}>
              <div className='one-note-container'>
                <NavLink to={`/${note.User?.username}`} style={{textDecoration: "none"}}>

                <span className='user-icon'><i className="fa-solid fa-user fa-lg"></i>
                </span>
                <span>{note.User?.firstName + ' ' + note.User?.lastName}</span>
                </NavLink>
                <span>{new Date(note.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</span>
                <NavLink to={`/starrednotes/${note.id}`} style={{ textDecoration: "none" }}>
                  {/* <hr /> */}
                  <h3>{note.title}</h3>
                </NavLink>
                {/* <p>{note.content}</p> */}
                <div>
                  {expandedNotes[note.id] ? (
                    <span>{note.content}</span>
                  ) : (
                    <span>{`${note.content.substring(0, 400)}... `}</span>
                  )}
                  {note.content.length > 400 &&
                    <span className='more-less' onClick={() => togleExpand(note.id)}>
                      {expandedNotes[note.id] ? ' See less' : 'See more'}
                    </span>}
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default StarredNotes