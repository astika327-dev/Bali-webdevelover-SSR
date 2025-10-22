
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Go to a blog post, correcting the port to 3002
        await page.goto("http://localhost:3002/blog/apa-itu-api")

        # Wait for the main content to be visible
        await page.wait_for_selector("article")

        # Give the page a moment to fully render
        await page.wait_for_timeout(2000)

        # Take a screenshot of the full page
        await page.screenshot(path="verification_background_fix.png", full_page=True)

        await browser.close()

asyncio.run(main())
