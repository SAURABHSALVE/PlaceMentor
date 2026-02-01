'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import Script from 'next/script'
import { 
  Upload, 
  FileText, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  BarChart3,
  Calendar,
  Lightbulb,
  Loader2,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Clock,
  Award,
  BookOpen,
  Code,
  Database,
  PenTool,
  Plus,
  X,
  ChevronRight,
  Quote,
  GraduationCap,
  CreditCard,
  Sun,
  Moon,
  Menu,
  Eye,
  EyeOff
} from 'lucide-react'

const DEFAULT_ROLES = [
  { id: 'data_analyst', name: 'Data Analyst', icon: Database, description: 'SQL, Python, Visualization' },
  { id: 'backend_developer', name: 'Backend Developer', icon: Code, description: 'APIs, Databases, Auth' },
  { id: 'frontend_developer', name: 'Frontend Developer', icon: PenTool, description: 'React, CSS, UI/UX' }
]

// Theme Provider Hook
function useTheme() {
  const [theme, setTheme] = useState('dark')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }
  
  return { theme, toggleTheme }
}

// Score helpers
const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-500'
  if (score >= 60) return 'text-amber-500'
  if (score >= 40) return 'text-orange-500'
  return 'text-red-500'
}

const getScoreGradient = (score) => {
  if (score >= 80) return 'from-emerald-500 to-emerald-600'
  if (score >= 60) return 'from-amber-500 to-amber-600'
  if (score >= 40) return 'from-orange-500 to-orange-600'
  return 'from-red-500 to-red-600'
}

const getScoreBg = (score) => {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

// Animated counter
function AnimatedScore({ value, duration = 1500 }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const end = value
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value, duration])
  
  return <span>{count}</span>
}

// Theme Toggle Button
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-purple-600" />
      )}
    </button>
  )
}

// Testimonials
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Placed at Google",
    content: "PlaceMentor showed me exactly where I was lacking. The 14-day plan was a game-changer!",
    avatar: "PS",
    rating: 5
  },
  {
    name: "Rahul Verma", 
    role: "Placed at Microsoft",
    content: "No sugarcoating, just real feedback. That's exactly what I needed before interviews.",
    avatar: "RV",
    rating: 5
  },
  {
    name: "Ananya Gupta",
    role: "Placed at Amazon",
    content: "The gap analysis helped me focus on what actually mattered. Highly recommend!",
    avatar: "AG",
    rating: 5
  }
]

// Landing Page
function LandingPage({ onGetStarted, theme, toggleTheme }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">PlaceMentor</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <Button 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Resume Analysis
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
            Are You{' '}
            <span className="gradient-text">Actually</span>
            {' '}Ready
            <br />
            for Placements?
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Get your real readiness score in <span className="text-foreground font-semibold">3 minutes</span>. 
            No motivation, just brutal honesty about where you stand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 group font-semibold"
              onClick={onGetStarted}
            >
              <Upload className="mr-2 h-5 w-5" />
              Analyze My Resume Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-border hover:bg-secondary text-foreground px-8 py-6 text-lg rounded-xl font-semibold"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "10K+", label: "Resumes Analyzed", icon: FileText },
              { value: "3 min", label: "Average Time", icon: Clock },
              { value: "94%", label: "Accuracy Rate", icon: Target },
              { value: "500+", label: "Placed Students", icon: Award }
            ].map((stat, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Simple Process</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps to know exactly where you stand</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Resume", desc: "Upload your PDF resume. We extract and analyze every detail automatically.", icon: Upload, color: "from-purple-500 to-purple-600" },
              { step: "02", title: "Select Role", desc: "Choose from popular roles or enter any custom job title you're targeting.", icon: Target, color: "from-pink-500 to-pink-600" },
              { step: "03", title: "Get Feedback", desc: "Receive detailed analysis with gaps and a 14-day improvement plan.", icon: BarChart3, color: "from-blue-500 to-blue-600" }
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="text-6xl font-bold text-muted/20 mb-4">{item.step}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-pink-500/10 text-pink-500 border-pink-500/20 mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Built Different</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Not your typical motivational career tool</p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brutally Honest", desc: "No sugarcoating. We tell you exactly what's missing from your resume.", icon: Shield, color: "text-red-500 bg-red-500/10" },
              { title: "Role-Specific", desc: "Evaluated against actual skill maps used by top recruiters.", icon: Target, color: "text-purple-500 bg-purple-500/10" },
              { title: "Custom Roles", desc: "Any role, any industry. Our AI learns and adapts to your needs.", icon: Sparkles, color: "text-blue-500 bg-blue-500/10" },
              { title: "14-Day Plan", desc: "Not generic advice. A structured day-by-day improvement roadmap.", icon: Calendar, color: "text-emerald-500 bg-emerald-500/10" },
              { title: "Gap Analysis", desc: "Know exactly what's missing and why it matters for recruiters.", icon: AlertTriangle, color: "text-amber-500 bg-amber-500/10" },
              { title: "Resume Tips", desc: "Get specific suggestions to make your resume stand out.", icon: PenTool, color: "text-pink-500 bg-pink-500/10" }
            ].map((feature, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Students Who Made It</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real feedback from students placed at top companies</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 mb-3" />
                  <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-foreground font-medium">{testimonial.name}</div>
                      <div className="text-emerald-500 text-sm font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4">Simple Pricing</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Start free, upgrade when you're ready</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-foreground">Free</CardTitle>
                <CardDescription className="text-muted-foreground">Get your overall score</CardDescription>
                <div className="text-4xl font-bold text-foreground mt-4">₹0</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> 
                    <span>Overall readiness score</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Lock className="w-5 h-5 flex-shrink-0" /> 
                    <span>Category breakdown</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Lock className="w-5 h-5 flex-shrink-0" /> 
                    <span>Gap analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Lock className="w-5 h-5 flex-shrink-0" /> 
                    <span>14-day action plan</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-6 text-base rounded-xl" 
                  onClick={onGetStarted}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-primary/30 overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 font-semibold">Most Popular</Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-foreground">Full Report</CardTitle>
                <CardDescription className="text-muted-foreground">Everything you need to succeed</CardDescription>
                <div className="text-4xl font-bold text-foreground mt-4">₹49</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> 
                    <span>Overall readiness score</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> 
                    <span>Detailed category scores</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> 
                    <span>Complete gap analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> 
                    <span>14-day action plan</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-base rounded-xl shadow-lg shadow-purple-500/20" 
                  onClick={onGetStarted}
                >
                  Get Full Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-primary/30">
            <CardContent className="p-12 text-center">
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Face Reality?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Stop wondering if you're prepared. Get clarity in 3 minutes.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-xl shadow-xl shadow-purple-500/25 font-semibold"
                onClick={onGetStarted}
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Your Analysis Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">PlaceMentor</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 PlaceMentor. Built for serious job seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Auth Form
function AuthForm({ onAuth, theme, toggleTheme }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) onAuth(data.user)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data.user) onAuth(data.user)
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      
      <Card className="relative z-10 w-full max-w-md bg-card border-border shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">Welcome to PlaceMentor</CardTitle>
          <CardDescription className="text-muted-foreground">
            {mode === 'signin' ? 'Sign in to analyze your resume' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background border-input text-foreground placeholder:text-muted-foreground h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-purple-500/20"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...</>
              ) : (
                mode === 'signin' ? 'Sign In to Continue' : 'Create My Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard
function Dashboard({ user, onSignOut, theme, toggleTheme }) {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState(null)
  const [resumeId, setResumeId] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [customRole, setCustomRole] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [analysisId, setAnalysisId] = useState(null)
  const [isPaid, setIsPaid] = useState(false)
  const [expandedGaps, setExpandedGaps] = useState({})
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file only')
      return
    }
    setFile(selectedFile)
    setError('')
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) handleFileSelect(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', user.id)

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Upload failed')

      setResumeId(data.resumeId)
      setStep(2)
    } catch (err) {
      setError(err.message || 'Failed to upload resume')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    const roleToAnalyze = showCustomInput ? customRole : selectedRole
    if (!roleToAnalyze) {
      setError('Please select or enter a role')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId,
          userId: user.id,
          role: showCustomInput ? `custom:${customRole}` : roleToAnalyze
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Analysis failed')

      setAnalysis(data.analysis)
      setAnalysisId(data.analysisId)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Failed to analyze resume')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    setLoading(true)
    setError('')
    
    try {
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId,
          userId: user.id,
          userEmail: user.email
        }),
      })

      if (!orderResponse.ok) throw new Error('Failed to create payment order')

      const orderData = await orderResponse.json()

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PlaceMentor',
        description: 'Full Report Access - Placement Readiness',
        order_id: orderData.orderId,
        prefill: { email: user.email },
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                analysisId,
                userId: user.id
              }),
            })

            if (!verifyResponse.ok) throw new Error('Payment verification failed')
            setIsPaid(true)
            setError('')
          } catch (err) {
            setError('Payment verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
        theme: { color: '#9333ea' },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      setError(err.message || 'Failed to initiate payment')
    } finally {
      setLoading(false)
    }
  }

  const toggleGap = (index) => {
    setExpandedGaps(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const resetAnalysis = () => {
    setStep(1)
    setFile(null)
    setResumeId(null)
    setSelectedRole('')
    setCustomRole('')
    setShowCustomInput(false)
    setAnalysis(null)
    setAnalysisId(null)
    setIsPaid(false)
    setExpandedGaps({})
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PlaceMentor</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-foreground hidden sm:inline font-medium">{user.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSignOut} 
              className="border-border text-foreground hover:bg-secondary font-medium"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-secondary rounded-full" />
            <div 
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" 
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} 
            />
            
            {[
              { num: 1, label: "Upload Resume", icon: Upload },
              { num: 2, label: "Select Role", icon: Target },
              { num: 3, label: "View Results", icon: BarChart3 }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  step >= s.num 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/30' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`mt-3 text-sm font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto mb-6 bg-destructive/10 border-destructive/30">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground">Upload Your Resume</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Drop your PDF resume here and we'll analyze it instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : file 
                        ? 'border-emerald-500 bg-emerald-500/5' 
                        : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {file ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <p className="text-foreground font-medium">{file.name}</p>
                      <p className="text-muted-foreground text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4 mr-1" /> Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-1">Drag & drop your resume here</p>
                        <p className="text-muted-foreground text-sm">or click to browse files</p>
                      </div>
                      <Badge variant="secondary" className="font-medium">PDF files only • Max 5MB</Badge>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                  onClick={handleUpload}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Your Resume...</>
                  ) : (
                    <><ArrowRight className="mr-2 h-5 w-5" /> Continue to Role Selection</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Role */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground">Select Target Role</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose from popular roles or enter any custom job title
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div>
                  <Label className="text-muted-foreground text-sm mb-3 block font-medium">Popular Roles</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {DEFAULT_ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => { setSelectedRole(role.id); setShowCustomInput(false); }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 ${
                          selectedRole === role.id && !showCustomInput
                            ? 'bg-primary/10 border-primary'
                            : 'bg-secondary/50 border-transparent hover:border-border'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedRole === role.id && !showCustomInput ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                        }`}>
                          <role.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className={`font-semibold ${selectedRole === role.id && !showCustomInput ? 'text-foreground' : 'text-foreground'}`}>
                            {role.name}
                          </div>
                          <div className="text-muted-foreground text-sm">{role.description}</div>
                        </div>
                        {selectedRole === role.id && !showCustomInput && (
                          <CheckCircle2 className="w-6 h-6 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-card text-muted-foreground text-sm font-medium">or enter custom role</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => { setShowCustomInput(true); setSelectedRole(''); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                      showCustomInput
                        ? 'bg-primary/10 border-primary'
                        : 'bg-secondary/50 border-transparent hover:border-border'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${showCustomInput ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">Custom Role</div>
                      <div className="text-muted-foreground text-sm">Enter any job title (e.g., Product Manager)</div>
                    </div>
                  </button>
                  
                  {showCustomInput && (
                    <Input
                      placeholder="Enter role name (e.g., Machine Learning Engineer)"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="mt-3 bg-background border-input text-foreground placeholder:text-muted-foreground h-12 rounded-xl"
                    />
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                  onClick={handleAnalyze}
                  disabled={(!selectedRole && !customRole) || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing with AI...</>
                  ) : (
                    <><Zap className="mr-2 h-5 w-5" /> Generate My Report</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && analysis && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Score Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-primary/30 shadow-lg overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                <Badge className="bg-secondary text-foreground border-border mb-4 font-medium">
                  {showCustomInput ? customRole : DEFAULT_ROLES.find(r => r.id === selectedRole)?.name}
                </Badge>
                <h2 className="text-lg text-muted-foreground mb-4 font-medium">Your Placement Readiness Score</h2>
                <div className={`text-8xl font-bold ${getScoreColor(analysis.overall_score)} mb-2`}>
                  <AnimatedScore value={analysis.overall_score} />
                </div>
                <div className="text-muted-foreground mb-6 font-medium">out of 100</div>
                
                <div className="max-w-md mx-auto">
                  <div className="h-4 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(analysis.overall_score)} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${analysis.overall_score}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
                  {analysis.overall_score >= 80 ? "Excellent! You're well-prepared. Focus on fine-tuning and practice." :
                   analysis.overall_score >= 60 ? "Good foundation with room for improvement. Follow the action plan." :
                   analysis.overall_score >= 40 ? "Significant gaps identified. Intensive preparation required." :
                   "Major improvements needed. Start with the fundamentals immediately."}
                </p>
              </CardContent>
            </Card>

            {/* Unlock Banner */}
            {!isPaid && (
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-primary/30 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">Unlock Full Report</h3>
                        <p className="text-muted-foreground">Category scores • Gap analysis • 14-day plan • Resume tips</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-xl font-bold shadow-xl shadow-purple-500/25"
                        onClick={handleUnlock}
                        disabled={loading}
                      >
                        {loading ? (
                          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                        ) : (
                          <><Unlock className="mr-2 h-5 w-5" /> Pay ₹49 & Unlock Report</>
                        )}
                      </Button>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Secure payment via Razorpay</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category Scores */}
            <Card className={`bg-card border-border shadow-lg ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    </div>
                    <CardTitle className="text-foreground">Category Breakdown</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {Object.entries(analysis.category_scores || {}).map(([key, value]) => (
                      <div key={key} className="bg-secondary/50 rounded-xl p-5">
                        <div className="flex justify-between mb-3">
                          <span className="text-foreground capitalize font-semibold">{key.replace(/_/g, ' ')}</span>
                          <span className={`font-bold ${getScoreColor(value)}`}>{value}/100</span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${getScoreBg(value)} rounded-full`} style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Unlock to see detailed category scores</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gap Analysis */}
            <Card className={`bg-card border-border shadow-lg ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <CardTitle className="text-foreground">Gap Analysis</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-3">
                    {(analysis.gap_analysis || []).map((gap, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl overflow-hidden">
                        <button
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
                          onClick={() => toggleGap(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="text-foreground font-semibold">{gap.area}</span>
                          </div>
                          {expandedGaps[index] ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                        </button>
                        {expandedGaps[index] && (
                          <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                            <div className="flex gap-3">
                              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <X className="w-4 h-4 text-red-500" />
                              </div>
                              <div>
                                <div className="text-red-500 text-sm font-semibold mb-1">Issue</div>
                                <div className="text-foreground">{gap.issue}</div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                              </div>
                              <div>
                                <div className="text-amber-500 text-sm font-semibold mb-1">Why It Matters</div>
                                <div className="text-foreground">{gap.why_it_matters}</div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div>
                                <div className="text-emerald-500 text-sm font-semibold mb-1">How to Fix</div>
                                <div className="text-foreground">{gap.how_to_fix}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Unlock to see detailed gap analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 14-Day Plan */}
            <Card className={`bg-card border-border shadow-lg ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                    </div>
                    <CardTitle className="text-foreground">14-Day Action Plan</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(analysis['14_day_action_plan'] || []).map((phase, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-primary font-bold">{phase.day_range}</span>
                        </div>
                        <ul className="space-y-2">
                          {(phase.tasks || []).map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2 text-foreground">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Unlock to see your personalized action plan</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resume Tips */}
            {isPaid && analysis.resume_improvement_suggestion && (
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-pink-500" />
                    </div>
                    <CardTitle className="text-foreground">Resume Improvement Tips</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{analysis.resume_improvement_suggestion}</p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-secondary font-semibold px-6 py-5"
                onClick={resetAnalysis}
              >
                <Upload className="mr-2 h-5 w-5" />
                Analyze Another Resume
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Main App
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const { theme, toggleTheme } = useTheme()
  
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowAuth(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/20">
            <Target className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} theme={theme} toggleTheme={toggleTheme} />
  }

  if (!user && showAuth) {
    return <AuthForm onAuth={(u) => setUser(u)} theme={theme} toggleTheme={toggleTheme} />
  }

  return <Dashboard user={user} onSignOut={handleSignOut} theme={theme} toggleTheme={toggleTheme} />
}
