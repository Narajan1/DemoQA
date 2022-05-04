const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const { WebElement } = require("selenium-webdriver");
const Math = require("mathjs");
const { WebDriver } = require("selenium-webdriver");
require("chromedriver");
var should = require('chai').should();


describe("Add new user", function () {

    let driver; 

    before('Initialize the driver', async function () {
        
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get('https://demoqa.com/text-box');
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts( { implicit: 10000 } );
    });

    after('optional description', async function () {
        await driver.quit();
    });


    it("Check Url", async function () {

        //Get currentUrl
        let currentUrl = await driver.getCurrentUrl().then(function (value) {
            return value;
        });

        //Assert url
        currentUrl.should.equal("https://demoqa.com/text-box");

    });

    it("Check outputs", async function () {

        const input_data_username = `Nara${Math.round(Math.random() * 1000)}`;
        const input_data_email = `Nara${Math.round(Math.random() * 1000)}@gmail.com`;
        const input_data_curradd = "Some text";
        

        await driver.findElement(By.css("[id='userName']"))
        .sendKeys(input_data_username);
        console.log(input_data_username);

        await driver.findElement(By.css("[id='userEmail']"))
            .sendKeys(input_data_email);

        await driver.findElement(By.css("[id='currentAddress']"))
            .sendKeys(input_data_curradd);

        const input_data_permadd = driver.findElement(By.id('permanentAddress'));

        driver.executeScript("arguments[0].scrollIntoView(true);", input_data_permadd);
        input_data_permadd.sendKeys("Some other text");

        await driver.findElement(By.id("submit")).click();

        let getUsername=await driver.findElement(By.id("name")).getText();    
        let getEmail=await driver.findElement(By.id("email")).getText();
        let getCurrAdd=await driver.findElement(By.xpath("//p[@id='currentAddress']")).getText();
        let getPermAdd=await driver.findElement(By.xpath("//p[@id='permanentAddress']")).getText();

        //Assertions
        getUsername.should.equal("Name:" + input_data_username);
        getEmail.should.equal("Email:" + input_data_email);
        getCurrAdd.should.equal("Current Address :" + input_data_curradd);
        //getPermAdd.should.equal("Permananet Address :" + input_data_permadd);
        getCurrAdd.should.to.contains(input_data_curradd, "PermAddress field");

    });
});
