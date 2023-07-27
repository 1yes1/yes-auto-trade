
const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_KEY_ID,
    secretKey: process.env.ALPACA_SECRET_KEY,
    paper: true,
})

async function ClosePosition(stockName){

    const order = await alpaca.closePosition(stockName);

    console.log(order);
}

async function CloseAllPositions(){

    const order = await alpaca.closeAllPositions();
}

async function CancelAllOrders(){
    const order = await alpaca.cancelAllOrders();
}


module.exports ={
    ClosePosition,
    CloseAllPositions,
    CancelAllOrders
}