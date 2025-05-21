import{type Locator, type Page} from '@playwright/test';

export class HomePageSelectors{

    readonly page: Page;
    readonly createHomeButton: Locator;
    readonly createBoardButton: Locator;
    readonly createWithTemplateButton: Locator;
    readonly temPlate: Locator;
    readonly boardTitle: Locator;
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
        this.temPlate = page.locator("//ul/li[6]/div[@class = 'VUUgUoReMgQcjG']");
        this.boardTitle = page.locator("//input[@type = 'text']");
        this.createButton = page.locator("//button[@data-testid = 'create-board-submit-button']");
        this.viewBoardButton = page.locator("//button[contains(text(), 'View all closed boards')]");
        this.deleteButton = page.locator("//ul//li[1]/div/button[@data-testid = 'close-board-delete-board-button']");
        this.deleteConfirmButton = page.locator("//button[text() = 'Delete' and @data-testid = 'close-board-delete-board-confirm-button']");
        this.reopenButton = page.locator("//ul//li[1]//button[@data-testid = 'workspace-chooser-trigger-button' and text() = 'Reopen']");
        this.reopenConfirmButton = page.locator("//div//button[@data-testid= 'workspace-chooser-reopen-button' and text() = 'Reopen board']");
    }
}