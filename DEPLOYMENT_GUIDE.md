# PlaceMentor Deployment Guide - Environment Setup

## 📋 Pre-Deployment Checklist

### 1. **Environment Variables Required for Deployment**

Your application requires the following environment variables. These MUST be configured before deploying:

#### **Critical (Application will fail without these)**
- ✅ `OPENAI_API_KEY` - Required for resume analysis feature
- ✅ `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Required for payment processing (public)
- ✅ `RAZORPAY_KEY_SECRET` - Required for payment verification (secret)
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Required for database
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Required for database access

#### **Optional (Use defaults if not needed)**
- `CORS_ORIGINS` - Controls which domains can call your API (defaults to `*`)
- `NODE_ENV` - Set to `production` for deployments

---

## 🔑 How to Get Each API Key

### **1. OpenAI API Key**
```
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the entire key (starts with "sk-proj-")
4. ⚠️  This key is SENSITIVE - never commit to git or share publicly
```

### **2. Razorpay Credentials**
```
1. Login to https://dashboard.razorpay.com/app/credentials
2. Copy Key ID (starts with "rzp_live_" or "rzp_test_")
3. Copy Key Secret (keep this secure!)
4. Key ID can be public (NEXT_PUBLIC prefix)
5. Key Secret must be server-side only
```

### **3. Supabase Credentials**
```
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy "Project URL" → NEXT_PUBLIC_SUPABASE_URL
5. Copy "anon public" key → NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 🚀 Production Deployment Platforms

### **Option 1: Vercel (⭐ RECOMMENDED - Best for Next.js)**

Vercel is made by the creators of Next.js. Perfect for production apps.

#### **Step 1: Connect GitHub to Vercel**
```bash
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your PlaceMentor GitHub repo
4. Click "Import"
```

#### **Step 2: Set Environment Variables**
```
1. After import, you'll see "Configure Project"
2. Scroll to "Environment Variables"
3. Add each variable:

   OPENAI_API_KEY: sk-proj-xxxxx
   Set for: ✅ Production, ✅ Preview, ✅ Development

   RAZORPAY_KEY_SECRET: your_secret_key
   Set for: ✅ Production only (NOT Preview/Development)

   NEXT_PUBLIC_RAZORPAY_KEY_ID: rzp_live_xxxxx
   Set for: ✅ Production, ✅ Preview, ✅ Development

   NEXT_PUBLIC_SUPABASE_URL: https://xxxxx.supabase.co
   Set for: ✅ Production, ✅ Preview, ✅ Development

   NEXT_PUBLIC_SUPABASE_ANON_KEY: xxxxx
   Set for: ✅ Production, ✅ Preview, ✅ Development

   CORS_ORIGINS: https://yourdomain.vercel.app
   Set for: ✅ Production only
```

#### **Step 3: Deploy**
```bash
1. Click "Deploy"
2. Vercel automatically builds and deploys
3. Your app is live at: https://your-project.vercel.app
4. Custom domain setup: Settings → Domains → Add Domain
```

#### **Pricing**
- Free tier: Up to 100GB/month
- Pro tier: $20/month for production apps with real users
- [Check pricing](https://vercel.com/pricing)

#### **Benefits**
✅ Zero-config deployment  
✅ Automatic HTTPS  
✅ Serverless functions (perfect for APIs)  
✅ Built-in analytics & monitoring  
✅ Easy rollback if something breaks  
✅ Preview deployments for testing  

---

### **Option 2: Railway (Simple & Fast)**

Great alternative if you prefer independent platform.

#### **Step 1: Create Railway Account**
```bash
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
```

#### **Step 2: Configure Environment Variables**
```
1. In project settings → Variables
2. Add each variable (copy from .env.example)
3. Railway will auto-detect Next.js build
```

#### **Step 3: Deploy**
```bash
1. Connect your GitHub repo
2. Choose main branch
3. Click "Deploy"
4. App available at: https://your-project.railway.app
```

#### **Pricing**
- $5/month base tier for production
- Pay-as-you-go after free tier

---

### **Option 3: DigitalOcean App Platform**

Full control with managed infrastructure.

#### **Step 1: Create App on DigitalOcean**
```bash
1. Go to https://cloud.digitalocean.com
2. Click "Apps" → "Create App"
3. Connect GitHub repository
4. Select PlaceMentor repo and main branch
```

#### **Step 2: Configure Build Settings**
```
- Build Command: npm run build
- Run Command: npm start
- HTTP Port: 3000
```

#### **Step 3: Add Environment Variables**
```
1. In App settings → Environment
2. Add all variables from .env.example
3. RAZORPAY_KEY_SECRET: Mark as "Secret"
4. OPENAI_API_KEY: Mark as "Secret"
```

#### **Step 4: Deploy**
```bash
1. Click "Create App"
2. DigitalOcean builds and deploys
3. App live at: https://your-app-xxxxx.ondigitalocean.app
4. Connect custom domain: App Settings → Domains
```

#### **Pricing**
- $5-12/month for production apps
- Scales automatically

---

### **Option 4: AWS (Elastic Beanstalk)**

Enterprise-grade if you need full control.

#### **Step 1: Install AWS CLI**
```bash
# On Windows PowerShell:
choco install awscli
# Or download from: https://aws.amazon.com/cli/
```

#### **Step 2: Prepare for Deployment**
```bash
# Create .ebignore file (similar to .gitignore)
cp .vercelignore .ebignore

# Create Procfile in root directory:
# web: npm start

# Initialize Elastic Beanstalk:
eb init -p node.js-18 placementor --region us-east-1
eb create placementor-prod
```

#### **Step 3: Set Environment Variables**
```bash
# Using AWS CLI:
eb setenv OPENAI_API_KEY=your_key
eb setenv RAZORPAY_KEY_SECRET=your_secret
eb setenv NEXT_PUBLIC_RAZORPAY_KEY_ID=your_id
eb setenv NEXT_PUBLIC_SUPABASE_URL=your_url
eb setenv NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Or in AWS Dashboard:
EB Console → Configuration → Environment Variables
```

#### **Step 4: Deploy**
```bash
# Push to AWS:
git commit -m "Ready for AWS"
eb deploy

# View logs:
eb logs

# Open app:
eb open
```

#### **Pricing**
- t3.micro free tier (1 year)
- t3.small $10-15/month for production

---

### **Option 5: Netlify (Frontend-focused)**

Good if you want serverless functions for backend.

#### **Step 1: Connect to Netlify**
```bash
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select GitHub and choose PlaceMentor repo
```

#### **Step 2: Configure Build**
```
Build command: npm run build
Publish directory: .next
```

#### **Step 3: Set Environment Variables**
```
1. Site settings → Build & deploy → Environment
2. Add all variables from .env.example
3. Deploy trigger: push to main branch
```

#### **Step 4: Deploy**
```bash
# Automatic deployment on git push
# Live at: https://your-site.netlify.app
```

#### **Pricing**
- Free for testing
- $19/month for production with functions

---

## ⚠️ Security Best Practices

### **DO:**
✅ Use `.env.local` for local development (already in .gitignore)  
✅ Use deployment platform's secrets manager (Vercel, Docker secrets, etc.)  
✅ Rotate API keys regularly  
✅ Use different keys for development and production  
✅ Never commit `.env` files to git  
✅ Keep RAZORPAY_KEY_SECRET server-side only  

### **DON'T:**
❌ Share API keys in chat, email, or public channels  
❌ Commit `.env` files to git  
❌ Expose RAZORPAY_KEY_SECRET in frontend code  
❌ Use test keys in production  
❌ Log sensitive keys  
❌ Push keys to GitHub/GitLab  

---

## 🔍 Verify Environment Setup After Deployment

### **For Vercel:**
```bash
# Check environment variables are set:
vercel env ls

# View deployment logs:
vercel logs [project-name]
```

### **For Railway/DigitalOcean/AWS:**
Check deployment platform's dashboard:
- Railway: Project → Logs
- DigitalOcean: Apps → Logs
- AWS: Elastic Beanstalk → Recent Deployments

### **Test API Endpoints:**
```bash
# Replace with your actual deployed domain
DOMAIN="https://your-app.vercel.app"

# Test health check
curl $DOMAIN/api/health

# Test roles endpoint
curl $DOMAIN/api/roles

# Check environment is loaded:
curl $DOMAIN/api/health  # Should return {"status":"ok",...}
```

### **Frontend Test:**
1. Open https://your-app-domain.com
2. Try uploading a resume
3. Try analyzing a role
4. Test payment flow with Razorpay test mode

---

## 🎯 Quick Comparison: Which Platform?

| Platform | Best For | Cost | Setup Time | Scaling |
|----------|----------|------|-----------|---------|
| **Vercel** ⭐ | Next.js apps | Free-$20/mo | 5 min | Auto |
| **Railway** | Fast setup | $5+/mo | 5 min | Auto |
| **DigitalOcean** | Full control | $5-12/mo | 10 min | Auto |
| **AWS** | Enterprise | Free-$50+/mo | 30 min | Manual |
| **Netlify** | Frontend focus | Free-$19/mo | 5 min | Auto |

### **Recommendation for Real Users:**
👉 **Vercel (FREE → PRO tier)** if you want zero-config and focus on building  
👉 **Railway** if you want simple alternative with good performance  
👉 **DigitalOcean** if you want managed infrastructure with full control  
👉 **AWS** if you already use AWS or need enterprise features

---

## 🆘 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "OpenAI API Error: 401" | OPENAI_API_KEY missing/invalid | Check API key in Vercel/Docker env vars |
| "Razorpay order creation failed" | RAZORPAY_KEY_SECRET not set | Verify key on server-side only |
| "Supabase connection refused" | NEXT_PUBLIC_SUPABASE_URL missing | Check Supabase project URL format |
| "CORS error" | CORS_ORIGINS not configured | Set CORS_ORIGINS or allow all with `*` |
| "404 Not Found" on API calls | Wrong API endpoint | Check request URLs in frontend code |

---

## 🎯 Final Steps Before Launch

1. **Choose Your Platform** (Vercel recommended)
2. **Get Production API Keys** (not test keys!)
   - OpenAI: https://platform.openai.com/api-keys
   - Razorpay: https://dashboard.razorpay.com/app/credentials (rzp_live_*)
   - Supabase: https://supabase.com/dashboard
3. **Set Environment Variables** on your platform
4. **Test All Features:**
   - [ ] Health check endpoint works
   - [ ] Can upload PDF resume
   - [ ] Can analyze resume with OpenAI
   - [ ] Can create Razorpay payment
   - [ ] Can verify payment and unlock report
5. **Configure Custom Domain** (optional but recommended)
6. **Set Up Monitoring** (optional but good to have)
7. **Go Live!** 🚀

---

## 📊 Production Checklist

### Before Going Live:

**Security:**
- [ ] Using production (rzp_live_) Razorpay keys, not test keys
- [ ] RAZORPAY_KEY_SECRET set on server-side only
- [ ] OPENAI_API_KEY not exposed in frontend code
- [ ] CORS_ORIGINS restricted to your domain
- [ ] HTTPS enabled (all platforms auto-enable)
- [ ] No API keys in git repository

**Functionality:**
- [ ] Resume upload working
- [ ] OpenAI analysis returning correct results
- [ ] Payment flow end-to-end tested
- [ ] Email notifications working (if implemented)
- [ ] Database backups enabled (Supabase: Settings → Backups)

**Performance:**
- [ ] API response times < 5 seconds
- [ ] PDF parsing < 10 seconds
- [ ] Payment processing < 3 seconds
- [ ] Set up rate limiting on APIs

**Monitoring:**
- [ ] Error tracking enabled (Sentry, LogRocket)
- [ ] Set up platform alerts (platform-specific)
- [ ] Daily log review for first week
- [ ] Monitor OpenAI API usage

---

## 🔗 Domain Setup (After First Deployment)

Once app is live, connect your custom domain:

### **Vercel:**
```
Settings → Domains → Add Domain
Add yourdomain.com
Follow DNS configuration (usually auto-detected)
Wait 5-10 minutes for SSL certificate
```

### **Railway:**
```
Settings → Domains → Add Custom Domain
Enter your domain
Configure DNS records shown
```

### **DigitalOcean:**
```
App Settings → Domains → Add Domain
Follow DNS configuration
Usually works in minutes
```
