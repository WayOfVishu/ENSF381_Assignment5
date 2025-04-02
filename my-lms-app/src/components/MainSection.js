import { useEffect, useState } from "react";
import courses from "../data/courses";
import testimonials from "../data/testimonials";

function MainSection() {
    const [coursesToDisplay, setCoursesToDisplay] = useState([]);
    const [testimonialsToDisplay, setTestimonialsToDisplay] = useState([]);
    
    useEffect(() => {

        let currentCourses = [];
        let currentTestimonials = [];
        // Randomly select 3 courses and 2 testimonials to display.
        let numCoursesToDisplay = 3;
        let numTestimonialsToDisplay = 2;


        while(currentCourses.length < numCoursesToDisplay){
            
            //Generate a random index between 0 and the length of the courses array.
            let randomIndex = Math.floor(Math.random() * courses.length);
            
            if(!currentCourses.includes(courses[randomIndex])){
                currentCourses.push(courses[randomIndex]);
            }
        }

        while(currentTestimonials.length < numTestimonialsToDisplay){

            //Generate a random index between 0 and the length of the testimonials array.
            let randomIndex = Math.floor(Math.random() * testimonials.length);
            
            if(!currentTestimonials.includes(testimonials[randomIndex])){
                currentTestimonials.push(testimonials[randomIndex]);
            }
        }
        setCoursesToDisplay(currentCourses);
        setTestimonialsToDisplay(currentTestimonials);
      }, [courses, testimonials]);
    
    
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
					    <img src={course.image} height="300px" width="300px"></img>
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