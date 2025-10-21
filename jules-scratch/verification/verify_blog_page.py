
from playwright.sync_api import sync_playwright, Page, expect

def verify_blog_sidebar(page: Page):
    """
    Verifies that the blog post page correctly displays the article
    and the new Google Trends sidebar.
    """
    # 1. Arrange: Go to a specific blog post page.
    # Using a known slug from the restored articles.
    page.goto("http://localhost:3000/blog/headless-cms-nextjs-skalabilitas")

    # 2. Assert: Check for the main article title to ensure the page has loaded.
    article_title = page.get_by_role("heading", name="Mengapa Perusahaan Pindah ke Headless CMS & Next.js: Keuntungan Skalabilitas")
    expect(article_title).to_be_visible()

    # 3. Assert: Check for the sidebar.
    sidebar_title = page.get_by_role("heading", name="Trending di Indonesia")
    expect(sidebar_title).to_be_visible()

    # 4. Wait for the chart to potentially load.
    # The chart itself is client-side, so we'll give it a moment.
    # We can look for one of the list items that the chart renders.
    # Adding a timeout because on the first run, the data might not be cached yet.
    # Let's look for the container, as the content might fail to load but the container should be there.
    trends_container = page.locator("aside .h-96")
    expect(trends_container).to_be_visible()

    # It might show "Loading Trends..." or an error, which is acceptable for verification.
    # A short wait can help ensure client-side rendering completes.
    page.wait_for_timeout(2000) # Wait 2 seconds

    # 5. Screenshot: Capture the final result.
    page.screenshot(path="jules-scratch/verification/blog_with_sidebar.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_blog_sidebar(page)
        browser.close()

if __name__ == "__main__":
    main()
