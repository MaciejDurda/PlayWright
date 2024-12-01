import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { ButtonsPage } from "../pages/buttonsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});

test.afterEach(async ({ page }) => {
  await page.close();
});
test.describe("Buttons", () => {
  test("Button 1", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().onButtonsMenuItem();
    await expect(page).toHaveURL(
      "https://automationtesting.co.uk/buttons.html"
    );

    const btn = new ButtonsPage(page);
    btn.expectedMessage("You clicked the first button!");
    await btn.buttonOneElement().click();
  });

  test("Button 2", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().onButtonsMenuItem();
    await expect(page).toHaveURL(
      "https://automationtesting.co.uk/buttons.html"
    );

    const btn = new ButtonsPage(page);
    btn.expectedMessage("You clicked the second button!");
    await btn.buttonTwoElement().click();
  });

  test("Button 4", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().onButtonsMenuItem();
    await expect(page).toHaveURL(
      "https://automationtesting.co.uk/buttons.html"
    );

    const btn = new ButtonsPage(page);
    btn.expectedMessage("You clicked the fourth button!");
    const isRemoved = await btn.removeDisabled();
    if (isRemoved) {
      await btn.buttonFourElement().click({ force: true });
    }
  });

  test("click all button", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().onButtonsMenuItem();
    await expect(page).toHaveURL(
      "https://automationtesting.co.uk/buttons.html"
    );

    const btn = new ButtonsPage(page);

    await btn.synchroBtnsClickAndCheckDialog(["btn1", "btn2", "btn3", "btn4"]);
  });
});
