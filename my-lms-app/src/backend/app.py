from flask import Flask, jsonify, request
import json
import random

app = Flask(__name__)

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
        "username": "student1",
        "password": "password123",
        "email": "student1@example.com",
        "enrolled_courses": ["CS101", "MATH201"]
    },
    {
        "id": 2,
        "username": "student2",
        "password": "securepass",
        "email": "student2@example.com",
        "enrolled_courses": ["PHYS101"]
    }
]

# 1. Student Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

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
            return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# 3. Testimonials API
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    if len(testimonials) < 2:
        return jsonify(testimonials)
    else:
        return jsonify(random.sample(testimonials, 2))

# 4. Enroll Courses API
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course_id = data.get('course_id')

    for student in students:
        if student['id'] == student_id:
            if course_id not in student['enrolled_courses']:
                student['enrolled_courses'].append(course_id)
                return jsonify({'message': 'Course enrolled successfully'}), 200
            else:
                return jsonify({'message': 'Course already enrolled'}), 400

    return jsonify({'message': 'Student not found'}), 404

# 5. Delete Courses API
@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get('course_id')

    for student in students:
        if student['id'] == student_id:
            if course_id in student['enrolled_courses']:
                student['enrolled_courses'].remove(course_id)
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
            student_course_details = [course for course in courses if course['id'] in enrolled_courses]
            return jsonify(student_course_details)
    return jsonify([]), 404

if __name__ == '__main__':
    app.run(debug=True)