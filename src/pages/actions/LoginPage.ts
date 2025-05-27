import { expect, type Page } from '@playwright/test';
import { LoginPageSelectors } from '../selectors/LoginPageSelectors';
import { click, type, isVisible, waitForLoad, navigate } from '../../common/actionHelpers';

export class LoginPage {
    private selectors: LoginPageSelectors;

    constructor(page: Page) {
        this.selectors = new LoginPageSelectors(page);
    }

    async goto(url: string) {
        await navigate(this.selectors.page, url);
        await isVisible(this.selectors.loginButtonHome);
    }

    async clickLoginHome() {
        await waitForLoad(this.selectors.page);
        await click(this.selectors.loginButtonHome);
    }

    async fillEmail(emailInput: string) {
        await isVisible(this.selectors.emailInput);
        await type(this.selectors.emailInput, emailInput);
    }

    async clickContinue() {
        await click(this.selectors.continueButton);
    }

    async fillPassword(passwordInput: string) {
        await isVisible(this.selectors.passwordInput);
        await type(this.selectors.passwordInput, passwordInput);
    }

    async clickLogin() {
        await click(this.selectors.loginButton);
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.clickContinue();
        await this.fillPassword(password);
    }

    async clickGoDashboardButton() {
        await click(this.selectors.goDashboardButton);
    }

    async getErrorMessage() {
        await isVisible(this.selectors.errorMessage);
        return this.selectors.errorMessage;
    }

    async getAlertMessage() {
        await isVisible(this.selectors.alertMessage);
        return this.selectors.alertMessage;
    }

    async getPasswordInput() {
        await isVisible(this.selectors.passwordInput);
        return this.selectors.passwordInput;
    }

    async getSignUpMessage() {
        await waitForLoad(this.selectors.page);
        await isVisible(this.selectors.signUpMessage);
        return this.selectors.signUpMessage;
    }
}
