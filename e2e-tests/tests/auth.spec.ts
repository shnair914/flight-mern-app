import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";


test('login works', async ({ page }) => {
  await page.goto(UI_URL);
  
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("link", { name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("shnair1995@gmail.com");
  await page.locator("[name=password]").fill("gopal1995");
  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Login Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "bookings"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});

test('registration works', async ({ page }) => {
  const test_email = `test_register_${Math.floor(Math.random() * 9000) + 10000 }@test.com`;

  await page.goto(UI_URL);
  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Sign up here"}).click();
  await expect(page.getByText("Create an Account")).toBeVisible();

  await page.locator("[name=firstName]").fill("Sriram");
  await page.locator("[name=lastName]").fill("Nair");
  await page.locator("[name=email]").fill(test_email);
  await page.locator("[name=password]").fill("gopal1995");
  await page.locator("[name=confirmPassword]").fill("gopal1995");
  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "bookings"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
}); 




