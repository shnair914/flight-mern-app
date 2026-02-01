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

test("Should allow user to add a flight", async({page}) => {
    await page.goto(`${UI_URL}add-flight`)

    await page.locator('[name=companyName]').fill("Test Company");
    await page.locator('[name=arrivalCity]').fill("Test Arrival City");
    await page.locator('[name=departureCity]').fill("Test Departure City");
    await page.locator('[name=arrivalCountry]').fill("Test Arrival Country");
    await page.locator('[name=departureCountry]').fill("Test Departure Country");
    await page.locator('[name=description]').fill("Test Description");
    await page.locator('[name=flightPrice]').fill("100");
    await page.locator("[name=tickCount]").fill("1");
    await page.selectOption('select[name="starRating"]', "3");
    await page.getByText("Economy").click();

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', 'prof.PNG')
    ])

    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByText("Flight Added!")).toBeVisible();
});

test("Test if a flight can be viewed", async({page}) => {
    await page.goto(`${UI_URL}my-flights`);
    await expect(page.locator('h2').filter({ hasText: 'Test Company'}).first()).toBeVisible();
    await expect(page.locator("div").filter({ hasText: "Test Description"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "Test Arrival City"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "Test Arrival Country"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "Test Departure City"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "Test Departure Country"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "$100"}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: 'Economy'}).first()).toBeVisible();
    await expect(page.locator("span").filter({hasText: "3 Star Rating"}).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Flight"}).first()).toBeVisible();
})

test("Edit flight should work", async({page}) => {
    await page.goto(`${UI_URL}my-flights`);

    await page.getByRole("link", { name: "View Details"}).first().click();
    
    await page.waitForSelector('[name="arrivalCity"]', {state: "visible"});
    await expect(page.locator('[name=arrivalCity]')).toHaveValue('Test Arrival City Update');
    await page.locator("[name=arrivalCity]").fill("Test Arrival City Update Again");
    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByText("Update Successful!")).toBeVisible();

    await page.reload();

    await page.getByRole("link", { name: "View Details"}).first().click();

    await page.waitForSelector('[name="arrivalCity"]', {state: "visible"});
    await expect(page.locator('[name=arrivalCity]')).toHaveValue('Test Arrival City Update Again');
    await page.locator("[name=companyName]").fill("Test Arrival City Update");
    await page.getByRole("button", { name: "Save"}).click();
});

