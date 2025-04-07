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


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"