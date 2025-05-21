import {expect, type Page} from '@playwright/test';
import { HomePageSelectors } from './HomePageSelectors';

export class HomePage {
    private selectors: HomePageSelectors;

    constructor(page: Page) {
        this.selectors = new HomePageSelectors(page);
    }

    async clickCreateHomeButton() {
        await this.selectors.page.waitForLoadState('networkidle');
        await this.selectors.createHomeButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectors.createHomeButton.click();
    }
    
    async clickCreateWithTemplateButton() {
        await this.selectors.createWithTemplateButton.waitFor({ state: 'visible' });
        await this.selectors.createWithTemplateButton.click();
    }

    async clickTemplate() {
        await this.selectors.temPlate.waitFor({ state: 'visible' });
        await this.selectors.temPlate.click();
    }

    async clickCreateBoardButton() {
        await this.selectors.createBoardButton.waitFor({ state: 'visible' });
        await this.selectors.createBoardButton.click();
    }

    async fillBoardTitle(boardTitle: string) {
        await this.selectors.boardTitle.waitFor({ state: 'visible' });
        await this.selectors.boardTitle.fill(boardTitle);
    }

    async clickCreateButton() {
        await this.selectors.createButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectors.createButton.click();
    }
    
    async createBoard(boardTitle: string) {
        try {
            await this.clickCreateHomeButton();
            await this.clickCreateBoardButton();
            await this.fillBoardTitle(boardTitle);
            await this.clickCreateButton();
            await this.selectors.page.waitForTimeout(2000);
        } catch (error) {
            throw new Error(`Failed to create board: ${error}`);
        }
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

    async deleteBoard() {
        try {
            await expect(this.selectors.viewBoardButton).toBeVisible();
            await this.selectors.viewBoardButton.click();

            await expect(this.selectors.deleteButton).toBeVisible();
            await expect(this.selectors.deleteButton).toBeEnabled();
            await this.selectors.deleteButton.click();

            await expect(this.selectors.deleteConfirmButton).toBeVisible();
            await expect(this.selectors.deleteConfirmButton).toBeEnabled();
            await this.selectors.deleteConfirmButton.click();
        } catch (error) {
            throw new Error(`Failed to delete board: ${error}`);
        }
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
}