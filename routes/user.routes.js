const userController                = require('../controllers/UserController');
const verifyToken                   = require('../middlewares/verifyToken');
const checkRole                     = require('../middlewares/checkRole')
const router                        = require('express').Router();

//Routes
router.put('/auth/editProfile', verifyToken, userController.update);
router.put('/auth/editProfile/:id', verifyToken,checkRole, userController.updateOtherUser);

module.exports = router;


