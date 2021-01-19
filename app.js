const express = require('express')
const bodyParser = require('body-parser')
var session = require('express-session')
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');


const app = express()
const port = 3000



// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 * 90 // 24 hours * 90 = 90 days (3 months)
}))


// rotutes
const homeRoute = require('./routes/homeRoute')
const productDetailsRoute = require('./routes/productDetailsRoute')
const addToCartRoute = require('./routes/addToCartRoute')
const productSummaryRoute = require('./routes/productSummaryRoute')
const checkoutRoute = require('./routes/checkoutRoute')
const executePaymentRoute = require('./routes/executePaymentRoute')

// users
const login = require('./routes/users/login');
const logout = require('./routes/users/logout');
const register = require('./routes/users/register');
const welcome = require('./routes/users/welcome');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


//DB Connection


// ROUTES

app.use(homeRoute);
app.use(productDetailsRoute);
app.use(addToCartRoute);
app.use(productSummaryRoute);
app.use(checkoutRoute);
app.use(executePaymentRoute);

//users
app.use(login);
app.use(logout);
app.use(register);
app.use(welcome);

app.get('/test2', (req, res) =>{
  res.render('index2.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


