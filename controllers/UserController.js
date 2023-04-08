
const Users                         = require("../models/Users");
const bcrypt                        = require('bcrypt');


const userController = {};
//Update user data
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

module.exports = userController;