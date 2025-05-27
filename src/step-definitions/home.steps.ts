import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/actions/HomePage";

let homePage: HomePage;

Given('user at the home page', async function () {
    homePage = new HomePage(this.page);
    await this.page.waitForURL('**/boards', { timeout: 15000 });
    await expect(this.page).toHaveURL(/.*\/boards/);
});

When('user click on Create button enter board tille {string}', async function(boardTitle: string) {
    await homePage.createBoard(boardTitle);
});

When('user click on Create button and chooses Kanban Template', async function(){
    await homePage.createBoardFromTemplate();
});

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
    const newBoard = await homePage.getNewBoard();
    await expect(newBoard).toBeVisible();
});

Then('user should see the new board from template in the list of boards', async function(){
    const newTemplateBoard = await homePage.getNewTemplateBoard();
    await expect(newTemplateBoard).toBeVisible();
});

Then('user should see the boards deleted successfully', async function (){
    const  messageDelete = await homePage.getDeleteMessage();
    await expect(messageDelete).toBeVisible();
});

Then('user should see the boards reopened successfully', async function(){
    const reopen = await homePage.getReopenedBoard();
    await expect(reopen).toBeVisible();
});
