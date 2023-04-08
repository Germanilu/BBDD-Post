const authController                = require('../controllers/AuthController');
const verifyToken                   = require('../middlewares/verifyToken');
const router                        = require('express').Router();

//Routes
router.post('/auth/userSignIn', authController.registerUser);
router.post('/auth/userLogin', authController.login);
router.get('/auth/profile', verifyToken, authController.profile);


module.exports = router;


