

const Promise            = require('bluebird');
const lodash             = require('lodash')
const response           = require('../../responses/response');
const constants          = require('../constant/constant')


const movieRatingService = require('../service/movieRatingService')



/**
 * @function<b>to rate and comment movie</b>
 * @param {email,comment,rate,movie_name} req 
 * @param {status,message} res
 */
const rateAndCommentMovie = (req,res)=>{
    Promise.coroutine(function* (){

        let movieData = yield movieRatingService.getMovieId({
            movieName : req.body.movie_name,
            columns   : 'movie_id'
        })
        if(lodash.isEmpty(movieData)){ // error no movie found
            response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.NO_MOVIE_FOUND);
        }
        let ratingData = yield movieRatingService.getMovieRatingData({
            email      : req.body.email,
            movie_id   : movieData[0].movie_id
        })
        if(!lodash.isEmpty(ratingData)){ // already rated
            response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.MOVIE_ALREADY_RATED)
        }
        
        req.body.movie_id = movieData[0].movie_id
        yield movieRatingService.rateAndCommentMovie(req.body)
        response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.MOVIE_RATED_SUCCESSFULLY);


    })().then((data) => {
       
      }, (error) => {
       
        response.errorResponse(res);
      });


}


/**
 * @function<b>calculate rating count and  average rating</b>
 * @param {movie_name} req 
 * @param {avg_rating,rating_count} res
 */
const calculateRating = (req,res)=>{
    Promise.coroutine(function* (){
        let responseData = {
            avg_rating   : 0,
            rating_count : 0
        }
        let movieData = yield movieRatingService.getMovieId({
            movieName : req.body.movie_name,
            columns   : 'movie_id'
        })
        if(lodash.isEmpty(movieData)){ // error no movie found
            response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.NO_MOVIE_FOUND);
        }
        let ratingData = yield movieRatingService.getMovieRatingData({
            movie_id : movieData[0].movie_id,
            columns  : 'count(rate) AS rating_count,AVG(rate) AS avg_rating'
        })
        if(!lodash.isEmpty(ratingData)){ 
            responseData.rating_count = ratingData[0].rating_count ? ratingData[0].rating_count : 0;
            responseData.avg_rating   = ratingData[0].avg_rating   ? ratingData[0].avg_rating : 0;
        }

      
        response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.ACTION_COMPLETE,responseData);


    })().then((data) => {
       
      }, (error) => {
       
        response.errorResponse(res);
      });


}

/**
 * @function<b>get rating and comment for a movie</b>
 * @param {movie_name,order,limit,skip} req 
 * order - 0- ASC , 1-DESC
 * @param {responseData} res
 */
const getRatingAndComments = (req,res)=>{
    Promise.coroutine(function* (){
      
        let movieData = yield movieRatingService.getMovieId({
            movieName : req.query.movie_name,
            columns   : 'movie_id'
        })
        if(lodash.isEmpty(movieData)){ // error no movie found
            response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.NO_MOVIE_FOUND);
        }
        let ratingData = yield movieRatingService.getMovieRatingData({
            movie_id : movieData[0].movie_id,
            order    : req.query.order, // order 0 - asc ,1-desc
            limit    : req.query.limit,
            skip     : req.query.skip,
            columns  : 'movie_name,rate,comment'
        })
       
        response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.ACTION_COMPLETE,ratingData);


    })().then((data) => {
       
      }, (error) => {
       
        response.errorResponse(res);
      });


}




module.exports = {
    rateAndCommentMovie,
    calculateRating,
    getRatingAndComments
}
