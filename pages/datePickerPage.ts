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
    await this.pickDay(startDay, this.getRangeCalendar());

    await this.pickYear(endYear, this.getRangeCalendar());
    await this.pickMonth(endMonth, this.getRangeCalendar());
    await this.pickDay(endDay, this.getRangeCalendar());

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
    await this.pickDay(day, this.getBasicCalendar());
    await this.pickTime(time, this.getBasicCalendar());
    await this.getTitle().click();
  }
  async pickTime(time: string, callback: Locator) {
    const hour = time.split(":")[0];
    const minut = time.split(":")[1];
    await callback.locator(`.numInput.flatpickr-hour`).fill(hour);
    await callback.locator(`.numInput.flatpickr-minute`).fill(minut);
  }

  async pickDay(day: string, callback: Locator) {
    this.delay(5000);
    const days = await callback.locator(".flatpickr-day").getByText(day).all();
    for (const element of days) {
      const classes = await element.getAttribute("class");
      if (
        classes &&
        classes.split(" ").includes("prevMonthDay") &&
        classes.split(" ").includes("nextMonthDay")
      ) {
        continue;
      } else {
        element.click();
      }
    }
  }

  async getCurrentMonth(callback: Locator) {
    return await callback.locator(".cur-month").textContent();
  }

  async pickMonth(month: string, callback: Locator) {
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

    const date = new Date();
    const monthName = date.toLocaleString("en-US", { month: "long" });

    if (monthName == month) {
      return;
    } else if (months[`${month}`] < months[`${monthName}`]) {
      const count = months[`${monthName}`] - months[`${month}`];
      for (let index = 0; index < count; index++) {
        await Promise.all([
          this.clickPreviousMonth(callback),
          this.delay(1000),
        ]);
      }
    } else if (months[`${month}`] > months[`${monthName}`]) {
      const count = months[`${month}`] - months[`${monthName}`];
      for (let index = 0; index < count; index++) {
        await Promise.all([this.clickNextMonth(callback), this.delay(1000)]);
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
