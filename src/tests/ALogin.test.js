const { Builder, By } = require('selenium-webdriver');

it('Test 2 - Login as admin', () => {
    (async () => {
        const driver = await new Builder().forBrowser('MicrosoftEdge').build();
        try {
            await driver.get('http://localhost:3000/login');

            driver.findElement(By.id("login-username")).sendKeys("Matthew");
            driver.findElement(By.id("login-password")).sendKeys("Mateusz").then(function() {
                driver.findElement(By.className("btn-login")).click().then(function(){
                    driver.getCurrentUrl().then(function(url) {
                        expect("http://localhost:3000/login").toEqual(url);
                });
            });
            });

            await driver.sleep(5000);
        } finally {
            await driver.quit();
        }
    })();
  });