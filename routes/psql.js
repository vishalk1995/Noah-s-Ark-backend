var express = require('express');
var router = express.Router();
var psqlController = require('../public/javascripts/PSQLController');

/* GET listing. */
router.get('/', psqlController.ping);
router.post('/login', psqlController.login);
router.get('/userprofiles', psqlController.getProfile);
router.put('/userprofiles', psqlController.addProfile);
/* GET listing. 
router.get('/users/', psqlController.getList);
router.post('/login/:id', psqlController.login);
router.delete('/users/:id', psqlController.deleteItem);

*/

module.exports = router;
