# PlaceMentor - Code Structure & Pre-Deployment Analysis

## 📊 Project Overview

**PlaceMentor** is a Next.js + Supabase application that analyzes resumes against job role requirements using OpenAI and provides payment processing through Razorpay.

### Tech Stack
- **Frontend**: Next.js 13+ (App Router), React, TailwindCSS, Shadcn/UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o-mini
- **Payments**: Razorpay
- **PDF Processing**: pdf-parse
- **Authentication**: Supabase Auth

---

## 🏗️ Architecture Overview

```
PlaceMentor/
├── app/
│   ├── page.js              ← Main UI (Dashboard, Landing, Auth)
│   ├── layout.js            ← Root layout
│   ├── globals.css          ← Global styles
│   └── api/
│       ├── [[...path]]/route.js    ← ALL backend APIs (most critical)
│       └── auth/callback/route.js  ← OAuth callback
├── lib/
│   ├── openai.js            ← OpenAI client initialization
│   ├── supabase.js          ← Client-side Supabase
│   ├── supabase-server.js   ← Server-side Supabase
│   ├── skillMaps.js         ← Job role skill definitions
│   └── utils.js             ← Utilities
├── components/
│   └── ui/                  ← Shadcn UI components
├── hooks/                   ← Custom React hooks
└── package.json             ← Dependencies
```

---

## 🔑 Critical APIs & Environment Dependencies

### **1. Resume Upload & Analysis Pipeline**

#### **POST /api/upload-resume**
```javascript
Environment Variables Required:
- (None for this endpoint)

Functionality:
- Accepts PDF file upload
- Extracts text using pdf-parse library
- Returns resumeId for later analysis
```

#### **POST /api/analyze**
```javascript
Environment Variables Required:
- ✅ OPENAI_API_KEY (CRITICAL)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Functionality:
- Takes resume text + target role
- Calls GPT-4o-mini to analyze skills
- Returns: overall_score, category_scores, gap_analysis, 14_day_action_plan
- Saves analysis to Supabase database

Code Location: app/api/[[...path]]/route.js (Line 260-330)
```

### **2. Payment Processing**

#### **POST /api/create-order**
```javascript
Environment Variables Required:
- ✅ NEXT_PUBLIC_RAZORPAY_KEY_ID (CRITICAL)
- ✅ RAZORPAY_KEY_SECRET (CRITICAL)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Functionality:
- Creates Razorpay payment order
- Returns order details to frontend for payment UI
- Amount: ₹49 (4900 paise)

Code Location: app/api/[[...path]]/route.js (Line 365-410)
```

#### **POST /api/verify-payment**
```javascript
Environment Variables Required:
- ✅ RAZORPAY_KEY_SECRET (CRITICAL)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Functionality:
- Verifies Razorpay payment signature
- Updates analysis status to "paid" in database
- Unlocks full report for user

Code Location: app/api/[[...path]]/route.js (Line 415-460)
```

### **3. Data Retrieval APIs**

#### **GET /api/roles**
- Returns available job roles
- No environment variables needed

#### **GET /api/analyses?userId=xxx**
- Retrieves user's past analyses
- Requires Supabase credentials

#### **GET /api/health**
- Health check endpoint
- No environment variables needed

---

## ⚙️ Environment Variables Summary

### **Required (Blocking)**
| Variable | Purpose | Visibility | Source |
|----------|---------|-----------|--------|
| `OPENAI_API_KEY` | Resume analysis via GPT-4o | Server-side only | https://platform.openai.com/api-keys |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Payment processing (public) | Frontend + Backend | https://dashboard.razorpay.com/app/credentials |
| `RAZORPAY_KEY_SECRET` | Payment signature verification | Server-side only | https://dashboard.razorpay.com/app/credentials |
| `NEXT_PUBLIC_SUPABASE_URL` | Database connection | Frontend + Backend | https://supabase.com/dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Database auth token | Frontend + Backend | https://supabase.com/dashboard |

### **Optional**
| Variable | Purpose | Default |
|----------|---------|---------|
| `CORS_ORIGINS` | Allowed API origins | `*` (all) |
| `NODE_ENV` | Runtime environment | development |

---

## 🔍 Code Implementation Details

### **How Environment Variables Are Used**

**1. OpenAI Integration** ([lib/openai.js](lib/openai.js))
```javascript
import OpenAI from 'openai'

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ← Read at server startup
})

export const MODEL = 'gpt-4o-mini'
```

**2. Razorpay Integration** ([app/api/[[...path]]/route.js](app/api/[[...path]]/route.js))
```javascript
// Line 8-12
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // ← Server-side secret!
})

// Payment verification uses key_secret
const generatedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // Line 435
  .update(`${razorpayOrderId}|${razorpayPaymentId}`)
  .digest('hex')
```

**3. Supabase Integration** ([lib/supabase-server.js](lib/supabase-server.js))
```javascript
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
```

---

## ✅ Pre-Deployment Checklist

### **Before Deploying to Production:**

- [ ] **OpenAI API Key**
  - [ ] Valid key obtained from https://platform.openai.com/api-keys
  - [ ] Key has appropriate permissions (gpt-4o-mini access)
  - [ ] No rate limits hit in testing
  - [ ] Set in deployment platform as: `OPENAI_API_KEY`

- [ ] **Razorpay Credentials**
  - [ ] Using **production** credentials (rzp_live_* not rzp_test_*)
  - [ ] Key ID obtained and set as: `NEXT_PUBLIC_RAZORPAY_KEY_ID`
  - [ ] Key Secret set as: `RAZORPAY_KEY_SECRET` (server-side only)
  - [ ] Payment endpoint tested end-to-end
  - [ ] Webhook configured (if auto-unlock enabled)

- [ ] **Supabase Database**
  - [ ] Project created and accessible
  - [ ] URL set as: `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Anon key set as: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Database tables created (analyses, resumes, users)
  - [ ] Row-level security policies configured
  - [ ] Backups enabled for production

- [ ] **Security**
  - [ ] `.env` files in `.gitignore` ✅ Already configured
  - [ ] No API keys committed to git
  - [ ] RAZORPAY_KEY_SECRET is server-side only
  - [ ] OPENAI_API_KEY is server-side only
  - [ ] CORS_ORIGINS restricted to your domain (not `*`)
  - [ ] HTTPS enabled on deployed domain

- [ ] **Testing**
  - [ ] Test health check: `GET /api/health`
  - [ ] Test resume upload: `POST /api/upload-resume`
  - [ ] Test analysis: `POST /api/analyze`
  - [ ] Test payment flow: `POST /api/create-order` → `POST /api/verify-payment`
  - [ ] Test with real Razorpay payment (₹49)

---

## 🚀 Deployment Platforms Configuration

### **Vercel (Recommended)**
```bash
# Environment variables should be set in:
Vercel Dashboard → Project Settings → Environment Variables

OPENAI_API_KEY=sk-proj-xxxxx (Production + Preview)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx (All)
RAZORPAY_KEY_SECRET=xxxxx (Production only!)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co (All)
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx (All)
CORS_ORIGINS=https://yourdomain.com (All)
NODE_ENV=production (Production)
```

### **Docker / Self-Hosted**
```dockerfile
ENV OPENAI_API_KEY=your_key
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=your_id
ENV RAZORPAY_KEY_SECRET=your_secret
ENV NEXT_PUBLIC_SUPABASE_URL=your_url
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### **AWS / DigitalOcean / Railway / Render**
Use platform's environment variable UI or `secrets` configuration

---

## 🔐 Security Notes

### **What's Safe to Expose (Frontend)**
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Public key for payment UI
- `NEXT_PUBLIC_SUPABASE_URL` - Database URL (not secret)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Limited access token

### **What Must Be Hidden (Server-Side Only)**
- `OPENAI_API_KEY` - Full API access
- `RAZORPAY_KEY_SECRET` - Payment verification
- Never log these in browser console
- Never include in API responses
- Only use in server-side code (never client-side)

---

## 📈 Scaling Considerations

**Current Rate Limits:**
- OpenAI: Check your account rate limits
- Razorpay: Check your merchant plan
- Supabase: Check your pricing tier

**For Production:**
- Add caching layer for skill maps (SKILL_MAPS rarely changes)
- Implement rate limiting on API endpoints
- Add request validation/sanitization
- Set up monitoring and error tracking
- Configure Supabase backups

---

## 🆘 If Something Breaks After Deployment

1. **Resume analysis not working?** → Check `OPENAI_API_KEY`
2. **Payment fails?** → Check `RAZORPAY_KEY_SECRET` is set server-side
3. **Database errors?** → Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **CORS errors?** → Check `CORS_ORIGINS` setting
5. **404 on API?** → Verify Next.js build succeeded and routes are deployed

Check deployment platform logs:
- Vercel: https://vercel.com/dashboard
- Docker: `docker logs <container_name>`
- Self-hosted: Application logs directory

---

## 📞 Quick Reference

**Files to Review Before Deploying:**
1. [.env.example](.env.example) - All required variables
2. [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Step-by-step deployment
3. [app/api/[[...path]]/route.js](app/api/[[...path]]/route.js) - API implementation
4. [lib/openai.js](lib/openai.js) - OpenAI setup
5. [lib/supabase-server.js](lib/supabase-server.js) - Database setup

**Commands to Remember:**
```bash
npm run build      # Build for production
npm start          # Run production server
npm run dev        # Run development with hot reload
```

---

**Last Updated:** February 3, 2026  
**Status:** Ready for Deployment ✅
