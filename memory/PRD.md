# PlaceMentor - Product Requirements Document

## Overview
PlaceMentor is a placement readiness analysis tool that provides brutally honest feedback to students about their job readiness based on their resume and target role.

## Core Features

### 1. User Authentication
- Email + password authentication via Supabase Auth
- Session management with automatic refresh

### 2. Resume Upload
- PDF-only upload
- Text extraction using pdf-parse library
- Storage in Supabase database

### 3. Role Selection
- Data Analyst
- Backend Developer  
- Frontend Developer

### 4. AI-Powered Analysis
- Uses OpenAI GPT-4o-mini model
- Analyzes resume against role-specific skill maps
- Generates structured JSON output with:
  - Overall readiness score (0-100)
  - Category scores (technical_skills, project_depth, industry_readiness, resume_strength)
  - Gap analysis with issues and fixes
  - 14-day action plan
  - Resume improvement suggestions

### 5. Pricing Tiers
- **Free Tier**: Shows only overall score
- **Paid Tier (₹49)**: Shows full report with all details

## Technical Stack
- Frontend: Next.js with React, Tailwind CSS, shadcn/ui
- Backend: Next.js API routes
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- AI: OpenAI GPT-4o-mini

## Database Schema

### resumes table
- id (TEXT, PRIMARY KEY)
- userId (TEXT)
- filename (TEXT)
- extractedText (TEXT)
- createdAt (TIMESTAMP)

### analyses table
- id (TEXT, PRIMARY KEY)
- userId (TEXT)
- resumeId (TEXT, FOREIGN KEY)
- role (TEXT)
- overallScore (INTEGER)
- fullReport (JSONB)
- isPaid (BOOLEAN)
- createdAt (TIMESTAMP)

## API Endpoints
- GET /api/health - Health check
- GET /api/roles - Get available roles
- POST /api/upload-resume - Upload and parse PDF
- POST /api/analyze - Analyze resume with AI
- GET /api/analyses?userId=xxx - Get user's analyses
- POST /api/unlock-report - Unlock full report

## Environment Variables
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- OPENAI_API_KEY
