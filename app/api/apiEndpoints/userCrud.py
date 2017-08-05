import sys
sys.path
sys.path.append('/home/altair/Prog/courseApp/app/api')

import hug
from models.main import *

@db_session
def create(
    name: hug.types.text,
    email: hug.types.text
):
    # We should also add a token, but we will do it later!
    # First verify the token, will do this later using Google API's
    return User(
        name=name,
        email=email,
        type='user'
    )

@db_session
def readByEmail(
    email: hug.types.text
):
    # Clean the inputs
    return select(u for u in User if u.email = email)

@db_session
def readById(
    id: hug.types.number
):
    # Clean the inputs
    return select(u for u in User if u.id = id)

@db_session
def update(
    id: hug.types.number,
    **kwargs
):
    # Filter the kwargs
    currentUser = User[id]
    for key in kwargs.keys():
        currentUser.key = kwargs[key]
    return currentUser


@db_session
def deleteByEmail(
    email: hug.types.text
):
    currentUser = select(u for u in User if u.email = email)
    return currentUser.delete()

@db_session
def deleteById(
    id: hug.types.number
):
    currentUser = User[id]
    return currentUser.delete()
