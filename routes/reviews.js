const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');



router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getSingleReview);
router.post('/', reviewsController.createReview);
router.get('/edit/:id', reviewsController.editReviewForm);
router.post('/edit/:id', reviewsController.updateReview);
router.post('/delete/:id', reviewsController.deleteReview);

module.exports = router;
