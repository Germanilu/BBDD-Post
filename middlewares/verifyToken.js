
const jwt                 = require('jsonwebtoken');

/**
 * Check if user has a valid token
 */
const verifyToken = (req, res, next) => {
    try {
        const { authorization }         = req.headers;
        const token                     = authorization.split(' ')[1];
        var decoded                     = jwt.verify(token, process.env.JWT_SECRET);
        

        /**
         * Validations
         */
        if (!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        if (!decoded) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        req.user_id         = decoded.user_id;
        req.user_name       = decoded.user_name
        req.user_surname    = decoded.user_surname
        req.user_email      = decoded.user_email
        req.user_role       = decoded.user_role;
        next();

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Token invalid"
            }
        );
    }
}

module.exports = verifyToken;