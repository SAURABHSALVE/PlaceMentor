# PlaceMentor - Production Deployment (Real Users) Quick Start

## 🎯 You Are Here: Ready for Real Users

This guide focuses on deploying to **production platforms** that serve real users with real money.

---

## ⚡ 30-Minute Quick Start (Vercel)

### **Step 1: Get Your API Keys (5 minutes)**

**OpenAI API Key** 🔑
```
1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (keep it secret!)
4. Save it in a safe place
```

**Razorpay Production Keys** 💰
```
1. Go to: https://dashboard.razorpay.com/app/credentials
2. Make sure you're on "Live" tab (not Test)
3. Copy "Key ID" (starts with rzp_live_)
4. Copy "Key Secret" (keep it secure!)
5. Save in safe place
```

**Supabase Database Keys** 🗄️
```
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy "Project URL"
5. Copy "anon public" key
6. Save both
```

### **Step 2: Push to GitHub (2 minutes)**

```bash
# In your terminal, in the PlaceMentor directory:
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### **Step 3: Deploy to Vercel (5 minutes)**

```
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Find and select "placementor"
4. Click "Import"
```

After clicking Import, you'll see the "Configure Project" screen:

```
Environment Variables:
─────────────────────────

OPENAI_API_KEY
Value: [paste your OpenAI key here]
Environments: ✓ Production ✓ Preview ✓ Development

NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_live_xxxxx
Environments: ✓ Production ✓ Preview ✓ Development

RAZORPAY_KEY_SECRET
Value: [paste your Razorpay secret here]
Environments: ✓ Production ONLY (uncheck Preview & Development)

NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environments: ✓ Production ✓ Preview ✓ Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [paste your Supabase key here]
Environments: ✓ Production ✓ Preview ✓ Development

CORS_ORIGINS
Value: https://your-app.vercel.app
Environments: ✓ Production ONLY
```

Then click **"Deploy"** button.

### **Step 4: Wait for Build (15 minutes)**

Vercel will:
1. Download your code ✓
2. Install dependencies ✓
3. Build for production ✓
4. Deploy to CDN ✓

Once done, you'll see:
```
✅ Production: https://your-app-name.vercel.app
```

**Your app is now LIVE! 🎉**

---

## 🧪 Test It Works

### **Test 1: Health Check**
```
Open: https://your-app-name.vercel.app/api/health
You should see: {"status":"ok",...}
```

### **Test 2: Load App**
```
Open: https://your-app-name.vercel.app
You should see the PlaceMentor landing page
```

### **Test 3: Upload Resume**
```
1. Click "Get Started"
2. Sign up or login
3. Upload a PDF resume
4. Should show success ✅
```

### **Test 4: Analyze Resume**
```
1. Select a job role
2. Click "Analyze"
3. Should see analysis results in 10-20 seconds
4. If error: Check OPENAI_API_KEY is correct
```

### **Test 5: Payment Flow**
```
1. Click "Unlock Full Report"
2. Razorpay payment modal appears
3. Use test card: 4111 1111 1111 1111
4. Expiry: Any future date
5. CVV: Any 3 digits
6. Should show "Payment successful"
7. Report should unlock ✅
```

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "OpenAI API Error" | OPENAI_API_KEY wrong/missing | Check Vercel Environment Variables |
| "Razorpay failed" | Using test key in production | Use rzp_live_ key, not rzp_test_ |
| "Invalid key" on payment | RAZORPAY_KEY_SECRET missing | Check it's set on Production environment |
| "Database error" | Supabase URL/key wrong | Double-check Supabase credentials |
| 504 Build Error | Takes too long to build | Vercel will retry automatically |

**Not working?**
1. Go to Vercel Dashboard → your project → Deployments → Logs
2. Look for error messages
3. Common fix: Redeploy with correct environment variables

---

## 💡 After Going Live

### **For Real Users:**
- Tell people about your app! Share the link
- Track analytics in Vercel dashboard
- Monitor API usage (Vercel shows this)
- Watch payment flow in Razorpay dashboard

### **Optional Improvements:**
- Add custom domain: Vercel Settings → Domains → Add Domain
- Set up error tracking: Integrate Sentry
- Monitor logs: Vercel Logs tab
- Set up backups: Supabase automatic backups

### **Get More Users:**
- Share on social media
- Ask for feedback
- Improve based on usage patterns
- Iterate and redeploy (Vercel does this auto on git push!)

---

## 🎯 Environment Variables Reference

**Why each is needed:**

| Variable | Why? | Where Used |
|----------|------|-----------|
| OPENAI_API_KEY | AI engine for resume analysis | Backend: `lib/openai.js` |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Shows payment popup to users | Frontend: `app/page.js` |
| RAZORPAY_KEY_SECRET | Verifies payments are real | Backend: `app/api/route.js` |
| NEXT_PUBLIC_SUPABASE_URL | Database location | Frontend & Backend |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Access to database | Frontend & Backend |

---

## 📱 What Real Users See

### **Landing Page**
- Description of PlaceMentor
- Sign up / Login buttons
- Testimonials

### **Dashboard**
- Upload resume (PDF)
- Choose job role
- Get analysis with gaps
- Pay ₹49 to unlock full report

### **Payment Flow**
- Click "Unlock Report"
- Razorpay popup appears
- User pays with card
- Report unlocks immediately

---

## 🔐 Security Checklist (Production)

- ✅ Using rzp_live_ keys (not rzp_test_)
- ✅ RAZORPAY_KEY_SECRET on server-side only
- ✅ OPENAI_API_KEY hidden from users
- ✅ HTTPS enabled (Vercel auto-enables)
- ✅ No API keys in git repository
- ✅ Supabase backups enabled

---

## 📞 Need Help?

**If deployment fails:**
1. Check Vercel Logs: Dashboard → Deployments → Logs
2. Check environment variables: Dashboard → Settings → Environment Variables
3. Verify all 5 variables are set correctly
4. Click "Redeploy" button

**If app works but features fail:**
1. Open browser console (F12)
2. Check for error messages
3. Check Vercel logs for backend errors
4. Verify API keys are correct

**For production support:**
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- OpenAI: https://platform.openai.com/docs
- Razorpay: https://razorpay.com/docs

---

## ✨ You're Done!

Your PlaceMentor app is now live for real users! 🎉

**What to do next:**
1. Share the link with people
2. Collect feedback
3. Monitor Vercel dashboard for usage
4. Make improvements and redeploy

**Redeploying (super easy):**
```bash
git add .
git commit -m "Bug fix" or "Feature: new thing"
git push  # Vercel auto-deploys!
```

Good luck! 🚀
