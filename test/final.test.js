'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chromium');


describe('Final test', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('C:\\Users\\Publik lap002\\vezbanje\\Cas22\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });
    
    after(function() {
        return driver.quit();
    });

    it('User registration', async function() {
        await driver.get('http://test.qa.rs/');

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');
        
        const registrationButton = await driver.findElement(By.linkText('Register'));
        await registrationButton.click();

        expect (await driver.getCurrentUrl()).to.eq('http://test.qa.rs/register');

        const fillFirstName = "Natalia";
        const fillLastName = "Raskolnikova";
        const fillEmail = "natalia@test.org";
        const fillUserName = "nataliaaa";
        const fillPassword = "nataliaaa";
        const fillConfirmPassword = "nataliaaa";

        const firstName = await driver.findElement(By.name('firstname'));
        firstName.sendKeys (fillFirstName);

        const lastName = await driver.findElement(By.name('lastname'));
        lastName.sendKeys(fillLastName);

        const email = await driver.findElement(By.name('email'));
        email.sendKeys(fillEmail);

        const userName = await driver.findElement(By.name('username'));
        userName.sendKeys(fillUserName);

        const password = await driver.findElement(By.name('password'));
        password.sendKeys(fillPassword);

        const confirmPassword = await driver.findElement(By.name('passwordAgain'));
        confirmPassword.sendKeys(fillConfirmPassword);

        const registerButton = await driver.findElement(By.name('register'));
        await registerButton.click();
        
        expect(await driver.findElement(By.className('alert alert-success')).getText()).to.contain('Success');
    });


    it ('User login', async function(){
        const loginButton = await driver.findElement(By.partialLinkText('Login'));
        await loginButton.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Login');

        const userNameLogin = await driver.findElement(By.name('username'));
        userNameLogin.sendKeys('nataliaaa');

        const passwordLogin = await driver.findElement(By.name('password'));
        passwordLogin.sendKeys('nataliaaa');

        const loginButtonLogin = await driver.findElement(By.name('login'));
        await loginButtonLogin.click();

        expect (await driver.findElement(By.css('h2')).getText()).to.contain('Welcome back');
    });

    it ('Add items in cart, order, checkout and verify', async function(){
        const burger = await driver.findElement(By.xpath('//h3[contains(text(), "Burger")]/ancestor::div[2]'));
        const orderButton = await burger.findElement(By.className('btn btn-success'));
        await orderButton.click();

        expect (await driver.getCurrentUrl()).to.eq('http://test.qa.rs/order');

        const continueShop = await driver.findElement(By.linkText('Continue shopping'));
        await continueShop.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');

        const doubleBurger = await driver.findElement(By.xpath('//h3[contains(text(), "Double burger")]/ancestor::div[2]'));
        const orderDoubleBurger = await doubleBurger.findElement(By.className('btn btn-success'));
        await orderDoubleBurger.click();

        expect (await driver.getCurrentUrl()).to.eq('http://test.qa.rs/order');

        const continueShopAgain = await driver.findElement(By.linkText('Continue shopping'));
        await continueShopAgain.click();

        const megaBurger = await driver.findElement(By.xpath('//h3[contains(., "Mega burger")]/ancestor::div[2]'));
        const orderMegaBurger = await megaBurger.findElement(By.className('btn btn-success'));
        await orderMegaBurger.click();

        expect (await driver.getCurrentUrl()).to.eq('http://test.qa.rs/order');

        const checkoutButton = await driver.findElement(By.className('btn btn-primary'));
        await checkoutButton.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Order');

        const orderTable = await driver.findElement(By.css('table'));
        const priceOne = await orderTable.findElement(By.xpath('//td[contains(., "6.99")][2]'));
        const priceTwo = await orderTable.findElement(By.xpath('//td[contains(., "9.99")][2]'));
        const priceThree = await orderTable.findElement(By.xpath('//td[contains(., "13.99")][2]'));
        const priceTotal = await orderTable.findElement(By.xpath('//tr[contains(., "30")]'));

        const priceBurger = Number((await priceOne.getText()).substring(1));
        const priceDoubleBurger = Number((await priceTwo.getText()).substring(1));
        const priceMegaBurger = Number((await priceThree.getText()).substring(1));
        const priceTotalBurger = Number((await priceTotal.getText()).substring(1));
    

        const calculatedTotal = priceBurger + priceDoubleBurger + priceMegaBurger;

        expect(calculatedTotal).to.be.eq(priceTotalBurger)
    });

    it ('Performs logout', async function(){
        const logout = await driver.findElement(By.partialLinkText('Logout Natalia'));
        await logout.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');

    });
})
