const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_KEY_ID,
    secretKey: process.env.ALPACA_SECRET_KEY,
    paper: true,
})


async function CreateOrder(stockName,price){

    const account = await alpaca.getAccount();

    console.log("Account: "+account.buying_power);
    
    const order = await alpaca.createOrder({
        symbol:stockName,
        // qty:1,
        notional:price,
        side: "buy",
        type : "market",
        time_in_force: "day"
    })

}


// module.exports ={
//     CreateOrder
// }
