from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

# Load courses data from courses.json
try:
    with open('courses.json', 'r') as f:
        courses = json.load(f)
except FileNotFoundError:
    courses = []

# Load testimonials data from testimonials.json
try:
    with open('testimonials.json', 'r') as f:
        testimonials = json.load(f)
except FileNotFoundError:
    testimonials = []

# Students list
students = [
    {
        "id": 1,
        "username": "john_doe",
        "password": "Password123!",
        "email": "john.doe@example.com",
        "enrolled_courses": ["Web Development"]
    },
    {
        "id": 2,
        "username": "jane_doe",
        "password": "securePass456!",
        "email": "jane.doe@example.com",
        "enrolled_courses": ["Data Science"]
    },
    {
        "id": 3,
        "username": "sophie_brown",
        "password": "appDev789!",
        "email": "sophie.brown@example.com",
        "enrolled_courses": ["Mobile App Development"]
    },
    {
        "id": 4,
        "username": "dave_wilson",
        "password": "cyberSec123!",
        "email": "dave.wilson@example.com",
        "enrolled_courses": ["Cybersecurity"]
    }
]

# 1. Student Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    print(username)

    if any(student['username'] == username for student in students):
        return jsonify({'message': 'Username already taken'}), 400


    new_student = {
        "id": len(students) + 1,
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
    }
    students.append(new_student)
    return jsonify({'message': 'Registration successful'}), 201

# 2. Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    for student in students:
        if student['username'] == username and student['password'] == password:
            return jsonify({'message': 'Login successful', 'student_id': student['id']}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# 3. Testimonials API
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    with open('testimonials.json', 'r') as file:
        testimonials = json.load(file)  
    
    if len(testimonials) < 2:
        return jsonify(testimonials)
    else:
        return jsonify(random.sample(testimonials, 2))

# 4. Enroll Courses API
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()

    course_name = data.get('course_name')

    for student in students:
        if student['id'] == student_id:
            if course_name not in student['enrolled_courses']:
                student['enrolled_courses'].append(course_name)
                return jsonify({'message': 'Course enrolled successfully'}), 200
            else:
                return jsonify({'message': 'Course already enrolled'}), 400

    return jsonify({'message': 'Student not found'}), 404

# 5. Delete Courses API
@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_name = data.get('course_name')

    for student in students:
        if student['id'] == student_id:
            if course_name in student['enrolled_courses']:
                student['enrolled_courses'].remove(course_name)
                return jsonify({'message': 'Course dropped successfully'}), 200
            else:
                return jsonify({'message': 'Course not enrolled'}), 400

    return jsonify({'message': 'Student not found'}), 404

# 6. Get All Courses API
@app.route('/courses', methods=['GET'])
def get_all_courses():
    return jsonify(courses)

# 7. Get Student Courses API
@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            enrolled_courses = student['enrolled_courses']
            student_course_details = [course for course in courses if course['name'] in enrolled_courses]
            return jsonify(student_course_details)
    return jsonify([]), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)