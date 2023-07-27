const puppeteer = require("puppeteer");


async function GetStockValues(stockName) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://tr.tradingview.com/stock-screener/');

    const priceButton = '#js-screener-container > div > div > div.content-VHbjaC7h.sidenavOpen-VHbjaC7h > div > div.topbar-KQVHu0aW > div.container-Tv7LSjUz.wrapper-DU5j_8by > div.wrapper-Tv7LSjUz > div > div:nth-child(4) > div';
    const customButton = '#overlap-manager-root > div > span > div.menuWrap-Kq3ruQo8.menuWrap-s3N8sqvN > div > div > div.container-sm8iDJ_6.bottomContainer-sm8iDJ_6 > div:nth-child(2)';

    await page.waitForSelector(priceButton);
    await page.click(priceButton);
    await page.waitForSelector(customButton);
    await page.click(customButton);

    const selectBox = '#overlap-manager-root > div > div > div.dialog-qyCw0PaN.dialog-QKPfkzzn.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF > div > div.bodyContainer-QKPfkzzn > div.grid-IHzD6vYC > div.container-ox6PfPTY.container-VWAjBX7l > span > span';
    const itemBetween = '#id_item_between';

    await page.waitForSelector(selectBox);
    await page.click(selectBox);

    await page.waitForSelector(itemBetween);
    await page.click(itemBetween);
    await delay(500);

    const inputFrom = "#overlap-manager-root > div > div > div.dialog-qyCw0PaN.dialog-QKPfkzzn.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF > div > div.bodyContainer-QKPfkzzn > div.grid-IHzD6vYC > div:nth-child(3) > span > span.container-WDZ0PRNh.container-small-WDZ0PRNh.intent-default-WDZ0PRNh.border-thin-WDZ0PRNh.size-small-WDZ0PRNh.no-corner-top-right-WDZ0PRNh.no-corner-bottom-right-WDZ0PRNh.stretch-WDZ0PRNh.grouped-WDZ0PRNh.adjust-position-WDZ0PRNh.first-row-WDZ0PRNh.first-col-WDZ0PRNh.font-size-medium-WDZ0PRNh > span.inner-slot-W53jtLjw.inner-middle-slot-W53jtLjw > input";
    const inputTo = "#overlap-manager-root > div > div > div.dialog-qyCw0PaN.dialog-QKPfkzzn.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF > div > div.bodyContainer-QKPfkzzn > div.grid-IHzD6vYC > div:nth-child(3) > span > span.container-WDZ0PRNh.container-small-WDZ0PRNh.intent-default-WDZ0PRNh.border-thin-WDZ0PRNh.size-small-WDZ0PRNh.no-corner-top-left-WDZ0PRNh.no-corner-bottom-left-WDZ0PRNh.stretch-WDZ0PRNh.grouped-WDZ0PRNh.adjust-position-WDZ0PRNh.first-row-WDZ0PRNh.font-size-medium-WDZ0PRNh > span.inner-slot-W53jtLjw.inner-middle-slot-W53jtLjw > input";

    await page.waitForSelector(inputFrom);
    await page.type(inputFrom, "0.1");
    await page.type(inputTo, "2");

    const okButton = "#overlap-manager-root > div > div > div.dialog-qyCw0PaN.dialog-QKPfkzzn.dialog-aRAWUDhF.rounded-aRAWUDhF.shadowed-aRAWUDhF > div > div.bodyContainer-QKPfkzzn > div.grid-IHzD6vYC > div.container-ox6PfPTY.container-eBC9fl62 > button.button-D4RPB3ZC.size-small-D4RPB3ZC.color-brand-D4RPB3ZC.variant-primary-D4RPB3ZC.with-start-icon-D4RPB3ZC.icon-only-D4RPB3ZC";

    await page.waitForSelector(okButton);
    await page.click(okButton);

    await delay(500);

    const performanceButton = "#oscillators";

    await page.waitForSelector(performanceButton);
    await page.click(performanceButton);

    const searchButton = "#js-screener-container > div > div > div.content-VHbjaC7h.sidenavOpen-VHbjaC7h > div > div.tableContainer-tmg4POBa > div > div > div.wrapper-yDuvR4fK > div > table > thead > tr > th.cell-seAzPAHn.cell-fixed-RHkwFEqU.onscroll-shadow > div > div > div > button";

    await page.waitForSelector(searchButton);
    await delay(1000);
    await page.click(searchButton);
    

    const input = "#js-screener-container > div > div > div.content-VHbjaC7h.sidenavOpen-VHbjaC7h > div > div.tableContainer-tmg4POBa > div > div > div.wrapper-yDuvR4fK > div > table > thead > tr > th.cell-seAzPAHn.cell-fixed-RHkwFEqU.onscroll-shadow > div > div > span > span.inner-slot-W53jtLjw.inner-middle-slot-W53jtLjw > input";

    await page.waitForSelector(input);

    await page.type(input,stockName);

    await delay(1000);

    // console.log("Heyy");
    // await page.screenshot({path: 'full.png', fullPage: true});

    // return;


    const stockNames = await page.evaluate(()=>{
        const all = document.querySelectorAll(".tickerName-GrtoTeat");
        let list = [];
        all.forEach(element => {
            list.push(element.innerText);
        });
        return list;
    });

    const stockValues = await page.evaluate(()=>{
        const all = document.querySelectorAll("td.cell-RLhfr_y4");
        let list = [];
        all.forEach(element => {
            list.push(element.innerText);
        });
        return list;
    });

    await browser.close();

    var stockPricesSplit = new Array();

    let chunk = 11;

    for (let index = 0; index < stockValues.length / chunk; index++) {
        let arr = stockValues.slice((index * chunk), (index * chunk) + chunk);
        stockPricesSplit.push(arr);
    }

    for (let index = 0; index < stockPricesSplit.length; index++) {
        stockPricesSplit[index][0] = stockNames[index];
        stockPricesSplit[index].splice(chunk - 1,1);//Sonuncusu boş olduğu için tamamen kaldırıyoruz
    }

    return stockPricesSplit;
}


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

 

module.exports ={
    GetStockValues
}
