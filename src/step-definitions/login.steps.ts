import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

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

Then('system display error message', async function(){
    const errorMessage = this.page.getByText('Incorrect email address and / or password.');
    await expect(errorMessage).toBeVisible();
});

Then('display alert', async function(){
    await expect(this.page.locator("//div[@class=\'css-1f0jn2w\']")).toBeVisible();
});

Then('display input password', async function(){
    const input = this.page.locator("input[type = 'password']");
    await expect(input).toBeVisible();
});

Then('display alert1', async function(){
   await expect(this.page.locator("//div[@class=\'css-1f0jn2w\']")).toBeVisible();
});

Then('redirects sign up page', async function(){
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator("//div[@class = 'css-146wmq']")).toBeVisible();
});

