const mongoose              = require ('mongoose');

/**
 * Attempt to establish connection to db
 */
const db = () => mongoose.connect(process.env.MONGO_URI,)
.then (() => {
    console.log('Connection Stablished')
})
.catch((error) => {
    console.log('Error connecting to MongoDB', error)
})

module.exports = db