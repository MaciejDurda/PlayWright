import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { BrowserTabs } from "../pages/browserTabs";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});
test.afterEach(async ({ page, browser }) => {
  await page.close();
});

test("open google chrome new tab", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onBrowserTabsMenuItem();

  const tab = new BrowserTabs(page);
  await tab.openTabsBtn().click();

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    tab.openTabsBtn().click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL("https://www.google.com");
});
