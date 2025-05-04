import { LoginPage } from '../page-objects/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

export class Authentication {

  private loginPage: LoginPage;

  constructor(private page: any) {
    this.loginPage = new LoginPage(page);
  }

  async login(email: string, password: string) {
    await this.loginPage.goto(process.env.BASE_URL!);
    await this.loginPage.clickLoginHome();
    await this.loginPage.fillEmail(email);
    await this.loginPage.clickContinue();
    await this.loginPage.fillPassword(password);
    await this.loginPage.clickLogin();
    // Đợi chuyển hướng đến trang dashboard
    await this.page.waitForURL('**/boards**', { waitUntil: 'domcontentloaded', timeout: 40000 });
  }
}