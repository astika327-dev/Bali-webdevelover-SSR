
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Check English page
        await page.goto("http://localhost:3000/en", timeout=60000)
        await expect(page.locator("h1")).to_have_text("Your Partner in Digital Excellence")
        await page.screenshot(path="jules-scratch/screenshot-en.png")
        print("English page is OK.")

        # Check Indonesian page
        await page.goto("http://localhost:3000/id", timeout=60000)
        await expect(page.locator("h1")).to_have_text("Partner Anda dalam Keunggulan Digital")
        await page.screenshot(path="jules-scratch/screenshot-id.png")
        print("Indonesian page is OK.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
