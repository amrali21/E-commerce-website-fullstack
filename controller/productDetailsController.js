const connection = require('../database/db_connection')
const queries = require('../database/queries');


const product_details2 = (req, res) => {

  (async function(){   var product_id = req.params.product_id;

    let product_data = await queries.product_data(product_id)
  
    if(req.user_id){
      let user_data = await queries.user_data(req.user_id)
      res.render('product_details.ejs', {name: product_data.name, price: product_data.price, descrition: product_data.description, images: product_data.images, product_id: product_data.product_id, username: user_data.username, total_price: user_data.total_price, no_of_items: user_data.no_of_items})
    }
    else{
      res.render('product_details.ejs',  {name: product_data.name, price: product_data.price, descrition: product_data.description, images: product_data.images, product_id: product_data.product_id, username: 'guest', total_price: undefined, no_of_items: undefined})
    } })();

}



 
    

    module.exports = {
        
         product_details2
    }

