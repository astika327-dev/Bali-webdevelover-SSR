from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Buka halaman daftar blog
        page.goto("http://localhost:3002/blog")

        # Tunggu hingga header utama terlihat untuk memastikan halaman sudah dimuat
        page.wait_for_selector('h1:has-text("Wawasan & Artikel Terbaru")')

        # Ambil screenshot dari seluruh halaman
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

run()
