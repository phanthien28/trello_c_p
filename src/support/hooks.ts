import {BeforeAll, AfterAll, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, firefox, webkit, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { Authentication } from '../support/authentication';
import * as dotenv from 'dotenv';


dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let auth: Authentication;

setDefaultTimeout(60000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: ['--start-maximized'],
    });
});


AfterAll(async function(){
    await browser.close();
});

Before(async function() {
    context = await browser.newContext({
        viewport: null,
    });
    const page = await context.newPage();
    
    this.context = context;
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.auth = new Authentication(page);
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

Before('@requireLogin', async function(){
    const email = process.env.EMAIL;
    const password =  process.env.PASSWORD; 
    if (!email || !password) {
        throw new Error('EMAIL or PASSWORD not defined in file .env');
      }
    await this.auth.login(email, password);
});

