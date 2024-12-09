import { test, expect } from "@playwright/test";

test("AccExists", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("riley");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("riley");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("riley@email.com");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.locator("#errorMessage")).toContainText(
    "User already exists"
  );
});
