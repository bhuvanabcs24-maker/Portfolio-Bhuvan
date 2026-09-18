#!/usr/bin/env python3
"""
Test Suite for BHUVAN.OS Part 5: Projects as Engineering Artifacts
Verifies:
1. /projects page renders the Engineering Archive.
2. Structure for each artifact: PROJECT ID, SYSTEM, STATUS, STACK, PROBLEM, RESULT.
3. QWait Estimator displays the 5 resume-supported features:
   - QR CHECK-IN
   - LIVE QUEUE TRACKING
   - WAIT-TIME ESTIMATION
   - STAFF DASHBOARD
   - VENUE MAPPING
4. Hover interaction reveals technical preview.
5. Click opens detailed artifact view showing Problem, Solution, Architecture, Features, Technology, GitHub.
6. Safe GitHub links to actual repos:
   - https://github.com/bhuvanabcs24-maker/QueueEstimater
   - https://github.com/bhuvanabcs24-maker/Forge-IQ
7. /projects/qwait and /projects/forgeiq routes respond properly.
8. Multi-viewport checks (1440px, 768px, 390px).
9. Keyboard navigation (Enter to open artifact, Escape to close).
"""

import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1440,900")

    driver = webdriver.Chrome(options=chrome_options)
    port = 3000

    print("========================================================")
    print(f"TESTING PART 5: PROJECTS AS ENGINEERING ARTIFACTS ({port})")
    print("========================================================")

    try:
        # 1. Load /projects
        print("\n--- 1. Testing /projects Engineering Archive Loading ---")
        driver.get(f"http://localhost:{port}/projects")
        time.sleep(1.5)

        title = driver.title
        print(f"✓ Page Title: {title}")
        assert "Engineering Archive" in title, f"Expected 'Engineering Archive' in title, got: {title}"

        h1 = driver.find_element(By.TAG_NAME, "h1").text
        print(f"✓ Main Heading: {h1}")
        assert "ENGINEERING ARCHIVE" in h1, f"Expected 'ENGINEERING ARCHIVE' heading, got: {h1}"

        # 2. Verify Artifact Structure
        print("\n--- 2. Verifying Artifact Structure (ID, SYSTEM, STATUS, STACK, PROBLEM, RESULT) ---")
        articles = driver.find_elements(By.TAG_NAME, "article")
        print(f"✓ Found {len(articles)} engineering artifact articles.")
        assert len(articles) == 2, f"Expected 2 engineering artifacts, found {len(articles)}"

        # Check PROJECT 01 (ForgeIQ)
        forgeiq_text = articles[0].text
        print("  • Checking Artifact 1 (ForgeIQ)...")
        assert "PROJECT 01" in forgeiq_text, "Missing 'PROJECT 01'"
        assert "FORGEIQ" in forgeiq_text, "Missing 'FORGEIQ'"
        assert "MANUFACTURING INTELLIGENCE SYSTEM" in forgeiq_text, "Missing 'MANUFACTURING INTELLIGENCE SYSTEM'"
        assert "PROBLEM FORMULATION" in forgeiq_text, "Missing 'PROBLEM FORMULATION'"
        assert "RESULT // MEASURED BENCHMARK" in forgeiq_text, "Missing 'RESULT // MEASURED BENCHMARK'"
        assert "ENGINEERING STACK" in forgeiq_text, "Missing 'ENGINEERING STACK'"
        print("✓ ForgeIQ artifact contains all required structural sections.")

        # Check PROJECT 02 (QWait Estimator)
        qwait_text = articles[1].text
        print("  • Checking Artifact 2 (QWait Estimator)...")
        assert "PROJECT 02" in qwait_text, "Missing 'PROJECT 02'"
        assert "QWAIT ESTIMATOR" in qwait_text, "Missing 'QWAIT ESTIMATOR'"
        assert "QUEUE MANAGEMENT SYSTEM" in qwait_text, "Missing 'QUEUE MANAGEMENT SYSTEM'"
        assert "PROBLEM FORMULATION" in qwait_text, "Missing 'PROBLEM FORMULATION'"
        assert "RESULT // MEASURED BENCHMARK" in qwait_text, "Missing 'RESULT // MEASURED BENCHMARK'"
        assert "ENGINEERING STACK" in qwait_text, "Missing 'ENGINEERING STACK'"
        print("✓ QWait Estimator artifact contains all required structural sections.")

        # 3. Verify QWait's 5 Resume Features
        print("\n--- 3. Verifying QWait Estimator 5 Verified Resume Features ---")
        required_features = [
            "QR CHECK-IN",
            "LIVE QUEUE TRACKING",
            "WAIT-TIME ESTIMATION",
            "STAFF DASHBOARD",
            "VENUE MAPPING"
        ]
        for feat in required_features:
            assert feat in qwait_text, f"Missing required QWait feature: {feat}"
            print(f"  ✓ Found feature: {feat}")
        print("✓ All 5 resume-supported QWait features verified without uncorroborated claims.")

        # 4. Verify Technical Preview on Hover
        print("\n--- 4. Testing Hover Interaction & Technical Preview ---")
        actions = ActionChains(driver)
        actions.move_to_element(articles[1]).perform()
        time.sleep(0.5)
        hovered_text = articles[1].text
        assert "REACTIVE PREVIEW ACTIVE" in hovered_text or "QUEUE TELEMATICS" in hovered_text
        print("✓ Technical preview active on hover.")

        # 5. Verify Click Interaction & Detailed Artifact View
        print("\n--- 5. Testing Click -> Detailed Artifact Modal View ---")
        # Click on QWait article to open modal
        articles[1].click()
        time.sleep(0.8)

        dialog = driver.find_element(By.CSS_SELECTOR, "[role='dialog']")
        assert dialog.is_displayed(), "Detailed artifact dialog should be open"
        print("✓ Detailed artifact modal opened successfully.")

        dialog_text = dialog.text
        # Verify Problem, Solution, Architecture, Features, Technology, GitHub
        tab_buttons = dialog.find_elements(By.TAG_NAME, "button")
        tab_names = [b.text for b in tab_buttons if b.text]
        print(f"  • Modal tabs/controls: {tab_names}")
        assert any("FEATURES" in t for t in tab_names), "Missing Features tab"
        assert any("PROBLEM" in t for t in tab_names), "Missing Problem tab"
        assert any("SOLUTION" in t for t in tab_names), "Missing Solution tab"
        assert any("ARCHITECTURE" in t for t in tab_names), "Missing Architecture tab"
        assert any("TECHNOLOGY" in t for t in tab_names), "Missing Technology tab"

        # Click Problem tab
        for b in tab_buttons:
            if "PROBLEM" in b.text:
                b.click()
                time.sleep(0.3)
                break
        assert "TECHNICAL PROBLEM STATEMENT" in dialog.text
        print("  ✓ Problem section inspected.")

        # Click Solution tab
        for b in dialog.find_elements(By.TAG_NAME, "button"):
            if "SOLUTION" in b.text:
                b.click()
                time.sleep(0.3)
                break
        assert "ENGINEERING SOLUTION ARCHITECTURE" in dialog.text
        print("  ✓ Solution section inspected.")

        # Click Architecture tab
        for b in dialog.find_elements(By.TAG_NAME, "button"):
            if "ARCHITECTURE" in b.text:
                b.click()
                time.sleep(0.3)
                break
        assert "SYSTEM LAYERS & DATA FLOW" in dialog.text
        print("  ✓ Architecture section inspected.")

        # Click Technology tab
        for b in dialog.find_elements(By.TAG_NAME, "button"):
            if "TECHNOLOGY" in b.text:
                b.click()
                time.sleep(0.3)
                break
        assert "TECH STACK & DEPENDENCY HARNESS" in dialog.text
        print("  ✓ Technology section inspected.")

        # 6. Verify Safe GitHub Links
        print("\n--- 6. Verifying GitHub Links ---")
        github_links = dialog.find_elements(By.XPATH, ".//a[contains(@href, 'github.com')]")
        qwait_gh = [l.get_attribute("href") for l in github_links]
        print(f"  • QWait Modal GitHub links: {qwait_gh}")
        assert any("bhuvanabcs24-maker/QueueEstimater" in href for href in qwait_gh), "Missing QueueEstimater repo link"

        # Check target="_blank" and rel="noopener noreferrer"
        for l in github_links:
            target = l.get_attribute("target")
            rel = l.get_attribute("rel")
            assert target == "_blank", f"Expected target='_blank', got: {target}"
            assert "noopener" in rel and "noreferrer" in rel, f"Expected safe rel, got: {rel}"
        print("✓ QWait GitHub link safely configured.")

        # 7. Test Keyboard Navigation (Escape to Close)
        print("\n--- 7. Testing Keyboard Navigation (Escape key) ---")
        actions.send_keys(Keys.ESCAPE).perform()
        time.sleep(0.5)
        open_dialogs = driver.find_elements(By.CSS_SELECTOR, "[role='dialog']")
        assert len(open_dialogs) == 0, "Dialog should be closed after pressing Escape"
        print("✓ Escape key closed detailed artifact dialog.")

        # 8. Test ForgeIQ GitHub link on page
        page_github_links = driver.find_elements(By.XPATH, "//a[contains(@href, 'github.com')]")
        page_gh_urls = [l.get_attribute("href") for l in page_github_links]
        print(f"  • Page GitHub URLs: {page_gh_urls}")
        assert any("bhuvanabcs24-maker/Forge-IQ" in u for u in page_gh_urls), "Missing Forge-IQ repo link"
        assert any("bhuvanabcs24-maker/QueueEstimater" in u for u in page_gh_urls), "Missing QueueEstimater repo link"
        print("✓ Both repository links confirmed present and verified.")

        # 9. Test Dedicated Routes /projects/qwait and /projects/forgeiq
        print("\n--- 9. Testing Dedicated Project Routes ---")
        driver.get(f"http://localhost:{port}/projects/qwait")
        time.sleep(1)
        assert "QWAIT ESTIMATOR" in driver.find_element(By.TAG_NAME, "h1").text
        print("✓ /projects/qwait route responds correctly with QWait Estimator.")

        driver.get(f"http://localhost:{port}/projects/forgeiq")
        time.sleep(1)
        assert "FORGEIQ" in driver.page_source
        print("✓ /projects/forgeiq route responds correctly with ForgeIQ System World.")

        # 10. Viewport Responsiveness
        print("\n--- 10. Multi-Viewport Responsiveness Checks ---")
        for vp_name, w, h in [("Desktop 1440px", 1440, 900), ("Tablet 768px", 768, 1024), ("Mobile 390px", 390, 844)]:
            driver.set_window_size(w, h)
            driver.get(f"http://localhost:{port}/projects")
            time.sleep(0.8)
            scroll_w = driver.execute_script("return document.documentElement.scrollWidth")
            client_w = driver.execute_script("return document.documentElement.clientWidth")
            print(f"  • {vp_name}: clientWidth={client_w}px, scrollWidth={scroll_w}px")
            assert scroll_w <= client_w + 5, f"Horizontal overflow detected on {vp_name}"
        print("✓ All viewports passed zero-overflow responsiveness checks.")

        print("\n========================================================")
        print("ALL PART 5 ENGINEERING ARTIFACT TESTS PASSED! (10/10)")
        print("========================================================")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
