import {useState} from 'react';

function CourseItem({course}) {
    
  const [isHovered, setIsHovered] = useState(false);
  return (
              <td className="course_item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={course.image} width="30%" height="20%"/>
                <p>Course: {course.name}</p>
                <p>Instructor: {course.instructor}</p>
                <button>Enroll Now</button>


                {isHovered && (
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{course.description}</p>
                  </div>
                )}
              </td>
    );
  }
  
  export default CourseItem;
  