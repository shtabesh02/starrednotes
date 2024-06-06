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
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='title'/>
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
                <span className='user-icon'><i className="fa-solid fa-user fa-lg"></i></span><span>{note.user_id}</span><span>{note.createdAt}</span>
                <NavLink to={`/starrednotes/${note.id}`} style={{ textDecoration: "none" }}>
                  {/* <hr /> */}
                  <h3>{note.title}</h3>
                </NavLink>
                  <p>{note.content}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default StarredNotes