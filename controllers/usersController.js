const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, password: hashed });
        await user.save();
        res.redirect('/users/login');
    } catch (err) {
        res.status(400).send('Username already exists');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token).redirect('/');
};

exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
