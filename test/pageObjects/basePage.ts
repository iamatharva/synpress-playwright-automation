import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openUrl(url: string) {
    await this.page.goto(url);
  }
}
