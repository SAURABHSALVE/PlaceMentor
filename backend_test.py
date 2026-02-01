#!/usr/bin/env python3
"""
PlaceMentor Backend API Testing Script
Tests all backend endpoints for the resume analysis application.
"""

import requests
import json
import os
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import tempfile
import time

def create_simple_text_pdf():
    """Create a simple PDF using basic text content"""
    buffer = io.BytesIO()
    # Create minimal PDF content
    pdf_content = b"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(John Doe - Frontend Developer) Tj
0 -20 Td
(Skills: React, JavaScript, HTML, CSS, TypeScript) Tj
0 -20 Td
(Experience: 3 years web development) Tj
0 -20 Td
(Projects: E-commerce site, Portfolio website) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
623
%%EOF"""
    buffer.write(pdf_content)
    buffer.seek(0)
    return buffer

# Configuration
BASE_URL = "https://jobprep-7.preview.emergentagent.com/api"
TEST_USER_ID = "test-user-123"

def create_test_pdf():
    """Create a simple test PDF with resume content"""
    try:
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        
        # Add resume content
        p.drawString(100, 750, "John Doe")
        p.drawString(100, 730, "Frontend Developer")
        p.drawString(100, 710, "Email: john.doe@email.com")
        p.drawString(100, 690, "Phone: (555) 123-4567")
        
        p.drawString(100, 650, "EXPERIENCE:")
        p.drawString(100, 630, "3 years of React development experience")
        p.drawString(100, 610, "Built responsive web applications using HTML, CSS, JavaScript")
        p.drawString(100, 590, "Worked with REST APIs and state management using Redux")
        p.drawString(100, 570, "Experience with Next.js and TypeScript")
        
        p.drawString(100, 530, "SKILLS:")
        p.drawString(100, 510, "JavaScript, React, Next.js, TypeScript")
        p.drawString(100, 490, "HTML5, CSS3, Tailwind CSS, Bootstrap")
        p.drawString(100, 470, "Redux, Context API, API integration")
        p.drawString(100, 450, "Git, GitHub, responsive design")
        
        p.drawString(100, 410, "PROJECTS:")
        p.drawString(100, 390, "E-commerce website with React and Node.js")
        p.drawString(100, 370, "Portfolio website with Next.js and Tailwind")
        p.drawString(100, 350, "Task management app with React hooks")
        
        p.save()
        buffer.seek(0)
        return buffer
    except Exception as e:
        print(f"Error creating PDF: {e}")
        # Fallback: create a simple text file as PDF
        return create_simple_text_pdf()

def test_health_endpoint():
    """Test the health check endpoint"""
    print("\n=== Testing Health Endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok':
                print("✅ Health endpoint working correctly")
                return True
            else:
                print("❌ Health endpoint returned unexpected status")
                return False
        else:
            print(f"❌ Health endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint error: {str(e)}")
        return False

def test_roles_endpoint():
    """Test the roles endpoint"""
    print("\n=== Testing Roles Endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/roles", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            roles = data.get('roles', [])
            expected_roles = ['data_analyst', 'backend_developer', 'frontend_developer']
            
            if len(roles) == 3:
                role_ids = [role['id'] for role in roles]
                if all(role_id in role_ids for role_id in expected_roles):
                    print("✅ Roles endpoint working correctly")
                    return True, roles
                else:
                    print(f"❌ Missing expected roles. Got: {role_ids}")
                    return False, []
            else:
                print(f"❌ Expected 3 roles, got {len(roles)}")
                return False, []
        else:
            print(f"❌ Roles endpoint failed with status {response.status_code}")
            return False, []
    except Exception as e:
        print(f"❌ Roles endpoint error: {str(e)}")
        return False, []

def test_upload_resume():
    """Test the resume upload endpoint"""
    print("\n=== Testing Resume Upload Endpoint ===")
    try:
        # Create test PDF
        pdf_buffer = create_test_pdf()
        
        # Prepare multipart form data
        files = {
            'file': ('test_resume.pdf', pdf_buffer, 'application/pdf')
        }
        data = {
            'userId': TEST_USER_ID
        }
        
        response = requests.post(f"{BASE_URL}/upload-resume", files=files, data=data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success') and result.get('resumeId'):
                print("✅ Resume upload working correctly")
                return True, result.get('resumeId')
            else:
                print("❌ Resume upload succeeded but missing required fields")
                return False, None
        else:
            print(f"❌ Resume upload failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Resume upload error: {str(e)}")
        return False, None

def test_analyze_resume(resume_id):
    """Test the resume analysis endpoint"""
    print("\n=== Testing Resume Analysis Endpoint ===")
    try:
        payload = {
            'resumeId': resume_id,
            'userId': TEST_USER_ID,
            'role': 'frontend_developer'
        }
        
        response = requests.post(
            f"{BASE_URL}/analyze", 
            json=payload, 
            headers={'Content-Type': 'application/json'},
            timeout=60  # OpenAI calls can take time
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {list(result.keys())}")
            
            if result.get('success') and result.get('analysisId'):
                analysis = result.get('analysis', {})
                print(f"Analysis structure: {list(analysis.keys())}")
                
                # Check required fields
                required_fields = ['overall_score', 'category_scores', 'gap_analysis', '14_day_action_plan']
                missing_fields = [field for field in required_fields if field not in analysis]
                
                if not missing_fields:
                    print("✅ Resume analysis working correctly")
                    print(f"Overall Score: {analysis.get('overall_score')}")
                    return True, result.get('analysisId')
                else:
                    print(f"❌ Analysis missing required fields: {missing_fields}")
                    return False, None
            else:
                print("❌ Analysis succeeded but missing required fields")
                return False, None
        else:
            print(f"❌ Resume analysis failed with status {response.status_code}")
            print(f"Error response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Resume analysis error: {str(e)}")
        return False, None

def test_get_analyses():
    """Test the get analyses endpoint"""
    print("\n=== Testing Get Analyses Endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/analyses?userId={TEST_USER_ID}", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if 'analyses' in result:
                analyses = result['analyses']
                print(f"Found {len(analyses)} analyses")
                print("✅ Get analyses working correctly")
                return True
            else:
                print("❌ Get analyses missing 'analyses' field")
                return False
        else:
            print(f"❌ Get analyses failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get analyses error: {str(e)}")
        return False

def test_unlock_report(analysis_id):
    """Test the unlock report endpoint"""
    print("\n=== Testing Unlock Report Endpoint ===")
    try:
        payload = {
            'analysisId': analysis_id,
            'userId': TEST_USER_ID
        }
        
        response = requests.post(
            f"{BASE_URL}/unlock-report", 
            json=payload, 
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print("✅ Unlock report working correctly")
                return True
            else:
                print("❌ Unlock report succeeded but missing success field")
                return False
        else:
            print(f"❌ Unlock report failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Unlock report error: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting PlaceMentor Backend API Tests")
    print(f"Base URL: {BASE_URL}")
    print(f"Test User ID: {TEST_USER_ID}")
    
    results = {}
    
    # Test 1: Health check
    results['health'] = test_health_endpoint()
    
    # Test 2: Get roles
    roles_success, roles = test_roles_endpoint()
    results['roles'] = roles_success
    
    # Test 3: Upload resume
    upload_success, resume_id = test_upload_resume()
    results['upload'] = upload_success
    
    # Test 4: Analyze resume (only if upload succeeded)
    if upload_success and resume_id:
        analyze_success, analysis_id = test_analyze_resume(resume_id)
        results['analyze'] = analyze_success
        
        # Test 5: Get analyses
        results['get_analyses'] = test_get_analyses()
        
        # Test 6: Unlock report (only if analysis succeeded)
        if analyze_success and analysis_id:
            results['unlock_report'] = test_unlock_report(analysis_id)
        else:
            results['unlock_report'] = False
            print("\n❌ Skipping unlock report test - analysis failed")
    else:
        results['analyze'] = False
        results['get_analyses'] = False
        results['unlock_report'] = False
        print("\n❌ Skipping analysis tests - upload failed")
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST RESULTS SUMMARY")
    print("="*50)
    
    for test_name, success in results.items():
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{test_name.upper()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed - check logs above")
    
    return results

if __name__ == "__main__":
    main()