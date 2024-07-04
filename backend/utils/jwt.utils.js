import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (admin) => {
    const token = jwt.sign({id: admin._id, username: admin.username, email: admin.email}, config.jwtSecret, {expiresIn: '1h'});
    return token;
};

const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour
    })
}

export {
    generateToken,
    verifyToken,
    setTokenCookie
};