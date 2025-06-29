import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Start exit animation
    setIsExiting(true)
    setIsVisible(false)
    setIsLoading(true)

    // After exit animation, change route and start enter animation
    const timer = setTimeout(() => {
      setIsExiting(false)
      setIsLoading(false)
      setIsVisible(true)
    }, 200) // Slightly longer for smoother transition

    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    // Initial load animation
    setIsVisible(true)
  }, [])

  return (
    <div className="relative">
      {/* Loading spinner during transition */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isVisible && !isExiting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
          }
          ${isExiting 
            ? 'opacity-0 translate-y-2' 
            : ''
          }
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default PageTransition 