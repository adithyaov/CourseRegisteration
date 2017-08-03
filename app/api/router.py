import hug
from endpointServices.helloWorld import hello as hello

router = hug.route.API(__name__)

router.get('/hello')(hello)