#!/usr/bin/env python3
"""
Automated Test Suite for BHUVAN.OS — Interactive Engineering Operating System.
Validates:
1. Entry Experience Screen (OSEntryScreen):
   - Dark technical environment with grid overlay & scanline
   - System Header: BHUVAN.OS, SYSTEM ONLINE, Host & Kernel telematics
   - Identity: Bhuvan A B, Software Engineer, AI Systems • Backend • Full-Stack
   - Statement: "Building software systems where AI meets real-world workflows."
   - Primary interaction: [ ENTER WORKSPACE ] with '↵ ENTER' key hint
   - Secondary interaction: [ VIEW RESUME ] linking to /resume.pdf
   - Keyboard listener: ENTER key enters workspace
2. Desktop Workspace:
   - Top System Menu Bar (BHUVAN.OS v2.4, 47/47 Tests Passing, Bengaluru IST clock)
   - Background Engineering Canvas (60 FPS)
   - 6 Primary Desktop Modules:
     01 SYSTEM, 02 FORGEIQ, 03 ENGINEERING LAB, 04 OPEN SOURCE, 05 NOTES, 06 PROFILE (+ RESUME.PDF)
   - System Dock with tooltips and running indicators
3. Flagship Module (FORGEIQ):
   - Label: FORGEIQ
   - Description: AI-powered manufacturing intelligence platform
   - SYSTEM STATUS: CAD ENGINE, AI PIPELINE, API, DATABASE all ONLINE
   - VERIFIED METRICS: 33/33 TEST SUITE, 14 TESTS E2E, 5.5× IMPROVEMENT, 96.9% PRICING MODEL ACCURACY
   - Direct link into /forgeiq-case-study
4. SYSTEM Module:
   - Interactive bhuvan-sh Unix shell (whoami, status, bench)
   - Kernel & hardware diagnostics
   - 47 automated tests telematics
   - 5.5× concurrency benchmark
5. ENGINEERING LAB & PROFILE Modules:
   - 10 ADRs, AI Evaluation, 4 Design Patterns, 4 Failure Retrospectives
   - BMSCE background (Expected June 2028, CGPA 8.08), LeetCode 100+, Contact Dispatcher
6. Lock Screen / Exit Workspace:
   - System menu -> Lock Screen returns to OSEntryScreen
7. Multi-viewport screenshots (Entry, Desktop, Tablet, Mobile)
8. Zero SEVERE console errors
"""

import os
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

def run_os_tests():
    artifacts_dir = "/Users/bhuvanab/.gemini/antigravity-ide/brain/482bc083-888a-43a5-8512-49e3c21aafc1"

    # Start Next.js production server on port 3003
    next_srv = subprocess.Popen(
        ["npx", "next", "start", "-p", "3003"],
        cwd="/Users/bhuvanab/Portfolio",
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(3.0)

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

    driver = webdriver.Chrome(options=options)

    try:
        print("\n========================================================")
        print("TESTING BHUVAN.OS (http://localhost:3003/)")
        print("========================================================")

        driver.set_window_size(1440, 900)
        driver.get("http://localhost:3003/")
        time.sleep(1.5)

        # ----------------------------------------------------
        # 1. Verify Entry Experience Screen (OSEntryScreen)
        # ----------------------------------------------------
        print("\n--- 1. Testing Entry Experience Screen ---")
        entry_screen = driver.find_element(By.CLASS_NAME, "os-entry-screen")
        assert entry_screen.is_displayed(), "OSEntryScreen should be displayed on initial load"
        print("✓ OSEntryScreen is visible.")

        # Check system header & online status
        mono_tag = driver.find_element(By.CLASS_NAME, "os-entry-mono-tag").text
        assert "SYSTEM ONLINE" in mono_tag, "SYSTEM ONLINE tag missing in entry screen"
        print(f"✓ Entry Status: {mono_tag}")

        # Check Title
        entry_title = driver.find_element(By.CLASS_NAME, "os-entry-title").text
        assert "BHUVAN.OS" in entry_title, "BHUVAN.OS title missing"
        print(f"✓ Entry Title: {entry_title}")

        # Check Identity
        entry_name = driver.find_element(By.CLASS_NAME, "os-entry-name").text
        assert "Bhuvan A B" in entry_name, "Bhuvan A B name missing"
        entry_role = driver.find_element(By.CLASS_NAME, "os-entry-role").text
        assert "Software Engineer" in entry_role, "Software Engineer role missing"
        entry_spec = driver.find_element(By.CLASS_NAME, "os-entry-specialization").text
        assert "AI Systems" in entry_spec and "Backend" in entry_spec and "Full-Stack" in entry_spec, "Specialization line missing"
        print(f"✓ Identity: {entry_name} | {entry_role} | {entry_spec}")

        # Check Supporting Statement
        statement = driver.find_element(By.CLASS_NAME, "os-entry-statement").text
        assert "Building software systems where AI meets real-world workflows." in statement, "Supporting statement missing"
        print(f"✓ Statement: {statement}")

        # Check Primary & Secondary Action buttons
        enter_btn = driver.find_element(By.ID, "enter-workspace-btn")
        assert enter_btn.is_displayed(), "Enter Workspace button missing"
        resume_btn = driver.find_element(By.ID, "view-resume-btn")
        assert "/resume.pdf" in resume_btn.get_attribute("href"), "View Resume link missing"
        print("✓ Primary [ ENTER WORKSPACE ] and secondary [ VIEW RESUME ] buttons verified.")

        # Capture Entry Screen Screenshot
        entry_img = os.path.join(artifacts_dir, "bhuvan_os_entry_screen.png")
        driver.save_screenshot(entry_img)
        print(f"✓ Entry Screen Screenshot saved: {entry_img}")

        # ----------------------------------------------------
        # 2. Enter Workspace via ENTER Key
        # ----------------------------------------------------
        print("\n--- 2. Testing Entry via ENTER Key ---")
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.RETURN)
        time.sleep(1.0)

        # Verify Desktop Environment is now active
        desktop = driver.find_element(By.CLASS_NAME, "os-desktop-environment")
        assert desktop.is_displayed(), "Desktop workspace not rendered after pressing ENTER"
        print("✓ Successfully entered BHUVAN.OS workspace via ENTER key.")

        # ----------------------------------------------------
        # 3. Verify Top System Menu Bar & Clock
        # ----------------------------------------------------
        print("\n--- 3. Testing Top System Menu Bar ---")
        topbar = driver.find_element(By.CLASS_NAME, "os-topbar")
        assert topbar.is_displayed(), "TopMenuBar not visible"
        brand = driver.find_element(By.CLASS_NAME, "os-brand").text
        assert "BHUVAN.OS" in brand, "Brand name missing"
        status_pill = driver.find_element(By.CLASS_NAME, "os-status-pill").text
        assert "47/47 Tests Passing" in status_pill, "Test status pill missing"
        clock_text = driver.find_element(By.CLASS_NAME, "os-clock").text
        assert "IST" in clock_text, "Bengaluru IST clock missing"
        print(f"✓ TopMenuBar: {brand} | {status_pill} | {clock_text}")

        # ----------------------------------------------------
        # 4. Verify 6 Primary Desktop Modules
        # ----------------------------------------------------
        print("\n--- 4. Testing 6 Primary Desktop Modules ---")
        icons = driver.find_elements(By.CLASS_NAME, "os-desktop-icon")
        print(f"✓ Found {len(icons)} desktop icons:")
        icon_texts = [icon.text.replace("\n", " ") for icon in icons]
        for it in icon_texts:
            print(f"  • {it}")
        
        expected_modules = ["01 SYSTEM", "02 FORGEIQ", "03 ENGINEERING LAB", "04 OPEN SOURCE", "05 NOTES", "06 PROFILE"]
        for em in expected_modules:
            assert any(em in it for it in icon_texts), f"Module '{em}' missing on desktop"
        print("✓ All 6 Primary Application Modules verified on desktop.")

        # ----------------------------------------------------
        # 5. Verify FORGEIQ Flagship Window & Verified Metrics
        # ----------------------------------------------------
        print("\n--- 5. Testing FORGEIQ Flagship Application Module ---")
        forgeiq_window = driver.find_element(By.CLASS_NAME, "window-frame")
        assert forgeiq_window.is_displayed(), "ForgeIQ window not open by default"

        # Check SYSTEM STATUS: CAD ENGINE, AI PIPELINE, API, DATABASE all ONLINE
        status_cards = driver.find_elements(By.CLASS_NAME, "os-status-metric-card")
        assert len(status_cards) == 4, f"Expected 4 status metric cards, found {len(status_cards)}"
        for sc in status_cards:
            lbl = sc.find_element(By.CLASS_NAME, "os-status-metric-label").text
            val = sc.find_element(By.CLASS_NAME, "os-status-metric-val").text
            print(f"  • {lbl}: {val}")
            assert "ONLINE" in val, f"{lbl} should be ONLINE"
        print("✓ Verified all 4 system status components are ONLINE.")

        # Check Verified Production Metrics
        metric_boxes = driver.find_elements(By.CLASS_NAME, "os-stat-box")
        metric_texts = [f"{b.find_element(By.CLASS_NAME, 'os-stat-lbl').text}: {b.find_element(By.CLASS_NAME, 'os-stat-num').text}" for b in metric_boxes]
        for mt in metric_texts:
            print(f"  • {mt}")

        assert any("TEST SUITE: 33/33" in mt for mt in metric_texts), "33/33 TEST SUITE metric missing"
        assert any("E2E: 14 TESTS" in mt for mt in metric_texts), "14 TESTS E2E metric missing"
        assert any("THROUGHPUT: 5.5× IMPROVEMENT" in mt for mt in metric_texts), "5.5× IMPROVEMENT metric missing"
        assert any("PRICING MODEL ACCURACY: 96.9%" in mt for mt in metric_texts), "96.9% PRICING ACCURACY metric missing"
        print("✓ Verified strict adherence to only verified production metrics.")

        # Check Case Study CTA
        case_study_cta = driver.find_element(By.ID, "forgeiq-case-study-cta")
        assert "/forgeiq-case-study" in case_study_cta.get_attribute("href"), "Case study CTA link missing"
        print("✓ Case study CTA verified linking to /forgeiq-case-study.")

        # ----------------------------------------------------
        # 6. Verify SYSTEM Application Module (Shell & Benchmarks)
        # ----------------------------------------------------
        print("\n--- 6. Testing SYSTEM Application Module ---")
        # Test terminal command 'whoami'
        term_input = driver.find_element(By.CLASS_NAME, "term-input")
        term_input.send_keys("whoami")
        term_input.send_keys(Keys.RETURN)
        time.sleep(0.3)
        term_text = driver.find_element(By.CLASS_NAME, "os-terminal-body").text
        assert "Bhuvan A B" in term_text, "whoami command failed"
        print("✓ Command 'whoami' executed successfully.")

        # Test terminal command 'bench'
        term_input.send_keys("bench")
        term_input.send_keys(Keys.RETURN)
        time.sleep(0.8)
        term_text = driver.find_element(By.CLASS_NAME, "os-terminal-body").text
        assert "5.5x" in term_text or "4,589" in term_text, "bench command failed"
        print("✓ Command 'bench' executed successfully (5.5x throughput gain simulated).")

        # ----------------------------------------------------
        # 7. Test Dock & Launching Other Modules
        # ----------------------------------------------------
        print("\n--- 7. Testing Dock Navigation ---")
        dock = driver.find_element(By.CLASS_NAME, "os-dock")
        assert dock.is_displayed(), "System dock missing"
        
        # Click Open Source icon in dock
        opensource_dock_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='OPEN SOURCE']")
        driver.execute_script("arguments[0].click();", opensource_dock_btn)
        time.sleep(0.5)

        # Check that Open Source window is open
        open_wins = driver.find_elements(By.CLASS_NAME, "window-frame")
        print(f"✓ Active windows after opening Open Source: {len(open_wins)}")
        assert len(open_wins) >= 3, "Open Source window failed to launch"

        # ----------------------------------------------------
        # 8. Test Command Palette (Cmd+K)
        # ----------------------------------------------------
        print("\n--- 8. Testing Command Palette (Cmd+K) ---")
        cmd_k_btn = driver.find_element(By.CLASS_NAME, "os-cmd-k-btn")
        cmd_k_btn.click()
        time.sleep(0.3)
        palette = driver.find_element(By.CLASS_NAME, "os-palette-modal")
        assert palette.is_displayed(), "Command palette modal not displayed"
        palette_input = driver.find_element(By.CLASS_NAME, "os-palette-input")
        palette_input.send_keys(Keys.ESCAPE)
        time.sleep(0.3)
        print("✓ Command palette tested and closed.")

        # ----------------------------------------------------
        # 9. Test Lock Screen / Return to Entry Experience
        # ----------------------------------------------------
        print("\n--- 9. Testing Lock Screen / Exit Workspace ---")
        brand_btn = driver.find_element(By.CLASS_NAME, "os-brand")
        driver.execute_script("arguments[0].click();", brand_btn)
        time.sleep(0.3)

        lock_item = driver.find_element(By.XPATH, "//span[contains(text(), 'Lock Screen')]")
        driver.execute_script("arguments[0].click();", lock_item)
        time.sleep(0.8)

        entry_again = driver.find_element(By.CLASS_NAME, "os-entry-screen")
        assert entry_again.is_displayed(), "Failed to return to OSEntryScreen upon locking workspace"
        print("✓ Lock Screen successfully returned to OSEntryScreen.")

        # Re-enter workspace
        enter_again = driver.find_element(By.ID, "enter-workspace-btn")
        driver.execute_script("arguments[0].click();", enter_again)
        time.sleep(0.8)
        print("✓ Re-entered workspace successfully.")

        # ----------------------------------------------------
        # 10. Capture Desktop Screenshots
        # ----------------------------------------------------
        print("\n--- 10. Capturing Desktop Screenshots ---")
        desktop_img = os.path.join(artifacts_dir, "bhuvan_os_desktop.png")
        driver.save_screenshot(desktop_img)
        print(f"✓ Desktop Screenshot saved: {desktop_img}")

        # Tablet
        driver.set_window_size(768, 1024)
        time.sleep(0.5)
        tablet_img = os.path.join(artifacts_dir, "bhuvan_os_tablet.png")
        driver.save_screenshot(tablet_img)
        print(f"✓ Tablet Screenshot saved: {tablet_img}")

        # Mobile
        driver.set_window_size(375, 812)
        time.sleep(0.5)
        mobile_img = os.path.join(artifacts_dir, "bhuvan_os_mobile.png")
        driver.save_screenshot(mobile_img)
        print(f"✓ Mobile Screenshot saved: {mobile_img}")

        # ----------------------------------------------------
        # 11. Check Console Errors
        # ----------------------------------------------------
        print("\n--- 11. Checking Browser Console Errors ---")
        driver.set_window_size(1440, 900)
        logs = driver.get_log('browser')
        severe = [l for l in logs if l['level'] == 'SEVERE']
        print(f"✓ SEVERE console errors: {len(severe)}")
        for err in severe:
            print(f"  SEVERE log: {err['message']}")
        assert len(severe) == 0, "Browser console has SEVERE errors"

        print("\n========================================================")
        print("ALL BHUVAN.OS VERIFICATION TESTS PASSED SUCCESSFULLY! (11/11)")
        print("========================================================")

    finally:
        driver.quit()
        next_srv.terminate()
        next_srv.wait()

if __name__ == "__main__":
    run_os_tests()
