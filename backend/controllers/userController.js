const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//this is to register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(201).json({ message: "User already exists" });

  const user = await User.create({ firstName, lastName, password, email });
  return res.status(201).json({ message: "User registered successfully" });
};

//this is to login an existing user
const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  //checking to see if we are missing a field
  if (!emailOrUsername || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email/username and password" });
  }

  try {
    let user;

    //checks to see if we were passed a email or username and then finds based off of that
    if (emailOrUsername.includes("@")) {
      user = await User.findOne({ email: emailOrUsername });
      if (!user) return res.status(400).json({ message: "Invalid Email" });
    } else {
      user = await User.findOne({ username: emailOrUsername });
      if (!user) return res.status(400).json({ message: "Invalid Username" });
    }

    //if the password does not match for the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Username or Password" });

    //if everything is correct, generate a jwt token and send it back to the user
    const token = jwt.sign(
      { id: user.id, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
