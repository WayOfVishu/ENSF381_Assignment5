import { useState } from 'react';
import course1Image from '../data/images/course1.jpg';

function CourseItem({ setRefreshFlag, course }) {

  const [isHovered, setIsHovered] = useState(false);

  // Image mapping to get the image onto the page.
  let imageMap = {
    'course1': course1Image,
  };

  function EnrollCourse({ setRefreshFlag }, course) {

    let student_id = localStorage.getItem('student_id');

    // If we don't have a user, then abort.
    if (!student_id) {
      alert("Please log in to enroll in a course.");
      return;
    }

    // Send request to enroll in the course
    fetch(`http://localhost:5000/enroll/${student_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course_name: course }),
    })
      .then(response => {
        if (response.status === 200)
          setRefreshFlag();
      })
      .catch(error => {
        console.error("Error during enrollment:", error);
        alert("An error occurred. Please try again.");
      });

  }


  return (
    <td className="course_item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={imageMap[course.image]} width="30%" height="20%" />
      <p>Course: {course.name}</p>
      <p>Instructor: {course.instructor}</p>
      <button onClick={() => EnrollCourse({ setRefreshFlag }, course.name)}>Enroll Now</button>


      {isHovered && (
        <div>
          <p style={{ fontWeight: 'bold' }}>{course.description}</p>
        </div>
      )}
    </td>
  );
}

export default CourseItem;
