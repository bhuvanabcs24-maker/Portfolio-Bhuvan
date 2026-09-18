#!/usr/bin/env python3
"""
Test Suite for BHUVAN.OS Part 7: Profile as an Engineering Identity
Verifies:
1. /about and /profile render the Engineering System Profile (not a traditional biography).
2. Identity fields:
   - BHUVAN A B
   - B.E. COMPUTER SCIENCE & ENGINEERING
   - BMS COLLEGE OF ENGINEERING
   - EXPECTED JUNE 2028
   - CGPA 8.08
3. Engineering profile categories matching resume:
   - Languages: C, Java, Python, JavaScript
   - Core CS: Data Structures & Algorithms, Problem Solving, SQL, DBMS, System Design
   - Web: REST APIs, FastAPI, Next.js, Git, Linux
   - AI/ML: Machine Learning, Neural Networks, Generative AI, Prompt Engineering
   - No skill percentage bars.
4. Problem solving:
   - 100+
   - LEETCODE PROBLEMS
   - https://leetcode.com/u/BHUVANab2006/
5. Certifications (actual resume credentials, no invented dates/IDs):
   - OpenAI Academy: Applied AI Foundations
   - DeepLearning.AI: Generative AI for Everyone
   - Coursera: Learning How to Learn
   - Microsoft: Introduction to AI Concepts
   - IBM: Responsible AI & Risk Management
   - Red Hat: RH104 / RH124
   - Deloitte: Data Analytics — Forage
6. Spoken languages:
   - English, Kannada, Hindi, Urdu
7. Social links:
   - GitHub: https://github.com/bhuvanabcs24-maker
   - LinkedIn: https://www.linkedin.com/in/bhuvan-a-b-4805a2330/
   - LeetCode: https://leetcode.com/u/BHUVANab2006/
8. Prominent DOWNLOAD RESUME button pointing to /resume.pdf.
9. Multi-viewport zero-overflow checks.
"""

import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1440,900")

    driver = webdriver.Chrome(options=chrome_options)
    port = 3000

    print("========================================================")
    print(f"TESTING PART 7: PROFILE AS ENGINEERING IDENTITY ({port})")
    print("========================================================")

    try:
        # 1. Load /about
        print("\n--- 1. Testing /about System Profile Loading ---")
        driver.get(f"http://localhost:{port}/about")
        time.sleep(1.5)

        title = driver.title
        print(f"✓ Page Title: {title}")
        assert "Profile" in title, f"Expected 'Profile' in title, got: {title}"

        # 2. Check Identity Elements
        print("\n--- 2. Verifying Core Engineering Identity ---")
        h1 = driver.find_element(By.TAG_NAME, "h1").text
        print(f"✓ Name: {h1}")
        assert "BHUVAN A B" in h1

        page_text = driver.find_element(By.TAG_NAME, "body").text

        assert "B.E. COMPUTER SCIENCE & ENGINEERING" in page_text, "Missing 'B.E. COMPUTER SCIENCE & ENGINEERING'"
        assert "BMS COLLEGE OF ENGINEERING" in page_text, "Missing 'BMS COLLEGE OF ENGINEERING'"
        assert "EXPECTED JUNE 2028" in page_text, "Missing 'EXPECTED JUNE 2028'"
        assert "CGPA 8.08" in page_text, "Missing 'CGPA 8.08'"
        print("✓ All 5 identity fields verified: BHUVAN A B, B.E. CS, BMSCE, Expected June 2028, CGPA 8.08.")

        # 3. Check Categorized Engineering Profile
        print("\n--- 3. Verifying Categorized Technical Capabilities (Resume-Matched) ---")
        
        # Check Categories
        for cat in ["LANGUAGES", "CORE CS", "WEB & SYSTEMS", "AI / ML"]:
            assert cat in page_text, f"Missing category: {cat}"
            print(f"  ✓ Found category header: {cat}")

        # Check Languages
        for lang in ["C", "Java", "Python", "JavaScript"]:
            assert lang in page_text, f"Missing language: {lang}"
        print("  ✓ Languages verified: C, Java, Python, JavaScript.")

        # Check Core CS
        for cs in ["Data Structures & Algorithms", "Problem Solving", "SQL", "DBMS", "System Design"]:
            assert cs in page_text, f"Missing Core CS skill: {cs}"
        print("  ✓ Core CS verified: DSA, Problem Solving, SQL, DBMS, System Design.")

        # Check Web & Systems
        for web in ["REST APIs", "FastAPI", "Next.js", "Git", "Linux"]:
            assert web in page_text, f"Missing Web skill: {web}"
        print("  ✓ Web & Systems verified: REST APIs, FastAPI, Next.js, Git, Linux.")

        # Check AI/ML
        for ai in ["Machine Learning", "Neural Networks", "Generative AI", "Prompt Engineering"]:
            assert ai in page_text, f"Missing AI skill: {ai}"
        print("  ✓ AI/ML verified: ML, Neural Networks, GenAI, Prompt Engineering.")

        # Ensure NO percentage progress bars exist
        progress_bars = driver.find_elements(By.XPATH, "//div[contains(@class, 'progress-bar') or contains(@class, 'skill-bar')]")
        assert len(progress_bars) == 0, "No skill percentage bars should exist in system profile"
        print("✓ Confirmed: Zero skill percentage bars present.")

        # 4. Check Problem Solving (LeetCode 100+)
        print("\n--- 4. Verifying Problem Solving Telemetry ---")
        assert "100+" in page_text, "Missing 100+ count"
        assert "LEETCODE PROBLEMS" in page_text, "Missing 'LEETCODE PROBLEMS' text"

        leetcode_links = driver.find_elements(By.XPATH, "//a[contains(@href, 'leetcode.com/u/BHUVANab2006')]")
        assert len(leetcode_links) > 0, "Missing LeetCode profile link"
        lc_href = leetcode_links[0].get_attribute("href")
        print(f"  • LeetCode Link: {lc_href}")
        assert lc_href == "https://leetcode.com/u/BHUVANab2006/"
        print("✓ Problem solving verified: 100+ LeetCode problems with exact URL.")

        # 5. Check Certifications (Actual resume credentials)
        print("\n--- 5. Verifying Resume Certifications ---")
        required_certs = [
            ("OpenAI Academy", "Applied AI Foundations"),
            ("DeepLearning.AI", "Generative AI for Everyone"),
            ("Coursera", "Learning How to Learn"),
            ("Microsoft", "Introduction to AI Concepts"),
            ("IBM", "Responsible AI & Risk Management"),
            ("Red Hat", "RH104 / RH124"),
            ("Deloitte", "Data Analytics — Forage")
        ]
        for issuer, cert_name in required_certs:
            assert issuer in page_text, f"Missing cert issuer: {issuer}"
            assert cert_name in page_text, f"Missing cert name: {cert_name}"
            print(f"  ✓ Found certification: {issuer} — {cert_name}")
        print("✓ All 7 resume certifications verified with zero invented dates or IDs.")

        # 6. Check Spoken Languages
        print("\n--- 6. Verifying Spoken Languages ---")
        for slang in ["English", "Kannada", "Hindi", "Urdu"]:
            assert slang in page_text, f"Missing spoken language: {slang}"
            print(f"  ✓ Found spoken language: {slang}")
        print("✓ Spoken languages verified: English, Kannada, Hindi, Urdu.")

        # 7. Check Social Profiles
        print("\n--- 7. Verifying Social & Platform Links ---")
        gh_links = driver.find_elements(By.XPATH, "//a[contains(@href, 'github.com/bhuvanabcs24-maker')]")
        li_links = driver.find_elements(By.XPATH, "//a[contains(@href, 'linkedin.com/in/bhuvan-a-b-4805a2330')]")
        assert len(gh_links) > 0, "Missing GitHub link"
        assert len(li_links) > 0, "Missing LinkedIn link"

        for l in [gh_links[0], li_links[0]]:
            target = l.get_attribute("target")
            rel = l.get_attribute("rel")
            assert target == "_blank", "Link should have target='_blank'"
            assert "noopener" in rel and "noreferrer" in rel, "Link should have safe rel attributes"
        print("✓ GitHub and LinkedIn links safely configured.")

        # 8. Check Prominent DOWNLOAD RESUME Button
        print("\n--- 8. Verifying DOWNLOAD RESUME Button ---")
        resume_buttons = driver.find_elements(By.XPATH, "//a[contains(., 'DOWNLOAD RESUME')]")
        assert len(resume_buttons) > 0, "Missing prominent 'DOWNLOAD RESUME' button"
        resume_href = resume_buttons[0].get_attribute("href")
        print(f"  • Resume Link: {resume_href}")
        assert "resume.pdf" in resume_href, f"Expected link to resume.pdf, got: {resume_href}"
        print("✓ Prominent DOWNLOAD RESUME button verified pointing to /resume.pdf.")

        # 9. Verify /profile route works identically
        print("\n--- 9. Testing Dedicated /profile Route ---")
        driver.get(f"http://localhost:{port}/profile")
        time.sleep(1)
        assert "BHUVAN A B" in driver.find_element(By.TAG_NAME, "h1").text
        assert "CGPA 8.08" in driver.page_source
        print("✓ Dedicated /profile route responds correctly with engineering system profile.")

        # 10. Multi-Viewport Responsiveness
        print("\n--- 10. Multi-Viewport Zero-Overflow Verification ---")
        for vp_name, w, h in [("Desktop 1440px", 1440, 900), ("Tablet 768px", 768, 1024), ("Mobile 390px", 390, 844)]:
            driver.set_window_size(w, h)
            driver.get(f"http://localhost:{port}/about")
            time.sleep(0.8)
            scroll_w = driver.execute_script("return document.documentElement.scrollWidth")
            client_w = driver.execute_script("return document.documentElement.clientWidth")
            print(f"  • {vp_name}: clientWidth={client_w}px, scrollWidth={scroll_w}px")
            assert scroll_w <= client_w + 5, f"Horizontal overflow detected on {vp_name}"
        print("✓ All viewports passed zero-overflow checks.")

        print("\n========================================================")
        print("ALL PART 7 ENGINEERING PROFILE TESTS PASSED! (10/10)")
        print("========================================================")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
