import course1 from './images/course1.jpg';

// This file contains the data for the enrolled courses in the application.
// We are not given any info on what courses are enrolled, so we used the first 3 courses.
const enrolledCourses = [
    {
      id: 1,
      name: "Web Development",
      instructor: "Dr. John Smith",
      description: "Master HTML, CSS, and JavaScript.",
      duration: "12 weeks",
      image: course1
    },
    {
      id: 2,
      name: "Data Science",
      instructor: "Dr. Jane Doe",
      description: "Learn Python, Machine Learning, and AI concepts.",
      duration: "12 weeks",
      image: course1
    },
    {
      id: 3,
      name: "Mobile App Development",
      instructor: "Dr. Emily White",
      description: "Build Android and iOS apps using Flutter and React Native.",
      duration: "12 weeks",
      image: course1
    }
  ];
  
  export default enrolledCourses;
  