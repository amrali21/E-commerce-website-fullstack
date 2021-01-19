const connection = require('../database/db_connection')




const product_details =  (req, res) => {
  

    var product_id = req.params.product_id;
   
  connection.query(`SELECT product_name, retail_price, description, image FROM products WHERE product_id = "${product_id}"`, function (error, results, fields) {
    if (error) {
      console.log("we got an errror");
      throw error;
    }
    
  // QUERY result:
    var name = results[0].product_name; price = results[0].retail_price; description= results[0].description; images = results[0].image;
   
  
    // images string TO image array
   var imagesArr = getUrlArray(images)
  for(var i =0; i < imagesArr.length; i++){           
    imagesArr[i] = imagesArr[i].split('"')[1]    // gets the string between double quotations.
  }
  
  
    res.render('product_details.ejs', {name: name, price: price, descrition: description, images: imagesArr, product_id: product_id} )
  
  });
   
    }

    function getUrlArray(imgURLs){   // GIVEN URLs STRING,  RETURN URL ARRAY
        var mySubString = imgURLs.substring(
          imgURLs.lastIndexOf("[") + 1, 
          imgURLs.lastIndexOf("]")
        );
        
        return mySubString.split(',');
      }
    

    module.exports = {
        
        product_details
    }

