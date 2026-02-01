'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import Script from 'next/script'
import { 
  Upload, 
  FileText, 
  Target, 
  TrendingUp, 
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
  Briefcase,
  Code,
  Database,
  PenTool,
  Plus,
  X,
  ChevronRight,
  Quote,
  Users,
  GraduationCap,
  CreditCard,
  IndianRupee
} from 'lucide-react'

const DEFAULT_ROLES = [
  { id: 'data_analyst', name: 'Data Analyst', icon: Database },
  { id: 'backend_developer', name: 'Backend Developer', icon: Code },
  { id: 'frontend_developer', name: 'Frontend Developer', icon: PenTool }
]

// Score color helper
const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

const getScoreGradient = (score) => {
  if (score >= 80) return 'from-emerald-500 to-emerald-600'
  if (score >= 60) return 'from-yellow-500 to-yellow-600'
  if (score >= 40) return 'from-orange-500 to-orange-600'
  return 'from-red-500 to-red-600'
}

const getScoreBg = (score) => {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-yellow-500'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

// Animated counter component
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

// Testimonial data
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

// Landing Page Component
function LandingPage({ onGetStarted }) {
  const [isVisible, setIsVisible] = useState({})
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PlaceMentor</span>
          </div>
          <Button 
            onClick={onGetStarted}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI-Powered Resume Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Are You </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Actually</span>
            <span className="text-white"> Ready</span>
            <br />
            <span className="text-white">for Placements?</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get your real readiness score in <span className="text-white font-semibold">3 minutes</span>. 
            No motivation, just brutal honesty about where you stand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
              onClick={onGetStarted}
            >
              <Upload className="mr-2 h-5 w-5" />
              Analyze My Resume
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "10K+", label: "Resumes Analyzed", icon: FileText },
              { value: "3 min", label: "Average Time", icon: Clock },
              { value: "94%", label: "Accuracy Rate", icon: Target },
              { value: "500+", label: "Placed Students", icon: Award }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">Simple Process</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Three simple steps to know exactly where you stand</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Resume", desc: "Upload your PDF resume. We'll extract and analyze every detail.", icon: Upload, color: "purple" },
              { step: "02", title: "Select Your Target Role", desc: "Choose from existing roles or enter any custom role you want.", icon: Target, color: "pink" },
              { step: "03", title: "Get Real Feedback", desc: "Receive detailed analysis with gaps and a 14-day improvement plan.", icon: BarChart3, color: "blue" }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-6xl font-bold text-white/10 mb-4">{item.step}</div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center mb-6`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-purple-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Built Different</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Not your typical motivational career tool</p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brutally Honest", desc: "No sugarcoating. We tell you exactly what's missing from your resume.", icon: Shield, gradient: "from-red-500 to-orange-500" },
              { title: "Role-Specific Analysis", desc: "Evaluated against actual skill maps used by top recruiters.", icon: Target, gradient: "from-purple-500 to-pink-500" },
              { title: "Custom Roles Supported", desc: "Any role, any industry. Our AI learns and adapts.", icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
              { title: "14-Day Action Plan", desc: "Not generic advice. A structured day-by-day improvement roadmap.", icon: Calendar, gradient: "from-emerald-500 to-teal-500" },
              { title: "Gap Analysis", desc: "Know exactly what's missing and why it matters for recruiters.", icon: AlertTriangle, gradient: "from-yellow-500 to-orange-500" },
              { title: "Resume Rewrite Tips", desc: "Get specific suggestions to make your resume stand out.", icon: PenTool, gradient: "from-pink-500 to-rose-500" }
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-4">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Students Who Made It</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Real feedback from students who got placed at top companies</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-500/30 mb-3" />
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium">{testimonial.name}</div>
                      <div className="text-emerald-400 text-sm">{testimonial.role}</div>
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
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">Simple Pricing</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Start free, upgrade when you're ready</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Free</CardTitle>
                <CardDescription className="text-gray-400">Get your overall score</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">₹0</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Overall readiness score
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <Lock className="w-5 h-5" /> Category breakdown
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <Lock className="w-5 h-5" /> Gap analysis
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <Lock className="w-5 h-5" /> 14-day action plan
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <Lock className="w-5 h-5" /> Resume rewrite tips
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white" onClick={onGetStarted}>
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Full Report</CardTitle>
                <CardDescription className="text-gray-400">Everything you need to succeed</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">₹49</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Overall readiness score
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Detailed category scores
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Complete gap analysis
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 14-day action plan
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Resume rewrite suggestions
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" onClick={onGetStarted}>
                  Get Full Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-sm">
            <GraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Face Reality?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Stop wondering if you're prepared. Get clarity in 3 minutes.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25"
              onClick={onGetStarted}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Your Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PlaceMentor</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 PlaceMentor. Built for serious job seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Auth Form Component
function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          onAuth(data.user)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          onAuth(data.user)
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>
      
      <Card className="relative z-10 w-full max-w-md bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Welcome to PlaceMentor</CardTitle>
          <CardDescription className="text-gray-400">
            {mode === 'signin' ? 'Sign in to analyze your resume' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard Component
function Dashboard({ user, onSignOut }) {
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
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
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
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

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
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

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
      // Step 1: Create Razorpay order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId,
          userId: user.id,
          userEmail: user.email
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order')
      }

      const orderData = await orderResponse.json()

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PlaceMentor',
        description: 'Full Report Access - Placement Readiness Analysis',
        order_id: orderData.orderId,
        prefill: {
          email: user.email,
        },
        handler: async function (response) {
          try {
            // Step 3: Verify payment
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

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed')
            }

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
        theme: {
          color: '#9333ea',
        },
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
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PlaceMentor</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm hidden sm:inline">{user.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onSignOut} className="text-gray-400 hover:text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
            <div className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" 
                 style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
            
            {[
              { num: 1, label: "Upload Resume", icon: Upload },
              { num: 2, label: "Select Role", icon: Target },
              { num: 3, label: "View Results", icon: BarChart3 }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.num 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/10 text-gray-500'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`mt-2 text-sm transition-colors ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto mb-6 bg-red-500/10 border-red-500/30 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Upload Your Resume</CardTitle>
                <CardDescription className="text-gray-400">
                  Drop your PDF resume here and we'll analyze it in seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : file 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-white/20 hover:border-purple-500/50 hover:bg-white/5'
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
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white mb-1">Drag & drop your resume here</p>
                        <p className="text-gray-500 text-sm">or click to browse</p>
                      </div>
                      <Badge className="bg-white/10 text-gray-400 border-white/20">PDF only • Max 5MB</Badge>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
                  onClick={handleUpload}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Resume...</>
                  ) : (
                    <><Sparkles className="mr-2 h-5 w-5" /> Continue to Role Selection</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Role */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Select Target Role</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose from popular roles or enter any custom role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Popular Roles */}
                <div>
                  <Label className="text-gray-400 text-sm mb-3 block">Popular Roles</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DEFAULT_ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => { setSelectedRole(role.id); setShowCustomInput(false); }}
                        className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                          selectedRole === role.id && !showCustomInput
                            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <role.icon className={`w-6 h-6 mb-2 ${selectedRole === role.id && !showCustomInput ? 'text-purple-400' : 'text-gray-500'}`} />
                        <div className={`font-medium ${selectedRole === role.id && !showCustomInput ? 'text-white' : 'text-gray-300'}`}>
                          {role.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Role */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#0a0a0f] text-gray-500 text-sm">or enter custom role</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => { setShowCustomInput(true); setSelectedRole(''); }}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                      showCustomInput
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${showCustomInput ? 'bg-purple-500/30' : 'bg-white/10'}`}>
                      <Plus className={`w-5 h-5 ${showCustomInput ? 'text-purple-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${showCustomInput ? 'text-white' : 'text-gray-300'}`}>Custom Role</div>
                      <div className="text-gray-500 text-sm">Enter any role (e.g., Product Manager, DevOps Engineer)</div>
                    </div>
                  </button>
                  
                  {showCustomInput && (
                    <Input
                      placeholder="Enter role name (e.g., Machine Learning Engineer)"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="mt-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                    />
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
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
            {/* Overall Score Card */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <Badge className="bg-white/10 text-white border-white/20 mb-4">
                  {showCustomInput ? customRole : DEFAULT_ROLES.find(r => r.id === selectedRole)?.name}
                </Badge>
                <h2 className="text-lg text-gray-400 mb-4">Your Placement Readiness Score</h2>
                <div className={`text-8xl font-bold ${getScoreColor(analysis.overall_score)} mb-2`}>
                  <AnimatedScore value={analysis.overall_score} />
                </div>
                <div className="text-gray-500 mb-6">out of 100</div>
                
                <div className="max-w-md mx-auto">
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreGradient(analysis.overall_score)} transition-all duration-1000 ease-out`}
                      style={{ width: `${analysis.overall_score}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-gray-400 mt-6 max-w-lg mx-auto">
                  {analysis.overall_score >= 80 ? "Excellent! You're well-prepared. Focus on fine-tuning and practice." :
                   analysis.overall_score >= 60 ? "Good foundation with room for improvement. Follow the action plan." :
                   analysis.overall_score >= 40 ? "Significant gaps identified. Intensive preparation required." :
                   "Major improvements needed. Start with the fundamentals immediately."}
                </p>
              </CardContent>
            </Card>

            {/* Unlock Banner */}
            {!isPaid && (
              <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Unlock Full Report</h3>
                        <p className="text-gray-400 text-sm">Get detailed analysis, gap breakdown, and personalized 14-day plan</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                      onClick={handleUnlock}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Unlock className="mr-2 h-4 w-4" /> Unlock for ₹49</>}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category Scores */}
            <Card className={`bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 ${!isPaid ? 'opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">Category Breakdown</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {Object.entries(analysis.category_scores || {}).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-xl p-4">
                        <div className="flex justify-between mb-3">
                          <span className="text-gray-300 capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                          <span className={`font-bold ${getScoreColor(value)}`}>{value}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreBg(value)} transition-all duration-1000`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Unlock to see detailed category scores</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gap Analysis */}
            <Card className={`bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 ${!isPaid ? 'opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <CardTitle className="text-white">Gap Analysis</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-3">
                    {(analysis.gap_analysis || []).map((gap, index) => (
                      <div key={index} className="bg-white/5 rounded-xl overflow-hidden">
                        <button
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                          onClick={() => toggleGap(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="text-white font-medium">{gap.area}</span>
                          </div>
                          {expandedGaps[index] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        {expandedGaps[index] && (
                          <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-4">
                            <div className="flex gap-3">
                              <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <X className="w-3 h-3 text-red-400" />
                              </div>
                              <div>
                                <div className="text-red-400 text-sm font-medium mb-1">Issue</div>
                                <div className="text-gray-300">{gap.issue}</div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                              </div>
                              <div>
                                <div className="text-yellow-400 text-sm font-medium mb-1">Why It Matters</div>
                                <div className="text-gray-300">{gap.why_it_matters}</div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              </div>
                              <div>
                                <div className="text-emerald-400 text-sm font-medium mb-1">How to Fix</div>
                                <div className="text-gray-300">{gap.how_to_fix}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Unlock to see detailed gap analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 14-Day Action Plan */}
            <Card className={`bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 ${!isPaid ? 'opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                    <CardTitle className="text-white">14-Day Action Plan</CardTitle>
                  </div>
                  {!isPaid && <Lock className="w-5 h-5 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(analysis['14_day_action_plan'] || []).map((phase, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-purple-400 font-semibold">{phase.day_range}</span>
                        </div>
                        <ul className="space-y-2">
                          {(phase.tasks || []).map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2 text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Unlock to see your personalized action plan</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resume Improvement */}
            {isPaid && analysis.resume_improvement_suggestion && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-pink-400" />
                    </div>
                    <CardTitle className="text-white">Resume Improvement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{analysis.resume_improvement_suggestion}</p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={resetAnalysis}
              >
                <Upload className="mr-2 h-4 w-4" />
                Analyze Another Resume
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Main App Component
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  
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
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
            <Target className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
        </div>
      </div>
    )
  }

  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />
  }

  if (!user && showAuth) {
    return <AuthForm onAuth={(u) => setUser(u)} />
  }

  return <Dashboard user={user} onSignOut={handleSignOut} />
}
