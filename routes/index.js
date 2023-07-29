const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');  //written just for understanding that this file got loaded by looking at this message

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

/* for any furthur routesaccess as below
   router.use('/routerName', require('./routerfile'));
*/

module.exports = router;



/*the statement which can be used to create a route handlers is below
        var router = express.Router()
        let router = express.Router()
*/