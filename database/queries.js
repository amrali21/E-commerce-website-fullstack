const connection = require('./db_connection')



let home_data = function(){
  
   return new Promise((resolve, reject) => {

    connection.query('SELECT * FROM products limit 30', function (error, results, fields) {
        if (error) reject(error);
      
        var images = [];
        for(var x = 0; x < results.length; x++){
          let arr = getUrlArray(results[x].image)[0] // get first image only
          let test = arr.split('"')[1];
          images.push(test);
          
        }
        resolve({results: results, images: images});
    })

})
}

// how to pass user_id to promise
let user_data = function(user_id){
  
  return new Promise((resolve, reject) => {
    connection.query(`call ecommerce.user_data(${user_id})`, function (error, _results, fields) {
        if (error) reject(error);
        var user_results = {username: _results[0][0].username
          , total_price: _results[1][0].total_price, no_of_items: _results[1][0].no_of_items
         }
         
         resolve({username: user_results.username, total_price: user_results.total_price, no_of_items: user_results.no_of_items})
      
      })
})
}

let product_data = function(product_id){

  return new Promise((resolve, reject) => {
    connection.query(`SELECT product_name, retail_price, description, image FROM products WHERE product_id = "${product_id}"`, function (error, results, fields) {
      if (error) {
        console.log("we got an errror");
        reject(error);
      }
      
      var name = results[0].product_name; price = results[0].retail_price; description= results[0].description; images = results[0].image;
     
    
      // images string TO image array
     var imagesArr = getUrlArray(images)
    for(var i =0; i < imagesArr.length; i++){           
      imagesArr[i] = imagesArr[i].split('"')[1]    // gets the string between double quotations.
    }
    
    resolve({name: name, price: price, descrition: description, images: imagesArr, product_id: product_id})
    
    
    });
  })

}

let product_summary_data = function(user_id){
  return new Promise((resolve, reject) =>  {
    var my_query = `select product_name, retail_price, amount, (amount*retail_price) as total_price, image  from user_cart join products on user_id = ${user_id} && user_cart.product_id = products.product_id`
    connection.query(my_query, function (error, results, fields) {
      if (error) {
        console.log("we got an errror");
        reject(error);
      }

      var images = [];
      for(var x = 0; x < results.length; x++){
        let arr = getUrlArray(results[x].image)[0] // get first image only
        let test = arr.split('"')[1];
        results[x].image = test;
        
      }
      
        resolve({results: results})
  })
  })
}

let add_to_cart = function(user_id, product_id, amount){
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO user_cart (user_id, product_id, amount) VALUES (${user_id}, ${product_id}, ${amount})`, function (error, results, fields) {
      if (error) {
        console.log("we got an errror");
         reject(error);
      }
      resolve();
}
)
  })
}

function getUrlArray(imgURLs){   // GIVEN URLs STRING,  RETURN URL ARRAY
    var mySubString = imgURLs.substring(
      imgURLs.lastIndexOf("[") + 1, 
      imgURLs.lastIndexOf("]")
    );
    
    return mySubString.split(',');
  }

  

module.exports = {home_data, user_data, product_data, product_summary_data, add_to_cart}
