import {expect, type Locator, type Page} from '@playwright/test';

export class HomePage{

    readonly page: Page;
    readonly createHomeButton: Locator;
    readonly createBoardButton: Locator;
    readonly createWithTemplateButton: Locator;
    readonly teamPlate: Locator;
    readonly boardTille: Locator;
    readonly createButton: Locator;
 
    readonly viewBoardButton: Locator;

    readonly deleteButton: Locator;
    readonly deleteConfirmButton: Locator;

    readonly reopenButton: Locator;
    readonly reopenConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createHomeButton = page.locator("//button[@data-testid = 'header-create-menu-button']");
        this.createBoardButton = page.locator("//button[@data-testid = 'header-create-board-button']");
        this.createWithTemplateButton = page.locator("//button[@data-testid =  'header-create-board-from-template-button']");
        this.teamPlate = page.locator("//ul/li[6]/div[@class = 'VUUgUoReMgQcjG']");
        this.boardTille = page.locator("//input[@type = 'text']");
        this.createButton = page.locator("//button[@data-testid = 'create-board-submit-button']");
        this.viewBoardButton = page.locator("//button[contains(text(), 'View all closed boards')]");
        this.deleteButton = page.locator("//ul/li[1]/div/button[@data-testid = 'close-board-delete-board-button']");
        this.deleteConfirmButton = page.locator("//button[text() = 'Delete' and @data-testid = 'close-board-delete-board-confirm-button' ]");
        this.reopenButton = page.locator("//ul//li[1]//button[@data-testid = 'workspace-chooser-trigger-button' and text() = 'Reopen']");
        this.reopenConfirmButton = page.locator("//div//button[@data-testid= 'workspace-chooser-reopen-button' and text() = 'Reopen board']");
    }

    async clickCreateHomeButton(){
        // Trong HomePage.ts, trước khi click
        await this.createHomeButton.waitFor({ state: 'hidden', timeout: 10000 }); // Thay selector cho đúng
        await this.createHomeButton.click();

        //await this.createHomeButton.click();
    }
    //template
    async clickcreateWithTemplateButton(){
        await this.createWithTemplateButton.click();
    }
    //template
    async clicktemPlate(){
        await this.teamPlate.click();
    }

    async clickCreateBoardButton(){
        await this.createBoardButton.click();
    }

    async fillBoardTitle(boardTitle: string){
        await this.boardTille.fill(boardTitle);
    }

    async clickCreateButton(){
        await this.createButton.click();
    }

    //create board
    
    async createBoard(boardTitle: string) {
        await this.clickCreateHomeButton();
        await this.clickCreateBoardButton();
        await this.fillBoardTitle(boardTitle);
        await this.page.waitForTimeout(2000); 
    }

     //create board from template
    async createBoardFromTemplate(){
        await this.clickCreateHomeButton();
        await this.clickcreateWithTemplateButton();
        await this.clicktemPlate();
        await this.page.waitForTimeout(2000);
    }

    async deleteBoard(){
        await expect(this.viewBoardButton).toBeVisible();
        await this.viewBoardButton.click();

        await expect(this.deleteButton).toBeVisible();
        await expect(this.deleteButton).toBeEnabled();
        await this.deleteButton.click();

        await expect(this.deleteConfirmButton).toBeVisible();
        await expect(this.deleteConfirmButton).toBeEnabled();
        await this.deleteConfirmButton.click();
    }

    // async reopenBoard(){
    //     await expect(this.viewBoardButton).toBeVisible();
    //     await this.viewBoardButton.click();
        
    //     await expect(this.reopenButton).toBeVisible();
    //     await expect(this.reopenButton).toBeEnabled();
    //     await this.reopenButton.click();

    //     await expect(this.reopenConfirmButton).toBeVisible();
    //     await expect(this.reopenConfirmButton).toBeEnabled();
    //     await this.reopenConfirmButton.click();

    // }

    async reopenBoard(){
        await expect(this.viewBoardButton).toBeVisible();
        await this.viewBoardButton.click();
        await this.page.waitForTimeout(1000);
        
        // Kiểm tra sự tồn tại của board đã đóng
        const hasClosedBoard = await this.reopenButton.isVisible().catch(() => false); // Trả về false nếu không tìm thấy element
        
        if (hasClosedBoard) {
            
            await expect(this.reopenButton).toBeEnabled();
            await this.reopenButton.click();
    
            await expect(this.reopenConfirmButton).toBeVisible();
            await expect(this.reopenConfirmButton).toBeEnabled();
            await this.reopenConfirmButton.click();
            
            return true;
        } else {
            console.log("No boards have been closed");
            return false; 
        }
    }
}