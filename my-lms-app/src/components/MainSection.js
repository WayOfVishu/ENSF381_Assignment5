import { useEffect, useState } from "react";
import course1Image from '../data/images/course1.jpg';

function MainSection() {
    const [coursesToDisplay, setCoursesToDisplay] = useState([]);
    const [testimonialsToDisplay, setTestimonialsToDisplay] = useState([]);
    
    // Course images are still stored on the front end,
    // but the data is fetched from the backend.
    const imageMap = {
        'course1': course1Image,
      };

    useEffect(() => {


        // Randomly select 3 courses and 2 testimonials to display.
        let numCoursesToDisplay = 3;

        // Fetch courses and display 3 random ones.
        fetch("http://localhost:5000/courses")
            .then(response => response.json())
            .then(data => {
                let selectedCourses = [];
                while (selectedCourses.length < numCoursesToDisplay && data.length > 0) {
                    let idx = Math.floor(Math.random() * data.length);
                    if (!selectedCourses.includes(data[idx])) {
                        
                        selectedCourses.push(data[idx]);
                    }
                }
                setCoursesToDisplay(selectedCourses);
            })
            .catch(error => console.error("Error fetching courses:", error));

        // Fetch 2 random testimonials.
        fetch("http://localhost:5000/testimonials")
        .then(response => response.json())
        .then(data => setTestimonialsToDisplay(data))
        .catch(error => console.error("Error fetching testimonials:", error));





      }, []);
    
    
    return (
        <div className="MainSection"> 
            {/* About LMS: Brief description of the system. */}
            <h2 id="About_LMS">
		        About LMS
	        </h2>
	        <p id="About_LMS_Description">The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
            {/* Featured Courses: Display 3 random courses from courses.js. */}

            <h2>Featured Courses</h2>
            <ul class="featured_courses_list">
                {coursesToDisplay.map(course => (
                    <li key={course.id} class="course_item">
					    <img src={imageMap[course.image]} height="300px" width="300px"></img>
					    <p>Course Name: {course.name}</p>
					    <p>Description: {course.description}</p>
                    </li>
                ))}
            </ul>

            {/* Testimonials: Show 2 random testimonials from testimonials.js */}
            <h2>Testimonials</h2>
                <ul class="testimonials_list">
                    {testimonialsToDisplay.map(testimonial => (
                        <li key={testimonial.id}>
                            <p><strong>{testimonial.name}</strong></p>
                            <p>{testimonial.review}</p>
                            <p>{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</p>
                            <p>- {testimonial.studentName} ({testimonial.courseName})</p>
                        </li>
                    ))}
                </ul>

        </div>
    );
}

export default MainSection;