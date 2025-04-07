const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    content: String,
    rating: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
