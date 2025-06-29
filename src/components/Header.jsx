import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Apple, 
  Calendar, 
  TrendingUp, 
  Bot, 
  User,
  Menu,
  X,
  LogOut,
  Stethoscope,
  ChevronDown,
  Bell
} from 'lucide-react'

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Nutrition', href: '/nutrition', icon: Apple },
    { name: 'Meal Planner', href: '/meals', icon: Calendar },
    { name: 'Health Insights', href: '/insights', icon: TrendingUp },
    { name: 'Doctor Consultation', href: '/consultations', icon: Stethoscope },
  ]

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserDropdownOpen])

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setIsUserDropdownOpen(false)
  }

  const handleLogoClick = () => {
    // Navigate to landing page
    navigate('/landing')
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsUserDropdownOpen(false)
  }

  const handleNotificationsClick = () => {
    // For now, just show an alert. You can implement a proper notifications page later
    alert('Notifications feature coming soon!')
    setIsUserDropdownOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white shadow-sm border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group"
          >
            <div className="health-gradient w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
              <Apple className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-600">EatSmart</h1>
              <p className="text-xs text-gray-500 font-medium transition-colors duration-300 group-hover:text-primary-500">AI-Powered Nutrition</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 shadow-md scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive(item.href) ? 'scale-110' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 font-medium">Health Enthusiast</p>
            </div>
            
            {/* User Dropdown */}
            <div className="relative user-dropdown">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleNotificationsClick}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white animate-in slide-in-from-top-2 duration-300">
            <nav className="space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 shadow-md scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive(item.href) ? 'scale-110' : ''}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Profile and Logout */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${navigation.length * 50}ms`
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleNotificationsClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
                  style={{
                    animationDelay: `${(navigation.length + 1) * 50}ms`
                  }}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
                  style={{
                    animationDelay: `${(navigation.length + 2) * 50}ms`
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 