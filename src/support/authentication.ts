import { LoginPage } from '../pages/actions/LoginPage';
import * as dotenv from 'dotenv';
import { BrowserContext } from '@playwright/test';

dotenv.config();

export class Authentication {
  private loginPage: LoginPage;

  constructor(private page: any, private context: BrowserContext) {
    this.loginPage = new LoginPage(page);
  }

  async login(email: string, password: string) {
    await this.loginPage.goto(process.env.BASE_URL!);
    await this.loginPage.clickLoginHome();
    await this.loginPage.fillEmail(email);
    await this.loginPage.clickContinue();
    await this.loginPage.fillPassword(password);
    await this.loginPage.clickLogin();
    // wait redirect to dashboard
    await this.page.waitForURL('**/boards**', { waitUntil: 'domcontentloaded', timeout: 40000 });
  
  }
}