"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sprout,
  Camera,
  Cloud,
  TrendingUp,
  Shield,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  BarChart3,
  Leaf,
  Brain,
  Heart,
  Globe,
  Smartphone,
  Zap,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "AI Crop Diagnosis",
      description: "Snap a photo of your crops and get instant disease diagnosis with treatment recommendations",
      color: "bg-green-500",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Weather Insights",
      description: "7-day weather forecasts and agricultural weather alerts tailored for your location",
      color: "bg-blue-500",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Prices",
      description: "Real-time commodity prices and market trends to help you make informed selling decisions",
      color: "bg-purple-500",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Smart Recommendations",
      description: "Personalized farming advice based on your location, soil type, and growing conditions",
      color: "bg-orange-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics to track your farm's performance and productivity",
      color: "bg-red-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Expert Support",
      description: "24/7 AI-powered support with access to agricultural experts when you need guidance",
      color: "bg-indigo-500",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab, India",
      avatar: "👨‍🌾",
      quote: "KisanSaathi helped me identify wheat rust early and saved my entire crop. The treatment recommendations were spot-on!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra, India", 
      avatar: "👩‍🌾",
      quote: "The market price alerts helped me sell my tomatoes at the perfect time. Increased my profits by 30%!",
      rating: 5,
    },
    {
      name: "Mohammed Ali",
      location: "Karnataka, India",
      avatar: "👨‍🌾",
      quote: "Weather forecasts are incredibly accurate. I now plan my irrigation and harvesting with confidence.",
      rating: 5,
    },
  ]

  const stats = [
    { number: "50,000+", label: "Happy Farmers" },
    { number: "1M+", label: "Crops Diagnosed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-900">KisanSaathi</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Testimonials
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                About
              </a>
              <Button onClick={() => router.push("/auth")} className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block text-gray-700 hover:text-green-600 font-medium">
                  Features
                </a>
                <a href="#testimonials" className="block text-gray-700 hover:text-green-600 font-medium">
                  Testimonials
                </a>
                <a href="#about" className="block text-gray-700 hover:text-green-600 font-medium">
                  About
                </a>
                <Button onClick={() => router.push("/auth")} className="w-full bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-3 lg:space-y-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <Zap className="h-4 w-4 mr-1" />
                AI-Powered Agriculture
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Smart
                <span className="text-green-600 block">Farming Companion</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your farming with AI-powered crop diagnosis, weather insights, and market intelligence. 
                Join thousands of farmers who are already improving their yields with KisanSaathi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => router.push("/auth")} 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-6 sm:px-8 py-3 border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 pt-6 lg:pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Crop Diagnosis</h3>
                    <p className="text-sm text-gray-600">Upload & Analyze</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Disease Detection</span>
                    <span className="text-sm font-bold text-green-600">98% Match</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Disease: Leaf Blight</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Treatment: Organic Spray</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Recovery: 7-10 days</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to maximize your farm's potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Farmers Across India
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              See how KisanSaathi is transforming agriculture for thousands of farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="text-2xl sm:text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6 text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Empowering Farmers with Technology
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                KisanSaathi combines cutting-edge AI technology with deep agricultural expertise to provide 
                farmers with the tools they need to succeed. Our mission is to make advanced farming 
                technology accessible to every farmer, regardless of their location or farm size.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Global Reach</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Serving farmers worldwide with localized solutions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Mobile First</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Designed for smartphone accessibility</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Community Driven</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Built by farmers, for farmers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Sustainable</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Promoting eco-friendly farming practices</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-2xl">
                      <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">50K+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-2xl">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">1M+</div>
                      <div className="text-sm text-gray-600">Diagnoses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-2xl">
                      <CheckCircle2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-2xl">
                      <Heart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">4.9</div>
                      <div className="text-sm text-gray-600">User Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed max-w-2xl mx-auto">
              Join thousands of farmers who are already using KisanSaathi to improve their yields, 
              reduce costs, and make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push("/auth")}
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </div>
            <div className="text-sm text-green-100">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">KisanSaathi</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with AI-powered tools for better crops and higher yields.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KisanSaathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
