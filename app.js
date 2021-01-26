const express = require('express')
const bodyParser = require('body-parser')
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


// ROUTES
const homeRoute = require('./routes/homeRoute')
const productDetailsRoute = require('./routes/productDetailsRoute')
const addToCartRoute = require('./routes/addToCartRoute')
const productSummaryRoute = require('./routes/productSummaryRoute')
const checkoutRoute = require('./routes/checkoutRoute')
const executePaymentRoute = require('./routes/executePaymentRoute')

const login = require('./routes/users/login');
const logout = require('./routes/users/logout');
const register = require('./routes/users/register');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



// Express Router

app.use(homeRoute);
app.use(productDetailsRoute);
app.use(addToCartRoute);
app.use(productSummaryRoute);
app.use(checkoutRoute);
app.use(executePaymentRoute);

app.use(login);
app.use(logout);
app.use(register);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


