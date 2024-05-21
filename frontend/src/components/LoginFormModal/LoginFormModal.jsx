// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
// import { thunkLogin } from '../../store/session'

function LoginFormModal() {
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

  const handleDemoLogin = async (e) => {
		e.preventDefault();
		
		const serverResponse = await dispatch(
			sessionActions.login({
				credential: 'user2@demo.io',
				password: 'password2',
			}))
      .then(closeModal)
      .catch( async (res) => {
        const data = await res.json();
        if(data && data.errors){
          setErrors(data.errors)
        }
      })

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}

	}

  return (
    <>
      <h1 className='LoginModal__header'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <button type='button' style={{marginLeft:'15px'}} onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
      <div>
        <h1>Create an account</h1>

        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />

      </div>
    </>
  );
}

export default LoginFormModal;