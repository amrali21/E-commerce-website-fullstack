'use strict';

/**
 * PayPal SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 * PayPal HTTP client dependency
 */
const payPalClient = require('./Common/payPalClient');
   
/**
 * Setting up the JSON request body for creating the Order. The Intent in the
 * request body should be set as "CAPTURE" for capture intent flow.
 * 
 */
function buildRequestBody(purchaseUnits) {
    return {
        "intent": "CAPTURE",
        "application_context": {
            "return_url": "http://localhost:3000/execute_payment",
            "cancel_url": "http://localhost:3000/product_summary",
            "brand_name": "EXAMPLE INC",
            "locale": "en-US",
            "landing_page": "BILLING",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "CONTINUE"
        },
        "purchase_units": purchaseUnits
    };
}

/**
 * This is the sample function which can be sued to create an order. It uses the
 * JSON body returned by buildRequestBody() to create an new Order.
 */
async function createOrder(debug=false, purchaseUnits) {
    try {
        console.log("purchase units and calling inside try/catch: " , purchaseUnits)
        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.headers["prefer"] = "return=representation";
        request.requestBody(buildRequestBody(purchaseUnits));
        const response = await payPalClient.client().execute(request);
        if (debug){
            console.log("Status Code: " + response.statusCode);
            console.log("Status: " + response.result.status);
            console.log("Order ID: " + response.result.id);
            console.log("Intent: " + response.result.intent);
            console.log("Links: ");
            response.result.links.forEach((item, index) => {
                let rel = item.rel;
                let href = item.href;
                let method = item.method;
                let message = `\t${rel}: ${href}\tCall Type: ${method}`;
                console.log(message);
            });
            console.log(`Gross Amount: ${response.result.purchase_units[0].amount.currency_code} ${response.result.purchase_units[0].amount.value}`);
            // To toggle print the whole body comment/uncomment the below line
             console.log(JSON.stringify(response.result, null, 4));
        }
        console.log(response); // 3MR ADDED THIS MANUALLY
        return response;
    }
    catch (e) {
        console.log(e)
    }

}

/**
 * This is the driver function which invokes the createOrder function to create
 * an sample order.
 */
if (require.main === module){    // what does it do?
    (async() => await createOrder(true))();
}

/**
 * Exports the Create Order function. If needed this can be invoked from the
 * order modules to execute the end to flow like create order, retrieve, capture
 * and refund(Optional)
 */

module.exports = {createOrder:createOrder};