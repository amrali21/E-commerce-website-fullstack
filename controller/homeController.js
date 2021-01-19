
const connection = require('../database/db_connection')

const home =  (req, res) => {
  console.log('just called home, did it stick??' + req.user_id); 
    // connection.connect();
    
   connection.query('SELECT * FROM products limit 30', function (error, results, fields) {
     if (error) throw error;
   
     var images = [];
     for(var x = 0; x < results.length; x++){
       let arr = getUrlArray(results[x].image)[0] // get first image only
       let test = arr.split('"')[1];
       images.push(test);
       
     }

 //     var username = 'guest';            // sub query 4 retail-price
    //  if(req.user_id){     // select sum(amount*retail_price), count(user_id) from user_cart join products where user_id = 1 and user_cart.product_id = products.product_id 
    //   connection.query(`SELECT username FROM users WHERE user_id = ${req.user_id}`, function (error, user_results, fields) { 
    //     username = user_results[0].username;

    //    res.render('index.ejs', {results: results, images: images, username: username});

    //   }
    //   )
    // }
    if(req.user_id){     // select sum(amount*retail_price), count(user_id) from user_cart join products where user_id = 1 and user_cart.product_id = products.product_id 
      connection.query(`call ecommerce.user_data(${req.user_id})`, function (error, _results, fields) {
        if (error) throw error;
        var user_results = {username: _results[0][0].username
          , total_price: _results[1][0].total_price, no_of_items: _results[1][0].no_of_items
         }
         console.log('total price ', user_results.total_price)
         res.render('index.ejs', {results: results, images: images, username: user_results.username, total_price: user_results.total_price, no_of_items: user_results.no_of_items});

       // res.send(results);
      
      })
    }
   else{
     res.render('index.ejs', {results: results, images: images, username: 'guest', total_price: undefined, no_of_items: undefined});
   }
     // console.log('The solution is: ', results[1]);
   });
     
   }

   function getUrlArray(imgURLs){   // GIVEN URLs STRING,  RETURN URL ARRAY
    var mySubString = imgURLs.substring(
      imgURLs.lastIndexOf("[") + 1, 
      imgURLs.lastIndexOf("]")
    );
    
    return mySubString.split(',');
  }

   module.exports = {home};