const connection = require('../../database/db_connection')

const createOrder = require('./paypal_api/createOrder').createOrder;
//const captureOrder = require('./paypal_api/captureOrder').captureOrder;


const checkout =  (req, res) => {
  
    // connection.connect();
    user_id = req.user_id;    // select total price, items: (price, name, quantity)
    connection.query(`select product_name, retail_price, amount, retail_price*amount AS total_price from user_cart, products where user_id = ${user_id} && user_cart.product_id = products.product_id`, function (error, results, fields) {
        if (error) {
          console.log("we got an errror");
          throw error;
        }

         // push cart data to array and send it to paypal api which redirects the user to PAYPAL website to pay.           
       
         if(results.length > 0){

            // calculate total price:
            var total_price=0;
            results.forEach(element => {
              total_price += element.total_price;
            });
            console.log(total_price);

            // the var we'll send to paypal to charge user
            var paypal_data =  [ // we should pass this instead of purchaseUnits but we get an error.
              {
                  "amount": {
                      "currency_code": "JPY",
                      "value": total_price + 40,
                      "breakdown": {
                          "item_total": {
                              "currency_code": "JPY",
                              "value": total_price
                          },
                          "shipping": {
                              "currency_code": "JPY",
                              "value": "20"
                          },
                          "handling": {
                              "currency_code": "JPY",
                              "value": "10"
                          },
                          "tax_total": {
                              "currency_code": "JPY",
                              "value": "20"
                          },
                          "shipping_discount": {
                              "currency_code": "JPY",
                              "value": "10"
                          }
                      }
                  },
                  "items": [      // I COMMENTED THINGS OUT FOR TESTING. YOU CAN UNCOMMENT OR GET ORIGINAL CODE FROM GITHUB.
                
                  ],
                  "shipping": {
                      "method": "United States Postal Service",
                      "name": {
                          "full_name":"John Doe"
                      },
                      "address": {
                          "address_line_1": "123 Townsend St",
                          "address_line_2": "Floor 6",
                          "admin_area_2": "San Francisco",
                          "admin_area_1": "CA",
                          "postal_code": "94107",
                          "country_code": "US"
                      }
                  }
              }
          ];
       

          results.forEach(element => {
            paypal_data[0].items.push(newItem(element.product_name, element.retail_price, element.amount));

          });


            // copy-paste
            async function x (res)  {

                let response = await createOrder(false, paypal_data);
                console.log("Creating Order...");
                let orderId = "";
                if (response.statusCode === 201){
                    console.log("Created Successfully");
                    orderId = response.result.id;
                    console.log("ORDER ID: " + orderId);
                    console.log("Links:");
                    response.result.links.forEach((item, index) => {
                        let rel = item.rel;
                        let href = item.href;
                        let method = item.method;
                        let message = `\t${rel}: ${href}\tCall Type: ${method}`;
        
                        if(rel === "approve"){
        
                            res.redirect(href);
                        }
        
                        console.log(message);
                    });
                }
                res.end();

            }
            x(res);

      }
        //  console.log('no results for this user.');
         // res.end();
  }
)
}

function newItem (product_name, retail_price, amount){
  return { "name": product_name,
  "description": "filler description..",
  "sku": "some sku..",
  "unit_amount": {
      "currency_code": "JPY",
      "value": retail_price
  },
  "quantity": amount
}
 


}




module.exports = {checkout};