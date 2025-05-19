import {BeforeAll, AfterAll, Before, After, setDefaultTimeout} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, firefox, webkit, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { Authentication } from '../support/authentication';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

let browser: Browser;
let context: BrowserContext;
let page: Page;
let auth: Authentication;
let isLoggedIn = false;

const storageStatePath = path.join(__dirname, '..', 'storage-state.json');

setDefaultTimeout(60000);

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: false,
        args: ['--window-size=1920,1080','--start-maximized'],
    });
});

Before({ tags: '@home' }, async function() {
    try {
        if (!isLoggedIn) {
            context = await browser.newContext({
                viewport: null,
            });
            page = await context.newPage();
            this.context = context;
            this.page = page;
            this.loginPage = new LoginPage(page);
            this.auth = new Authentication(page);

            // Điều hướng đến trang Trello trước khi đăng nhập
            await page.goto('https://trello.com');
            await this.auth.login(process.env.EMAIL!, process.env.PASSWORD!);
            await context.storageState({ path: storageStatePath });
            isLoggedIn = true;
        } else {
            context = await browser.newContext({
                storageState: storageStatePath,
                viewport: null
            });
            page = await context.newPage();
            this.context = context;
            this.page = page;

            // Điều hướng đến trang home sau khi tái sử dụng session
            await page.goto('https://trello.com/home');
        }

        // Đợi trang load hoàn tất
        await page.waitForLoadState('networkidle');
    } catch (error) {
        console.error('Error in @home hook:', error);
        throw error;
    }
});

Before({ tags: '@login' }, async function() {
    context = await browser.newContext({
        viewport: null,
    });
    page = await context.newPage();
    this.context = context;
    this.page = page;
    this.loginPage = new LoginPage(page);
});

After(async function() {
    await context.close();
});

AfterAll(async function(){
    isLoggedIn = false;
    await browser.close();
    // Xóa file storage state sau khi hoàn thành tất cả test
    if (fs.existsSync(storageStatePath)) {
        fs.unlinkSync(storageStatePath);
    }
});


