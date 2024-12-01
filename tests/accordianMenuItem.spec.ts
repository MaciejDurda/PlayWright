import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { AccordiansPage } from "../pages/accordiansPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test("drag and Drop11", async ({ page }) => {
  const pm = new PageManager(page);
  const expectedTextOne =
    "Testing is a repetitive process. The slightest modification in code must be tested to ensure that the software is providing the desired functionality and result. Repeating tests manually is a time consuming and costly process. Automated tests can be run repetitively at no additional costs. Selenium is a highly portable tool that runs on multiple platforms as well as browsers. It therefore allows automation engineers the ease of writing code without worrying about the platform on which it will run.";
  const expectedTextTwo =
    "Software is written in a number of languages. One of the challenges faced by automated testers is integrating the automation tools with the development environment for CI. With Selenium bindings for Java, .NET, Ruby, Perl, Python, PHP, Groovy and JavaScript, it is very easy to integrate with the development environment.";
  const expectedTextThree =
    "The remote control server of Selenium allows automation testers to create a test infrastructure that is spread across multiple locations (including cloud) to drive the scripts on a large set of browsers.";

  await pm.navigateTo().onAccordianMenuItem();

  const acc = new AccordiansPage(page);
  await acc.firstAccordianItem().click();
  await expect(await acc.accordianContentOne().textContent()).toContain(
    expectedTextOne
  );

  await acc.secondAccordianItem().click();
  await expect(await acc.accordianContentTwo().textContent()).toContain(
    expectedTextTwo
  );

  await acc.thirdAccordianItem().click();
  await expect(await acc.accordianContentThree().textContent()).toContain(
    expectedTextThree
  );
});
