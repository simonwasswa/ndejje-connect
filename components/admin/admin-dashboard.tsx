"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  Calendar,
  Megaphone,
  Settings,
  TrendingUp,
  FileText,
  Shield,
  Edit,
  Plus,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AdminDashboardProps {
  setActiveSection?: (section: string) => void
}

export function AdminDashboard({ setActiveSection }: AdminDashboardProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const systemStats = {
    totalStudents: 1250,
    totalInquiries: 45,
    pendingInquiries: 12,
    totalEvents: 8,
    totalAnnouncements: 15,
    guildMembers: 12,
    systemUptime: "99.9%",
    activeUsers: 890,
  }

  const recentActivities = [
    {
      id: 1,
      type: "inquiry",
      title: "New inquiry submitted",
      description: "Student inquiry about library hours",
      user: "John Doe",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      type: "announcement",
      title: "Announcement published",
      description: "Guild election nominations announcement",
      user: "Admin",
      time: "1 hour ago",
      status: "published",
    },
    {
      id: 3,
      type: "event",
      title: "Event created",
      description: "Career Fair 2024 event added",
      user: "Admin",
      time: "2 hours ago",
      status: "scheduled",
    },
    {
      id: 4,
      type: "user",
      title: "New student registered",
      description: "Alice Namukasa joined the system",
      user: "System",
      time: "3 hours ago",
      status: "active",
    },
  ]

  const managementSections = [
    {
      id: "students",
      title: "Student Management",
      description: "Manage student accounts, profiles, and permissions",
      icon: Users,
      count: systemStats.totalStudents,
      actions: ["View All", "Add Student", "Export Data"],
    },
    {
      id: "inquiries",
      title: "Inquiry Management",
      description: "Review and respond to student inquiries",
      icon: MessageSquare,
      count: systemStats.pendingInquiries,
      actions: ["View Pending", "Respond", "Archive"],
    },
    {
      id: "events",
      title: "Event Management",
      description: "Create, edit, and manage university events",
      icon: Calendar,
      count: systemStats.totalEvents,
      actions: ["Create Event", "Edit Events", "View Calendar"],
    },
    {
      id: "announcements",
      title: "Announcement Management",
      description: "Publish and manage guild announcements",
      icon: Megaphone,
      count: systemStats.totalAnnouncements,
      actions: ["Create Post", "Edit Posts", "Manage Categories"],
    },
    {
      id: "guild",
      title: "Guild Management",
      description: "Manage guild members and council structure",
      icon: Shield,
      count: systemStats.guildMembers,
      actions: ["Add Member", "Edit Roles", "Manage Permissions"],
    },
    {
      id: "system",
      title: "System Settings",
      description: "Configure system settings and preferences",
      icon: Settings,
      count: "Active",
      actions: ["General Settings", "User Permissions", "System Logs"],
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return <MessageSquare className="w-4 h-4 text-blue-600" />
      case "announcement":
        return <Megaphone className="w-4 h-4 text-green-600" />
      case "event":
        return <Calendar className="w-4 h-4 text-purple-600" />
      case "user":
        return <Users className="w-4 h-4 text-orange-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="border-2 border-purple-300 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Complete system management and control panel</p>
            <Badge className="mt-2 bg-red-100 text-red-800">Administrator Access</Badge>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="w-4 h-4 mr-2" />
              Quick Actions
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="management">Management Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{systemStats.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{systemStats.pendingInquiries}</div>
                  <div className="text-sm text-gray-600">Pending Inquiries</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{systemStats.totalEvents}</div>
                  <div className="text-sm text-gray-600">Active Events</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              by {activity.user} • {activity.time}
                            </span>
                            <Badge className={getStatusColor(activity.status)} variant="secondary">
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => setActiveSection("member-management")}
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      <span className="text-sm">Manage Members</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => setActiveSection("content-management")}
                    >
                      <Megaphone className="w-6 h-6 mb-2" />
                      <span className="text-sm">Manage Content</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Calendar className="w-6 h-6 mb-2" />
                      <span className="text-sm">Create Event</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <MessageSquare className="w-6 h-6 mb-2" />
                      <span className="text-sm">Review Inquiries</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managementSections.map((section) => {
                const Icon = section.icon
                return (
                  <Card key={section.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-purple-600" />
                        <Badge variant="outline">{section.count}</Badge>
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {section.actions.map((action, index) => (
                          <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                            <Edit className="w-4 h-4 mr-2" />
                            {action}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Users Today</span>
                      <span className="font-bold">{systemStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Inquiries This Month</span>
                      <span className="font-bold">{systemStats.totalInquiries}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Events This Semester</span>
                      <span className="font-bold">{systemStats.totalEvents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>System Response Time</span>
                      <span className="font-bold text-green-600">&lt; 200ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Database Status</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Server Load</span>
                      <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Storage Usage</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Backup</span>
                      <span className="font-bold">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Alert */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Administrator Privileges Active</h3>
          </div>
          <p className="text-blue-800 text-sm mt-1">
            You have full system access. All actions are logged for security purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
