import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ActionsPage extends HelperBase {
  readonly dragTarget: Locator;
  readonly dropTargetPlaceOne: Locator;
  readonly dropTargetPlaceTwo: Locator;
  readonly holdDownButton: Locator;
  readonly doubleClickBtn: Locator;
  readonly holdShifhtAndClickBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.dragTarget = page.locator("#dragtarget");
    this.dropTargetPlaceOne = page.locator(".droptarget").nth(0);
    this.dropTargetPlaceTwo = page.locator(".droptarget").nth(1);
    this.holdDownButton = page.locator("#click-box");
    this.doubleClickBtn = page.locator("#doubClickStartText").nth(0);
    this.holdShifhtAndClickBtn = page.locator("#doubClickStartText").nth(1);
  }

  async holdShiftAndClickButton() {
    await this.page.keyboard.down("Shift");
    await this.delay(500);
    await this.holdShifhtAndClickBtn.click();
  }

  async doubleClickOnButton() {
    await this.doubleClickBtn.dblclick({ force: true });
  }

  async clickAndHoldButton() {
    await this.holdDownButton.hover();
    await this.page.mouse.down();
    await this.delay(3000);
  }

  async dragAndDropItemTo() {
    await this.dragTarget.hover();
    await this.page.mouse.down();
    await this.dropTargetPlaceTwo.hover();
    await this.page.mouse.up();
  }
}
