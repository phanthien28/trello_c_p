import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/actions/LoginPage';

let loginPage: LoginPage;

Given('user navigates to the application {string}', async function(url: string){
    loginPage = new LoginPage(this.page)
    await loginPage.goto(url);
});

Given('user click login home button', async function () {
    await loginPage.clickLoginHome();
})

When('user enter email {string} and password {string}', async function(email: string, password: string){
    await loginPage.login(email, password)
});   

When('user enter email {string}', async function(email: string) {
    await loginPage.fillEmail(email);
});

When('user click continue button', async function() {
    await loginPage.clickContinue();
});

When ('user click login button', async function(){
    await loginPage.clickLogin();
});

Then('user redirects dashboard', async function(){
    await this.page.waitForURL('**/boards', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/boards/);
});

Then('system display error message', async function() {
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
});

Then('display alert', async function() {
    const alertMessage = await loginPage.getAlertMessage();
    await expect(alertMessage).toBeVisible();
});

Then('display input password', async function() {
    const passwordInput = await loginPage.getPasswordInput();
    await expect(passwordInput).toBeVisible();
});

Then('display alert1', async function() {
    const alertMessage = await loginPage.getAlertMessage();
    await expect(alertMessage).toBeVisible();
});

Then('redirects sign up page', async function() {
    const signUpMessage = await loginPage.getSignUpMessage();
    await expect(signUpMessage).toBeVisible();
});

