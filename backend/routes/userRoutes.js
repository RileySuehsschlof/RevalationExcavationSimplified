const express = require('express');

const { registerUser, loginUser } =
    require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


// ----------------------------------------------------------------

// User routes

router.post('/register', registerUser);//register user 

router.post('/login', loginUser);//login user 

router.get('/protected', protect, (req, res) => { res.send("welcome to the protected route") });//a protected route


module.exports = router;