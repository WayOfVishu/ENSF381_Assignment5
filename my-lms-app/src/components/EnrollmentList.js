import { useState,useEffect} from "react";
import EnrolledCourse from "./EnrolledCourse.js";


function EnrollmentList({refreshFlag,setRefreshFlag}) {

  
  const [currentEnrolledCourses, setCurrentEnrolledCourses] = useState([]);
  const [creditHours, setCreditHours] = useState(0);
  const [courseRows, setCourseRows] = useState([]);

  // Fetch the student's enrolled courses when the component mounts or refreshFlag changes
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    if (!studentId) {
      alert("Please log in first!");
      return;
    }
    else {
      fetch(`http://localhost:5000/student_courses/${studentId}`)
        .then((response) => response.json())
        .then((data) => {

          setCurrentEnrolledCourses(data);
          setCreditHours(data.length * 3); // Each course is 3 credit hours

          // Split the enrolled courses into rows of 3 courses
          let rows = [];
          let numberOfRows = Math.ceil(data.length / 3);
          for (let i = 0; i < numberOfRows; i++) {
            let row = data.slice(i * 3, i * 3 + 3);
            rows.push(row);
          }
          setCourseRows(rows);
        })
        .catch((error) => console.error("Error fetching enrolled courses:", error));
    }
  }, [refreshFlag]); // Re-fetch when refreshFlag changes


  /*Function to remove a course from the enrolled list. Passed into each EnrolledCourse component
    to be used in each "Drop Course" button*/
  const DropCourse = (courseToRemoveName) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please log in first!");
      return;
    }
    else{
      fetch(`http://localhost:5000/drop/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_name: courseToRemoveName }),
      })
        .then((response) => {
          if (response.status === 200) {
            setRefreshFlag(); // Trigger a refresh to update the list of enrolled courses

          }
        })
        .catch((error) => console.error("Error dropping course:", error));
    }
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
          {/* Render the course rows in groups of 3 */}
          {courseRows.map((courseRow, rowIndex) => (
            <tr key={rowIndex}>
              {courseRow.map((course) => (
                <EnrolledCourse
                  key={course.id}
                  course={course}
                  credits={3}
                  onDrop={DropCourse}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentList;
