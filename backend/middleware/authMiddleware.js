const jwt = require('jsonwebtoken');



// middleware function to protect routes
const protect = (req, res, next) => {

    //gets the authorization token from the header and the separates the token out
    const token = req.headers.authorization?.split(" ")[1];

    //if there is no token with the request
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }


    //if they have a token, verify that it is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }


};

module.exports = protect;