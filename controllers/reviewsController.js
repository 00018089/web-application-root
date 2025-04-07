const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');

exports.getAllReviews = async (req, res) => {
    const reviews = await Review.find();
    res.render('reviews', { title: 'All Reviews', reviews });
};

exports.getSingleReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    res.render('review', { title: review.title, review });
};

exports.createReview = [
    body('title').notEmpty().withMessage('Title required'),
    body('author').notEmpty().withMessage('Author required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const reviews = await Review.find();
            return res.render('reviews', { title: 'All Reviews', reviews, errors: errors.array() });
        }

        const newReview = new Review(req.body);
        await newReview.save();
        res.redirect('/reviews');
    }
];

exports.editReviewForm = async (req, res) => {
    const review = await Review.findById(req.params.id);
    res.render('editReview', { title: 'Edit Review', review });
};

exports.updateReview = async (req, res) => {
    await Review.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/reviews');
};

exports.deleteReview = async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect('/reviews');
};
