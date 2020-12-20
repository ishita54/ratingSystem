const mysql         = require('mysql');
const util          = require('util');


const connection    = mysql.createConnection({
           host     : 'localhost',
           user     : 'root', 
           password : '', 
           database : 'rate_movie'  
});

/**
 * promisify is used to convert the response of the function to promise
 */
const runQuery       =  util.promisify(connection.query).bind(connection);

module.exports       = {runQuery}
