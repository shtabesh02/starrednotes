

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './StarredNoteModal.css';
// import { thunkLogin } from '../../store/session'

function StarredNoteModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="logincontainer">
        <h1 className='login'>My note</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className='theusername'>
            <label className='form-label'>
              Username or Email
            </label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className='form-input'
            />
          </div>

          <div className='thepassword'>
            <label className='form-label'>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='form-input'
            />
          </div>

          {errors.credential && (
            <p className='errors'>{errors.credential}</p>
          )}
          <button type="submit" className='login-form-button'>Add this note</button>
        </form>
      </div>
    </>
  );
}

export default StarredNoteModal;