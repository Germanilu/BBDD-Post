
/**
 * Check the role of the user and return the name of it
 */
const Role = require('../models/Role')
const checkRole = async (req, res, next) => {
    const userRole = req.user_role;
    try {
        const roles = await Role.find()
        roles.map(e => {
            if (userRole.toString() === e._id.toString()) {
                req.roleName = e.name;
                console.log(req.roleName)
                next()
            }
        })
    } catch (error) {
        reject(error)
    }
}

module.exports = checkRole;