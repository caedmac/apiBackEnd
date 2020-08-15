const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//const Product = require('./routes/product');
const usersRoutes = require('./routes/users');
//const Auth = require('./routes/auth');

//const AuthToken = require('./middlewares/AuthToken');

//App.use(AuthToken);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: 'http://localhost:4200/'
}));

//App.use('/product',Product);
app.use('/users', usersRoutes);
//App.use('/auth',Auth);


module.exports = app;