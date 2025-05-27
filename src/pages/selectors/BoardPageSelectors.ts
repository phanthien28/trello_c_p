import {expect, type Locator, type Page} from '@playwright/test';

export class BoardPage{
    readonly page: Page;
    readonly addList: Locator;

    constructor(page: Page){
        this.page = page;
        this.addList = page.locator("//button[@data-testid='list-composer-button' and text() = 'Add a list']");
    }
}