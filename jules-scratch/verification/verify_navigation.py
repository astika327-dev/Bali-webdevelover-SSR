from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Navigate to a blog post that has next/prev navigation
        page.goto("http://localhost:3000/blog/fokus-kata-kunci-seo")
        # Wait for the navigation section to be visible
        navigation_element = page.locator('nav.my-12')
        navigation_element.wait_for(state='visible')
        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

if __name__ == "__main__":
    run()
