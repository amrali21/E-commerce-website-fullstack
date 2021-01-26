
const queries = require('../database/queries');
const home2 = (req, res) =>{

  (async function(){
    

    let home_data = await queries.home_data();

    if(req.user_id){
      let user_data = await queries.user_data(req.user_id)
      res.render('index.ejs', {results: home_data.results, images: home_data.images, username: user_data.username, total_price: user_data.total_price, no_of_items: user_data.no_of_items})
    }
    else {
      res.render('index.ejs', {results: home_data.results, images: home_data.images, username: 'guest', total_price: undefined, no_of_items: undefined})
    }
    
  })();

}




 
   module.exports = {home2};