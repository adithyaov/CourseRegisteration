import hug
from models.main import *

@db_session
def create(
    name: hug.types.text,
    email: hug.types.text
):
    # We should also add a token, but we will do it later!
    # First verify the token, will do this later using Google API's

    newUser = User(
        name=name,
        email=email,
        type='user'
    )
    return {
        'newUser':{
            'name': newUser.name,
            'email': newUser.email
        }
    }

@db_session
def readByEmail(
    email: hug.types.text
):
    # Clean the inputs
    user = select(u for u in User if u.email == email)

    return {
        'user':{
            'name': user.name,
            'email': user.email
        }
    }


@db_session
def readById(
    id: hug.types.number
):
    # Clean the inputs
    user = select(u for u in User if u.id == id)

    return {
        'user':{
            'name': user.name,
            'email': user.email
        }
    }

@db_session
def readAll():
    # Clean the inputs
    users = select(u for u in User)
    usersList = []
    for u in users:
        usersList.append(
            {
                'name': u.name,
                'email': u.email
            }
        )
    return {
        'users': usersList
    }

@db_session
def update(
    id: hug.types.number,
    **kwargs
):
    # Filter the kwargs
    currentUser = User[id]
    for key in kwargs.keys():
        currentUser.key = kwargs[key]

    return {
        'updatedUser':{
            'name': currentUser.name,
            'email': currentUser.email
        }
    }


@db_session
def deleteByEmail(
    email: hug.types.text
):
    currentUser = select(u for u in User if u.email == email)
    return {
        'message': 'Deleted Succesfully.'
    }

@db_session
def deleteById(
    id: hug.types.number
):
    currentUser = User[id]
    return {
        'message': 'Deleted Succesfully.'
    }
