
import re
import sys
from playwright.sync_api import sync_playwright, expect

def run_verification(port):
    base_url = f"http://localhost:{port}"
    print(f"Running verification against {base_url}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(locale="en-US")
        page = context.new_page()

        try:
            # 1. Test base URL redirection
            print("1. Testing base URL redirection...")
            page.goto(base_url, wait_until='domcontentloaded')
            # Expect redirection to /en/
            expect(page).to_have_url(re.compile(r"/en/?$"))
            print("  - PASSED: Redirected to /en/")

            # 2. Test English Homepage Content
            print("\n2. Testing English Homepage Content...")
            expect(page.locator('h1')).to_have_text("Creative Web & Mobile Developer")
            print("  - PASSED: English H1 is correct.")

            # 3. Test Language Toggle to Indonesian
            print("\n3. Testing Language Toggle to Indonesian...")
            lang_toggle = page.locator('button[aria-label="Language toggle"]')
            expect(lang_toggle).to_be_visible()
            lang_toggle.click()
            page.locator('a[href="/id"]').click()

            # Wait for navigation and check URL
            expect(page).to_have_url(re.compile(r"/id/?$"))
            print("  - PASSED: Switched to Indonesian URL (/id/).")

            # Check for Indonesian content
            expect(page.locator('h1')).to_have_text("Pengembang Web & Seluler Kreatif")
            print("  - PASSED: Indonesian H1 is correct.")

            # 4. Test Navigation while in Indonesian
            print("\n4. Testing Navigation in Indonesian...")
            page.locator('a[href="/id/services"]').click()
            expect(page).to_have_url(re.compile(r"/id/services/?$"))
            print("  - PASSED: Navigated to Services page in Indonesian.")
            expect(page.locator('h1')).to_have_text("Paket Harga")
            print("  - PASSED: Services page H1 is correct in Indonesian.")

            # 5. Test Language Toggle back to English
            print("\n5. Testing Language Toggle back to English...")
            lang_toggle = page.locator('button[aria-label="Language toggle"]')
            expect(lang_toggle).to_be_visible()
            lang_toggle.click()
            page.locator('a[href="/en/services"]').click()

            expect(page).to_have_url(re.compile(r"/en/services/?$"))
            print("  - PASSED: Switched back to English URL (/en/services).")
            expect(page.locator('h1')).to_have_text("Pricing Plans")
            print("  - PASSED: Services page H1 is correct in English.")

            # 6. Test direct navigation to a deep link
            print("\n6. Testing direct navigation to a deep link...")
            page.goto(f"{base_url}/id/blog", wait_until='domcontentloaded')
            expect(page).to_have_url(re.compile(r"/id/blog/?"))
            expect(page.locator('h1')).to_have_text("Blog Teknologi & Bisnis")
            print("  - PASSED: Directly navigated to Indonesian blog and content is correct.")


            print("\nTaking final screenshot...")
            screenshot_path = "jules-scratch/i18n-verification.png"
            page.screenshot(path=screenshot_path)
            print(f"  - Screenshot saved to {screenshot_path}")

            print("\n✅ All verification steps passed!")

        except Exception as e:
            print(f"\n❌ Verification failed: {e}")
            page.screenshot(path="jules-scratch/i18n-verification-error.png")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
        run_verification(port)
    else:
        print("Usage: python3 jules-scratch/verify_i18n.py <port>")
        sys.exit(1)
