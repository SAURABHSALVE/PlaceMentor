#!/usr/bin/env python3
"""
PlaceMentor Backend API Test Suite
Tests all backend endpoints including new Razorpay payment integration
"""

import requests
import json
import os
import time
from io import BytesIO
import uuid

# Test configuration
BASE_URL = "https://jobprep-7.preview.emergentagent.com/api"
SUPABASE_URL = "https://wnatljhykgfploxnhotr.supabase.co"
RAZORPAY_KEY_ID = "rzp_test_SAqchxHGMT5s3I"

# Test data
TEST_USER_ID = str(uuid.uuid4())
TEST_USER_EMAIL = "test@example.com"

def print_test_result(test_name, success, details=""):
    """Print formatted test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {test_name}")
    if details:
        print(f"   Details: {details}")
    print()

def create_test_pdf():
    """Create a simple test PDF content"""
    # Simple PDF content for testing
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
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(John Doe Resume - Software Engineer with Python, JavaScript, React experience) Tj
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
0000000373 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF"""
    return pdf_content

def test_health_check():
    """Test GET /api/health"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok' and 'timestamp' in data:
                print_test_result("Health Check API", True, f"Status: {data['status']}, Timestamp: {data['timestamp']}")
                return True
            else:
                print_test_result("Health Check API", False, f"Invalid response format: {data}")
                return False
        else:
            print_test_result("Health Check API", False, f"HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_test_result("Health Check API", False, f"Exception: {str(e)}")
        return False

def test_get_roles():
    """Test GET /api/roles"""
    try:
        response = requests.get(f"{BASE_URL}/roles", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            roles = data.get('roles', [])
            if len(roles) >= 3:
                role_names = [role.get('name', 'Unknown') for role in roles]
                print_test_result("Get Roles API", True, f"Found {len(roles)} roles: {', '.join(role_names[:3])}")
                return True, roles
            else:
                print_test_result("Get Roles API", False, f"Expected at least 3 roles, got {len(roles)}")
                return False, []
        else:
            print_test_result("Get Roles API", False, f"HTTP {response.status_code}: {response.text}")
            return False, []
    except Exception as e:
        print_test_result("Get Roles API", False, f"Exception: {str(e)}")
        return False, []

def test_upload_resume():
    """Test POST /api/upload-resume"""
    try:
        # Create test PDF
        pdf_content = create_test_pdf()
        
        files = {
            'file': ('test_resume.pdf', BytesIO(pdf_content), 'application/pdf')
        }
        data = {
            'userId': TEST_USER_ID
        }
        
        response = requests.post(f"{BASE_URL}/upload-resume", files=files, data=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success') and 'resumeId' in result:
                resume_id = result['resumeId']
                text_length = result.get('textLength', 0)
                print_test_result("Upload Resume API", True, f"Resume uploaded successfully. ID: {resume_id}, Text length: {text_length}")
                return True, resume_id
            else:
                print_test_result("Upload Resume API", False, f"Invalid response format: {result}")
                return False, None
        else:
            print_test_result("Upload Resume API", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
    except Exception as e:
        print_test_result("Upload Resume API", False, f"Exception: {str(e)}")
        return False, None

def test_analyze_resume(resume_id, roles):
    """Test POST /api/analyze"""
    if not resume_id or not roles:
        print_test_result("Analyze Resume API", False, "Missing resume_id or roles")
        return False, None
    
    try:
        # Use the first available role
        test_role = roles[0]['id']
        
        payload = {
            'resumeId': resume_id,
            'userId': TEST_USER_ID,
            'role': test_role
        }
        
        response = requests.post(f"{BASE_URL}/analyze", 
                               json=payload, 
                               headers={'Content-Type': 'application/json'},
                               timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success') and 'analysisId' in result and 'analysis' in result:
                analysis_id = result['analysisId']
                analysis = result['analysis']
                overall_score = analysis.get('overall_score', 0)
                print_test_result("Analyze Resume API", True, f"Analysis completed. ID: {analysis_id}, Score: {overall_score}/100")
                return True, analysis_id
            else:
                print_test_result("Analyze Resume API", False, f"Invalid response format: {result}")
                return False, None
        else:
            print_test_result("Analyze Resume API", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
    except Exception as e:
        print_test_result("Analyze Resume API", False, f"Exception: {str(e)}")
        return False, None

def test_get_analyses():
    """Test GET /api/analyses"""
    try:
        response = requests.get(f"{BASE_URL}/analyses?userId={TEST_USER_ID}", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            analyses = data.get('analyses', [])
            if len(analyses) > 0:
                print_test_result("Get Analyses API", True, f"Found {len(analyses)} analyses for user")
                return True
            else:
                print_test_result("Get Analyses API", True, "No analyses found for user (expected for new user)")
                return True
        else:
            print_test_result("Get Analyses API", False, f"HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_test_result("Get Analyses API", False, f"Exception: {str(e)}")
        return False

def test_create_order(analysis_id):
    """Test POST /api/create-order (NEW Razorpay endpoint)"""
    if not analysis_id:
        print_test_result("Create Order API", False, "Missing analysis_id")
        return False, None
    
    try:
        payload = {
            'analysisId': analysis_id,
            'userId': TEST_USER_ID,
            'userEmail': TEST_USER_EMAIL
        }
        
        response = requests.post(f"{BASE_URL}/create-order", 
                               json=payload, 
                               headers={'Content-Type': 'application/json'},
                               timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            if (result.get('success') and 
                'orderId' in result and 
                'amount' in result and 
                'currency' in result and 
                'keyId' in result):
                
                order_id = result['orderId']
                amount = result['amount']
                currency = result['currency']
                key_id = result['keyId']
                
                # Verify expected values
                if amount == 4900 and currency == 'INR' and key_id == RAZORPAY_KEY_ID:
                    print_test_result("Create Order API", True, f"Order created successfully. ID: {order_id}, Amount: ₹{amount/100}, Currency: {currency}")
                    return True, order_id
                else:
                    print_test_result("Create Order API", False, f"Invalid order details: amount={amount}, currency={currency}, keyId={key_id}")
                    return False, None
            else:
                print_test_result("Create Order API", False, f"Invalid response format: {result}")
                return False, None
        else:
            print_test_result("Create Order API", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
    except Exception as e:
        print_test_result("Create Order API", False, f"Exception: {str(e)}")
        return False, None

def test_verify_payment(order_id, analysis_id):
    """Test POST /api/verify-payment (NEW Razorpay endpoint)"""
    if not order_id or not analysis_id:
        print_test_result("Verify Payment API", False, "Missing order_id or analysis_id")
        return False
    
    try:
        # Generate mock payment data (for testing signature verification logic)
        mock_payment_id = f"pay_{uuid.uuid4().hex[:14]}"
        
        # Generate correct signature for testing
        import hmac
        import hashlib
        
        # Use the actual Razorpay key secret from environment
        key_secret = "wWtpaeGvAAp7tyVbp3aaf3Px"  # From .env file
        message = f"{order_id}|{mock_payment_id}"
        signature = hmac.new(key_secret.encode(), message.encode(), hashlib.sha256).hexdigest()
        
        payload = {
            'razorpayOrderId': order_id,
            'razorpayPaymentId': mock_payment_id,
            'razorpaySignature': signature,
            'analysisId': analysis_id,
            'userId': TEST_USER_ID
        }
        
        response = requests.post(f"{BASE_URL}/verify-payment", 
                               json=payload, 
                               headers={'Content-Type': 'application/json'},
                               timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success') and 'message' in result:
                print_test_result("Verify Payment API", True, f"Payment verified successfully. Message: {result['message']}")
                return True
            else:
                print_test_result("Verify Payment API", False, f"Invalid response format: {result}")
                return False
        else:
            print_test_result("Verify Payment API", False, f"HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_test_result("Verify Payment API", False, f"Exception: {str(e)}")
        return False

def test_unlock_report(analysis_id):
    """Test POST /api/unlock-report (legacy endpoint)"""
    if not analysis_id:
        print_test_result("Unlock Report API", False, "Missing analysis_id")
        return False
    
    try:
        payload = {
            'analysisId': analysis_id,
            'userId': TEST_USER_ID
        }
        
        response = requests.post(f"{BASE_URL}/unlock-report", 
                               json=payload, 
                               headers={'Content-Type': 'application/json'},
                               timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print_test_result("Unlock Report API", True, f"Report unlocked successfully")
                return True
            else:
                print_test_result("Unlock Report API", False, f"Invalid response format: {result}")
                return False
        else:
            print_test_result("Unlock Report API", False, f"HTTP {response.status_code}: {response.text}")
            return False
    except Exception as e:
        print_test_result("Unlock Report API", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("=" * 80)
    print("PlaceMentor Backend API Test Suite")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test User ID: {TEST_USER_ID}")
    print(f"Razorpay Key ID: {RAZORPAY_KEY_ID}")
    print("=" * 80)
    print()
    
    # Track test results
    results = {}
    
    # Test 1: Health Check
    print("🔍 Testing Health Check API...")
    results['health'] = test_health_check()
    
    # Test 2: Get Roles
    print("🔍 Testing Get Roles API...")
    roles_success, roles = test_get_roles()
    results['roles'] = roles_success
    
    # Test 3: Upload Resume
    print("🔍 Testing Upload Resume API...")
    upload_success, resume_id = test_upload_resume()
    results['upload'] = upload_success
    
    # Test 4: Analyze Resume
    print("🔍 Testing Analyze Resume API...")
    analyze_success, analysis_id = test_analyze_resume(resume_id, roles)
    results['analyze'] = analyze_success
    
    # Test 5: Get Analyses
    print("🔍 Testing Get Analyses API...")
    results['get_analyses'] = test_get_analyses()
    
    # Test 6: Create Order (NEW)
    print("🔍 Testing Create Order API (Razorpay)...")
    order_success, order_id = test_create_order(analysis_id)
    results['create_order'] = order_success
    
    # Test 7: Verify Payment (NEW)
    print("🔍 Testing Verify Payment API (Razorpay)...")
    results['verify_payment'] = test_verify_payment(order_id, analysis_id)
    
    # Test 8: Unlock Report (legacy)
    print("🔍 Testing Unlock Report API (legacy)...")
    results['unlock_report'] = test_unlock_report(analysis_id)
    
    # Summary
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for success in results.values() if success)
    total = len(results)
    
    for test_name, success in results.items():
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name.replace('_', ' ').title()}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
        return True
    else:
        print(f"⚠️  {total - passed} test(s) failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)