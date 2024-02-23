const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        console.log("Opening the browser...");
        browser = await puppeteer.launch({
            headless: false, // si queremos entorno visual del scrapper. Poner a true sólo en desarrollo.
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance: ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};
