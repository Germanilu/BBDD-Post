const Role                          = require("../models/Role");
const Users                         = require("../models/Users");
const bcrypt                        = require('bcrypt');
const jwt                           = require('jsonwebtoken');
const provideRole                   = require('../libs/provideRole');

const userController = {};


/**
 * Edit user information
 */
userController.update = async (req, res) => {
    try {
        const userId         = req.user_id;

        if (req.body.name === "" || req.body.surname === "") {
            return res.status(400).json(
                {
                    success: false,
                    message: "Impossibile aggiornare i dati utente"
                }
            )
        }

        const { name, surname, email, password }        = req.body
        const salt                                      = await bcrypt.genSalt(10);
        const encryptedPassword                         = await bcrypt.hash(password, salt);

        const updateUser = {
            name,
            surname,
            email,
            password: encryptedPassword,
        }

        await Users.findOneAndUpdate({ _id: userId }, updateUser)
        return res.status(200).json(
            {
                success: true,
                message: "Dati utente aggiornati!",
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Impossibile aggiornare i dati utente",
                error: error?.message || error
            }
        )
    }
}


/**
 * Edit other user information depending on the role of the requester
 */
userController.updateOtherUser = async (req, res) => {

try {
    const requesterRoleName         = req.roleName
    const userId                    = req.params.id
    const userObject                = await Users.findById({_id:userId})
    const userRole                  = await provideRole(userObject.role);


    if(requesterRoleName === "admin" && (userRole === "moderator" || userRole === "user") ){

        const { name, surname, email, password, role }          = req.body
        const salt                                              = await bcrypt.genSalt(10);
        const encryptedPassword                                 = await bcrypt.hash(password, salt);

        const updateUser = {
            name,
            surname,
            email,
            password: encryptedPassword,
            role
        }
        const foundRoles = await Role.find({ name: { $in: updateUser.role}});
        updateUser.role = foundRoles.map(role => role._id);

        await Users.findOneAndUpdate({ _id: userId }, updateUser)
        return res.status(200).json(
            {
                success: true,
                message: "Dati utente aggiornati!",
            }
        )
    }

    if(requesterRoleName == "moderator" && userRole == "user" ){
        const { name, role }          = req.body
       
        if(role === "admin"){
            return res.status(400).json(
                {
                    success: false,
                    message: "Non hai i permessi necessari per questa modifica"
                }
            )
        }

        const updateUser = {
            name,
            role
        }
        const foundRoles        = await Role.find({ name: { $in: updateUser.role}});
        updateUser.role         = foundRoles.map(role => role._id);

        await Users.findOneAndUpdate({ _id: userId }, updateUser)
        return res.status(200).json(
            {
                success: true,
                message: "Dati utente aggiornati!",
            }
        )
    }
    return res.status(500).json(
        {
            success: false,
            message: "Non hai i permesssi necessari per questa richiesta",
            error: error?.message || error
        }
    )


} catch (error) {
    return res.status(500).json(
        {
            success: false,
            message: "Impossibile aggiornare i dati di questo utente",
            error: error?.message || error
        }
    )
}
}


module.exports = userController;