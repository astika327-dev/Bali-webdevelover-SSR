
import re
from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Verifies that the Google Trends chart has been replaced with a CNN RSS feed.
    """
    print("Navigasi ke halaman blog...")
    # Menggunakan port 3001 sesuai log server
    page.goto("http://localhost:3001/blog")

    print("Memverifikasi judul sidebar berita...")
    sidebar_heading = page.get_by_role("heading", name="Berita Teknologi Terbaru")
    expect(sidebar_heading).to_be_visible()

    # Gulir ke sidebar agar terlihat
    sidebar_heading.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    print("Memverifikasi ada daftar berita di sidebar...")
    # Cari setidaknya satu tautan di dalam div yang berisi judul
    news_list = sidebar_heading.locator("..").locator("a")
    expect(news_list.first).to_be_visible()

    print("Mengambil cuplikan layar...")
    screenshot_path = "jules-scratch/verification/verification.png"
    page.screenshot(path=screenshot_path)
    print(f"Cuplikan layar berhasil disimpan di {screenshot_path}")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()
