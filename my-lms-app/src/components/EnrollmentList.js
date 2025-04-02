import { useState,useEffect} from "react";
import EnrolledCourse from "./EnrolledCourse.js";
import enrolledCourses from "../data/enrolled-courses"; 

function EnrollmentList() {
  

    // write enrolled-courses.js into local storage.
    useEffect(() => {
        // Make sure localStorage is empty before writing to it.
        localStorage.clear("currentEnrolledCourses");
        
        // Initialize localStorage with the courses from enrolled-courses.js.
        localStorage.setItem("currentEnrolledCourses", JSON.stringify(enrolledCourses));
    }, []);

  // Load enrolled courses from local storage into state variable.
  const [currentEnrolledCourses, setEnrolledCourses] = useState(() => {
    localStorage.clear("currentEnrolledCourses");
    localStorage.setItem("currentEnrolledCourses", JSON.stringify(enrolledCourses));
    const currentEnrolledCourses = JSON.parse(localStorage.getItem("currentEnrolledCourses"));;
    

    return currentEnrolledCourses;
  });

   // We assume that each course is 3 credit hours each.
  const creditHours = currentEnrolledCourses.length * 3;

  /*Function to remove a course from the enrolled list. Passed into each EnrolledCourse component
    to be used in each "Drop Course" button*/
  const DropCourse = (courseToRemoveID) => {
    setEnrolledCourses((prevCourses) => {
      const updatedCourses = prevCourses.filter((course) => course.id !== courseToRemoveID);
      localStorage.setItem("currentEnrolledCourses", JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  return (
    <div>
      <h1>Enrolled Courses (Credit Hours: {creditHours})</h1>
      <table>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            {currentEnrolledCourses.map((course) => (
              <EnrolledCourse
                key={course.id}
                course={course}
                credits = {3}
                onDrop={DropCourse}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentList;
