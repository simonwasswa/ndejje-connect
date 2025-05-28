"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Login } from "@/components/auth/login"
import { Sidebar } from "@/components/sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { Dashboard } from "@/components/dashboard"
import { GuildMembers } from "@/components/guild-members"
import { StudentInquiries } from "@/components/student-inquiries"
import { Events } from "@/components/events"
import { Announcements } from "@/components/announcements"
import { Students } from "@/components/students"
import { GuildCouncil } from "@/components/guild-council"
import { Resources } from "@/components/resources"
import { Calendar } from "@/components/calendar"
import { Notifications } from "@/components/notifications"
import { Profile } from "@/components/profile"
import { SearchResults } from "@/components/search-results"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { MemberManagement } from "@/components/admin/member-management"
import { ContentManagement } from "@/components/admin/content-management"

export default function Home() {
  const { user, isLoading, login, isAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New announcement posted", read: false, time: "2 min ago" },
    { id: 2, title: "Event registration confirmed", read: false, time: "1 hour ago" },
    { id: 3, title: "Guild meeting tomorrow", read: true, time: "3 hours ago" },
  ])

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated || !user) {
    return <Login onLogin={login} />
  }

  const renderContent = () => {
    if (searchQuery && activeSection === "search") {
      return <SearchResults query={searchQuery} setActiveSection={setActiveSection} />
    }

    switch (activeSection) {
      case "dashboard":
        return user?.role === "admin" ? (
          <AdminDashboard setActiveSection={setActiveSection} />
        ) : (
          <Dashboard setActiveSection={setActiveSection} />
        )
      case "member-management":
        return (
          <ProtectedRoute requiredRole="admin">
            <MemberManagement />
          </ProtectedRoute>
        )
      case "content-management":
        return (
          <ProtectedRoute requiredRole="admin">
            <ContentManagement />
          </ProtectedRoute>
        )
      case "guild-members":
        return <GuildMembers />
      case "inquiries":
        return <StudentInquiries />
      case "events":
        return <Events />
      case "announcements":
        return <Announcements />
      case "calendar":
        return <Calendar />
      case "notifications":
        return <Notifications notifications={notifications} setNotifications={setNotifications} />
      case "students":
        return (
          <ProtectedRoute requiredRole="admin">
            <Students />
          </ProtectedRoute>
        )
      case "guild-council":
        return (
          <ProtectedRoute requiredRole="admin">
            <GuildCouncil />
          </ProtectedRoute>
        )
      case "resources":
        return <Resources />
      case "profile":
        return <Profile user={user} setUser={() => {}} />
      default:
        return <Dashboard setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSection={setActiveSection}
          notifications={notifications}
          user={user}
        />
        <main className="flex-1 overflow-auto p-4 md:p-0">{renderContent()}</main>
      </div>
    </div>
  )
}
