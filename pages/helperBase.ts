import { Page } from "@playwright/test";

export class HelperBase {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
