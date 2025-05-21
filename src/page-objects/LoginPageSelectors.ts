import { type Locator, type Page } from "@playwright/test";

export class LoginPageSelectors {

    readonly page: Page;
    readonly loginButtonHome: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly goDashboardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        //this.loginButtonHome = page.locator("//a[@data-uuid='MJFtCCgVhXrVl7v9HA7EH_login' and text() = 'Log in']");
        this.loginButtonHome = page.locator("//div[@class = 'BigNavstyles__InnerHeader-sc-1mttgq7-2 kuxyBF']//div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']//a[@class = 'Buttonsstyles__Button-sc-1jwidxo-0 kTwZBr']");
        this.emailInput = page.locator("//input[@data-testid = 'username']");
        this.continueButton = page.locator('button[id = "login-submit"]');
        this.passwordInput = page.locator('input[type = "password"]');
        this.loginButton = page.locator('#login-submit span.css-178ag6o');
        this.goDashboardButton = page.locator("//div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']/a[text() = 'Go to your boards']");
        //div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']/a[text() = 'Go to your boards']
    }
}