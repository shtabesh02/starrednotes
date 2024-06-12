import { NavLink, useNavigate, useParams } from 'react-router-dom'
import './UserProfile.css'
import { useEffect, useState } from 'react';
import UserCourses from './UserCourses';
import UserNotes from './UserNotes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile } from '../../store/userprofile';

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const [usercourses, setUsercourses] = useState(true);
  // const user_id = useSelector(state => state.session?.user.id);
  const profiledetails = useSelector(state => state.profileReducer?.profile);
  console.log('profiledetails: ', profiledetails);
  console.log('username: ', username)
  useEffect(() => {
    dispatch(loadUserProfile(username))
  }, [dispatch, username])
  return (
    <div className='topcontainerdiv'>
      <div className='userprofilecontainer'>
        <h1>User profile</h1>

          {profiledetails.UserProfile ? (
            <>
            <button onClick={()=> navigate(`/${username}/update`)}>Update your profile</button>
          <div className="profileheadings">
            <div className="followme">
              {/* <i className="fa-solid fa-user fa-5x userprofilepic"></i> */}
              <img src={profiledetails?.UserProfile?.photo} alt="Profile Picture" className='userprofilepic' />
              <div className='followonsn'>You can follow me</div>
            </div>
            <div className="userbio">
              {/* <p className='biodetail'> */}
          
                {profiledetails.UserProfile?.bio}
         
              {/* </p> */}
            </div>
            <div className='socialicons'>
              <NavLink to={profiledetails.UserProfile?.github}><i className="fa-brands fa-github fa-2x"></i></NavLink>
              <NavLink to={profiledetails.UserProfile?.linkedin}><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
            </div>
          </div>
            </>
          ):(
            <>
            <button onClick={()=> navigate(`/${username}/addprofile`)}>Update your profile</button>
          <div className="profileheadings">
            <div className="followme">
              {/* <i className="fa-solid fa-user fa-5x userprofilepic"></i> */}
              <img src='' alt="Profile Picture" className='userprofilepic' />
              <div className='followonsn'>You can follow me</div>
            </div>
            {/* <div className="userbio"> */}
              <p className='biodetail'>
               No bio yet...
              </p>
            {/* </div> */}
            <div className='socialicons'>
              <NavLink><i className="fa-brands fa-github fa-2x"></i></NavLink>
              <NavLink><i className="fa-brands fa-linkedin fa-2x"></i></NavLink>
            </div>
          </div>
            </>
          )}
        <div className="coursesAndnotes">
          <ul>
            <li onClick={() => setUsercourses(true)}>Courses</li>
            <li onClick={() => setUsercourses(false)}>Starred Notes</li>
          </ul>
          <hr />
        </div>
        {usercourses ? (<UserCourses username={username}/>) : (<UserNotes />)}

      </div>
    </div>
  )
}

export default UserProfile