const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const { validateSession } = require('../middleware');


// localhost:{{PORT}}/user/signup

router.post('/signup', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13),
            isAdmin: req.body.isAdmin || false
        });
        console.log('User object with first and last name:', user);

        const newUser = await user.save();
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT, { expiresIn: '1 day' });

        newUser ?
            res.status(200).json({
                user: newUser,
                message: 'Success! User Created!',
                token,
                isAdmin: newUser.isAdmin
            }) :
            res.status(404).json({
                message: 'Incomplete'
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            Error: err.message
        });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) throw new Error('Email or Password does not match');
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) throw new Error('Email or Password does not match');

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: 60 * 60 * 24 });

        email ?
            res.status(200).json({
                user,
                token,
                message: 'Successful login',
                isAdmin: user.isAdmin
            }) :
            res.status(404).json({
                message: "Something went wrong"
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            Error: err.message
        });
    }
});
// localhost:{{PORT}}/user
router.get('/', validateSession, async (req, res) => {
    try {
        const users = await User.find();

        users ?
            res.status(200).json({
                users
            }) :
            res.status(404).json({
                message: "No user found"
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            Error: err.message
        });
    }
});





// localhost:{{PORT}}/user/me
// Get the current user's data


router.get('/me', validateSession, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('firstName lastName email isAdmin');

        if (!user) {
            console.log('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        } else {
            console.log('Fetched current user:', user);
            res.status(200).json({
                user
            });
        }
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({
            error: error.message
        });
    }
});





module.exports = router;

