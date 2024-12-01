import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ButtonsPage extends HelperBase {
  private btns = [
    "You clicked the first button!",
    "You clicked the second button!",
    "You clicked the third button!",
    "You clicked the fourth button!",
  ];
  private readonly buttonOne: Locator;
  private readonly buttonTwo: Locator;
  private readonly buttonThree: Locator;
  private readonly buttonFour: Locator;
  constructor(page: Page) {
    super(page);
    this.buttonOne = page.locator("#btn_one");
    this.buttonTwo = page.getByRole("button", { name: "BUTTON TWO" });
    this.buttonThree = page.locator("#btn_three");
    this.buttonFour = page.locator("#btn_four");
  }
  buttonOneElement() {
    return this.buttonOne;
  }
  buttonTwoElement() {
    return this.buttonTwo;
  }
  butonThreeElement() {
    return this.buttonThree;
  }
  buttonFourElement() {
    return this.buttonFour;
  }

  async expectedMessage(text: string) {
    this.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(text);
      this.delay(3000);
      await dialog.accept();
    });
  }

  async removeDisabled() {
    const result = await this.page.evaluate(() => {
      const button = document.querySelector("#btn_four");
      if (button) {
        button.removeAttribute("disabled");
        return true;
      }
      return false;
    });

    return result;
  }

  async synchroBtnsClickAndCheckDialog(btns: string[]) {
    for (const btn of btns) {
      await this.clickAndcheckDialogMessege(btn);
    }
  }

  private async clickAndcheckDialogMessege(btn: string) {
    if (btn == "btn1") {
      this.page.once("dialog", async (dialog) => {
        await this.delay(1000);
        expect(dialog.message()).toContain(this.btns[0]);
        await dialog.accept();
      });
      await this.buttonOne.click();
    } else if (btn == "btn2") {
      this.page.once("dialog", async (dialog) => {
        await this.delay(1000);
        expect(dialog.message()).toContain(this.btns[1]);
        await dialog.accept();
      });
      await this.buttonTwo.click();
    } else if (btn == "btn3") {
      this.page.once("dialog", async (dialog) => {
        await this.delay(1000);
        expect(dialog.message()).toContain(this.btns[2]);
        await dialog.accept();
      });
      await this.buttonThree.click();
    } else if (btn == "btn4") {
      this.page.once("dialog", async (dialog) => {
        await this.delay(1000);
        expect(dialog.message()).toContain(this.btns[3]);
        await dialog.accept();
      });
      const isRemoved = await this.removeDisabled();
      if (isRemoved) {
        await this.buttonFourElement();
      }
      await this.buttonFour.click();
    }
  }
}
