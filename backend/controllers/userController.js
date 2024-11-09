const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//this is to register a new user
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "User already exists" });


    const user = await User.create({ username, password, email });
    return res.status(201).json({ message: "User registered successfully" });
};




//this is to login an existing user
const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ message: "Please provide email/username and password" });
    }

    try {

        let user;

        if (emailOrUsername.includes('@')) {
            user = await User.findOne({ email: emailOrUsername });
            if (!user) return res.status(400).json({ message: "Invalid Email" });
        }
        else {
            user = await User.findOne({ username: emailOrUsername });
            if (!user) return res.status(400).json({ message: "Invalid Username" });
        }



        //if the password does not match for the user
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Username or Password" });


        //if everything is correct, generate a jwt token and send it back to the user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }


};

module.exports = { registerUser, loginUser };