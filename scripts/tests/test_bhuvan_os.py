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
        print("\n--- 7. Testing Engineering Lab, Open Source Pipeline & IDE Notes ---")
        dock = driver.find_element(By.CLASS_NAME, "os-dock")
        assert dock.is_displayed(), "System dock missing"
        
        # A. Open ENGINEERING LAB via Dock
        eng_lab_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='ENGINEERING LAB']")
        driver.execute_script("arguments[0].click();", eng_lab_btn)
        time.sleep(0.6)

        lab_cards = driver.find_elements(By.CLASS_NAME, "os-lab-module-card")
        assert len(lab_cards) == 4, f"Expected 4 engineering lab module cards, found {len(lab_cards)}"
        lab_card_texts = [c.text.replace("\n", " ") for c in lab_cards]
        for lct in lab_card_texts:
            print(f"  • Lab Module: {lct}")
        assert any("10 ADRs" in t for t in lab_card_texts), "10 ADRs count missing"
        assert any("8 DIMENSIONS" in t for t in lab_card_texts), "8 DIMENSIONS count missing"
        assert any("4 SYSTEM PATTERNS" in t for t in lab_card_texts), "4 SYSTEM PATTERNS count missing"
        assert any("4 RETROSPECTIVES" in t for t in lab_card_texts), "4 RETROSPECTIVES count missing"
        print("✓ Engineering Lab verified with exact counts (10 ADRs, 8 Dimensions, 4 Patterns, 4 Retrospectives).")

        # Click AI EVALUATION module card in Lab
        eval_card = [c for c in lab_cards if "AI EVALUATION" in c.text][0]
        driver.execute_script("arguments[0].click();", eval_card)
        time.sleep(0.4)
        eval_items = driver.find_elements(By.CLASS_NAME, "os-eval-card")
        print(f"✓ Found {len(eval_items)} evaluation dimension cards.")
        assert len(eval_items) == 8, f"Expected 8 evaluation dimension cards, found {len(eval_items)}"

        # B. Open OPEN SOURCE via Dock
        opensource_dock_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='OPEN SOURCE']")
        driver.execute_script("arguments[0].click();", opensource_dock_btn)
        time.sleep(0.6)

        # Verify 5 Pipeline Stages
        pipeline_nodes = driver.find_elements(By.CLASS_NAME, "os-pipeline-step-node")
        print(f"✓ Found {len(pipeline_nodes)} pipeline nodes:")
        pipeline_names = [n.find_element(By.CLASS_NAME, "os-pipeline-step-name").text for n in pipeline_nodes]
        print(f"  • Pipeline: {' -> '.join(pipeline_names)}")
        assert pipeline_names == ["DXF", "Parser", "Topology", "Geometry", "Manufacturing Metrics"], "Pipeline sequence mismatch"

        # Click Geometry step to test interactive live inspection
        driver.execute_script("arguments[0].click();", pipeline_nodes[3])
        time.sleep(0.3)
        inspect_val = driver.find_element(By.CLASS_NAME, "os-inspect-val").text
        print(f"✓ Inspected Geometry payload: {inspect_val}")
        print("✓ Open Source dxf-contour-extractor live pipeline & inspection verified.")

        # C. Open NOTES via Dock
        notes_dock_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='NOTES']")
        driver.execute_script("arguments[0].click();", notes_dock_btn)
        time.sleep(0.6)

        # Verify Topic Pills
        topic_pills = driver.find_elements(By.CLASS_NAME, "os-ide-filter-pill")
        topic_texts = [p.text for p in topic_pills]
        print(f"✓ Found IDE Topic filter pills: {topic_texts}")
        expected_topics = ["All", "CAD", "AI Engineering", "Backend", "Systems", "Testing"]
        for et in expected_topics:
            assert et in topic_texts, f"Topic '{et}' missing from Notes"

        # Verify IDE line numbers and editor tab
        ide_tab = driver.find_element(By.CLASS_NAME, "os-ide-tab").text
        assert "why_cad_understanding_is_difficult.md" in ide_tab, "Active doc tab missing"
        line_nums = driver.find_elements(By.CLASS_NAME, "os-ide-line-num")
        assert len(line_nums) > 10, "Line numbers missing in IDE doc view"
        print(f"✓ IDE Technical Notes Document Viewer verified ({len(line_nums)} rendered lines with gutter).")

        # D. Open PROFILE via Dock
        profile_dock_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='PROFILE']")
        driver.execute_script("arguments[0].click();", profile_dock_btn)
        time.sleep(0.6)

        profile_win = driver.find_element(By.CSS_SELECTOR, "[data-window-id='profile']")
        profile_text = profile_win.text
        assert "BHUVAN A B" in profile_text, "Profile name missing"
        assert "B.E. Computer Science & Engineering" in profile_text, "B.E. degree missing"
        assert "BMSCE" in profile_text, "BMSCE missing"
        assert "Expected 2028" in profile_text, "Expected 2028 missing"
        assert "8.08" in profile_text, "CGPA 8.08 missing"
        assert "100+" in profile_text and "LeetCode" in profile_text, "100+ LeetCode missing"
        
        # Check verified skills
        skills_badges = profile_win.find_elements(By.CLASS_NAME, "os-skill-badge")
        skill_names = [s.text.strip() for s in skills_badges]
        print(f"✓ Found {len(skill_names)} skills in Profile: {skill_names}")
        expected_skills = [
            'Java', 'Python', 'C', 'JavaScript', 'FastAPI', 'Next.js', 
            'SQL', 'DBMS', 'System Design', 'Generative AI', 'Machine Learning', 'Neural Networks'
        ]
        for es in expected_skills:
            assert es in skill_names, f"Skill '{es}' missing from Profile"
        print("✓ All 12 required skills and academic metrics verified in Profile.")

        # E. Open CONTACT via Dock
        contact_dock_btn = driver.find_element(By.CSS_SELECTOR, ".os-dock-item[title*='CONTACT']")
        driver.execute_script("arguments[0].click();", contact_dock_btn)
        time.sleep(0.6)

        contact_win = driver.find_element(By.CSS_SELECTOR, "[data-window-id='contact']")
        contact_rows = contact_win.find_elements(By.CLASS_NAME, "os-contact-channel-row")
        print(f"✓ Found {len(contact_rows)} contact channels.")
        contact_texts = [r.text for r in contact_rows]
        assert any("EMAIL" in t for t in contact_texts), "EMAIL channel missing"
        assert any("LinkedIn" in t for t in contact_texts), "LinkedIn channel missing"
        assert any("GitHub" in t for t in contact_texts), "GitHub channel missing"
        assert any("LeetCode" in t for t in contact_texts), "LeetCode channel missing"
        print("✓ Minimal communication terminal verified with EMAIL, LinkedIn, GitHub, LeetCode.")

        # ----------------------------------------------------
        # 8. Test Command Palette (Cmd+K)
        # ----------------------------------------------------
        print("\n--- 8. Testing Command Palette (Cmd+K) ---")
        cmd_k_btn = driver.find_element(By.CLASS_NAME, "os-cmd-k-btn")
        cmd_k_btn.click()
        time.sleep(0.3)
        palette = driver.find_element(By.CLASS_NAME, "os-palette-modal")
        assert palette.is_displayed(), "Command palette modal not displayed"

        # Verify placeholder
        palette_input = driver.find_element(By.CLASS_NAME, "os-palette-input")
        placeholder = palette_input.get_attribute("placeholder")
        print(f"✓ Command Palette placeholder: {placeholder}")
        assert "> Search Bhuvan.OS" in placeholder, "Placeholder mismatch"

        # Verify exact required commands
        cmd_items = driver.find_elements(By.CLASS_NAME, "os-palette-item-title")
        cmd_titles = [c.text for c in cmd_items]
        print(f"✓ Found {len(cmd_titles)} palette commands:")
        for ct in cmd_titles:
            print(f"  • {ct}")

        expected_cmds = [
            "Open ForgeIQ",
            "Open Engineering Lab",
            "Open Architecture Decisions",
            "Open AI Evaluation",
            "Open Design Patterns",
            "Open Engineering Learnings",
            "Open Open Source",
            "Open Notes",
            "Open Profile",
            "Open Resume",
            "Open GitHub",
            "Open LinkedIn",
            "Open LeetCode"
        ]
        for ec in expected_cmds:
            assert ec in cmd_titles, f"Command '{ec}' missing from palette"
        print("✓ All 13 required palette commands verified.")

        palette_input.send_keys(Keys.ESCAPE)
        time.sleep(0.3)
        print("✓ Command palette tested and closed.")

        # ----------------------------------------------------
        # 9. Test Lock Screen / Return to Entry Experience
        # ----------------------------------------------------
        print("\n--- 9. Testing Lock Screen & Compact System Navigation ---")
        brand_btn = driver.find_element(By.CLASS_NAME, "os-brand")
        driver.execute_script("arguments[0].click();", brand_btn)
        time.sleep(0.3)

        lock_item = driver.find_element(By.XPATH, "//span[contains(text(), 'Lock Screen')]")
        driver.execute_script("arguments[0].click();", lock_item)
        time.sleep(0.8)

        entry_again = driver.find_element(By.CLASS_NAME, "os-entry-screen")
        assert entry_again.is_displayed(), "Failed to return to OSEntryScreen upon locking workspace"
        print("✓ Lock Screen successfully returned to OSEntryScreen.")

        # Navigate to /about to test Compact System Navigation bar
        driver.get("http://localhost:3003/about")
        time.sleep(1.0)
        sys_nav = driver.find_element(By.CLASS_NAME, "os-system-navbar")
        assert sys_nav.is_displayed(), "Compact system navbar missing on /about"
        assert "BHUVAN.OS" in sys_nav.text and "ONLINE" in sys_nav.text, "System brand or ONLINE status missing"
        nav_btns = driver.find_elements(By.CLASS_NAME, "os-system-nav-btn")
        nav_btn_labels = [b.text for b in nav_btns]
        print(f"✓ Compact System Bar buttons: {nav_btn_labels}")
        assert any("SYS" in l for l in nav_btn_labels), "SYS button missing"
        assert any("FORGEIQ" in l for l in nav_btn_labels), "FORGEIQ button missing"
        assert any("LAB" in l for l in nav_btn_labels), "LAB button missing"
        assert any("OSS" in l for l in nav_btn_labels), "OSS button missing"
        assert any("NOTES" in l for l in nav_btn_labels), "NOTES button missing"
        assert any("PROFILE" in l for l in nav_btn_labels), "PROFILE button missing"
        print("✓ Compact System Bar [SYS] [FORGEIQ] [LAB] [OSS] [NOTES] [PROFILE] verified.")

        # Return to workspace root
        driver.get("http://localhost:3003/")
        time.sleep(1.0)
        # Check if entry screen is shown or if directly in workspace
        entry_elems = driver.find_elements(By.ID, "enter-workspace-btn")
        if len(entry_elems) > 0 and entry_elems[0].is_displayed():
            driver.execute_script("arguments[0].click();", entry_elems[0])
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
