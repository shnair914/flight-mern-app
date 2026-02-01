import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const UI_URL = "http://localhost:5173/";

test.beforeEach(async({ page }) => {
    await page.goto(UI_URL);
      
    await page.getByRole("link", { name: "Sign In"}).click();
    
    await expect(page.getByRole("link", { name: "Sign In"})).toBeVisible();
    
    await page.locator("[name=email]").fill("shnair1995@gmail.com");
    await page.locator("[name=password]").fill("gopal1995");
    await page.getByRole("button", {name: "Login"}).click();
    
    await expect(page.getByText("Login Successful!")).toBeVisible();
     
});

test("Should show flight search results", async({page})=> {
    await page.goto(UI_URL);

    await page.getByPlaceholder("arriving from?").fill("San Jose");
    await page.getByRole("button", { name: "Search"}).click();
    await expect(page.getByText("2 Flights found that match your search criteria")).toBeVisible();
    await expect(page.getByText("American Airlines").first()).toBeVisible();
})