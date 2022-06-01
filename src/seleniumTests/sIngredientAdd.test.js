const { Builder, By } = require('selenium-webdriver');

it('Test 4 - Add ingredient', () => {
    (async () => {
        const driver = await new Builder().forBrowser('MicrosoftEdge').build();
        try {
            await driver.get('http://localhost:3000/login');

            driver.findElement(By.id("login-username")).sendKeys("Matthew");
            driver.findElement(By.id("login-password")).sendKeys("Mateusz").then(function() {
                driver.findElement(By.className("btn-login")).click().then(function(){
                });
            });


            await driver.sleep(1000);

            driver.get('http://localhost:3000/ingredientsAdmin');
            await driver.sleep(1000);
            driver.findElement(By.className("AddIngredientBtn")).click();
            await driver.sleep(1000);
            driver.findElement(By.id("name")).sendKeys("Rice");
            driver.findElement(By.id("quantity")).sendKeys("1");
            await driver.sleep(1000);
            driver.findElement(By.id("addButtonXD2")).click();
            await driver.sleep(1000);
            driver.findElement(By.id("Filter")).sendKeys("Rice");
            await driver.sleep(1000);
            // var tmp = driver.findElement(By.className("first-column"));
            // await driver.sleep(1000);
            // expect(tmp.getText()).toBe("Rice");
            await driver.sleep(1000);
        } finally {
            await driver.quit();
        }
    })();
  });