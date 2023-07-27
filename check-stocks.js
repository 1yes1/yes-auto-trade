const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_KEY_ID,
    secretKey: process.env.ALPACA_SECRET_KEY,
    paper: true,
})


async function GetSellStockPrice(stockName){
    
    const trades = await alpaca.getLatestQuote(stockName);

    console.log(trades);
}


GetSellStockPrice("AAPL");