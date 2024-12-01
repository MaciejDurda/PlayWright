import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { ContactFormTestPage } from "../pages/contactFormTestPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Happy Path - Cotact Form Test", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().oncontactUsFormTestMenuItem();

  const ctForm = new ContactFormTestPage(page);
  await ctForm.firstNameInput().fill("Tester");
  await ctForm.lastNameInput().fill("Tester");
  await ctForm.emailInput().fill("test@test.com");
  await ctForm.commentsInput().fill("This is test message!");

  await ctForm.submitButton().click();
  await Promise.all([
    expect(page).toHaveURL(
      "https://automationtesting.co.uk/contact-form-thank-you.html"
    ),
    expect(page.locator("body")).toContainText(["Thank you for your mail!"]),
    ,
    expect(page.locator("body")).toContainText(
      "We will be in contact shortly with a response. We aim to reply within 48 hours but our responses can sometimes be delayed during times of peak demand."
    ),
  ]);
});

test("Missing email input - Cotact Form Test", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().oncontactUsFormTestMenuItem();

  const ctForm = new ContactFormTestPage(page);
  await ctForm.firstNameInput().fill("Tester");
  await ctForm.lastNameInput().fill("Tester");
  await ctForm.commentsInput().fill("This is test message!");

  await ctForm.submitButton().click();
  await Promise.all([
    expect(page).toHaveURL("https://automationtesting.co.uk/contact_us.php"),
    expect(page.locator("body")).toContainText([
      "Error: all fields are required",
    ]),
    ,
    expect(page.locator("body")).toContainText("Error: Invalid email address"),
  ]);
});

test("Missing lastName input - Cotact Form Test", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().oncontactUsFormTestMenuItem();

  const ctForm = new ContactFormTestPage(page);
  await ctForm.firstNameInput().fill("Tester");
  await ctForm.emailInput().fill("test@test.com");
  await ctForm.commentsInput().fill("This is test message!");

  await ctForm.submitButton().click();
  await Promise.all([
    expect(page).toHaveURL("https://automationtesting.co.uk/contact_us.php"),
    expect(page.locator("body")).toContainText([
      "Error: all fields are required",
    ]),
    ,
    expect(page.locator("body")).toContainText(
      " Error: all fields are required"
    ),
  ]);
});
