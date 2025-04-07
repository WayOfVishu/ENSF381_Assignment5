from flask import Flask

app = Flask(__name__)

"""
Define and maintain a students list on the backend (e.g., a Python list or dictionary) that stores
information about each student, including:
- ID
- Username
- Password
- Email
- Enrolled_courses (list of courses)
"""
students = [
    {
        "id": 1,
        "username": "john_doe",
        "password": "password123",
        "email": "john.doe@example.com",
        "enrolled_courses": ["Web Development"]
    },
    {
        "id": 2,
        "username": "jane_doe",
        "password": "securePass456",
        "email": "jane.doe@example.com",
        "enrolled_courses": ["Data Science"]
    },
    {
        "id": 3,
        "username": "sophie_brown",
        "password": "appDev789",
        "email": "sophie.brown@example.com",
        "enrolled_courses": ["Mobile App Development"]
    },
    {
        "id": 4,
        "username": "dave_wilson",
        "password": "cyberSec123",
        "email": "dave.wilson@example.com",
        "enrolled_courses": ["Cybersecurity"]
    }
]

@app.route('/register', methods=['POST'])
def register():
    # 1. Receive new user information (username, password, etc.) from Signup Page
    # 2. Check if the username already exists in the students list
    # 3. If it exists, return a message saying the username is already taken
    # 4. Otherwise, add the user to the students list and return a success message
    pass

@app.route('/login', methods=['POST'])
def login():
    # 1. Accepts username and password in the request body
    # 2. Validates the credentials against the students list
    # 3. If credentials are correct, respond with success and redirect the user to Course Enrolment Page
    # 4. If credentials are wrong, respond with an error message
    pass

@app.route('/testimonials', methods=['GET'])
def testimonials():
    # 1. Return two random testimonials from testimonials.json
    # 2. This API is called when the Home Page is loaded or refreshed
    pass

@app.route('/enroll/<student_id>', methods=['POST'])
def enroll_courses(student_id):
    # 1. Accept the student ID in the URL (dynamic routing)
    # 2. Receive course information in the request body
    # 3. Add the course to the corresponding student's enrolled_courses in the students list
    # 4. If successful, send confirmation to the frontend
    # 5. If an error occurs, return an error message to be displayed as an alert
    pass

@app.route('/drop/<student_id>', methods=['DELETE'])
def delete_courses(student_id):
    # 1. Accept the student ID in the URL (dynamic routing)
    # 2. Receive course information in the request body
    # 3. Remove the course from the student's enrolled_courses in the students list
    # 4. If successful, send confirmation to the frontend
    # 5. If an error occurs, return an error message to show an alert to the user
    pass

@app.route('/courses', methods=['GET'])
def get_all_courses():
    # 1. Return all courses available in courses.json
    # 2. This API is called when the Course Enrolment Page loads or is refreshed
    pass

@app.route('/student_courses/<student_id>', methods=['GET'])
def get_student_courses(student_id):
    # 1. Accept student ID in the URL (dynamic routing)
    # 2. Return a list of courses that the student is currently enrolled in
    # 3. If the student has no enrolled courses, return an empty list
    # 4. Display the enrolled courses in the Course Enrolment Page
    pass
