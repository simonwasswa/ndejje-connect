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
  const { logout, hasPermission } = useAuth()

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setActiveSection("search")
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
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden lg:flex space-x-6">
            <button
              onClick={() => setActiveSection("dashboard")}
              className="text-gray-900 font-medium hover:text-purple-700"
            >
              Home
            </button>
            <RoleBasedComponent allowedRoles={["admin"]}>
              <button
                onClick={() => setActiveSection("member-management")}
                className="text-gray-600 hover:text-gray-900"
              >
                Members
              </button>
            </RoleBasedComponent>
            <RoleBasedComponent allowedRoles={["admin"]}>
              <button
                onClick={() => setActiveSection("content-management")}
                className="text-gray-600 hover:text-gray-900"
              >
                Content
              </button>
            </RoleBasedComponent>
            <button onClick={() => setActiveSection("resources")} className="text-gray-600 hover:text-gray-900">
              Resources
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Search - hide on small screens */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-48 lg:w-64"
            />
          </form>

          {/* Mobile search button */}
          <Button variant="ghost" size="sm" className="p-2 md:hidden" onClick={() => setActiveSection("search")}>
            <Search className="w-4 h-4" />
          </Button>

          {/* Rest of the navigation items remain the same but with responsive sizing */}

          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Messages */}
            <Button variant="ghost" size="sm" className="p-2 relative" onClick={() => setActiveSection("inquiries")}>
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            {/* Calendar */}
            <Button variant="ghost" size="sm" className="p-2" onClick={() => setActiveSection("calendar")}>
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 relative"
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setActiveSection("notifications")
                }}
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 flex items-center space-x-2"
                onClick={() => {
                  setShowProfile(!showProfile)
                }}
              >
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                />
                <ChevronDown className="w-3 h-3 hidden md:block" />
              </Button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
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
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                    <RoleBasedComponent allowedRoles={["admin"]}>
                      <button
                        onClick={() => {
                          setActiveSection("students")
                          setShowProfile(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Student Management
                      </button>
                    </RoleBasedComponent>
                    <RoleBasedComponent allowedRoles={["admin"]}>
                      <button
                        onClick={() => {
                          setActiveSection("guild-council")
                          setShowProfile(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Guild Management
                      </button>
                    </RoleBasedComponent>
                    <button
                      onClick={() => {
                        setActiveSection("resources")
                        setShowProfile(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Resources
                    </button>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
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

          <div className="text-right hidden lg:block">
            <p className="text-sm font-medium">March 30, 2024</p>
            <button
              className="text-sm text-purple-600 hover:text-purple-700"
              onClick={() => setActiveSection("inquiries")}
            >
              Chat now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
