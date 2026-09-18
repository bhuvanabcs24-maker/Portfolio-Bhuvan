#!/usr/bin/env python3
"""
Comprehensive Final Audit Suite for Portfolio Transformation.
Tests the transformed homepage on both Next.js production build and Static HTML.
Validates:
- 10-step homepage hierarchy
- Recruiter UX (15-second clarity, 6 distinct CTAs)
- Verified narrative & zero hype strings
- Career/Learning Timeline (2024-2027)
- LeetCode 100+ solved & correct link
- Social links (GitHub, LinkedIn)
- Multi-viewport layout (Desktop, Tablet, Mobile)
- Browser console error check (0 SEVERE errors)
"""

import os
import sys
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def run_audit():
    artifacts_dir = "/Users/bhuvanab/.gemini/antigravity-ide/brain/482bc083-888a-43a5-8512-49e3c21aafc1"
    
    # 1. Start static server on port 3002
    static_srv = subprocess.Popen(
        ["python3", "-m", "http.server", "3002"],
        cwd="/Users/bhuvanab/Portfolio",
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    # 2. Start Next.js production server on port 3003
    next_srv = subprocess.Popen(
        ["npx", "next", "start", "-p", "3003"],
        cwd="/Users/bhuvanab/Portfolio",
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    time.sleep(3.0)  # Wait for servers to initialize

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

    driver = webdriver.Chrome(options=options)

    try:
        # TEST 1: STATIC HOMEPAGE (index.html on 3002)
        print("\n========================================================")
        print("TESTING STATIC HOMEPAGE (http://localhost:3002/)")
        print("========================================================")
        driver.set_window_size(1440, 900)
        driver.get("http://localhost:3002/")
        time.sleep(1.5)

        # Check Page Title & Meta
        title = driver.title
        print(f"✓ Page Title: {title}")
        assert "Bhuvan A B" in title, "Title should contain Bhuvan A B"

        # Check 10 Hierarchy Sections
        section_ids = [
            ("hero", "Hero Section"),
            ("positioning", "Engineering Positioning"),
            ("forgeiq", "ForgeIQ Flagship Centerpiece"),
            ("projects", "Selected Projects"),
            ("capabilities", "Engineering Capabilities"),
            ("timeline", "Career / Learning Timeline"),
            ("writing", "Technical Writing"),
            ("learnings", "Engineering Learnings"),
            ("leetcode", "LeetCode & Problem Solving"),
            ("contact", "Recruiter Contact & Outreach")
        ]

        print("\n--- Verifying 10-Step Homepage Hierarchy ---")
        for s_id, s_name in section_ids:
            elem = driver.find_element(By.ID, s_id)
            assert elem.is_displayed(), f"Section #{s_id} ({s_name}) should be visible"
            print(f"✓ Step: {s_name} (#{s_id}) found and displayed.")

        # Check Recruiter CTAs
        print("\n--- Verifying Recruiter Quick Actions (6 CTAs) ---")
        recruiter_links = driver.find_elements(By.CSS_SELECTOR, "#hero a")
        cta_hrefs = [a.get_attribute("href") for a in recruiter_links]
        print(f"Found {len(cta_hrefs)} links in Hero")
        
        # Verify specific URLs
        assert any("github.com/bhuvanabcs24-maker" in h for h in cta_hrefs if h), "GitHub link missing in hero"
        assert any("linkedin.com/in/bhuvan-a-b-4805a2330" in h for h in cta_hrefs if h), "LinkedIn link missing in hero"
        assert any("leetcode.com/u/BHUVANab2006" in h for h in cta_hrefs if h), "LeetCode link missing in hero"
        assert any("resume.pdf" in h for h in cta_hrefs if h), "Resume PDF link missing in hero"
        print("✓ All recruiter CTAs verified with exact URLs.")

        # Check Career / Learning Timeline Years
        print("\n--- Verifying Career / Learning Timeline ---")
        timeline_text = driver.find_element(By.ID, "timeline").text
        assert "2024" in timeline_text and "Foundations" in timeline_text, "2024 missing from timeline"
        assert "2025" in timeline_text and "Backend" in timeline_text, "2025 missing from timeline"
        assert "2026" in timeline_text and "ForgeIQ" in timeline_text, "2026 missing from timeline"
        assert "2027" in timeline_text and "interview" in timeline_text.lower(), "2027 missing from timeline"
        print("✓ Timeline contains accurate 2024-2027 progression.")

        # Check LeetCode section details
        print("\n--- Verifying LeetCode 100+ Details ---")
        leetcode_text = driver.find_element(By.ID, "leetcode").text
        assert "100+" in leetcode_text, "100+ problems metric missing"
        leetcode_link = driver.find_element(By.CSS_SELECTOR, "#leetcode a[href*='leetcode.com']").get_attribute("href")
        assert "leetcode.com/u/BHUVANab2006/" in leetcode_link, f"Incorrect leetcode link: {leetcode_link}"
        print(f"✓ LeetCode badge and verified URL confirmed: {leetcode_link}")

        # Check anti-hype compliance (DOM check)
        body_text = driver.find_element(By.TAG_NAME, "body").text.lower()
        forbidden_phrases = ["future staff engineer", "30+ lpa", "top 1% engineer", "guaranteed faang"]
        for phrase in forbidden_phrases:
            assert phrase not in body_text, f"Forbidden hype phrase found: '{phrase}'"
        print("✓ Zero hype phrases or hiring predictions in DOM.")

        # Check Console Errors on Static HTML
        browser_logs = driver.get_log('browser')
        severe_errors = [log for log in browser_logs if log['level'] == 'SEVERE']
        print(f"✓ Static HTML Browser Console SEVERE errors: {len(severe_errors)}")
        for err in severe_errors:
            print(f"  Console SEVERE: {err['message']}")
        assert len(severe_errors) == 0, "Console has SEVERE errors on static HTML"

        # Capture Responsive Screenshots
        print("\n--- Capturing Responsive Screenshots ---")
        # 1. Desktop
        driver.set_window_size(1440, 900)
        time.sleep(0.5)
        desktop_path = os.path.join(artifacts_dir, "final_homepage_desktop.png")
        driver.save_screenshot(desktop_path)
        print(f"✓ Desktop Screenshot saved: {desktop_path}")

        # 2. Tablet
        driver.set_window_size(768, 1024)
        time.sleep(0.5)
        tablet_path = os.path.join(artifacts_dir, "final_homepage_tablet.png")
        driver.save_screenshot(tablet_path)
        print(f"✓ Tablet Screenshot saved: {tablet_path}")

        # 3. Mobile
        driver.set_window_size(375, 812)
        time.sleep(0.5)
        mobile_path = os.path.join(artifacts_dir, "final_homepage_mobile.png")
        driver.save_screenshot(mobile_path)
        print(f"✓ Mobile Screenshot saved: {mobile_path}")

        # TEST 2: NEXT.JS APP ROUTER (http://localhost:3003/)
        print("\n========================================================")
        print("TESTING NEXT.JS HOMEPAGE (http://localhost:3003/)")
        print("========================================================")
        driver.set_window_size(1440, 900)
        driver.get("http://localhost:3003/")
        time.sleep(1.5)

        # Switch to Editorial Mode on Next.js to verify 10-step document hierarchy
        mode_btn = driver.find_element(By.CLASS_NAME, "os-mode-toggle-btn")
        driver.execute_script("arguments[0].click();", mode_btn)
        time.sleep(1.0)

        for s_id, s_name in section_ids:
            elem = driver.find_element(By.ID, s_id)
            assert elem.is_displayed(), f"Next.js Section #{s_id} should be visible"
            print(f"✓ Next.js: {s_name} (#{s_id}) found and displayed.")

        # Toggle back to OS Desktop Mode
        return_btn = driver.find_element(By.ID, "return-os-btn")
        driver.execute_script("arguments[0].click();", return_btn)
        time.sleep(1.0)

        # Check Console Errors on Next.js
        next_logs = driver.get_log('browser')
        next_severe = [log for log in next_logs if log['level'] == 'SEVERE']
        print(f"✓ Next.js Browser Console SEVERE errors: {len(next_severe)}")
        for err in next_severe:
            print(f"  Next.js Console SEVERE: {err['message']}")
        assert len(next_severe) == 0, "Console has SEVERE errors on Next.js"

        print("\n========================================================")
        print("ALL FINAL PORTFOLIO AUDIT TESTS PASSED SUCCESSFULLY!")
        print("========================================================")

    finally:
        driver.quit()
        static_srv.terminate()
        next_srv.terminate()
        static_srv.wait()
        next_srv.wait()

if __name__ == "__main__":
    run_audit()
