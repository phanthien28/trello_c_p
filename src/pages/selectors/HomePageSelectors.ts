import{type Locator, type Page} from '@playwright/test';

export class HomePageSelectors{

    readonly page: Page;
    readonly createHomeButton: Locator;
    readonly createBoardButton: Locator;
    readonly selectTemplateButton: Locator;
    readonly createWithTemplateButton: Locator;
    readonly temPlate: Locator;
    readonly boardTitle: Locator;
    readonly createButton: Locator;
    readonly viewBoardButton: Locator;
    readonly deleteButton: Locator;
    readonly deleteConfirmButton: Locator;
    readonly reopenButton: Locator;
    readonly reopenConfirmButton: Locator;

    //locators expect
    readonly newBoard: Locator;
    readonly newTemplateBoard: Locator;
    readonly messageDelete: Locator;
    readonly reopenedBoard: Locator;

    readonly goDashboardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createHomeButton = page.locator("//button[@data-testid = 'header-create-menu-button']");
        this.createBoardButton = page.locator("//button[@data-testid = 'header-create-board-button']");
        this.selectTemplateButton = page.locator("//div[@class = 'c0qD4Gey0H8ZNU']//li[2]//button[@class = 'bxgKMAm3lq5BpA SEj5vUdI3VvxDc' and @title= 'Custom image']");
        this.createWithTemplateButton = page.locator("//button[@data-testid =  'header-create-board-from-template-button']");
        this.temPlate = page.locator("//ul/li[6]/div[@class = 'VUUgUoReMgQcjG']");
        this.boardTitle = page.locator("//input[@type = 'text']");
        this.createButton = page.locator("//form//button[@class = 'ijFumaLuInvBrL bxgKMAm3lq5BpA SdamsUKjxSBwGb SEj5vUdI3VvxDc']");
        this.viewBoardButton = page.locator("//button[contains(text(), 'View all closed boards')]");
        this.deleteButton = page.locator("//ul//li[1]/div/button[@data-testid = 'close-board-delete-board-button']");
        this.deleteConfirmButton = page.locator("//button[text() = 'Delete' and @data-testid = 'close-board-delete-board-confirm-button']");
        this.reopenButton = page.locator("//ul//li[1]//button[@data-testid = 'workspace-chooser-trigger-button' and text() = 'Reopen']");
        this.reopenConfirmButton = page.locator("//div//button[@data-testid= 'workspace-chooser-reopen-button' and text() = 'Reopen board']");

        this.goDashboardButton = page.locator("//div[@class = 'Buttonsstyles__ButtonGroup-sc-1jwidxo-3 jnMZCI']/a[text() = 'Go to your boards']");

        this.newBoard = page.locator("//div[@class = 'RPO6eTW4FLJhI0']//div[@class = 'hiRkezEUBG7ve6 uXhW3KBBr1jUsJ']");
        this.newTemplateBoard = page.locator("//div[@data-testid = 'board-name-container']");
        this.messageDelete = page.locator("//div[@class = 'a4ZvSL0pjeULBU']//span[text() = 'Board deleted.']");
        this.reopenedBoard = page.locator("//ul//li[@class= 'boards-page-board-section-list-item'][1]");
    }
}