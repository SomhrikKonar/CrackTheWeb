import jwt from 'jsonwebtoken';

const verify =  (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).send("Access denied. No token provided.");

        const validToken = jwt.verify(token, 'secretkey');
        if (validToken) {
            req.user = validToken;
            next()
        }
    }
    catch (err) {
        res.status(400).send("Invalid token.")
    }
}

export default verify