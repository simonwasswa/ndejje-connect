"use client"

import type React from "react"

import { Search, MessageSquare, Calendar, Bell, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { RoleBasedComponent } from "@/components/auth/role-based-component"

interface TopNavigationProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  setActiveSection: (section: string) => void
  notifications: any[]
  user: any
}

export function TopNavigation({
  searchQuery,
  setSearchQuery,
  setActiveSection,
  notifications,
  user,
}: TopNavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const { logout, hasPermission } = useAuth()

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setActiveSection("search")
      setShowMobileSearch(false)
    }
  }

  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setShowProfile(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 lg:py-4 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 lg:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-4 lg:space-x-6">
            <button
              onClick={() => setActiveSection(user?.role === "admin" ? "admin-dashboard" : "dashboard")}
              className="text-gray-900 font-medium hover:text-purple-700 text-sm lg:text-base transition-colors"
            >
              Home
            </button>
            <RoleBasedComponent allowedRoles={["admin"]}>
              <button
                onClick={() => setActiveSection("member-management")}
                className="text-gray-600 hover:text-gray-900 text-sm lg:text-base transition-colors"
              >
                Members
              </button>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={["admin"]}>
              <button
                onClick={() => setActiveSection("content-management")}
                className="text-gray-600 hover:text-gray-900 text-sm lg:text-base transition-colors"
              >
                Content
              </button>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={["admin"]}>
              <button
                onClick={() => setActiveSection("events")}
                className="text-gray-600 hover:text-gray-900 text-sm lg:text-base transition-colors"
              >
                Events
              </button>
            </RoleBasedComponent>
            <button
              onClick={() => setActiveSection("resources")}
              className="text-gray-600 hover:text-gray-900 text-sm lg:text-base transition-colors"
            >
              Resources
            </button>
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-32 sm:w-48 lg:w-64 text-sm transition-all"
            />
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            {/* Messages */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative hover:bg-gray-100 transition-colors"
              onClick={() => setActiveSection("inquiries")}
              title="Messages"
            >
              <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>

            {/* Calendar */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hidden sm:block hover:bg-gray-100 transition-colors"
              onClick={() => setActiveSection("calendar")}
              title="Calendar"
            >
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 relative hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setActiveSection("notifications")
                }}
                title="Notifications"
              >
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 flex items-center space-x-1 sm:space-x-2 hover:bg-gray-100 transition-colors"
                onClick={() => setShowProfile(!showProfile)}
              >
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-purple-200 object-cover"
                />
                <ChevronDown className="w-3 h-3 hidden sm:block" />
              </Button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{user.name}</p>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{user.email}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {user.role.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveSection("profile")
                        setShowProfile(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      View Profile
                    </button>
                    <RoleBasedComponent allowedRoles={["admin"]}>
                      <button
                        onClick={() => {
                          setActiveSection("students")
                          setShowProfile(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Student Management
                      </button>
                    </RoleBasedComponent>
                    <RoleBasedComponent allowedRoles={["admin"]}>
                      <button
                        onClick={() => {
                          setActiveSection("admin-dashboard")
                          setShowProfile(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Admin Dashboard
                      </button>
                    </RoleBasedComponent>
                    <button
                      onClick={() => {
                        setActiveSection("resources")
                        setShowProfile(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Resources
                    </button>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date/Time - Hidden on mobile */}
          <div className="text-right hidden xl:block ml-4">
            <p className="text-xs lg:text-sm font-medium text-gray-700">March 30, 2024</p>
            <button
              className="text-xs lg:text-sm text-purple-600 hover:text-purple-700 transition-colors"
              onClick={() => setActiveSection("inquiries")}
            >
              Chat now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="mt-3 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  )
}
