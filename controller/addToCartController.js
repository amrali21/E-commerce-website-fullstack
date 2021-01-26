
const queries = require('../database/queries');



// SUBMIT A FORM (AMOUNT, PRODUCT_ID) COME FROM FRONT-END, USER_ID COMES FROM SESSION.

const add_to_cart2 = (req, res) => {
  
 var user_id = req.user_id;
 var product_id = req.body.product_id;
 var amount = req.body.amount;
 
 //console.log("asdasffffffff");
 (async function() {
  console.log('were working');
  if(user_id)     // if user is logged in
  {
  try{
    await queries.add_to_cart(user_id, product_id, amount);
    res.redirect('/product_summary')
  }
  catch(error){
    res.sendStatus(404);
  }
}
else{
  res.redirect('/login');
}

 })();

}





module.exports = {add_to_cart2};