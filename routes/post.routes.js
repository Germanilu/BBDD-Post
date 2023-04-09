const postController                = require('../controllers/PostController');
const verifyToken                   = require('../middlewares/verifyToken');
const router                        = require('express').Router();

//Routes
router.post('/newPost', verifyToken, postController.create);
router.get('/getPosts', verifyToken, postController.getAllPosts);
router.put('/editPost/:id', verifyToken, postController.editPost);
router.delete('/deletePost/:id', verifyToken, postController.delete);


module.exports = router;


