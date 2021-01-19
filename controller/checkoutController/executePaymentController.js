
const captureOrder = require('./paypal_api/captureOrder').captureOrder;


const executePayment = (req,res) => {      // just feed in price to paypal and capture order.
    
    console.log("");
    console.log('Capturing Order...');

    const orderId = req.query.token;
    
    async function capture(orderId, res)  { 
        console.log("capture TESSSSSSTNGS: " + orderId); //testing
        response = await captureOrder(orderId);
    let captureId = "";
    if (response.statusCode === 201){
        res.send("Congrats! payment executed successfully")
        console.log("Captured Successfully");
        console.log("Status Code: " + response.statusCode);
        console.log("Status: " + response.result.status);
        console.log("Order ID: " + response.result.id);
        console.log("Capture Ids:");
        response.result.purchase_units.forEach((item,index)=>{
        	item.payments.captures.forEach((item, index)=>{
        		console.log("\t"+item.id);
        		captureId = item.id;
            });
        });
        console.log("Links: ");
        response.result.links.forEach((item, index) => {
            let rel = item.rel;
            let href = item.href;
            let method = item.method;
            let message = `\t${rel}: ${href}\tCall Type: ${method}`;
            console.log(message);
        });
    
    res.end();
    }

    }
    capture(orderId, res);

    
}

module.exports = {executePayment};