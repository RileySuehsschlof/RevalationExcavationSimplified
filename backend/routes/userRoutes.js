const express = require('express');

const { registerUser, loginUser } =
    require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


// ----------------------------------------------------------------

// User routes

router.post('/register', registerUser);//register user 

router.post('/login', loginUser);//login user 

router.get('/adminPage', protect, (req, res) => { res.send("welcome to the admin page") });//a protected route


module.exports = router;