# Razorpay Setup for Real Payments

## ⚠️ IMPORTANT: Test vs Production Keys

Your PlaceMentor app handles real money. You **MUST** use production keys for real users.

### **Test Keys (for development only)**
- Key ID: `rzp_test_xxxxx`
- Use for: Testing, development, staging
- Real money: ❌ NO (fake payments)
- Users: ❌ Do NOT use for real users

### **Production Keys (for real users)**
- Key ID: `rzp_live_xxxxx`  
- Use for: Real users, real payments
- Real money: ✅ YES (charges users' cards)
- Users: ✅ Use ONLY for real users

---

## 🔑 Step 1: Get Razorpay Production Keys

### **If you're a new user:**

```
1. Go to: https://dashboard.razorpay.com
2. Sign up with email / Google / mobile
3. Fill out business details
4. Provide bank account for payouts
5. Razorpay reviews and activates account (24-48 hours)
6. Once approved, you get LIVE keys
```

### **If you already have account:**

```
1. Go to: https://dashboard.razorpay.com
2. Login with your credentials
3. Click "Settings" (bottom left)
4. Click "API Keys"
5. Make sure you're on "LIVE" tab (not Test)
6. Copy "Key ID" (starts with rzp_live_)
7. Copy "Key Secret" (keep secure!)
```

---

## ✅ Verify Your Keys Format

**Correct Live Key ID looks like:**
```
rzp_live_SAxwbJBkjiZ9Qd
```

**NOT like test keys:**
```
❌ rzp_test_xxxxx (TEST - not real money)
```

**Key Secret looks like:**
```
7EeTWoUs08B5zTbgUpIDbNlW
```

---

## 🚨 Critical Security Rules

### **DO:**
✅ Store Key Secret on server-side only  
✅ Use live keys (rzp_live_) for real users  
✅ Rotate keys monthly  
✅ Monitor payment activity in Razorpay dashboard  

### **DON'T:**
❌ Share Key Secret publicly  
❌ Put Key Secret in frontend code  
❌ Commit Key Secret to git  
❌ Use test keys (rzp_test_) for real users  
❌ Log Key Secret in console  

---

## 🛠️ How Payments Work in PlaceMentor

### **Flow:**
```
1. User clicks "Unlock Report"
2. Frontend sends request: POST /api/create-order
3. Backend uses NEXT_PUBLIC_RAZORPAY_KEY_ID to create order
4. Razorpay returns: orderid, amount, currency
5. Frontend shows Razorpay payment popup
6. User enters card details
7. Razorpay charges card
8. Frontend sends verification: POST /api/verify-payment
9. Backend verifies using RAZORPAY_KEY_SECRET
10. If verified, report unlocks
```

### **Where Keys Are Used:**

**Creating Order** (frontend can see this):
```javascript
// Creates Razorpay order with Key ID
// Server sends Key ID to frontend to show payment popup
keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
```

**Verifying Payment** (server-side only):
```javascript
// Verifies payment signature using Key Secret
// Secret never goes to frontend, stays on server
keySecret: process.env.RAZORPAY_KEY_SECRET
```

---

## 🧪 Testing Before Real Users

### **Step 1: Test with Razorpay Test Mode**

Use these details to test WITHOUT charging real cards:

**Test Card Details:**
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
Name: Any name
```

**Test Flow:**
```
1. Keep RAZORPAY_KEY_ID = rzp_test_xxxxx (TEST)
2. Keep RAZORPAY_KEY_SECRET = test_secret
3. Deploy to staging / preview
4. Upload resume, analyze, try payment
5. Use test card above
6. Should work without charging real money
```

### **Step 2: Switch to Live Keys**

Once testing is done:

```
1. Get production keys from Razorpay dashboard
2. Update RAZORPAY_KEY_ID = rzp_live_xxxxx (PRODUCTION)
3. Update RAZORPAY_KEY_SECRET = production_secret
4. Deploy to Vercel production
5. Now real payments will work
```

---

## 📊 Payment Amount

PlaceMentor charges: **₹49 (49 rupees)**

In code:
```javascript
const order = await razorpay.orders.create({
  amount: 4900,  // 4900 paise = ₹49
  currency: 'INR',
  // ...
})
```

**Breakdown:**
- Amount: ₹49
- Razorpay fee (~2-3%): ~₹1
- You receive: ~₹48

You can change this amount in the code if needed.

---

## 🔍 Monitor Payments

### **In Razorpay Dashboard:**

```
1. Go to: https://dashboard.razorpay.com
2. Click "Payments" (left menu)
3. See all payments received
4. Check status: Captured, Authorized, Failed
5. View: Amount, timestamp, customer email, phone
```

### **In PlaceMentor App:**

Check database:
```
Supabase → analyses table
→ Column "payment_status" = "paid"
→ Column "payment_date" = timestamp
```

---

## ⚠️ Webhook Setup (Optional but Recommended)

For automatic report unlock even if app crashes:

```
1. Razorpay Dashboard → Webhooks
2. Add webhook URL: https://yourdomain.com/api/webhook
3. Events: payment.authorized, payment.captured, payment.failed
4. Razorpay will POST payment status to your webhook
5. Your app processes it and unlocks report
```

**Current Implementation:**
- PlaceMentor uses client-side verification (Step 8 in flow above)
- Works fine for real users
- Webhook optional for extra reliability

---

## 🚨 Common Razorpay Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid Key ID" | Using wrong format key | Use rzp_live_xxxxx not test key |
| "Payment failed" | Server rejecting signature | Check RAZORPAY_KEY_SECRET is exact |
| "Order not found" | Creating with test key, verifying with live | Match: use live for both |
| "Unauthorized" | Key Secret not on server | Set RAZORPAY_KEY_SECRET env var |

---

## 💰 Pricing for Different Countries

PlaceMentor set to: **₹49 (Indian Rupees)**

For other countries, change in code:
```javascript
// app/api/[[...path]]/route.js
const order = await razorpay.orders.create({
  amount: 4900,      // Change amount here
  currency: 'INR',   // Or change to: USD, EUR, etc
  // ...
})
```

Razorpay supports: INR, USD, EUR, GBP, etc.

---

## 📞 Razorpay Support

- **Docs:** https://razorpay.com/docs
- **Dashboard:** https://dashboard.razorpay.com
- **Support email:** support@razorpay.com
- **Live chat:** Available in dashboard

---

## ✅ Pre-Launch Checklist

- [ ] Have production Razorpay account (rzp_live_)
- [ ] Copied Key ID (rzp_live_xxxxx)
- [ ] Copied Key Secret (secure location)
- [ ] Set NEXT_PUBLIC_RAZORPAY_KEY_ID in Vercel (all environments)
- [ ] Set RAZORPAY_KEY_SECRET in Vercel (Production only)
- [ ] Tested payment flow with test card (4111...)
- [ ] Verified order creation works
- [ ] Verified payment verification works
- [ ] Ready for real users!

---

## 🎉 You're Ready!

Your app now supports real payments with Razorpay! 

Users can:
- Upload resume
- Get analysis
- Pay ₹49 to unlock full report
- See their money going to you ✅

Go launch! 🚀
