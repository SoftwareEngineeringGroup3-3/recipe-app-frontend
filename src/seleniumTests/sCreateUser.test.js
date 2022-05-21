const { Builder, By } = require('selenium-webdriver');

it('Test 3 - Create a User', () => {
    (async () => {
        const driver = await new Builder().forBrowser('MicrosoftEdge').build();
        try {
            await driver.get('http://localhost:3000/login');

            driver.findElement(By.className("switcher-signup")).click().then(function() {
                driver.findElement(By.id("signup-username")).sendKeys("SeleniumUser1");
                driver.findElement(By.id("signup-email")).sendKeys("User1@gmail.com");
                driver.findElement(By.id("signup-password")).sendKeys("1234567");
                driver.findElement(By.id("signup-password-confirm")).sendKeys("1234567").then(function(){
                    driver.findElement(By.className("btn-signup")).click().then(function(){
                        var userEmpty = driver.findElement(By.id("login-username")).getAttribute("value");
                        var pssEmpty = driver.findElement(By.id("login-password")).getAttribute("value").then(()=>{
                            expect("").toEqual(userEmpty.getAttribute("value"));
                            expect("").toEqual(pssEmpty.getAttribute("value"));
                            driver.getCurrentUrl().then(function(url) {
                                expect("http://localhost:3000/login").toEqual(url);
                        });
                    });
                });
            });
        });
        await driver.sleep(15000);
        } finally {
            await driver.quit();
        }
    })();
  });