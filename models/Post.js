const mongoose                  = require ('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId
    },
    userName:{
        type: String,
        required: true,
    },
    userSurname:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

},
    {
        timestamps: false
    }
);

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;