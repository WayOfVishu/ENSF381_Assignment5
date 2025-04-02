import courses from "../data/courses";
import CourseItem from "./CourseItem";

function CourseCatalog() {
    
  // Get the number of rows we need to display the courses in groups of 3
  const numberOfRows = Math.ceil(courses.length / 3);
  const courseRows = [];
  
  {/* Break courses into groups of 3*/}
  for(let i = 0; i < numberOfRows; i++) {
    const row = courses.slice(i * 3, i * 3 + 3);
    courseRows.push(row);
  }

  return (

      <div>
        <h1>Course Catalog</h1>
        <table>
        <colgroup>
          <col/>
          <col/>
          <col />
      </colgroup>
        
        {courseRows.map((courseRow) => {
         return <tr>
            {courseRow.map((course, courseIndex) => {
              return <CourseItem key={courseIndex} course={course} />
            })}
          </tr>
        })}
        </table>
      </div>
    );
  }
  
  export default CourseCatalog;
  