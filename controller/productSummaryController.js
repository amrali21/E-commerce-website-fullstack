const connection = require('../database/db_connection')

const product_summary2 = (req, res) => {

}
const product_summary =  (req, res) => {

  if(req.user_id) {
    var my_query = `select product_name, retail_price, amount, (amount*retail_price) as total_price, image  from user_cart join products on user_id = ${req.user_id} && user_cart.product_id = products.product_id`
    connection.query(my_query, function (error, results, fields) {
      if (error) {
        console.log("we got an errror");
        throw error;
      }

         res.render('product_summary.ejs', {results: results});
  })
  }
  else {
    res.redirect('/login');
  }
   // res.render('product_summary.ejs');

    // connection.query(my_query, function (error, results, fields) {
    //     if (error) {
    //       console.log("we got an errror");
    //       throw error;
    //     }

    //     if(req.user_id){
    //       console.log("hey, you're logged in !!!!!!!!!")
    //       console.log(results[0].product_name);
    //        res.render('product_summary.ejs', {results: results});
    //      }
    //      else
    //      {
    //      }
    // })

}

module.exports = {product_summary};