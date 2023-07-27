const functions = require('@google-cloud/functions-framework');
const allStockValues = require("./all-stock-values.js");

// const example2 = require("./example2.js");
// const allStockValues = require("./all-stock-values.js");
// const sellStock = require("./sell-stock.js");
// const buyStock = require("./buy-stock.js");

// exports.RunGetAllStockValues = functions.pubsub.schedule("*/1 * * * *").onRun( async (context) =>{
//     console.log("Burası Çalışıyor");
//     let response = await allStockValues.GetAllStockValues();

//     console.log(response);



//     return null;
// })


exports.RunGetAllStockValues = async (req, res) => {
    res.send('Work Work Work Work!');
    let response = await allStockValues.GetAllStockValues();

    console.log(response);
};