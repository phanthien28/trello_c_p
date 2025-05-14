import {expect, type Locator, type Page} from '@playwright/test';

export class LoginPage{

    readonly page: Page;
    readonly loginButtonHome: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly goDashboardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButtonHome = page.locator("//a[@data-uuid='MJFtCCgVhXrVl7v9HA7EH_login' and text() = 'Log in']");
        this.emailInput = page.locator("//input[@data-testid = 'username']");
        this.continueButton = page.locator('button[id = "login-submit"]');
        this.passwordInput = page.locator('input[type = "password"]');
        this.loginButton = page.locator('#login-submit span.css-178ag6o');
        this.goDashboardButton = page.locator("div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']/a[text() = 'Go to your boards']");

        //div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']/a[text() = 'Go to your boards']
    }

    async goto(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle'); // chờ network ổn định
        console.log('Navigating to URL:', url);
        await this.loginButtonHome.waitFor({ state: 'visible',timeout: 30000 });
    }

    async clickLoginHome() {
        await this.page.waitForLoadState('networkidle'); // chờ network ổn định
        await this.loginButtonHome.waitFor({ state: 'visible'});
        await this.loginButtonHome.click();
    }

    async fillEmail(emailInput:string) {
        await expect(this.emailInput).toBeVisible();
        const valueAfterClear = await this.emailInput.inputValue();
        await expect(valueAfterClear).toBe('');
        await this.emailInput.fill(emailInput);
    }

    async clickContinue() {
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
    }   

    async fillPassword(passwordInput:string) {
        await expect(this.passwordInput).toBeVisible();
        const valueAfterClear = await this.passwordInput.inputValue();
        await expect(valueAfterClear).toBe('');
        await this.passwordInput.fill(passwordInput);  
    }

    async clickLogin() {
        await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.loginButton.click();
    }

    async login(email: string, password: string){
        await this.fillEmail(email);
        await this.clickContinue();
        await this.fillPassword(password);
    }

    async clickGoDashboardButton() {
        await this.goDashboardButton.click();
    }

}
