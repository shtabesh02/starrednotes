import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesfromDB } from '../../store/courses';
import { NavLink } from 'react-router-dom'


import './Home.css'
// import CoursesRibbon from './CoursesRibbon';
const Home = () => {
  // Maintain separate state for each category
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => Object.values(state.courseReducer.courses));

  // // Check if data is fully loaded before proceeding
  // if (allCourses.length === 0) {
  //   return <p>Loading...</p>; // Placeholder while data loads
  // }

  const courseByCategory = {};

  // Group courses by category
  allCourses.forEach((course) => {
    const category = course.category;
    if (!courseByCategory[category]) {
      courseByCategory[category] = [];
    }
    courseByCategory[category].push(course);
  });

  const defaultTab = {};
  Object.keys(courseByCategory).forEach(category => {
    defaultTab[category] = 'mr';
  });

  const [tabState, setTabState] = useState(defaultTab);

  useEffect(() => {
    dispatch(loadCoursesfromDB());
  }, [dispatch])
  return (
    <div className="home_container">


      {/* <CoursesRibbon /> */}
      <div className="homepage">
        {Object.keys(courseByCategory)
          .sort()
          .map((category) => (
            <div key={category}>
              <h1>{category}</h1>
              <div className="tabs">
                <h3 onClick={() => setTabState({ ...tabState, [category]: 'mr' })}>
                  Most recent
                </h3>
                <h3 onClick={() => setTabState({ ...tabState, [category]: 'va' })}>
                  View all
                </h3>
              </div>
              <hr />
              {/* View the courses in groups as bellow */}
              {/* if the last value o */}
              {tabState[category] === 'va' ? (
                <ul className='view_all'>
                  {courseByCategory[category]
                    .sort()
                    .map((course) => (
                      <div key={course.id} className='course_container'>
                        <NavLink to={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                          <div className='course_cart'>
                            <li className='course_title'>{course.title}</li>
                          </div>
                        </NavLink>
                        <p>Instructor: {course.instructor}</p>
                      </div>
                    ))}
                </ul>
              ) : (

                <ul className='view_recent'>
                  {courseByCategory[category]
                    .slice(-1)
                    .map((course) => (
                      <div key={course.id} className="course_container">
                        <NavLink to={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                          <div className="course_cart">
                            <li className='course_title'>{course?.title}</li>
                          </div>
                        </NavLink>
                        <p>Instructor: {course.instructor}</p>
                      </div>
                    ))}
                </ul>



              )}

            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;