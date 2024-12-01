import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class BrowserTabs extends HelperBase {
  private readonly openTabBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.openTabBtn = page.locator('input[type="submit"]');
  }
  openTabsBtn() {
    return this.openTabBtn;
  }
}
