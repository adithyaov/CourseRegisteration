import sys
sys.path
sys.path.append('/home/altair/Prog/courseApp/app/api')

import hug
from apiEndpoints.helloWorld import hello as hello

router = hug.route.API(__name__)

router.get('/hello')(hello)