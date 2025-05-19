import { LoginPage } from '../page-objects/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

export class Authentication {
  private loginPage: LoginPage;

  constructor(private page: any) {
    this.loginPage = new LoginPage(page);
  }

  async login(email: string, password: string) {
    const currentUrl = await this.page.url();
    
    if (currentUrl.includes('trello.com/home')) {
      await this.loginPage.goto(process.env.BASE_URL!);
      await this.loginPage.clickLoginHome();
      await this.loginPage.fillEmail(email);
      await this.loginPage.clickContinue();
      await this.loginPage.fillPassword(password);
      await this.loginPage.clickLogin();
    } else {
      await this.loginPage.clickGoDashboardButton();    
    }

    await this.page.waitForURL('**/boards**', { waitUntil: 'networkidle', timeout: 40000 });
  }
}