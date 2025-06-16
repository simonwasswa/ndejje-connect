"use client"

import { useState, useEffect } from "react"
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Megaphone,
  Settings,
  GraduationCap,
  Menu,
  X,
  Lock,
  Unlock,
  Shield,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  user: any
}

export function Sidebar({ activeSection, setActiveSection, user }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isLocked, setIsLocked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { hasPermission } = useAuth()

  // Different menu items for admin vs student
  const adminMenuItems = [
    { id: "admin-dashboard", icon: Shield, label: "Admin Dashboard", badge: null },
    { id: "member-management", icon: Users, label: "Manage Members", badge: "12" },
    { id: "content-management", icon: Megaphone, label: "Manage Content", badge: "8" },
    { id: "events", icon: Calendar, label: "Manage Events", badge: "5" },
    { id: "students", icon: GraduationCap, label: "Student Directory", badge: null },
    { id: "guild-council", icon: Users, label: "Guild Council", badge: null },
    { id: "inquiries", icon: MessageSquare, label: "Student Inquiries", badge: "8" },
    { id: "resources", icon: FileText, label: "Resources", badge: null },
    { id: "settings", icon: Settings, label: "System Settings", badge: null },
  ]

  const studentMenuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
    { id: "guild-members", icon: Users, label: "Guild Members", badge: null },
    { id: "events", icon: Calendar, label: "Events", badge: "3" },
    { id: "announcements", icon: Megaphone, label: "Announcements", badge: null },
    { id: "inquiries", icon: MessageSquare, label: "My Inquiries", badge: "2" },
    { id: "resources", icon: FileText, label: "Resources", badge: null },
    { id: "calendar", icon: Calendar, label: "Calendar", badge: null },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ]

  const menuItems = user?.role === "admin" ? adminMenuItems : studentMenuItems

  // Load saved preferences
  useEffect(() => {
    const savedLockState = localStorage.getItem("sidebar-locked")
    const savedCollapsedState = localStorage.getItem("sidebar-collapsed")

    if (savedLockState !== null) {
      setIsLocked(JSON.parse(savedLockState))
    }
    if (savedCollapsedState !== null && JSON.parse(savedLockState)) {
      setIsCollapsed(JSON.parse(savedCollapsedState))
    }
  }, [])

  // Save preferences
  useEffect(() => {
    localStorage.setItem("sidebar-locked", JSON.stringify(isLocked))
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed))
  }, [isLocked, isCollapsed])

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  const toggleLock = () => {
    setIsLocked(!isLocked)
    if (isLocked) {
      setIsCollapsed(true)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!isLocked) {
      setIsCollapsed(false)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isLocked) {
      setIsCollapsed(true)
    }
  }

  const shouldExpand = isLocked ? !isCollapsed : isHovered

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white hover:bg-purple-800 shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Fixed height, full screen vertical */}
      <div
        className={`
        ${shouldExpand ? "w-64" : "w-16"} 
        bg-purple-700 text-white 
        flex flex-col 
        transition-all duration-300 ease-in-out
        h-screen
        fixed lg:relative
        z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo Section - Fixed at top */}
        <div
          className={`
          ${shouldExpand ? "p-4 lg:p-6" : "p-4"} 
          border-b border-purple-600 
          pt-16 lg:pt-6 
          transition-all duration-300
          flex-shrink-0
        `}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-purple-700" />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              <h1 className="text-base lg:text-lg font-bold whitespace-nowrap">Ndejje Connect</h1>
              <p className="text-purple-200 text-xs lg:text-sm whitespace-nowrap">
                {user?.role === "admin" ? "Admin Portal" : "Guild Portal"}
              </p>
            </div>
          </div>
        </div>

        {/* Lock/Unlock Button - Hidden on mobile */}
        <div className="hidden lg:block px-4 py-2 border-b border-purple-600 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLock}
            className={`${shouldExpand ? "w-full justify-start" : "w-8 h-8 p-0 justify-center"} text-purple-200 hover:bg-purple-600 hover:text-white transition-all duration-300 relative group`}
            title={isLocked ? "Unlock sidebar (auto-hide)" : "Lock sidebar (keep open)"}
          >
            {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            <span
              className={`ml-2 transition-all duration-300 overflow-hidden ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              {isLocked ? "Locked" : "Auto-hide"}
            </span>

            {/* Tooltip for collapsed state */}
            {!shouldExpand && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {isLocked ? "Unlock sidebar (auto-hide)" : "Lock sidebar (keep open)"}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </Button>
        </div>

        {/* Navigation - Scrollable middle section */}
        <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
          <div className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center ${shouldExpand ? "space-x-3 px-3 lg:px-4" : "justify-center px-2"} py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-purple-600 text-white"
                        : "text-purple-200 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      {item.badge && shouldExpand && (
                        <Badge className="absolute -top-2 -right-2 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                          {item.badge}
                        </Badge>
                      )}
                      {item.badge && !shouldExpand && (
                        <Badge className="absolute -top-1 -right-1 h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                          •
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`text-xs lg:text-sm transition-all duration-300 overflow-hidden whitespace-nowrap ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {/* Tooltip for collapsed state - Hidden on mobile */}
                  {!shouldExpand && (
                    <div className="hidden lg:block absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && <Badge className="ml-2 bg-red-500 text-white text-xs">{item.badge}</Badge>}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Status indicator - Fixed at bottom */}
        <div className="p-2 lg:p-4 border-t border-purple-600 flex-shrink-0">
          <div className={`flex items-center ${shouldExpand ? "space-x-2" : "justify-center"}`}>
            <div className={`w-2 h-2 rounded-full ${isLocked ? "bg-red-400" : "bg-green-400"} animate-pulse`}></div>
            <span
              className={`text-xs text-purple-200 transition-all duration-300 overflow-hidden whitespace-nowrap ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              {user?.role === "admin" ? "Admin Mode" : isLocked ? "Sidebar Locked" : "Auto-hide Mode"}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
