import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";

let homePage: HomePage;

Given('user at the home page', async function () {
    homePage = new HomePage(this.page);
    await this.page.waitForURL('**/boards', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/boards/);
});

When('user click on Create button enter board tille {string}', async function(boardTitle: string) {
    await homePage.createBoard(boardTitle);
});

// When('user chooses Create Board option', async function() {
//     await homePage.clickCreateBoardButton();
// });

// When('user chooses Create Board from Template option', async function(){
//     await homePage.clickcreateWithTemplateButton();
// });

When('user click on Create button and chooses Kanban Template', async function(){
    await homePage.createBoardFromTemplate();
});

// When('user enter board tille {string}', async function(boardTitle: string) {
//     await homePage.fillBoardTitle(boardTitle);

// });

When('user click create button', async function() {
    await homePage.clickCreateButton();
    await this.page.waitForTimeout(2000);
});

When('user click View all boards closed and delete', async function(){
    await homePage.deleteBoard();
});

When('user click View all boards closed and reopen', async function(){
    await homePage.reopenBoard();
});

Then('user should see the new board "My New Board" in the list of boards', async function(){
    const newBoard = this.page.locator("//div[@data-testid = 'board-name-container']");
    await expect(newBoard).toBeVisible();
});

Then('user should see the new board from template in the list of boards', async function(){
    const newTemplateBoard = this.page.locator("//div[@data-testid = 'board-name-container']");
    await expect(newTemplateBoard).toBeVisible();
});

Then('user should see the boards deleted successfully', async function (){
    const  messageDelete = this.page.locator("//div[@class = 'a4ZvSL0pjeULBU']//span[text() = 'Board deleted.']");
    await expect(messageDelete).toBeVisible();
});

Then('user should see the boards reopened successfully', async function(){
    const messageReopen = this.page.locator("");
    await expect(messageReopen).toBeVisible();
});
