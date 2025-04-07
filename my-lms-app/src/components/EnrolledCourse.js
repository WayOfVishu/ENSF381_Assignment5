import { useState } from 'react';
import course1Image from '../data/images/course1.jpg';

function EnrolledCourse({ course, onDrop, credits }) {

  /* We aren't given the actual enrolment counts, so we'll just assume it's 1 because this is how it would work
    for someone enrolled as a student.
     e.g. If this was changed useState(3), it would take 3 clicks of the drop course to remove it.*/
  const [enrollmentCount, setEnrollmentCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Image mapping to get the image onto the page.
  let imageMap = {
    'course1': course1Image,
  };

  const DropCourse = () => {
    // Decrease enrollment count.
    if (enrollmentCount > 1) {
      setEnrollmentCount(enrollmentCount - 1);
    } else {
      // If the count reaches 0, drop the course.
      onDrop(course.name);

    }
  };

  return (
    <td className="course_item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={imageMap[course.image]} width="30%" height="20%" />
      <p>Course: {course.name}</p>
      <p>Credit Hours: {credits}</p>
      <button onClick={DropCourse}>Drop Course</button>


      {isHovered && (
        <div>
          <p style={{ fontWeight: 'bold' }}>{course.description}</p>
        </div>
      )}
    </td>
  );
}

export default EnrolledCourse;
