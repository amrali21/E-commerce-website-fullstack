'use strict';

/**
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

/**
 * Returns PayPal HTTP client instance with environment which has access
 * credentials context. This can be used invoke PayPal API's provided the
 * credentials have the access to do so.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 * Setting up and Returns PayPal SDK environment with PayPal Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be
 * LiveEnvironment.
 */
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'AfB3k3ERZZM5B4KDFXvkVm9Y40qZEfgPCal4lvjUDmLvfHS27rFkUYpKJeFY2rD2COU4vazGkTexmpcJ';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EDz3KiX0e2SF6Xe0bCUgdt8fjxeAeGRuBQKOHOKleRfl-RHxrriyOej8qWs8ijfHdfhDM4fQVgup7pQl';

    if (process.env.NODE_ENV === 'production') {
        console.log("we're live, wrong");
        return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
     }
     console.log("we're sandbox, right");
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += await prettyPrint(jsonData[key], pre + "\t");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}



module.exports = {client: client, prettyPrint:prettyPrint};