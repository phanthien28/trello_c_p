import {BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep, setDefaultTimeout, } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/actions/LoginPage';
import { HomePage } from '../pages/actions/HomePage';
import { Authentication } from '../support/authentication';
import * as dotenv from 'dotenv';


dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let auth: Authentication;
let isFirstScenario = true;
let isLoggedIn = false;

setDefaultTimeout(60000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false,
        args: ['--window-size=1920,1080','--start-maximized'],
    });
});


AfterAll(async function(){
    await browser.close();
});

Before( {tags :'@login'},async function() {
    context = await browser.newContext({
        viewport: null,
    });
    const page = await context.newPage();
    
    this.context = context;
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.auth = new Authentication(page);
});

Before({tags: '@home'}, async function() {
    try {
        context = await browser.newContext({
            viewport: null,
        });
        const page = await context.newPage();
        
        this.context = context;
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.auth = new Authentication(page);

        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        if (!email || !password) {
            throw new Error('EMAIL or PASSWORD not defined in file .env');
        }

        if (!isLoggedIn) {
            await this.auth.login(email, password, true);
            isLoggedIn = true;
        } else {
            await this.auth.login(email, password, false);
        }

    } catch (error) {
        console.error('Error in @home hook:', error);
        throw error;
    }
});

BeforeStep(async function() {
    await this.context.addCookies([{
        name: 'playwright_test_cookie',
        value: 'thien',
        domain: '.trello.com',
        path: '/',
        expires: -1,
    }]);
    console.log('Cookie added success');
});

AfterStep(async function() {
    if (this.context) {
        await this.context.deleteCookies([{
            name: 'playwright_test_cookie',
            domain: '.trello.com',
            path: '/'
        }]);
    }
});

// After(async function(){
//     // Clear all cookies
//     await this.context.clearCookies();
    
//     // Clear browser cache
//     const client = await this.page.context().newCDPSession(this.page);
//     await client.send('Network.clearBrowserCache');
//     await client.send('Network.clearBrowserCookies');
    
//     // Close page and context
//     await this.page.close();
//     await this.context.close();
// });

After(async function(){
    if (this.context) {
        await this.context.clearCookies();
    }
    
    if (this.page) {
        // Clear browser cache using CDP
        const client = await this.page.context().newCDPSession(this.page);
        await Promise.all([
            client.send('Network.clearBrowserCache'),
            client.send('Network.clearBrowserCookies')
        ]);
        
        // Close page
        await this.page.close();
    }
    
    // Close context
    if (this.context) {
        await this.context.close(); 
    }
});