const queries = require('../database/queries');

const product_summary2 = (req, res) => {
  (async function(){

    
    if(req.user_id) {
      let product_summary_data = await queries.product_summary_data(req.user_id);
      let user_data = await queries.user_data(req.user_id);

      res.render('product_summary.ejs', Object.assign(product_summary_data, user_data))

    }
    else{
      res.redirect('/login')
    }
  })();

}


module.exports = {product_summary2};