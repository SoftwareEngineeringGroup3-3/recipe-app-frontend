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
                        expect("http://localhost:3000/login").toEqual(url).then(function(){
                            driver.get('http://localhost:3000/ingredientAdmin');
                            driver.findElement(By.id("addButtonXD")).click().then(function(){
                                var tmp = Math.random();
                                driver.findElement(By.id("quantity")).sendKeys("1");
                                driver.findElement(By.id("name")).sendKeys(tmp.toString()).then(function(){
                                    driver.findElement(By.id("addButtonXD2")).click().then(function(){
                                        driver.get('http://localhost:3000/ingredientAdmin').then(function(){
                                            var tmp2 = driver.findElement(By.className("first-column")).getCssValue("textContent");
            
                                            expect(tmp).toEqual(tmp2);
                                        });
                                    });
                                });
                            });
                        });
                });
            });
            });

            await driver.sleep(5000);
 
        } finally {
            await driver.quit();
        }
    })();
  });