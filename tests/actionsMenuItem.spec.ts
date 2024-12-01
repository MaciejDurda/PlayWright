import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { ButtonsPage } from "../pages/buttonsPage";
import { ActionsPage } from "../pages/actionsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test("drag and Drop", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onActionsMenuItem();

  const act = new ActionsPage(page);
  await act.dragAndDropItemTo();
  await expect(act.dropTargetPlaceTwo).toContainText("Drag me!");
});

test("click and hold", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onActionsMenuItem();

  const act = new ActionsPage(page);
  await act.clickAndHoldButton();
  await expect(act.holdDownButton).toContainText("Keep holding down!");
});

test("doubleClick", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onActionsMenuItem();

  const act = new ActionsPage(page);
  await act.doubleClickOnButton();
  await expect(act.doubleClickBtn).toContainText("Well Done!");
});

test("hold Shift and click", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onActionsMenuItem();

  const act = new ActionsPage(page);
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("The SHIFT key was pressed!");
    await dialog.accept();
  });
  await act.holdShiftAndClickButton();
});
