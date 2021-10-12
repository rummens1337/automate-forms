const puppeteer = require('puppeteer');
const config = require('../config');

async function initBrowser(){
    const browser = await puppeteer.launch({ headless: true, args:['--disable-features=site-per-process']})
    return await browser.newPage();
}

async function login(page) {
    await page.goto('https://houtrak.nl/mijn-houtrak/');

    // Create a frame, because values within iFrames cannot be found by the 'page'.
    const frame = await page.frames().find(frame => frame.name() === 'egolf4u_iframe');
    await frame.type('#txt_username', config.houtrak.username);
    await frame.type('#txt_password', config.houtrak.password);
    await frame.click('#login-submit', config.houtrak.password);

    await frame.waitForNavigation();

    await page.screenshot({path: 'login.png'});
}

async function goToStartTime(page){
    // Click 'starttijden'
    await page.waitForSelector('.et_pb_row > .et_pb_column:nth-child(2) > .et_pb_module > .et_pb_text_inner > p')
    await page.click('.et_pb_row > .et_pb_column:nth-child(2) > .et_pb_module > .et_pb_text_inner > p')

    // Focus iFrame
    const handle = await page.$('#egolf4u_iframe');
    const frame = await handle.contentFrame();
    const date = await frame.$('#datum')
    await frame.$eval('#datum > input', el => el.value = '28-07-2021');
    const elementHandle = await frame.waitForXPath("//*[@id=\"teetime-list\"]/div/div/table/tbody/tr[2]/td/table/tbody/tr/td");
    await elementHandle.click();
    // await page.waitForXPath("//td[contains(., 'All Projects')]")
    // const child = await frame.$('#teetime-list > div > div > table > tbody > tr:nth-child(3)');
    // await frame.click('#teetime-list > div > div > table > tbody > tr:nth-child(3)');
    await page.screenshot({path: 'startTime.png'});


    // #teetime-list > div > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1)
}

async function registerStartTime(){
    const page = await initBrowser()
    await login(page);
    await goToStartTime(page)
    console.log("done");
    return 5;
}


module.exports = {registerStartTime};

