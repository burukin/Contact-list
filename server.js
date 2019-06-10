/**
 * Created by agros on 07.06.2019.
 */
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

//CORS middleware
/*const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With, remember-me');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
};*/

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
//app.use(allowCrossDomain);




app.listen(4000, ()=> {
    console.log('Listening');
});
