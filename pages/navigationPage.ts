import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  private readonly homePageMenuItem: Locator;
  private readonly accordionMenuItem: Locator;
  private readonly actionsMenuItem: Locator;
  private readonly browserTabsMenuItem: Locator;
  private readonly buttonsMenuItem: Locator;
  private readonly calculatorMenuItem: Locator;
  private readonly contactUsFormTestMenuItem: Locator;
  private readonly datePickerMenuItem: Locator;
  private readonly dropdownCheckboxRadioMenuItem: Locator;
  private readonly fileUploadMenuItem: Locator;
  private readonly hiddenElementsMenuItem: Locator;
  private readonly iFramesMenuItem: Locator;
  private readonly loaderMenuItem: Locator;
  private readonly loaderTwoMenuItem: Locator;
  private readonly loginPortalTestMenuItem: Locator;
  private readonly mouseMovementMenuItem: Locator;
  private readonly popUpsAndAlertsMenuItem: Locator;
  private readonly predictiveSearchMenuItem: Locator;
  private readonly tablesMenuItem: Locator;
  private readonly testStoreMenuItem: Locator;
  private readonly aboutMeMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageMenuItem = page.getByText("Homepage");
    this.accordionMenuItem = page.getByText("Accordion");
    this.actionsMenuItem = page.getByText("Actions");
    this.browserTabsMenuItem = page.getByText("Browser Tabs");
    this.buttonsMenuItem = page.getByText("Buttons");
    this.calculatorMenuItem = page.getByText("Calculator (JS)");
    this.contactUsFormTestMenuItem = page.getByText("Contact Us Form Test");
    this.datePickerMenuItem = page.getByText("Date Picker");
    this.dropdownCheckboxRadioMenuItem = page.getByText(
      "DropDown Checkbox Radio"
    );
    this.fileUploadMenuItem = page.getByText("File Upload");
    this.hiddenElementsMenuItem = page.getByText("Hidden Elements");
    this.iFramesMenuItem = page.getByText("iFrames");
    this.loaderMenuItem = page.getByText("Loader");
    this.loaderTwoMenuItem = page.getByText("Loader Two");
    this.loginPortalTestMenuItem = page.getByText("Login Portal Test");
    this.mouseMovementMenuItem = page.getByText("Mouse Movement");
    this.popUpsAndAlertsMenuItem = page.getByText("Pop Ups & Alerts");
    this.predictiveSearchMenuItem = page.getByText("Predictive Search");
    this.tablesMenuItem = page.getByText("Tables");
    this.testStoreMenuItem = page.getByText("Test Store");
    this.aboutMeMenuItem = page.getByText("About Me");
  }

  async onButtonsMenuItem() {
    await this.clickOnHamburger();
    await this.buttonsMenuItem.click();
  }
  async onActionsMenuItem() {
    await this.clickOnHamburger();
    await this.actionsMenuItem.click();
  }
  async onAccordianMenuItem() {
    await this.clickOnHamburger();
    await this.accordionMenuItem.click();
  }
  async onBrowserTabsMenuItem() {
    await this.clickOnHamburger();
    await this.browserTabsMenuItem.click();
  }
  async oncontactUsFormTestMenuItem() {
    await this.clickOnHamburger();
    await this.contactUsFormTestMenuItem.click();
  }

  async onDatePickerMenuItem() {
    await this.clickOnHamburger();
    await this.datePickerMenuItem.click();
  }

  private async clickOnHamburger() {
    const isSidearActive = this.page.locator("#sidebar").getAttribute("class");
    if ((await isSidearActive) == "inactive") {
      await this.page.locator(".toggle").click();
    }
  }
}
