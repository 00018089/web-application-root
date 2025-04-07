require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const path = require('path');

const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

const app = express();

// i18n setup
i18n.configure({
    locales: ['en', 'fr'],
    directory: path.join(__dirname, '/locales'),
    defaultLocale: 'en',
    cookie: 'lang'
});
app.use(cookieParser());
app.use(i18n.init);

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Change language
app.get('/lang/:locale', (req, res) => {
    res.cookie('i18n', req.params.locale);
    res.redirect('back');
});


// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Book Reviews' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

