const Role                          = require("../models/Role");
const Users                         = require("../models/Users");
const bcrypt                        = require('bcrypt');
const jwt                           = require('jsonwebtoken');

const authController = {};

authController.registerUser = async (req, res) => {
    try {
        
        const { name,surname,email,password}        = req.body;
        const salt                                  = await bcrypt.genSalt(10);
        const encryptedPassword                     = await bcrypt.hash(password, salt);
        const existingUser                          = await Users.find({ email: email })
        const foundRoles                            = await Role.find({ name: { $in: Users.role}})

        /**
         * Validations
         */
        if (password.length < 6 || password.length > 10) {
            return res.status(500).json({
                success: false,
                message: 'La password deve comprendere dai 6 ai 10 caratteri'
            })
        }

        if (existingUser.length > 0) {
            return res.status(500).json({
                success: false,
                message: 'Questa email è già in uso'
            })
        }

        const user = {
            name,
            surname,
            email,
            password: encryptedPassword,
            role: "user"
        }

        user.role = foundRoles.map(role => role._id)
        await Users.create(user)

        return res.status(200).json({
            success: true,
            message: 'Utente creato correttamente'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Non si può registrate questo utente",
            error: error?.message || RangeError
        })
    }
}


//Login
authController.login = async (req, res) => {
    
    try {
        const { email, password }           = req.body;
        const user                          = await Users.findOne({ email: email })
        const isValidPassword               = bcrypt.compareSync(password, user.password);

        /**
         * Validations
         */
        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Inserire Email e Password'
                }
            );
        }

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Credenziali Errate'
                }
            );
        };

        if (!isValidPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: 'Email o Password Errata'
                }
            );
        }

        const token = await jwt.sign({
            user_id: user._id,
            user_name: user.name,
            user_surname: user.surname,
            user_email: user.email,
            user_role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: '5h' })

        return res.status(200).json(
            {
                success: true,
                message: 'Benvenuto!',
                token: token
            }
        );

    }catch(error){
        return res.status(400).json(
            {
                success: false,
                message: 'Login Failed'
            }
        )
    }
}

module.exports = authController;