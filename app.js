const express    = require('express');
const app        = express();

const bodyparser = require('body-parser')




app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/rating', rating_routes);


app.listen(3000);


