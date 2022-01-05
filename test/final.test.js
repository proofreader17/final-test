'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('QA Fast Food test', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('N:\\TEST\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens http://test.qa.rs/ homepage', async function() {
        await driver.get('http://test.qa.rs/');

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/');
    });

    it('Open registration page', async function() {
        const register = await driver.findElement(By.linkText('register'));
        await register.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/register');
    });

    it('Successfully performs registration', async function() {
        const FirstName = await driver.findElement(By.name('firstname'));
        FirstName.sendKeys('Nemanja');

        const LastName = await driver.findElement(By.name('lastname'));
        LastName.sendKeys('Pilipovic');

        const email = await driver.findElement(By.name('email'));
        email.sendKeys('pili@microsoft.com');

        const username = await driver.findElement(By.name('username'));
        username.sendKeys('flyingsamir');

        const password = await driver.findElement(By.name('password'));
        password.sendKeys('samir123');

        const passwordagain = await driver.findElement(By.name('passwordAgain'));
        passwordagain.sendKeys('samir123');

        const registracija = await driver.findElement(By.name('register'));
        await registracija.click();

        expect(await driver.findElement(By.className('alert alert-success')).getText()).to.contain('Success!');
    });

    it('Open Login page', async function() {
        const login = await driver.findElement(By.linkText('login'))
        await login.click();

        expect(await driver.getCurrentUrl()).to.eq('http://test.qa.rs/login');
    });

    it('Successfully performs login', async function() {
        const username1 = await driver.findElement(By.name('username'));
        username1.sendKeys('flyingsamir');

        const password1 = await driver.findElement(By.name('password'));
        password1.sendKeys('samir123');

        const login1 = await driver.findElement(By.name('login'));
        await login1.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Welcome back');
    });

    it('Adds item to cart and checkout', async function() {
        const ProductName = await driver.findElement(By.xpath('//h3[contains(text(), "Burger")]/ancestor::div[contains(@class, "panel-heading")]'));
        const quantity = await ProductName.findElement(By.name('quantity'));
        const options = await quantity.findElements(By.css('side'));

        await Promise.all(options.map(async function(option) {
            const text = await option.getText();
            if (text === '3') {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                expect(selectedValue).to.contain('3');
                                              
                const orderButton = await ProductName.findElement(By.name('Burger'));
                await orderButton.click();

                const url = await driver.getCurrentUrl();
                expect(url).to.contain('http://test.qa.rs/order');                
                        
                const checkout = await driver.findElement(By.name('checkout'));
                await checkout.click();
        
                expect(await driver.findElement(By.css('h2')).getText()).to.contain('(Order #');
            });
        
            it('Performs logout', async function() {
                const logout1 = await driver.findElement(By.partialLinkText('logout'));
                await logout1.click();
        
                expect(await driver.findElement(By.linkText('login')).isDisplayed()).to.be.true;
            });
        });
        