const userController                = require('../controllers/UserController');
const verifyToken                   = require('../middlewares/verifyToken');
const checkRole                     = require('../middlewares/checkRole')
const router                        = require('express').Router();

//Routes
router.put('/auth/editProfile', verifyToken,checkRole, userController.update);

module.exports = router;


