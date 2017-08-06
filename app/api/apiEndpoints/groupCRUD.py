import hug
from models.main import *

@db_session
def create(
    name: hug.types.text,
    code: hug.types.text,
    description: hug.types.text
):
    # We should also add a token, but we will do it later!
    # First verify the token, will do this later using Google API's

    newGroup = Group(
        name=name,
        code=code,
        description=description
    )
    return {
        'newGroup':{
            'name': newGroup.name,
            'code': newGroup.code,
            'description': newGroup.description
        }
    }

@db_session
def readByCode(
    code: hug.types.text
):
    # Clean the inputs
    group = select(g for g in Group if g.code == code)

    return {
        'group':{
            'name': group.name,
            'code': group.code,
            'description': group.description
        }
    }


@db_session
def readById(
    id: hug.types.number
):
    # Clean the inputs
    group = Group[id]

    return {
        'group':{
            'name': group.name,
            'code': group.code,
            'description': group.description
        }
    }

@db_session
def readAll():
    # Clean the inputs
    groups = select(g for g in Group)
    groupList = []
    for g in groups:
        groupList.append(
            {
                'name': g.name,
                'code': g.code,
                'description': g.description
            }
        )
    return {
        'groups': groupList
    }

@db_session
def update(
    id: hug.types.number,
    **kwargs
):
    # Filter the kwargs
    currentGroup = Group[id]
    for key in kwargs.keys():
        currentGroup.key = kwargs[key]

    return {
        'updatedGroup':{
            'name': currentGroup.name,
            'code': currentGroup.code,
            'description': currentGroup.description
        }
    }

# Dint delete yet, as have to change many things before/after the group is deleted

@db_session
def deleteByCode(
    code: hug.types.text
):
    currentGroup = select(g for g in Group if g.code == code)
    return {
        'message': 'Deleted Succesfully.'
    }

@db_session
def deleteById(
    id: hug.types.number
):
    currentGroup = Group[id]
    return {
        'message': 'Deleted Succesfully.'
    }
