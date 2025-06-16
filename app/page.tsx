"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Dashboard } from "@/components/dashboard"
import { Events } from "@/components/events"
import { Announcements } from "@/components/announcements"
import { GuildMembers } from "@/components/guild-members"
import { Students } from "@/components/students"
import { GuildCouncil } from "@/components/guild-council"
import { Resources } from "@/components/resources"
import { SearchResults } from "@/components/search-results"
import { Calendar } from "@/components/calendar"
import { Notifications } from "@/components/notifications"
import { Profile } from "@/components/profile"
import { StudentInquiries } from "@/components/student-inquiries"
import { Sidebar } from "@/components/sidebar"
import { TopNavigation } from "@/components/top-navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { MemberManagement } from "@/components/admin/member-management"
import { ContentManagement } from "@/components/admin/content-management"
import { EventsManagement } from "@/components/admin/events-management"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Login } from "@/components/auth/login"

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Event: Tech Workshop",
      message: "Join us for an exciting tech workshop this Friday",
      time: "2 hours ago",
      read: false,
      type: "event",
    },
    {
      id: 2,
      title: "Guild Meeting Reminder",
      message: "Don't forget about tomorrow's guild meeting at 2 PM",
      time: "5 hours ago",
      read: false,
      type: "reminder",
    },
    {
      id: 3,
      title: "New Announcement",
      message: "Check out the latest updates from the student council",
      time: "1 day ago",
      read: true,
      type: "announcement",
    },
  ]

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Login />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
      case "admin-dashboard":
        return user?.role === "admin" ? (
          <AdminDashboard setActiveSection={setActiveSection} />
        ) : (
          <Dashboard setActiveSection={setActiveSection} />
        )
      case "events":
        return user?.role === "admin" ? <EventsManagement /> : <Events />
      case "announcements":
        return <Announcements />
      case "guild-members":
        return <GuildMembers />
      case "students":
        return (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Students />
          </ProtectedRoute>
        )
      case "guild-council":
        return (
          <ProtectedRoute allowedRoles={["admin"]}>
            <GuildCouncil />
          </ProtectedRoute>
        )
      case "resources":
        return <Resources />
      case "search":
        return <SearchResults query={searchQuery} />
      case "calendar":
        return <Calendar />
      case "notifications":
        return <Notifications notifications={notifications} />
      case "profile":
        return <Profile />
      case "inquiries":
        return <StudentInquiries />
      case "member-management":
        return (
          <ProtectedRoute allowedRoles={["admin"]}>
            <MemberManagement />
          </ProtectedRoute>
        )
      case "content-management":
        return (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ContentManagement />
          </ProtectedRoute>
        )
      default:
        return user?.role === "admin" ? (
          <AdminDashboard setActiveSection={setActiveSection} />
        ) : (
          <Dashboard setActiveSection={setActiveSection} />
        )
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Fixed height, full screen vertical */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} user={user} />

      {/* Main Content Area - Responsive */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation - Fixed at top */}
        <TopNavigation
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSection={setActiveSection}
          notifications={notifications}
          user={user}
        />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-full">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
