
/**
 * Check the role of the user and return the name of it
 */
const Role = require('../models/Role')
const checkRole = async (req, res, next) => {
    const userRole = req.user_role 
    try {
        const roles = await Role.find()
        roles.map(e => {
            if (userRole.toString() === e._id.toString()) {
                req.roleName = e.name;
                next();
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = checkRole;