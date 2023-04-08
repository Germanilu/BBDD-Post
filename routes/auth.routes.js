const authController                = require('../controllers/AuthController');
const router                        = require('express').Router();

//Routes
router.post('/auth/userSignIn', authController.registerUser);
router.post('/auth/userLogin', authController.login);


module.exports = router;


