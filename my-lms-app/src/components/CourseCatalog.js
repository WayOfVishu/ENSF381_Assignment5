import { useEffect, useState } from "react";
import CourseItem from "./CourseItem";

function CourseCatalog({refreshFlag,setRefreshFlag}) {
  // State to store courses and course rows
  const [courses, setCourses] = useState([]);
  const [courseRows, setCourseRows] = useState([]);


  // Fetch courses and calculate rows on component mount
  useEffect(() => {

    let student_id = localStorage.getItem('student_id');
    if (student_id===null) {return;}

    // Fetch students enrolled courses
    fetch(`http://localhost:5000/student_courses/${student_id}`)
    .then(response => response.json())
    .then(studentCourses => {


      // Fetch all available courses
      fetch("http://localhost:5000/courses")
        .then(response => response.json())
        .then(allCourses => {

            // Filter courses where the course id is not in the student's enrolled courses
            const coursesNotEnrolled = allCourses.filter(course => 
              !studentCourses.some(studentCourse => studentCourse.id === course.id)
            );


          // Split the filtered courses into rows (3 courses per row)
          let rows = [];
          let numberOfRows = Math.ceil(coursesNotEnrolled.length / 3);
          for (let i = 0; i < numberOfRows; i++) {
            let row = coursesNotEnrolled.slice(i * 3, i * 3 + 3);
            rows.push(row);
          }

          // Update state with filtered courses and their rows
          setCourses(coursesNotEnrolled);
          setCourseRows(rows);
        })
        .catch(error => console.error("Error fetching available courses:", error));
    })
    .catch(error => console.error("Error fetching student's enrolled courses:", error));
  }, [refreshFlag]);

  return (
    <div>
      <h1>Course Catalog</h1>
      <table>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        
        {courseRows.map((courseRow, rowIndex) => (
          <tr key={rowIndex}>
            {courseRow.map((course, courseIndex) => (
              <CourseItem key={courseIndex} setRefreshFlag={setRefreshFlag} course={course} />
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default CourseCatalog;
