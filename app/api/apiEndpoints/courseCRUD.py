import hug
from models.main import *

@db_session
def create(
    name: hug.types.text,
    code: hug.types.text,
    description: hug.types.text,
    details: hug.types.text
):
    # We should also add a token, but we will do it later!
    # First verify the token, will do this later using Google API's

    newCourse = Course(
        name=name,
        code=code,
        description=description,
        details=details
    )
    return {
        'newCourse':{
            'name': newCourse.name,
            'code': newCourse.code,
            'description': newCourse.description,
            'details': newCourse.details
        }
    }

@db_session
def readByCode(
    code: hug.types.text
):
    # Clean the inputs
    course = select(c for c in Course if c.code == code)

    return {
        'course':{
            'name': course.name,
            'code': course.code,
            'description': course.description,
            'details': course.details
        }
    }


@db_session
def readById(
    id: hug.types.number
):
    # Clean the inputs
    course = Course[id]

    return {
        'course':{
            'name': course.name,
            'code': course.code,
            'description': course.description,
            'details': course.details
        }
    }

@db_session
def readAll():
    # Clean the inputs
    courses = select(c for c in Course)
    courseList = []
    for c in courses:
        courseList.append(
            {
                'name': c.name,
                'code': c.code,
                'description': c.description,
                'details': c.details
            }
        )
    return {
        'courses': courseList
    }

@db_session
def update(
    id: hug.types.number,
    **kwargs
):
    # Filter the kwargs
    currentCourse = Course[id]
    for key in kwargs.keys():
        currentCourse.key = kwargs[key]

    return {
        'updatedCourse':{
            'name': updatedCourse.name,
            'code': updatedCourse.code,
            'description': updatedCourse.description,
            'details': updatedCourse.details
        }
    }

# Dint delete yet, as have to change many things before/after the course is deleted

@db_session
def deleteByCode(
    code: hug.types.text
):
    currentCourse = select(c for c in Course if c.code == code)
    return {
        'message': 'Deleted Succesfully.'
    }

@db_session
def deleteById(
    id: hug.types.number
):
    currentCourse = Course[id]
    return {
        'message': 'Deleted Succesfully.'
    }
