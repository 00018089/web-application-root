const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Show Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register User
router.post('/register', [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.render('register', { errors: errors.array() });

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/users/login');
    } catch (err) {
        res.render('register', { errors: [{ msg: 'User already exists or DB error.' }] });
    }
});

// Show Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render('login', { errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('login', { errors: [{ msg: 'Wrong password' }] });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;

