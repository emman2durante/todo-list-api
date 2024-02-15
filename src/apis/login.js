const DB = require("../helpers/mockDb");
const { generateAccessToken } = require("../helpers/auth");

const login = (req, res) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;

    const user = DB.users.find(({ username }) => username === reqUsername);

    if (user && user?.password === reqPassword) {
        res.status(200).json({
            status: "SUCCESS",
            message: "Successfully logged in!",
            accessToken: generateAccessToken(reqUsername),
        });
    } else {
        res.status(401).json({
            status: "FAILED",
            message: "Username or password is incorrect!",
        });
    }
}

module.exports = login;