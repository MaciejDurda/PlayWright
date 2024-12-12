import test, { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { DatePickerPage } from "../pages/datePickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationtesting.co.uk/index.html");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Title check - Date Picker", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onDatePickerMenuItem();

  const datePicker = new DatePickerPage(page);
  await expect(datePicker.getTitle()).toContainText("Date Picker");
});

test("Basic DataTime - Date Picker", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onDatePickerMenuItem();

  const datePicker = new DatePickerPage(page);
  await datePicker.getBasicDateTimeInput().click();
  await datePicker.basicDatePickerCalendar("22", "March", "1956", "12:00");
  await expect(datePicker.getBasicDateTimeInput()).toHaveValue(
    "March, 22 1956 12:00"
  );
});

test("Range DataTime - Date Picker", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onDatePickerMenuItem();

  const datePicker = new DatePickerPage(page);
  await datePicker.getRangeDateTimePickerInput().click();
  await datePicker.rangeDatePickerCalendar(
    "22",
    "March",
    "1995",
    "15",
    "December",
    "2024"
  );
  await expect(datePicker.getRangeDateTimePickerInput()).toHaveValue(
    "1995-03-22 to 2024-12-15"
  );
});

test("Reset DataTime - Date Picker", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onDatePickerMenuItem();

  const datePicker = new DatePickerPage(page);
  await datePicker.getWeekDatePickerInput().click();
  await datePicker.weekDatePickerCalendar("22", "March", "1956");
  await expect(datePicker.getWeekDatePickerInput()).toHaveValue("1956-03-22");
  await datePicker.getResetButton().click();
  await expect(datePicker.getWeekDatePickerInput()).toHaveValue("");
});

test("Time Picker - Date Picker", async ({ page, context }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().onDatePickerMenuItem();

  const datePicker = new DatePickerPage(page);
  await datePicker.getTimePickerInput().click();
  await datePicker.timePickerCalendar("12:00");
  await expect(datePicker.getTimePickerInput()).toHaveValue("12:00");
});
