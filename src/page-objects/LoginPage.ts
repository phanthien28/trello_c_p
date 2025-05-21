import {expect, type Page} from '@playwright/test';
import { LoginPageSelectors } from './LoginPageSelectors';

export class LoginPage{

    private selectors: LoginPageSelectors;

    constructor(page: Page) {
        this.selectors = new LoginPageSelectors(page);
    }

    async goto(url: string) {
        await this.selectors.page.goto(url);
        await this.selectors.page.waitForLoadState('networkidle');
        await this.selectors.loginButtonHome.waitFor({ state: 'visible', timeout: 30000 });
    }

    async clickLoginHome() {
        await this.selectors.page.waitForLoadState('domcontentloaded');
        await this.selectors.page.waitForLoadState('networkidle');
        await this.selectors.loginButtonHome.waitFor({ state: 'visible' });
        await this.selectors.loginButtonHome.click();
    }

    async fillEmail(emailInput: string) {
        await expect(this.selectors.emailInput).toBeVisible();
        const valueAfterClear = await this.selectors.emailInput.inputValue();
        await expect(valueAfterClear).toBe('');
        await this.selectors.emailInput.fill(emailInput);
    }

    async clickContinue() {
        await this.selectors.continueButton.waitFor({ state: 'visible' });
        await this.selectors.continueButton.click();
    }

    async fillPassword(passwordInput: string) {
        await expect(this.selectors.passwordInput).toBeVisible();
        const valueAfterClear = await this.selectors.passwordInput.inputValue();
        await expect(valueAfterClear).toBe('');
        await this.selectors.passwordInput.fill(passwordInput);
    }

    async clickLogin() {
        await this.selectors.loginButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectors.loginButton.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.clickContinue();
        await this.fillPassword(password);
    }

    async clickGoDashboardButton() {
        await this.selectors.goDashboardButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.selectors.goDashboardButton.click();
    }
}
