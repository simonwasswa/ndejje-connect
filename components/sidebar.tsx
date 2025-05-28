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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  user: any
}

export function Sidebar({ activeSection, setActiveSection, user }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed
  const [isLocked, setIsLocked] = useState(false) // Lock state
  const [isHovered, setIsHovered] = useState(false)

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
    { id: "guild-members", icon: Users, label: "Guild Members", badge: "12" },
    { id: "inquiries", icon: MessageSquare, label: "Student Inquiries", badge: "8" },
    { id: "events", icon: Calendar, label: "Events", badge: "3" },
    { id: "announcements", icon: Megaphone, label: "Announcements", badge: null },
    { id: "calendar", icon: Calendar, label: "Calendar", badge: null },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ]

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
    // If unlocking, collapse the sidebar
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

  // Determine if sidebar should be expanded
  const shouldExpand = isLocked ? !isCollapsed : isHovered

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white hover:bg-purple-800"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${shouldExpand ? "w-64" : "w-16"} bg-purple-700 text-white flex flex-col transition-all duration-300 ease-in-out
        fixed md:relative h-full z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo Section */}
        <div
          className={`${shouldExpand ? "p-6" : "p-4"} border-b border-purple-600 pt-16 md:pt-6 transition-all duration-300`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-purple-700" />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              <h1 className="text-lg font-bold whitespace-nowrap">Ndejje Connect</h1>
              <p className="text-purple-200 text-sm whitespace-nowrap">Guild Portal</p>
            </div>
          </div>
        </div>

        {/* Lock/Unlock Button */}
        <div className="px-4 py-2 border-b border-purple-600">
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center ${shouldExpand ? "space-x-3 px-4" : "justify-center px-2"} py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-purple-600 text-white"
                        : "text-purple-200 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className="w-5 h-5" />
                      {item.badge && shouldExpand && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                          {item.badge}
                        </Badge>
                      )}
                      {item.badge && !shouldExpand && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                          •
                        </Badge>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-all duration-300 overflow-hidden whitespace-nowrap ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {/* Tooltip for collapsed state */}
                  {!shouldExpand && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
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

        {/* Move status indicator to bottom without Quick Stats */}
        <div className="p-4 border-t border-purple-600">
          <div className={`flex items-center ${shouldExpand ? "space-x-2" : "justify-center"}`}>
            <div className={`w-2 h-2 rounded-full ${isLocked ? "bg-red-400" : "bg-green-400"} animate-pulse`}></div>
            <span
              className={`text-xs text-purple-200 transition-all duration-300 overflow-hidden whitespace-nowrap ${shouldExpand ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
            >
              {isLocked ? "Sidebar Locked" : "Auto-hide Mode"}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
