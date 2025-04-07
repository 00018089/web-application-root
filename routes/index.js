// routes/index.js

const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.render('index', { title: res.__('welcome') });
});

// Language Switcher
router.get('/lang/:locale', (req, res) => {
    res.cookie('i18n', req.params.locale);
    res.redirect('back'); // or res.redirect('/') if 'back' fails
});

module.exports = router;
