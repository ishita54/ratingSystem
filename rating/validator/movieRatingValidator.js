
const Joi           = require('joi');
const response      = require('../../responses/response');
const validate      = require('../../validator/joi-validate');

/**
 * @function<b>validate parameters for rating and comment a movie</b>
 * @param {email,comment,rate,movie_name} req 
 * @param {rateAndCommentMovie} next 
*/

const rateAndCommentMovie = (req, res, next) =>
{
    let ratingOpts = {
        email      : req.body.email,
        comment    : req.body.comment,
        rate       : req.body.rate,
        movie_name : req.body.movie_name
    }
    const schema = {
        email      : Joi.string().email(
        {
            minDomainAtoms: 2
        }).required(),
        comment    : Joi.string().optional().allow(''),
        rate       : Joi.number().required(),
        movie_name : Joi.string().required()

    }
    let valid=validate.joi_validate(res,ratingOpts,schema)
    if(valid){
        next();
    }
}

/**
 * @function<b>validate parameters for counting rate for particular movie</b>
 * @param {movie_name} req 
 * @param {calculateRating} next 
*/

const calculateRating = (req, res, next) =>
{
    let calculateOpts = {
        movie_name : req.body.movie_name
    }
    const schema = {
        movie_name : Joi.string().required()

    }
    let valid=validate.joi_validate(res,calculateOpts,schema)
    if(valid){
        next();
    }
}

/**
 * @function<b>validate parameters for getting rate and comments particular movie</b>
 * @param {movie_name} req 
 * @param {getRatingAndComments} next 
*/

const getRatingAndComments = (req, res, next) =>
{
    let getRatingOpts = {
        movie_name : req.query.movie_name,
        order      : req.query.order,
        limit      : req.query.limit,
        skip       : req.query.skip
    }
    const schema = {
        movie_name : Joi.string().required(),
        order      : Joi.number().required().valid(0,1),
        limit      : Joi.number().required(),
        skip       : Joi.number().required()
    }
    let valid=validate.joi_validate(res,getRatingOpts,schema)
    if(valid){
        next();
    }
}







module.exports = {
    rateAndCommentMovie,
    calculateRating,
    getRatingAndComments
}