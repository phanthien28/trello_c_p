import {BeforeAll, AfterAll, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
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
        headless: true,
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

After(async function(){
    // Clear all cookies
    await this.context.clearCookies();
    
    // Clear browser cache
    const client = await this.page.context().newCDPSession(this.page);
    await client.send('Network.clearBrowserCache');
    await client.send('Network.clearBrowserCookies');
    
    // Close page and context
    await this.page.close();
    await this.context.close();
});