from __future__ import absolute_import, print_function

from decimal import Decimal
from datetime import date

from pony.orm.core import *

db = Database()

class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    email = Required(str, unique=True)
    type = Required(str)
    groups = Set('Group') # A User can be in many Groups.

class Group(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    code = Required(str, unique=True)
    description = Optional(str)
    users = Set('User') # A Group can have many Users.
    courses = Set('Course') # A Group can avail many Courses.

class Course(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str)
    description = Optional(str)
    code = Required(str, unique=True)
    details = Required(str) # Json format
    groups = Set('Group') # A Course is available to many Groups.




sql_debug(True)  # Output all SQL queries to stdout

db.bind('sqlite', '../sqliteDB/main.sqlite', create_db=True)

db.generate_mapping(create_tables=True)
