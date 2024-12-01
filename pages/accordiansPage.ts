import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class AccordiansPage extends HelperBase {
  private readonly accordianHeaders: Locator;
  private readonly accordianContents: Locator;

  constructor(page: Page) {
    super(page);
    this.accordianHeaders = page.locator(".accordion-header");
    this.accordianContents = page.locator(".accordion-content");
  }

  firstAccordianItem() {
    return this.accordianHeaders.nth(0);
  }

  secondAccordianItem() {
    return this.accordianHeaders.nth(1);
  }

  thirdAccordianItem() {
    return this.accordianHeaders.nth(2);
  }

  accordianContentOne() {
    return this.accordianContents.nth(0);
  }

  accordianContentTwo() {
    return this.accordianContents.nth(1);
  }

  accordianContentThree() {
    return this.accordianContents.nth(2);
  }

  // private readonly firstAccordianHeader: Locator;
  // private readonly secondAccordianHeader: Locator;
  // private readonly thirdAccordianHeader: Locator;
  // private readonly firstAccordianContent: Locator;
  // private readonly secondAccordianContent: Locator;
  // private readonly thirdAccordianContent: Locator;

  // constructor(page: Page) {
  //   super(page);
  //   this.firstAccordianHeader = page.locator(".accordion-header")
  //   this.secondAccordianHeader = page.locator(".accordion-header").nth(1);
  //   this.thirdAccordianHeader = page.locator(".accordion-header").nth(2);
  //   this.firstAccordianContent = page.locator(".accordion-content").nth(0);
  //   this.secondAccordianContent = page.locator(".accordion-content").nth(1);
  //   this.thirdAccordianContent = page.locator(".accordion-content").nth(2);
  // }
  // async firstAccordianItem() {
  //   return this.firstAccordianHeader;
  // }

  // async secondAccordianItem() {
  //   return this.secondAccordianHeader;
  // }
  // async thirdAccordianItem() {
  //   return this.thirdAccordianHeader;
  // }

  // async accordianContentOne() {
  //   return this.firstAccordianContent;
  // }
  // async accordianContentTwo() {
  //   return this.secondAccordianContent;
  // }
  // async accordianContentThree() {
  //   return this.thirdAccordianContent;
  // }
}
