const userController                = require('../controllers/UserController');
const verifyToken                   = require('../middlewares/verifyToken');
const checkRole                     = require('../middlewares/checkRole')
const router                        = require('express').Router();

//Routes
router.put('/editProfile', verifyToken, userController.update);
router.put('/editUserProfile/:id', verifyToken,checkRole, userController.updateOtherUser);

module.exports = router;


