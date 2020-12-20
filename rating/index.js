
const express             =  require('express');
const router              =  express.Router();


var movieRatingValidator  = require('./validator/movieRatingValidator');
var movieRatingController = require('./controller/movieRatingController');


router.post('/rate_and_comment_movie', movieRatingValidator.rateAndCommentMovie ,      movieRatingController.rateAndCommentMovie)
router.post('/calculate_rating',       movieRatingValidator.calculateRating     ,      movieRatingController.calculateRating)
router.get('/get_rating_and_comments', movieRatingValidator.getRatingAndComments ,     movieRatingController.getRatingAndComments)