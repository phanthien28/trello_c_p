import { expect, type Page } from '@playwright/test';
import { HomePageSelectors } from '../selectors/HomePageSelectors';
import { click, isVisible, type, waitForLoad } from '../../common/actionHelpers';

export class HomePage {
    private selectors: HomePageSelectors;

    constructor(page: Page) {
        this.selectors = new HomePageSelectors(page);
    }

    async clickCreateHomeButton() {
        await waitForLoad(this.selectors.page);
        await click(this.selectors.createHomeButton);
    }
    
    async clickCreateWithTemplateButton() {
        await click(this.selectors.createWithTemplateButton);
    }

    async clickTemplate() {
        await click(this.selectors.temPlate);
    }

    async clickCreateBoardButton() {
        await click(this.selectors.createBoardButton);
    }

    async selectTemplate() {
        await click(this.selectors.selectTemplateButton);
    }

    async fillBoardTitle(boardTitle: string) {
        await type(this.selectors.boardTitle, boardTitle);
    }

    async clickCreateButton() {
        await click(this.selectors.createButton);
        await this.selectors.page.waitForTimeout(1000);
    }
    
    async createBoard(boardTitle: string) {
        try {
            await this.clickCreateHomeButton();
            await this.clickCreateBoardButton();
            await this.selectTemplate();
            await this.fillBoardTitle(boardTitle);
           // await this.clickCreateButton();
            await this.selectors.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error(`Failed to create board: ${error}`);
        }
    }

    async getNewBoard(){
        return this.selectors.newBoard;
    }

    async createBoardFromTemplate() {
        try {
            await this.clickCreateHomeButton();
            await this.clickCreateWithTemplateButton();
            await this.clickTemplate();
            await this.selectors.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error(`Failed to create board from template: ${error}`);
        }
    }

    async getNewTemplateBoard(){
        return this.selectors.newTemplateBoard;
    }

    async deleteBoard() {
        try {
            await isVisible(this.selectors.viewBoardButton);
            await click(this.selectors.viewBoardButton);

            await isVisible(this.selectors.deleteButton);
            await click(this.selectors.deleteButton);

            await isVisible(this.selectors.deleteConfirmButton);
            await click(this.selectors.deleteConfirmButton);
        } catch (error) {
            throw new Error(`Failed to delete board: ${error}`);
        }
    }

    async getDeleteMessage(){
        return this.selectors.messageDelete;
    }

    async reopenBoard() {
        try {
            await expect(this.selectors.viewBoardButton).toBeVisible();
            await this.selectors.viewBoardButton.click();
            await this.selectors.page.waitForTimeout(1000);
            
            const hasClosedBoard = await this.selectors.reopenButton.isVisible().catch(() => false);
            
            if (hasClosedBoard) {
                await expect(this.selectors.reopenButton).toBeEnabled();
                await this.selectors.reopenButton.click();
        
                await expect(this.selectors.reopenConfirmButton).toBeVisible();
                await expect(this.selectors.reopenConfirmButton).toBeEnabled();
                await this.selectors.reopenConfirmButton.click();
                
                return true;
            }
            console.log("No boards have been closed");
            return false;
        } catch (error) {
            throw new Error(`Failed to reopen board: ${error}`);
        }
    }

    async getReopenedBoard(){
        return this.selectors.reopenedBoard;
    }

    async clickGoDashboardButton() {
        await click(this.selectors.goDashboardButton);
    }

}