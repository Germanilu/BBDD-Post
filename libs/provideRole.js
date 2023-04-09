const Role                          = require("../models/Role");

/**
 * Check the role of the user ansd return it 
 * @param {object} req 
 * @returns Role name
 */
const provideRole = async (req) => {
    try {
        const roles = await Role.find()
        roles.map(e => {
            if (req.toString() === e._id.toString()) {
                roleName = e.name;
            }
        })
        return roleName
    } catch (error) {
        return error
    }
}

module.exports = provideRole;