from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify the blog list page
    page.goto("http://localhost:3000/blog")
    page.screenshot(path="jules-scratch/verification/blog-list-page.png")

    # Verify a single blog post page
    page.goto("http://localhost:3000/blog/apa-itu-api")
    page.screenshot(path="jules-scratch/verification/blog-post-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
