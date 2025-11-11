
import asyncio
import re
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Start dev server
        process = await asyncio.create_subprocess_shell(
            "npm run dev",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        port = 3000
        url = ""

        # Wait for the server to be ready
        output = ""
        for i in range(120): # ~2 minutes timeout
            try:
                line_bytes = await asyncio.wait_for(process.stdout.readline(), timeout=1.0)
                if not line_bytes:
                    break
                line = line_bytes.decode('utf-8')
                output += line
                print(line, end="")

                # Check for the ready event or custom port
                ready_match = re.search(r"- Local:\s+http://localhost:(\d+)", line)
                if ready_match:
                    port = int(ready_match.group(1))
                    url = f"http://localhost:{port}"
                    print(f"Server is ready on port {port}")
                    break

            except asyncio.TimeoutError:
                continue

        if not url:
            print("Failed to start the development server.")
            process.kill()
            return

        # Navigate to the blog post page
        post_slug = "ntts-stack-kombinasi-impian"
        post_url = f"{url}/blog/{post_slug}"

        try:
            print(f"Navigating to {post_url}")
            await page.goto(post_url, timeout=120000) # Increased timeout for slow compile

            # Wait for the main content to be visible
            await expect(page.locator("article")).to_be_visible(timeout=60000)

            # Check for the custom callout component
            await expect(page.locator('div:has-text("Sinergi Sempurna")')).to_be_visible(timeout=30000)

            # Take a screenshot
            screenshot_path = "/home/swebot/jules-scratch/verification/ntts-stack-post-final.png"
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"Screenshot taken and saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
        finally:
            # Clean up
            await browser.close()
            process.kill()
            try:
                await process.wait()
            except ProcessLookupError: # process already terminated
                pass
            print("Server stopped.")

if __name__ == "__main__":
    asyncio.run(main())
