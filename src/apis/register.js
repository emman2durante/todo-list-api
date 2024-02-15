const DB = require("../helpers/mockDb");

const register = (req, res) => {
    const newUsername = req.body.username
    const newPassword = req.body.password

    // Mock db select
    const usernameExists = DB.users.find(({ username }) => username === newUsername);

    if (usernameExists) {
        res.status(409).json({
            status: "FAILED",
            message: "Username is already taken. Please try another username.",
        });
    }

    // Mock db insert
    DB.users.push({ username: newUsername, password: newPassword });

    res.status(200).json({
        status: "SUCCESS",
        message: "You have registered successfully! Please login to continue",
    });
}

module.exports = register;