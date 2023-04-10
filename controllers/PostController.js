const Users                         = require("../models/Users");
const Post                          = require("../models/Post");


const postController = {};

/**
 * Register user account
 */
postController.create = async (req, res) => {
try {
    
    const userId                    = req.user_id;
    const {title,description}       = req.body;
    const userObject                = await Users.findById({_id:userId})
                                    .select(["-password", "-__v"]);
    const userName                  = req.user_name;
    const userSurname               = req.user_surname;

    /**
     * Validations
     */
    if(!title || !description){
        return res.status(500).json({
            success: false,
            message: 'Devi inserire un titolo e una descrizione del post',
        });
    }
    const newPost = {
        userId:userObject,
        userName,
        userSurname,
        title,
        description,
    }

    await Post.create(newPost);

    return res.status(200).json({
        success: true,
        message: 'Post creato correttamente',
        post:newPost
    });

} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Non si può creare il post",
        error: error?.message || RangeError
    })
}
}


/**
 * Retrive all available post
 */
postController.getAllPosts = async (req, res) => {
    try {
        const post = await Post.find();

        /**
         * Validation
         */
        if (!post) {
            return res.status(200).json(
                {
                    success: true,
                    message: 'Non ci sono post disponibili ',
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: 'Ecco tutti i post disponibili',
                data: post
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Errore al recuperare i post",
            error: error?.message || RangeError
        })
    }
}


/**
 * Edit post
 */
postController.editPost = async (req, res) => {
try {
    const postId = req.params.id;
    const userId = req.user_id;
    const {title,description} = req.body;

    const post = await Post.findById({_id:postId})

    /**
     * Validations
     */
    if(userId !== post.userId.toString()){
        return res.status(200).json(
            {
                success: false,
                message: "Non puoi modificare questo post",
            }
        )
    }

    if(!title || !description){
        return res.status(200).json(
            {
                success: false,
                message: "Ricordati di inserire un titolo e una descrizione!",
            }
        )
    }
    

    const updatePost = {
        title:title || post.title,
        description: description || post.description
    }

    await Post.findOneAndUpdate({_id:postId}, updatePost);


    return res.status(200).json(
        {
            success: true,
            message: "Post aggiornato!",
            post:updatePost
        }
    )


} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Errore al modificare il post",
        error: error?.message || RangeError
    })
}
}

postController.delete = async (req, res) => {
   try {
       const postId         = req.params.id;
       const userId         = req.user_id;
       const post           = await Post.findById({_id:postId})
    
        /**
        * Validations
        */
        if(userId !== post.userId.toString()){
           return res.status(200).json(
               {
                   success: false,
                   message: "Non puoi eliminare questo post",
               }
           )
       }
    
       await Post.findOneAndDelete({_id: postId})
    
       return res.status(200).json({
           success: true,
           message: "Post eliminato!"
       })

   } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Errore, questo post non è stato eliminato",
        error: error?.message || RangeError
    })
   }
   
}


module.exports = postController;