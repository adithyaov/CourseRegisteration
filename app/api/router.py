import sys
sys.path
sys.path.append('/home/altair/Prog/courseApp/app/api')

import hug
from apiEndpoints.helloWorld import hello as hello
from apiEndpoints.userCrud import *

router = hug.route.API(__name__)

# Always put a Hello World!
router.get('/hello')(hello)

router.get('/user/create')(create)
router.get('/user/read/email')(readByEmail)
router.get('/user/read/id')(readById)
router.get('/user/read/')(readAll)
router.get('/user/update')(update)
router.get('/user/delete/email')(deleteByEmail)
router.get('/user/delete/id')(deleteById)