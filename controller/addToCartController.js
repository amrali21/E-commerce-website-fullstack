
const connection = require('../database/db_connection')

//var product_id = req.body.product_id;
//var amount = req.body.amount;


// SUBMIT A FORM (AMOUNT, PRODUCT_ID) COME FROM FRONT-END, USER_ID COMES FROM SESSION.
const add_to_cart = (req, res) => {

 var user_id = req.user_id;
 var product_id = req.body.product_id;
 var amount = req.body.amount;

  connection.query(`INSERT INTO user_cart (user_id, product_id, amount) VALUES (${user_id}, ${product_id}, ${amount})`, function (error, results, fields) {
        if (error) {
          console.log("we got an errror");
          throw error;
        }
        res.redirect('/product_summary');
  }
)
}


// WAS TRYING AJAX
// const add_to_cart = (req, res) => {
// var product_id = req.body.product_id;
// var amount = req.body.amount;

// connection.query(`SELECT retail_price, product_name FROM products WHERE product_id = "${product_id}"`, function (error, results, fields) {
//     if (error) {
//       console.log("we got an errror");
//       throw error;
//     }
//     console.log("item added to cart");
//     var item = {product_name: results[0].product_name, 
//                 retail_price: results[0].retail_price * amount
//                 }
                
//        console.log("session now: " , req.session);

//       if(req.session.count)
//       {
//         req.session.count++;
//         console.log(req.session.count);
//         console.log("it is defined");
//         req.session.save();
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.end();
//       }
//       else{
//         req.session.count = 1;
//         console.log(req.session.count);
//         console.log("it is not defined yet");
//         req.session.save();
//         res.header('Access-Control-Allow-Credentials', 'true');
//        res.end();
//       }
      
//     //  console.log("session now: " , req.session);
// })





// }


module.exports = {add_to_cart};