import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ContactFormTestPage extends HelperBase {
  private readonly firstname: Locator;
  private readonly lastname: Locator;
  private readonly email: Locator;
  private readonly comments: Locator;
  private readonly resetBtn: Locator;
  private readonly submitBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.firstname = page.locator('input[name="first_name"]');
    this.lastname = page.locator('input[name="last_name"]');
    this.email = page.locator('input[name="email"]');
    this.comments = page.locator('textarea[name="message"]');
    this.resetBtn = page.locator('#form_buttons input[value="RESET"]');
    this.submitBtn = page.locator('#form_buttons input[value="SUBMIT"]');
  }

  firstNameInput() {
    return this.firstname;
  }
  lastNameInput() {
    return this.lastname;
  }
  emailInput() {
    return this.email;
  }
  commentsInput() {
    return this.comments;
  }

  resetButton() {
    return this.resetBtn;
  }
  submitButton() {
    return this.submitBtn;
  }
}
