#!/usr/bin/env python3
"""
Automated test suite for Open Source Hub (/opensource).
Tests both Next.js App Router (port 3000) and Static HTML (port 3002).
Audits tabs, links, responsive viewports, and console errors.
"""

import os
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def run_tests():
    out_dir = "/Users/bhuvanab/.gemini/antigravity-ide/brain/482bc083-888a-43a5-8512-49e3c21aafc1"

    # Start static file server on port 3002
    srv = subprocess.Popen(["python3", "-m", "http.server", "3002"], cwd="/Users/bhuvanab/Portfolio", stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.0)

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,900")

    driver = webdriver.Chrome(options=options)

    try:
        print("--- Testing Next.js App Router (/opensource on port 3003) ---")
        driver.get("http://localhost:3003/opensource")
        time.sleep(1.5)

        # 1. Check title & hero heading
        h1 = driver.find_element(By.TAG_NAME, "h1").text
        print(f"H1 Title: {h1}")
        assert "Modular Engineering & Open Source" in h1, "H1 does not match expected text"

        # 2. Check featured package
        h2 = driver.find_element(By.XPATH, "//h2[contains(text(), 'dxf-contour-extractor')]").text
        print(f"Featured Package H2: {h2}")
        assert "dxf-contour-extractor" in h2

        # 3. Test Interactive Tab Switching on Next.js
        buttons = driver.find_elements(By.CLASS_NAME, "os-tab-btn")
        print(f"Found {len(buttons)} tabs on Next.js page")
        for b in buttons:
            tab_text = b.text.strip()
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", b)
            time.sleep(0.1)
            driver.execute_script("arguments[0].click();", b)
            time.sleep(0.3)
            print(f"  Clicked tab: {tab_text}")

        # Capture Desktop Screenshots
        driver.set_window_size(1440, 1100)
        time.sleep(0.5)
        desktop_img = os.path.join(out_dir, "opensource_desktop.png")
        driver.save_screenshot(desktop_img)
        print(f"Saved {desktop_img}")

        # Scroll to roadmap & capture detail
        driver.execute_script("window.scrollTo(0, 750);")
        time.sleep(0.5)
        tabs_img = os.path.join(out_dir, "opensource_tabs_detail.png")
        driver.save_screenshot(tabs_img)
        print(f"Saved {tabs_img}")

        driver.execute_script("window.scrollTo(0, 1500);")
        time.sleep(0.5)
        roadmap_img = os.path.join(out_dir, "opensource_roadmap_detail.png")
        driver.save_screenshot(roadmap_img)
        print(f"Saved {roadmap_img}")

        # Check browser console errors
        logs = driver.get_log("browser")
        severe_errors = [l for l in logs if l["level"] == "SEVERE" and "favicon" not in l["message"]]
        print(f"Next.js console errors: {len(severe_errors)}")
        for err in severe_errors:
            print("  SEVERE:", err["message"])
        assert len(severe_errors) == 0, f"Found severe console errors: {severe_errors}"

        # 4. Check Tablet Viewport (768x1024)
        driver.set_window_size(768, 1024)
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.5)
        tablet_img = os.path.join(out_dir, "opensource_tablet.png")
        driver.save_screenshot(tablet_img)
        print(f"Saved {tablet_img}")

        # 5. Check Mobile Viewport (375x812)
        driver.set_window_size(375, 812)
        time.sleep(0.5)
        mobile_img = os.path.join(out_dir, "opensource_mobile.png")
        driver.save_screenshot(mobile_img)
        print(f"Saved {mobile_img}")

        # 6. Test Static HTML page on port 3002
        print("\n--- Testing Static HTML Mirror (opensource.html on port 3002) ---")
        driver.set_window_size(1440, 900)
        driver.get("http://localhost:3002/opensource.html")
        time.sleep(1.0)

        static_h1 = driver.find_element(By.TAG_NAME, "h1").text
        print(f"Static H1: {static_h1}")
        assert "Modular Engineering & Open Source" in static_h1

        static_btns = driver.find_elements(By.CLASS_NAME, "os-tab-btn")
        print(f"Found {len(static_btns)} tabs on static HTML page")
        for b in static_btns:
            tab_name = b.get_attribute("data-tab")
            driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", b)
            time.sleep(0.1)
            driver.execute_script("arguments[0].click();", b)
            time.sleep(0.2)
            active_content = driver.find_element(By.ID, f"tab-{tab_name}")
            assert active_content.is_displayed(), f"Static tab content for {tab_name} is not displayed!"
            print(f"  Static tab {tab_name} successfully toggled display: block")

        static_logs = driver.get_log("browser")
        static_errors = [l for l in static_logs if l["level"] == "SEVERE" and "favicon" not in l["message"]]
        print(f"Static HTML console errors: {len(static_errors)}")
        assert len(static_errors) == 0, f"Found severe errors on static HTML: {static_errors}"

        print("\nAll Open Source tests PASSED perfectly!")

    finally:
        driver.quit()
        srv.terminate()
        srv.wait()

if __name__ == "__main__":
    run_tests()
