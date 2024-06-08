import { useParams } from 'react-router-dom'

function UserProfile() {
    const {username} = useParams();
    console.log('username: ', username)
  return (
    <div>
        <h1>User profile</h1>
    </div>
  )
}

export default UserProfile