import {useSelector} from 'react-redux'
const ManageCourses = () => {
    const current_user = useSelector(state => state.session.user.id)
    
  return (
    <div>
        <h1>ManageCourses</h1>
    </div>
  )
}

export default ManageCourses