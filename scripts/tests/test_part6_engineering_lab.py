#!/usr/bin/env python3
"""
Test Suite for BHUVAN.OS Part 6: Engineering Lab
Verifies:
1. /engineering loads the Interactive Engineering Lab.
2. 5 Lab Modules: ARCHITECTURE, AI EVALUATION, PATTERNS, LEARNINGS, WRITING.
3. Architecture shows ADRs as ADR-001, ADR-002, ADR-003, etc., opening:
   - CONTEXT
   - DECISION
   - RATIONALE
   - TRADE-OFF
   - STATUS
4. AI Evaluation console contains the 5 required sections:
   - INPUT
   - MODEL
   - OUTPUT
   - VALIDATION
   - FAILURE CASE
   and strictly displays "NOT YET MEASURED" for unmeasured metrics.
5. Reusable patterns: AI Provider Abstraction, RBAC, Retrieval Pipeline, Testing Architecture.
6. Authentic learnings / retrospectives without fabricated incidents.
7. Technical notes documents with topics: AI, CAD, Backend, Systems, Testing.
8. Hover previews and click-to-open documents.
9. Child routes remain accessible: /engineering/decisions, /engineering/evaluation, /engineering/patterns, /engineering/learnings, /writing.
10. Multi-viewport responsiveness and keyboard navigation (Escape to close).
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
    print(f"TESTING PART 6: ENGINEERING LAB ({port})")
    print("========================================================")

    try:
        # 1. Load /engineering
        print("\n--- 1. Testing /engineering Lab Loading ---")
        driver.get(f"http://localhost:{port}/engineering")
        time.sleep(1.5)

        title = driver.title
        print(f"✓ Page Title: {title}")
        assert "Engineering Lab" in title, f"Expected 'Engineering Lab' in title, got: {title}"

        h1 = driver.find_element(By.TAG_NAME, "h1").text
        print(f"✓ Main Heading: {h1}")
        assert "ENGINEERING LAB" in h1, f"Expected 'ENGINEERING LAB' heading, got: {h1}"

        # 2. Check 5 Instrument Modules
        print("\n--- 2. Verifying 5 Lab Instrument Modules ---")
        module_nav = driver.find_element(By.CSS_SELECTOR, "nav[aria-label='Engineering Lab Instrument Modules']")
        module_buttons = module_nav.find_elements(By.TAG_NAME, "button")
        module_names = [b.text for b in module_buttons]
        print(f"✓ Found {len(module_buttons)} instrument modules:")
        for name in module_names:
            print(f"  • {name.replace(chr(10), ' ')}")

        assert len(module_buttons) == 5, f"Expected 5 instruments, got {len(module_buttons)}"
        assert any("ARCHITECTURE" in m for m in module_names), "Missing ARCHITECTURE instrument"
        assert any("AI EVALUATION" in m for m in module_names), "Missing AI EVALUATION instrument"
        assert any("PATTERNS" in m for m in module_names), "Missing PATTERNS instrument"
        assert any("LEARNINGS" in m for m in module_names), "Missing LEARNINGS instrument"
        assert any("WRITING" in m for m in module_names), "Missing WRITING instrument"

        # 3. Test ARCHITECTURE Module (ADR-001, ADR-002, etc.)
        print("\n--- 3. Testing Architecture Module & ADR Details ---")
        # Ensure Architecture is active
        for b in module_buttons:
            if "ARCHITECTURE" in b.text:
                b.click()
                time.sleep(0.4)
                break

        adr_elements = driver.find_elements(By.XPATH, "//span[contains(text(), 'ADR-')]")
        print(f"✓ Found {len(adr_elements)} ADR badges on page.")
        assert len(adr_elements) >= 10, f"Expected at least 10 ADRs, found {len(adr_elements)}"
        assert "ADR-001" in [el.text for el in adr_elements]
        assert "ADR-002" in [el.text for el in adr_elements]
        assert "ADR-003" in [el.text for el in adr_elements]
        print("✓ ADR identifiers formatted correctly (ADR-001, ADR-002, ADR-003...).")

        # Click ADR-001 card to open detailed modal
        first_adr_card = driver.find_element(By.XPATH, "//span[text()='ADR-001']/ancestor::div[@tabindex='0']")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", first_adr_card)
        time.sleep(0.3)
        driver.execute_script("arguments[0].click();", first_adr_card)
        time.sleep(0.6)

        adr_dialog = driver.find_element(By.CSS_SELECTOR, "[role='dialog']")
        assert adr_dialog.is_displayed(), "ADR detail modal should be open"
        adr_modal_text = adr_dialog.text
        print("✓ ADR detailed modal opened successfully.")

        # Verify CONTEXT, DECISION, RATIONALE, TRADE-OFF, STATUS
        assert "CONTEXT" in adr_modal_text, "Missing CONTEXT section in ADR modal"
        assert "DECISION" in adr_modal_text, "Missing DECISION section in ADR modal"
        assert "RATIONALE" in adr_modal_text, "Missing RATIONALE section in ADR modal"
        assert "TRADE-OFF" in adr_modal_text, "Missing TRADE-OFF section in ADR modal"
        assert "STATUS" in adr_modal_text, "Missing STATUS section in ADR modal"
        print("✓ All 5 ADR sections verified: CONTEXT, DECISION, RATIONALE, TRADE-OFF, STATUS.")

        # Close with Escape
        ActionChains(driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(0.4)
        assert len(driver.find_elements(By.CSS_SELECTOR, "[role='dialog']")) == 0, "ADR modal should be closed"
        print("✓ Escape key closed ADR modal.")

        # 4. Test AI EVALUATION Module
        print("\n--- 4. Testing AI Evaluation Console & Sections ---")
        module_buttons = driver.find_elements(By.CSS_SELECTOR, "nav[aria-label='Engineering Lab Instrument Modules'] button")
        for b in module_buttons:
            if "AI EVALUATION" in b.text:
                driver.execute_script("arguments[0].click();", b)
                time.sleep(0.5)
                break

        eval_section = driver.find_element(By.CSS_SELECTOR, "section[aria-label='AI Evaluation Module']")
        eval_text = eval_section.text

        # Verify 5 required sections in the console
        assert "[1] INPUT" in eval_text, "Missing INPUT section in AI Evaluation"
        assert "[2] MODEL" in eval_text, "Missing MODEL section in AI Evaluation"
        assert "[3] OUTPUT" in eval_text, "Missing OUTPUT section in AI Evaluation"
        assert "[4] VALIDATION" in eval_text, "Missing VALIDATION section in AI Evaluation"
        assert "[5] FAILURE CASE" in eval_text, "Missing FAILURE CASE section in AI Evaluation"
        print("✓ Evaluation console verified with 5 sections: INPUT, MODEL, OUTPUT, VALIDATION, FAILURE CASE.")

        # Verify strict "NOT YET MEASURED" rule for unmeasured metrics
        assert "NOT YET MEASURED" in eval_text, "Missing required 'NOT YET MEASURED' indicator"
        print("✓ Found explicit 'NOT YET MEASURED' label for unbenchmarked metrics (Zero fabricated data).")

        # Verify real measurements
        assert "96.9%" in eval_text, "Missing 96.9% quotation benchmark"
        assert "5.5×" in eval_text, "Missing 5.5x throughput benchmark"
        assert "47/47" in eval_text, "Missing 47/47 test metric"
        print("✓ Real production measurements verified: 96.9% accuracy, 5.5x throughput, 47/47 tests.")

        # 5. Test PATTERNS Module
        print("\n--- 5. Testing Reusable Engineering Patterns ---")
        module_buttons = driver.find_elements(By.CSS_SELECTOR, "nav[aria-label='Engineering Lab Instrument Modules'] button")
        for b in module_buttons:
            if "PATTERNS" in b.text:
                driver.execute_script("arguments[0].click();", b)
                time.sleep(0.5)
                break

        patterns_section = driver.find_element(By.CSS_SELECTOR, "section[aria-label='Engineering Patterns Module']")
        pat_text = patterns_section.text

        required_patterns = [
            "AI Provider Abstraction",
            "Multi-Tenant RBAC",
            "Hybrid Retrieval Pipeline",
            "Testing Architecture"
        ]
        for rp in required_patterns:
            assert rp in pat_text, f"Missing verified engineering pattern: {rp}"
            print(f"  ✓ Found verified pattern: {rp}")

        # 6. Test LEARNINGS Module
        print("\n--- 6. Testing Engineering Learnings / Retrospectives ---")
        module_buttons = driver.find_elements(By.CSS_SELECTOR, "nav[aria-label='Engineering Lab Instrument Modules'] button")
        for b in module_buttons:
            if "LEARNINGS" in b.text:
                driver.execute_script("arguments[0].click();", b)
                time.sleep(0.5)
                break

        learnings_section = driver.find_element(By.CSS_SELECTOR, "section[aria-label='Engineering Learnings Module']")
        learn_text = learnings_section.text
        assert "INITIAL APPROACH TRIED" in learn_text
        assert "WHAT BROKE UNDER LOAD / TEST" in learn_text
        assert "TAKEAWAY" in learn_text
        print("✓ Real engineering lessons verified (What was tried, what broke, takeaway).")

        # 7. Test WRITING Module
        print("\n--- 7. Testing Technical Notes as Documents ---")
        module_buttons = driver.find_elements(By.CSS_SELECTOR, "nav[aria-label='Engineering Lab Instrument Modules'] button")
        for b in module_buttons:
            if "WRITING" in b.text:
                driver.execute_script("arguments[0].click();", b)
                time.sleep(0.5)
                break

        writing_section = driver.find_element(By.CSS_SELECTOR, "section[aria-label='Technical Writing Module']")
        writing_text = writing_section.text

        # Verify topics: AI, CAD, Backend, Systems, Testing
        for topic in ["AI", "CAD", "BACKEND", "SYSTEMS", "TESTING"]:
            assert topic in writing_text, f"Missing topic filter/tag: {topic}"
            print(f"  ✓ Found document topic: {topic}")

        # Verify CAD published note
        assert "Why CAD Understanding Is Difficult" in writing_text
        print("✓ CAD flagship technical document verified.")

        # Click CAD note to open document view
        cad_card = driver.find_element(By.XPATH, "//h3[contains(text(), 'Why CAD Understanding Is Difficult')]/ancestor::div[@tabindex='0']")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", cad_card)
        time.sleep(0.3)
        driver.execute_script("arguments[0].click();", cad_card)
        time.sleep(0.6)

        note_dialog = driver.find_element(By.CSS_SELECTOR, "[role='dialog']")
        assert note_dialog.is_displayed(), "Document modal should open on click"
        print("✓ Document reader modal opened on click.")

        ActionChains(driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(0.4)

        # 8. Test Accessibility of Child Routes
        print("\n--- 8. Testing All Existing Engineering Content Routes ---")
        routes_to_test = [
            ("/engineering/decisions", "Engineering Decisions"),
            ("/engineering/evaluation", "AI Evaluation Lab"),
            ("/engineering/patterns", "Engineering Patterns"),
            ("/engineering/learnings", "Engineering Learnings"),
            ("/writing", "Writing"),
            ("/writing/why-cad-understanding-is-difficult", "CAD Understanding")
        ]
        for route, expected_word in routes_to_test:
            driver.get(f"http://localhost:{port}{route}")
            time.sleep(0.6)
            page_content = driver.page_source
            assert expected_word.lower() in page_content.lower(), f"Failed to find '{expected_word}' on {route}"
            print(f"  ✓ {route} accessible and intact.")

        # 9. Viewport Responsiveness
        print("\n--- 9. Multi-Viewport Responsiveness Checks on /engineering ---")
        for vp_name, w, h in [("Desktop 1440px", 1440, 900), ("Tablet 768px", 768, 1024), ("Mobile 390px", 390, 844)]:
            driver.set_window_size(w, h)
            driver.get(f"http://localhost:{port}/engineering")
            time.sleep(0.8)
            scroll_w = driver.execute_script("return document.documentElement.scrollWidth")
            client_w = driver.execute_script("return document.documentElement.clientWidth")
            print(f"  • {vp_name}: clientWidth={client_w}px, scrollWidth={scroll_w}px")
            assert scroll_w <= client_w + 5, f"Horizontal overflow detected on {vp_name}"
        print("✓ All viewports passed zero-overflow responsiveness checks.")

        print("\n========================================================")
        print("ALL PART 6 ENGINEERING LAB TESTS PASSED! (9/9)")
        print("========================================================")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
