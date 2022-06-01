const { Builder, By } = require('selenium-webdriver');

it('Test 1 - Open Page for 5s', () => {
    (async () => {
        const driver = await new Builder().forBrowser('MicrosoftEdge').build();
        try {
            await driver.get('http://localhost:3000/');

            driver.getTitle().then(function(title) {
                expect("React App").toEqual(title);
            });

            await driver.sleep(1000);
        } finally {
            await driver.quit();
        }
    })();
  });