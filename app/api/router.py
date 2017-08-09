import sys
sys.path
sys.path.append('/home/altair/Prog/courseApp/app/api')

import hug
from apiEndpoints.helloWorld import hello as hello
from apiEndpoints.userCRUD import *
from apiEndpoints.courseCRUD import *
from apiEndpoints.groupCRUD import *

router = hug.route.API(__name__)

# Always put a Hello World!
router.get('/hello')(hello)

# User Interface
router.get('/user/create')(create)
router.get('/user/read/email')(readByEmail)
router.get('/user/read/id')(readById)
router.get('/user/read/')(readAll)
router.get('/user/update')(update)
router.get('/user/delete/email')(deleteByEmail)
router.get('/user/delete/id')(deleteById)

# Group Interface
router.get('/group/create')(create)
router.get('/group/read/email')(readByCode)
router.get('/group/read/id')(readById)
router.get('/group/read/')(readAll)
router.get('/group/update')(update)
router.get('/group/delete/email')(deleteByEmail)
router.get('/group/delete/id')(deleteById)

# Course Interface
router.get('/course/create')(create)
router.get('/course/read/email')(readByCode)
router.get('/course/read/id')(readById)
router.get('/course/read/')(readAll)
router.get('/course/update')(update)
router.get('/course/delete/email')(deleteByEmail)
router.get('/course/delete/id')(deleteById)

# Need to add an endpoint to add users to groups etc.
# Need to add versioning. (This project is too simple to add GrapgQL, mabey we can add GraphQL later).