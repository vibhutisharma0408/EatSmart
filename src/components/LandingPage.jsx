import React from 'react'
import { Apple, Brain, Target, TrendingUp, Users, Zap, Shield, Globe, Lock, Sparkles, Stethoscope, Video, Heart, Activity } from 'lucide-react'

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-health-blue/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="health-gradient w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Apple className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="block bg-gradient-to-r from-primary-600 to-health-blue bg-clip-text text-transparent">
                Health & Nutrition
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with AI-powered nutrition insights, personalized meal planning, and expert doctor consultations. 
              Track your health journey with precision and achieve your wellness goals.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Started with EatSmart
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-health-blue mb-2">50K+</div>
              <div className="text-gray-600">Meals Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Complete Health & Wellness
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of health tracking with our cutting-edge AI platform and expert consultations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Get personalized nutrition recommendations and health insights powered by advanced AI algorithms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-health-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-health-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Meal Planning</h3>
              <p className="text-gray-600">
                Plan your meals with AI assistance, considering your goals, preferences, and nutritional needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your health metrics, weight, and nutrition progress with detailed analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Doctor Consultations</h3>
              <p className="text-gray-600">
                Connect with licensed nutritionists, dietitians, and health specialists via video consultations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Virtual Health Screenings</h3>
              <p className="text-gray-600">
                Get comprehensive health assessments and risk evaluations from the comfort of your home.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Monitoring</h3>
              <p className="text-gray-600">
                Track vital signs, connect wearables, and monitor chronic conditions with expert guidance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialist Care</h3>
              <p className="text-gray-600">
                Access endocrinologists, cardiologists, and gastroenterologists for specialized health concerns.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                HIPAA-compliant platform ensuring your health data is encrypted and completely secure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Care</h3>
              <p className="text-gray-600">
                Customized health plans and recommendations based on your unique medical profile and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-health-blue">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users already using EatSmart to achieve better nutrition, track their progress, and reach their health goals.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-primary-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Start Your Journey Now
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for your health journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Basic nutrition tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  AI meal suggestions
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Progress analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Community support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Health assessment quiz
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Get Started Free
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">For serious health enthusiasts</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Everything in Free
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Advanced AI insights
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Personalized meal plans
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  2 doctor consultations/month
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Health monitoring tools
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Export data & reports
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Upgrade to Pro
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600 mb-6">Complete health care</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Unlimited consultations
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Specialist access
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Prescription management
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Family plan (up to 5 members)
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Dedicated health coach
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  24/7 priority support
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                Get Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their health with EatSmart
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600">
                "EatSmart has revolutionized how I track my nutrition. The AI insights are incredibly accurate and the meal planning feature has made healthy eating so much easier!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-health-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-health-blue-600 font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Marcus Rodriguez</h4>
                  <p className="text-sm text-gray-600">Weight Loss Journey</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The progress tracking and AI recommendations helped me lose 15 pounds in 3 months. The app is intuitive and the insights are spot-on!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-red-600 font-bold text-lg">D</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dr. Jennifer Park</h4>
                  <p className="text-sm text-gray-600">Nutritionist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The doctor consultation feature allows me to provide personalized care to my patients remotely. The platform's integration of nutrition tracking with medical consultations is revolutionary."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage 