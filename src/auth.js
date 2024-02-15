const jwt = require('jsonwebtoken');
const moment = require('moment/moment');
const { accessTokenPrivateKey } = require('./config');

const authCheck = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, accessTokenPrivateKey);
        // const hasExpired = moment(decoded.expiresIn).isAfter(moment(new Date()))
        const hasExpired = moment(decoded.expiresIn) < (moment(new Date()))
        if (hasExpired) {
            console.log("Token expired: ", moment(decoded.expiresIn))
            return false;
        }

        console.log('Authenticated: ', decoded);
        return decoded;
    } catch (err) {
        console.log(err)
        return false;
    }
}

const generateAccessToken = (username) => {
    try {
        return jwt.sign({
            username,
            expiresIn: moment(new Date()).add(30, 'm').toISOString(),
        }, accessTokenPrivateKey);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    authCheck,
    generateAccessToken
};