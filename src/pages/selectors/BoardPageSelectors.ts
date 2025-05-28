import {expect, type Locator, type Page} from '@playwright/test';

export class BoardPage{
    readonly page: Page;
    readonly addList: Locator;
    readonly addaCard: Locator;
    readonly titleCard: Locator;
    readonly addCardButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.addList = page.locator("//button[@data-testid='list-composer-button' and text() = 'Add a list']");
        this.addaCard = page.locator("//ol//li[1]//button[@data-testid= 'list-add-card-button' and text() = 'Add a card']");
        this.titleCard = page.locator("//ol[1]//li[@class = 'H136XFPzM9syCb']//textarea[@data-testid = 'list-card-composer-textarea']");
        this.addCardButton = page.locator("");
    }
}