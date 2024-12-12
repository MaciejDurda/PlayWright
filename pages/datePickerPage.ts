import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { KeyObject } from "crypto";

export class DatePickerPage extends HelperBase {
  private readonly title: Locator;
  private readonly basicDateTimeInput: Locator;
  private readonly rangeDateTimeInput: Locator;
  private readonly weekDateTimeSelector: Locator;
  private readonly TimePickerSelector: Locator;
  private readonly basicCalendar: Locator;
  private readonly rangeCalendar: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator("#content");
    this.basicDateTimeInput = page.locator("#basicDate");
    this.rangeDateTimeInput = page.locator("#rangeDate");
    this.basicCalendar = page.locator(
      ".flatpickr-calendar.hasTime.animate.arrowTop"
    );
    this.rangeCalendar = page.locator(".flatpickr-calendar.rangeMode");
  }

  getTitle() {
    return this.title;
  }

  getBasicDateTimeInput() {
    return this.basicDateTimeInput;
  }
  getRangeDateTimePickerInput() {
    return this.rangeDateTimeInput;
  }
  getBasicCalendar() {
    return this.basicCalendar;
  }
  getRangeCalendar() {
    return this.rangeCalendar;
  }

  async rangeDatePickerCalendar(
    startDay: string,
    startMonth: string,
    startYear: string,
    endDay: string,
    endMonth: string,
    endYear: string
  ) {
    await this.pickYear(startYear, this.getRangeCalendar());
    await this.pickMonth(startMonth, this.getRangeCalendar());
    await this.pickDay(
      startDay,
      startMonth,
      startYear,
      this.getRangeCalendar()
    );

    await this.pickYear(endYear, this.getRangeCalendar());
    await this.pickMonth(endMonth, this.getRangeCalendar());
    await this.pickDay(endDay, endMonth, endYear, this.getRangeCalendar());

    await this.getTitle().click();
  }

  async basicDatePickerCalendar(
    day: string,
    month: string,
    year: string,
    time: string
  ) {
    await this.pickYear(year, this.getBasicCalendar());
    await this.pickMonth(month, this.getBasicCalendar());
    await this.pickDay(day, month, year, this.getBasicCalendar());
    await this.pickTime(time, this.getBasicCalendar());
    await this.getTitle().click();
  }
  async pickTime(time: string, callback: Locator) {
    const hour = time.split(":")[0];
    const minut = time.split(":")[1];
    await callback.locator(`.numInput.flatpickr-hour`).fill(hour);
    await callback.locator(`.numInput.flatpickr-minute`).fill(minut);
  }

  async pickDay(day: string, month: string, year: string, callback: Locator) {
    const expectedDay = callback.locator(
      `.flatpickr-day[aria-label="${month} ${day}, ${year}"]`
    );

    if (await expectedDay.isVisible()) {
      await expectedDay.click();
      console.log("Element został kliknięty.");
    } else {
      console.log("Element nie jest widoczny.");
    }
  }

  async getDisplayMonth(callback: Locator): Promise<string> {
    return (await callback.locator(".cur-month").textContent()) || "";
  }

  async pickMonth(expectedMonth: string, callback: Locator) {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const displayMonth = await (await this.getDisplayMonth(callback)).trim();

    console.log(`Display Month:${displayMonth} - ${months[`${displayMonth}`]}`);
    console.log(`Expected Month:${expectedMonth} - ${months[expectedMonth]}`);
    if (displayMonth != expectedMonth) {
      if (months[`${expectedMonth}`] < months[`${displayMonth}`]) {
        console.log(`Display Month:${displayMonth}`);
        console.log(`Expected Month:${expectedMonth}`);
        let count = months[`${displayMonth}`] - months[`${expectedMonth}`];
        for (let index = 0; index < count; index++) {
          await Promise.all([
            this.clickPreviousMonth(callback),
            this.delay(1000),
          ]);
        }
      } else if (months[`${expectedMonth}`] > months[`${displayMonth}`]) {
        let count = months[`${expectedMonth}`] - months[`${displayMonth}`];
        for (let index = 0; index < count; index++) {
          await Promise.all([this.clickNextMonth(callback), this.delay(1000)]);
        }
      }
    }
  }

  async clickNextMonth(callback: Locator) {
    await callback.locator(`.flatpickr-next-month `).click();
  }
  async clickPreviousMonth(callback: Locator) {
    await callback.locator(`.flatpickr-prev-month `).click();
  }

  async pickYear(year: string, callback: Locator) {
    this.delay(5000);
    await callback
      .locator(`.numInput.cur-year`)
      .fill(year)
      .then(() => callback.locator(`.numInput.cur-year`).press("Enter"));
  }
}
