

const Promise            = require('bluebird');
const lodash             = require('lodash')
const {runQuery}         = require('../../database/db_connection');
const response           = require('../../responses/response');


/**
 * @function<b>get movie id corresponding to name</b>
 * @param {opts} req 
 * @param {movie_id} res
 */
function getMovieId(opts) {
    return new Promise((resolve, reject) => {
      var values = [];
      opts.columns = opts.columns || '*';
      var sql = `SELECT ${opts.columns} FROM tb_movies WHERE is_active = 1 `;

      if(opts.hasOwnProperty(movieName)){
        sql += " AND movie_name = ? ";
        values.push(opts.movieName);
      }
      sql += " LIMIT 1";
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }

/**
 * @function<b>get movie rating data</b>
 * @param {opts} req 
 * @param {rating} res
 */
function getMovieRatingData(opts) {
    return new Promise((resolve, reject) => {
      var values = [];
      opts.columns = opts.columns || '*';
      var sql = `SELECT ${opts.columns} FROM tb_movies_rating WHERE 1=1 `;
      if(opts.hasOwnProperty(email)){
        sql += " AND email = ? ";
        values.push(opts.email);
      }

      if(opts.hasOwnProperty(movie_id)){
        sql += " AND movie_id = ? ";
        values.push(opts.movie_id);
      }

      if(opts.order){
        sql += " ORDER BY rate DESC ";
        }
      else{
        sql += " ORDER BY rate ASC ";
      }
      
      if(opts.hasOwnProperty(limit)){
        sql += " LIMIT ? OFFSET ? ";
        values.push(opts.limit,opts.skip);
      }
      else{
        sql += " LIMIT 1";
      }
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }

  /**
 * @function<b>insert movie rating data</b>
 * @param {movie_id,rate,comment,email} req 
 * @param {insertId} res
 */

  function rateAndCommentMovie(opts) {
    return new Promise((resolve, reject) => {
      var values = [opts.movie_id,opts.rate,opts.comment,opts.email]; 

      var sql = `INSERT INTO tb_movies_rating (movie_id,rate,comment,email) VALUES(?,?,?,?)`;
     
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }


  
  module.exports = {
    getMovieId,
    getMovieRatingData,
    rateAndCommentMovie,
   
}