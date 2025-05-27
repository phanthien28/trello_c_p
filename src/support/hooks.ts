import {BeforeAll, AfterAll, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import { LoginPage } from '../pages/actions/LoginPage';
import { HomePage } from '../pages/actions/HomePage';
import { Authentication } from '../support/authentication';
import * as dotenv from 'dotenv';
import * as fs from 'fs';


dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let isLoggedIn = false;
let isFirstRun = true;

setDefaultTimeout(60000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false,
        args: ['--window-size=1920,1080','--start-maximized'],
    });
});

Before({tags: '@login'}, async function() {
    try {
        context = await browser.newContext({
            viewport: null
        });
        page = await context.newPage();
        
        this.context = context;
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.auth = new Authentication(page, context);
    } catch (error) {
        console.error('Error in @login hook:', error);
        throw error;
    }
});

Before({tags: '@home'}, async function() {
    try {
        if (isFirstRun) {
            // First run - perform login and save state
            context = await browser.newContext({
                viewport: null
            });
            
            page = await context.newPage();
            await page.setViewportSize({ width: 1920, height: 1080 });
            
            this.context = context;
            this.page = page;
            this.loginPage = new LoginPage(page);
            this.homePage = new HomePage(page);
            this.auth = new Authentication(page, context);

            // Login and save state
            await page.goto(process.env.BASE_URL!);
            await this.auth.login(process.env.EMAIL!, process.env.PASSWORD!);
            await page.waitForLoadState('networkidle');
            
            // Save state after successful login
            await context.storageState({ path: 'auth.json' });
            isFirstRun = false;

        } else {
            // Subsequent runs - reuse saved state
            try {
                context = await browser.newContext({
                    viewport: { width: 1920, height: 1080 },
                    storageState: 'auth.json'
                });
                
                page = await context.newPage();
                await page.goto(process.env.BASE_URL!);
                await page.waitForLoadState('networkidle');
                
                this.context = context;
                this.page = page;
                this.loginPage = new LoginPage(page);
                this.homePage = new HomePage(page);
                this.auth = new Authentication(page, context);
                
            } catch (error) {
                console.error('Failed to restore auth state:', error);
                // Fallback to fresh login if restore fails
                isFirstRun = true;
                throw error;
            }
        }
    } catch (error) {
        console.error('Error in @home hook:', error);
        throw error;
    }
});

After(async function() {
    if (this.page) {
        const client = await this.page.context().newCDPSession(this.page);
        await Promise.all([
            client.send('Network.clearBrowserCache'),
            client.send('Network.clearBrowserCookies')
        ]);
        await this.page.close();
    }
    
    if (this.context) {
        await this.context.clearCookies();
        await this.context.close();
    }
});

AfterAll(async function() {
    await browser.close();
});