// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CoursesRibbon from '../CoursesRibbon';
// import { FaUserCircle } from 'react-icons/fa';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
      
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      {/* The Signup is commented for testing purpose. */}
      {/* <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li> */}
      </>
    );
  }

  return (
    <>
    
    <ul className='home-nav'>
      <li>
        <NavLink to="/"><img src={'/sn-logo.png'} style={{width: '130px'}} alt="" /></NavLink>
      </li>
      <li>
        <input type="text" name="search" id="search" className='search' placeholder='What course are you looking for?...'/>
      </li>
      {isLoaded && sessionLinks}
    </ul>
    <CoursesRibbon />
    </>
  );
}

export default Navigation;